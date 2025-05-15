"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

import { Upload, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Tooltip } from "react-tooltip";

interface FileData {
  name: string;
  type: string;
  size: number;
  preview: string | null;
  file: File;
  status: "uploading" | "complete" | "error";
  secure_url?: string;
  originalFile?: File;
}

interface StudentData {
  prnNumber: string;
  uid: string;
}

const MediaSection = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImages, setUploadedImages] = useState<FileData[]>([]);
  const [prnNumber, setPrnNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File): Promise<FileData | null> => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "shrikant");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dz8enfjtx/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return {
        ...data,
        originalFile: file,
        name: file.name,
        type: file.type,
        size: file.size,
        secure_url: data.secure_url,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
        status: "complete",
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setLoading(true);
    const uploadPromises: Promise<FileData | null>[] = [];
    const newFiles: FileData[] = [];

    // Process files and create preview
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      newFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
        file: file,
        status: "uploading",
      });
    }

    // Update UI with files that are being uploaded
    setFiles([...files, ...newFiles]);

    // Upload each file to Cloudinary
    for (let i = 0; i < selectedFiles.length; i++) {
      uploadPromises.push(handleUpload(selectedFiles[i]));
    }

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(
        (result) => result !== null
      ) as FileData[];

      // Update file status for completed uploads
      const updatedFiles = [...files, ...newFiles].map((file) => {
        const uploadResult = successfulUploads.find(
          (result) =>
            result.originalFile?.name === file.name &&
            result.originalFile?.size === file.size
        );

        if (uploadResult) {
          return {
            ...file,
            status: "complete",
            secure_url: uploadResult.secure_url,
          };
        }
        return file;
      });

      setFiles(updatedFiles as FileData[]);
      setUploadedImages([...uploadedImages, ...successfulUploads]);
    } catch (err) {
      setError("Some files failed to upload");
      console.error("Upload batch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    setLoading(true);
    const uploadPromises: Promise<FileData | null>[] = [];
    const newFiles: FileData[] = [];

    // Process files and create preview
    for (let i = 0; i < droppedFiles.length; i++) {
      const file = droppedFiles[i];
      newFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
        file: file,
        status: "uploading",
      });
    }

    // Update UI with files that are being uploaded
    setFiles([...files, ...newFiles]);

    // Upload each file to Cloudinary
    for (let i = 0; i < droppedFiles.length; i++) {
      uploadPromises.push(handleUpload(droppedFiles[i]));
    }

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(
        (result) => result !== null
      ) as FileData[];

      // Update file status for completed uploads
      const updatedFiles = [...files, ...newFiles].map((file) => {
        const uploadResult = successfulUploads.find(
          (result) => result.name === file.name && result.size === file.size
        );

        if (uploadResult) {
          return {
            ...file,
            status: "complete",
            secure_url: uploadResult.secure_url,
          };
        }
        return file;
      });

      setFiles(updatedFiles as FileData[]);
      setUploadedImages([...uploadedImages, ...successfulUploads]);
    } catch (err) {
      setError("Some files failed to upload");
      console.error("Upload batch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview);
    }

    // If this file was successfully uploaded, also remove from uploadedImages
    if (newFiles[index].secure_url) {
      setUploadedImages(
        uploadedImages.filter(
          (img) => img.secure_url !== newFiles[index].secure_url
        )
      );
    }

    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Function to find student by PRN number
  const findStudentByPRN = async (
    prnNumber: string
  ): Promise<StudentData | null> => {
    try {
      // Initialize Firestore
      const firestore = getFirestore();

      // Create a query against the students collection
      const studentsRef = collection(firestore, "students");
      const q = query(studentsRef, where("PrnNumber", "==", prnNumber));

      // Execute query
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      // Get the first document that matches
      const studentDoc = querySnapshot.docs[0];
      const studentData = studentDoc.data() as StudentData;

      return {
        prnNumber: studentData.prnNumber || prnNumber,
        uid: studentData.uid || studentDoc.id, // Use document ID if uid is not available
      };
    } catch (error) {
      console.error("Error finding student:", error);
      return null;
    }
  };

  // Modified function to store URL in Firebase
  const verifyAndStoreImage = async (url: string) => {
    if (!prnNumber) {
      setError("Please enter a PRN number");
      return;
    }

    if (!url) {
      setError("No image URL available");
      return;
    }

    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      // Find student by PRN
      const student = await findStudentByPRN(prnNumber);

      if (!student) {
        setError(`No student found with PRN: ${prnNumber}`);
        setIsSaving(false);
        return;
      }

      // Get Firestore reference
      const firestore = getFirestore();

      // Reference to the student document
      const studentDocRef = doc(firestore, "students", student.uid);

      // Update the student document with the image URL
      await updateDoc(studentDocRef, {
        imageUrls: arrayUnion(url), // Add URL to an array field called imageUrls
      });

      // Successfully verified student and stored URL
      setMessage(
        `Image successfully stored for student with PRN: ${prnNumber}`
      );
      setPrnNumber(""); // Clear the PRN input after successful verification

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }

      setSelectedImageIndex(null);
      setUploadedImages([]); // Clear uploaded images after assignment
    } catch (error) {
      console.error("Error storing image URL:", error);
      setError(
        "Failed to store image URL: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-16 transition-transform transform ">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="bg-red-100 p-2 rounded-lg mr-3">
          {/* Removed Image icon */}
        </span>
        Media Library
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p>{message}</p>
        </div>
      )}

      {/* Upload section */}
      <div
        className={`border-4 border-dashed rounded-xl p-10 mb-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-[#991b1b] bg-red-50 scale-105"
            : "border-gray-300 hover:border-[#991b1b] hover:bg-gray-50"
        } ${loading ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          !loading && document.getElementById("fileInput")?.click()
        }
      >
        <input
          type="file"
          id="fileInput"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          disabled={loading}
          ref={fileInputRef}
        />
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="bg-red-100 p-6 rounded-full mb-4">
              <Loader2 className="w-16 h-16 text-[#991b1b] animate-spin" />
            </div>
          ) : (
            <div className="bg-red-100 p-6 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
              <Upload className="w-16 h-16 text-[#991b1b]" />
            </div>
          )}
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            {loading ? "Uploading files to Cloudinary..." : "Upload Images"}
          </p>
          <p className="text-md text-gray-500 max-w-md mx-auto">
            {loading
              ? "Please wait while we process your images..."
              : "Drag and drop your files here, or click to browse"}
          </p>
          {!loading && (
            <p className="mt-3 text-sm text-gray-400">
              Supported formats: JPG, PNG, GIF, WebP
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Files preview section */}
        {files.length > 0 && (
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6 h-full shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="bg-red-100 p-1.5 rounded-md mr-2">
                  {/* Removed Image icon */}
                </span>
                Uploaded Files ({files.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-3 bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative pb-[70%] mb-3 bg-gray-100 rounded-lg overflow-hidden">
                      {file.preview ? (
                        <Image
                          src={file.preview}
                          alt={file.name}
                          layout="fill"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Removed Image icon */}
                        </div>
                      )}
                      <Tooltip content="Remove file">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full shadow-sm transition-all"
                          disabled={loading}
                        >
                          <X className="w-4 h-4 text-gray-700" />
                        </button>
                      </Tooltip>
                    </div>
                    <div className="px-1">
                      <p
                        className="font-medium text-gray-800 truncate text-sm"
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(file.size)}
                      </p>
                      <div className="mt-2">
                        {file.status === "uploading" ? (
                          <span className="inline-flex items-center text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Uploading...
                          </span>
                        ) : file.status === "complete" ? (
                          <span className="inline-flex items-center text-xs text-[#991b1b] bg-red-50 px-2 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </span>
                        ) : file.status === "error" ? (
                          <span className="inline-flex items-center text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Failed
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Display Cloudinary URLs */}
              {uploadedImages.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-md font-medium mb-3 text-gray-700 flex items-center">
                    <span className="bg-red-100 p-1 rounded-md mr-2">
                      <CheckCircle className="w-4 h-4 text-[#991b1b]" />
                    </span>
                    Cloudinary URLs
                  </h4>
                  <div className="bg-white border rounded-lg p-4 max-h-48 overflow-y-auto shadow-md">
                    <ul className="divide-y">
                      {uploadedImages.map((img, index) => (
                        <li key={index} className="py-2">
                          <div className="flex items-center">
                            <Image
                              src={img.secure_url || "/placeholder.png"}
                              alt={img.name || "Uploaded image"}
                              width={40}
                              height={40}
                              className="w-10 h-10 mr-3 rounded object-cover"
                            />
                            <a
                              href={img.secure_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#991b1b] hover:underline text-sm break-all"
                            >
                              {img.secure_url}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRN input and assign section */}
        {uploadedImages.length > 0 && (
          <div className={files.length > 0 ? "lg:col-span-1" : "lg:col-span-3"}>
            <div className="bg-gray-50 rounded-xl p-6 h-full shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Assign to Student
              </h3>
              <div className="flex flex-col space-y-5">
                <div>
                  <label
                    htmlFor="prnNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Student PRN Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="prnNumber"
                      value={prnNumber}
                      onChange={(e) => setPrnNumber(e.target.value)}
                      placeholder="Enter PRN number (e.g. 7020354108)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991b1b] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {uploadedImages.map((img, index) => (
                      <div
                        key={index}
                        className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                          selectedImageIndex === index
                            ? "border-[#991b1b] bg-red-50 transform scale-105"
                            : "border-gray-200 hover:border-[#991b1b] hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <div className="relative pb-[70%] mb-1">
                          <Image
                            src={img.secure_url || ""}
                            alt={img.name || `Image ${index}`}
                            layout="fill"
                            className="absolute inset-0 w-full h-full object-cover rounded"
                          />
                          {selectedImageIndex === index && (
                            <div className="absolute top-1 right-1 bg-[#991b1b] rounded-full p-1">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-xs truncate text-gray-600 text-center">
                          {img.name || `Image ${index + 1}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const imgToAssign =
                      selectedImageIndex !== null
                        ? uploadedImages[selectedImageIndex]
                        : uploadedImages[0];
                    verifyAndStoreImage(imgToAssign?.secure_url || "");
                  }}
                  disabled={
                    isSaving || !prnNumber || uploadedImages.length === 0
                  }
                  className={`mt-4 py-3 rounded-lg font-medium transition-all transform ${
                    isSaving || !prnNumber || uploadedImages.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#991b1b] text-white hover:bg-[#7d1616] hover:shadow-lg active:scale-98"
                  }`}
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submiting......
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Submit
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSection;
