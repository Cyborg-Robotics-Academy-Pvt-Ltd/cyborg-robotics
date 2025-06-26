"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "../../../../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [wordCount, setWordCount] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Cloudinary config
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "shrikant";
  const CLOUDINARY_CLOUD_NAME =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dz8enfjtx";

  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAdmin(false);
        router.push("/login");
        return;
      }
      const adminDocRef = doc(db, "admins", user.uid);
      const adminDoc = await getDoc(adminDocRef);
      if (!adminDoc.exists()) {
        setIsAdmin(false);
        router.push("/login");
        return;
      }
      setIsAdmin(true);
      setAuthor(user.email || "");
    };
    checkAdmin();
  }, [router]);

  // Update word count when content changes
  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!title || !content || !author) {
        setError("Title, content, and author are required.");
        setLoading(false);
        return;
      }
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        author,
        date: new Date().toISOString().split("T")[0],
        imageUrl,
        createdAt: serverTimestamp(),
      });
      router.push("/blogs");
    } catch (err) {
      setError("Failed to create blog. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image file upload to Cloudinary
  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");
      setImageUrl(data.secure_url);
      setImagePreview(data.secure_url);
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  // Rich text formatting functions
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const renderPreview = () => {
    return (
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title || "Blog Title"}
        </h1>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Featured"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div className="text-sm text-gray-500 mb-6">
          By {author} • {new Date().toLocaleDateString()}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: content || "Your blog content will appear here...",
          }}
          className="text-gray-700 leading-relaxed"
        />
      </div>
    );
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-20">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
        <button
          type="button"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg bg-white border-2 border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 font-bold"
        >
          <span className="text-sm">{isPreviewMode ? "Edit" : "Preview"}</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition-all text-white font-bold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          }`}
        >
          <span className="text-sm">{loading ? "..." : "Publish"}</span>
        </button>
      </div>

      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {isPreviewMode ? (
            // Preview Mode
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-8">{renderPreview()}</div>
            </div>
          ) : (
            // Edit Mode
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="p-8 space-y-8">
                    {/* Title Input */}
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-0 py-4 text-3xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
                        placeholder="Enter your compelling title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    {/* Rich Text Toolbar */}
                    <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-xl border">
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => formatText("bold")}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
                          title="Bold"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 3v14h6.5c2.5 0 4.5-2 4.5-4.5 0-1.5-.8-2.8-2-3.5 1.2-.7 2-2 2-3.5C14 3 12 3 9.5 3H3zm3 2h3c1 0 2 0 2 1.5S10 8 9 8H6V5zm0 5h3.5c1.5 0 2.5 1 2.5 2.5S11 15 9.5 15H6v-5z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("italic")}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
                          title="Italic"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 3v2h2.5l-2 12H6v2h8v-2h-2.5l2-12H16V3H8z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("underline")}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
                          title="Underline"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 17h12v2H4v-2zm6-16C7.8 1 6 2.8 6 5v6c0 2.2 1.8 4 4 4s4-1.8 4-4V5c0-2.2-1.8-4-4-4zm2 10c0 1.1-.9 2-2 2s-2-.9-2-2V5c0-1.1.9-2 2-2s2 .9 2 2v6z" />
                          </svg>
                        </button>
                      </div>

                      <div className="w-px h-6 bg-gray-300"></div>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => formatText("insertUnorderedList")}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
                          title="Bullet List"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 4a1 1 0 100 2 1 1 0 000-2zM6 4h11v2H6V4zM3 9a1 1 0 100 2 1 1 0 000-2zM6 9h11v2H6V9zM3 14a1 1 0 100 2 1 1 0 000-2zM6 14h11v2H6v-2z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("insertOrderedList")}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
                          title="Numbered List"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 3v2h1v1H3v1h2V6h1V5H5V4h1V3H3zM3 8v1h1v1H3v1h2v-1h1v-1H5v-1h1V8H3zM2 12v4h4v-1H3v-1h2v-1H3v-1h3v-1H2zM8 4h9v2H8V4zM8 9h9v2H8V9zM8 14h9v2H8v-2z" />
                          </svg>
                        </button>
                      </div>

                      <div className="w-px h-6 bg-gray-300"></div>

                      <select
                        onChange={(e) =>
                          formatText("formatBlock", e.target.value)
                        }
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        <option value="div">Normal</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="blockquote">Quote</option>
                      </select>
                    </div>

                    {/* Content Editor */}
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Content
                      </label>
                      <div
                        ref={contentRef}
                        contentEditable
                        onInput={handleContentChange}
                        className="min-h-[400px] p-6 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 prose prose-lg max-w-none"
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                        suppressContentEditableWarning={true}
                      />
                      <div className="mt-3 flex justify-between text-sm text-gray-500">
                        <span>
                          {wordCount} words • {Math.ceil(wordCount / 200)} min
                          read
                        </span>
                        <span>{content.length} characters</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Featured Image
                  </h3>

                  <div className="space-y-4">
                    <input
                      type="url"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 placeholder-gray-400"
                      placeholder="Image URL"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                    />

                    <div className="text-center text-gray-500 text-sm">or</div>

                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        className="hidden"
                        onChange={handleImageFileChange}
                        disabled={imageUploading}
                      />
                      <label
                        htmlFor="image-upload"
                        className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                          imageUploading
                            ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                            : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                        }`}
                      >
                        {imageUploading ? (
                          <div className="flex items-center space-x-2">
                            <svg
                              className="animate-spin w-5 h-5 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span className="text-sm text-gray-500">
                              Uploading...
                            </span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <svg
                              className="w-8 h-8 text-gray-400 mx-auto mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <span className="text-sm text-gray-600">
                              Upload Image
                            </span>
                          </div>
                        )}
                      </label>
                    </div>

                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl("");
                            setImagePreview("");
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Author Info */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Author
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{author}</div>
                      <div className="text-sm text-gray-500">Admin</div>
                    </div>
                  </div>
                </div>

                {/* Writing Tips */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    ✨ Writing Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>
                        Use <strong>bold text</strong> for emphasis
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Break up content with headings</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Add bullet points for lists</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Aim for 200+ words for better SEO</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="fixed bottom-4 right-4 max-w-sm bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700 text-sm font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;
