"use client";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useCallback } from "react";
import { db } from "../../../../firebaseConfig";
import { ArrowLeft, ArrowRight, Download, XCircle } from "lucide-react";
import Image from "next/image";

type ViewMode = "grid" | "large";
type ImageData = {
  url: string;
  id: string;
};

const Page = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const imageList: string[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.imageUrls && Array.isArray(data.imageUrls)) {
            imageList.push(...data.imageUrls);
          } else if (data.imageUrls) {
            if (Array.isArray(data.imageUrls)) {
              imageList.push(...data.imageUrls);
            } else {
              console.error(
                "Expected an array of image URLs, got something else."
              );
            }
          }
        });

        // Remove duplicates and format for our component
        const uniqueImages = Array.from(new Set(imageList)).map(
          (url, index) => ({
            url,
            id: `img-${index}`,
          })
        );

        setImages(uniqueImages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(
          "Failed to fetch images. Please check your console for details."
        );
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Filtering images based on search term
  const filteredImages = images.filter((image) => {
    const matchesSearch = image.url
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setViewMode("large");
  };

  const handleBackToGrid = () => {
    setViewMode("grid");
    setSelectedImage(null);
  };

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (selectedImage === null || filteredImages.length === 0) return;

      if (direction === "prev") {
        setSelectedImage((prev) => {
          if (prev === null) return 0;
          return prev === 0 ? filteredImages.length - 1 : prev - 1;
        });
      } else {
        setSelectedImage((prev) => {
          if (prev === null) return 0;
          return prev === filteredImages.length - 1 ? 0 : prev + 1;
        });
      }
    },
    [filteredImages.length, selectedImage]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === "large") {
        if (e.key === "ArrowLeft") navigateImage("prev");
        else if (e.key === "ArrowRight") navigateImage("next");
        else if (e.key === "Escape") handleBackToGrid();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, selectedImage, filteredImages.length, navigateImage]);

  if (loading) {
    // Loader removed
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="p-8 max-w-md bg-white rounded-xl shadow-2xl">
          <div className="flex items-center text-red-500 mb-6">
            <svg
              className="w-8 h-8 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <XCircle className="w-8 h-8" />
            </svg>
            <h2 className="text-2xl font-bold">Error</h2>
          </div>
          <p className="text-gray-700 text-lg">{error}</p>
          <button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Large image view mode
  if (viewMode === "large" && selectedImage !== null) {
    const currentImage = filteredImages[selectedImage];
    console.log("Current Image URL:", currentImage.url);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-black bg-opacity-70">
          <button
            onClick={handleBackToGrid}
            className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center transition duration-300 shadow-md"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Gallery
          </button>
          <div className="flex space-x-4">
            <div className="text-white font-medium bg-black bg-opacity-50 py-2 px-4 rounded-lg">
              {selectedImage + 1} / {filteredImages.length}
            </div>
            <a
              href={currentImage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg flex items-center transition duration-300 shadow-md"
            >
              <Download className="w-5 h-5 mr-2" />
              Download
            </a>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition duration-300 transform hover:scale-110"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>

          {/* Fixed: Removed layout="fill" and used width/height props instead */}
          <div className="flex items-center justify-center h-full w-full">
            <Image
              src={currentImage.url}
              alt={`Full view of image ${selectedImage + 1}`}
              className="max-h-[65vh] max-w-[75vw] object-contain shadow-2xl"
              width={800}
              height={600}
              onError={(e) => {
                console.error("Image failed to load:", currentImage.url);
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/api/placeholder/800/600";
                e.currentTarget.alt = "Image failed to load";
              }}
            />
          </div>

          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition duration-300 transform hover:scale-110"
            aria-label="Next image"
          >
            <ArrowRight className="w-8 h-8" />
          </button>
        </div>

        <div className="p-4 text-white text-center bg-black bg-opacity-70 text-sm">
          Use arrow keys (←/→) to navigate or press ESC to exit
        </div>
      </div>
    );
  }

  // Grid view mode (default)
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 mt-32">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Image Gallery
          </h1>

          <div className="flex flex-col space-y-6 ">
            {/* Search and stats */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-800 rounded-lg">
                Showing {filteredImages.length} of {images.length} images
              </div>
            </div>
          </div>
        </div>

        {filteredImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-xl p-12 text-center">
            <svg
              className="w-20 h-20 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <h2 className="mt-6 text-2xl font-medium text-gray-700">
              No images found
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Try adjusting your search or selecting a different category
              filter.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group bg-white rounded-xl shadow-md overflow-hidden transition transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <div className="relative aspect-w-16 aspect-h-12 h-52">
                  {/* Fixed: Using proper Next.js Image component setup for grid items */}
                  <div className="w-full h-full relative">
                    <Image
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/api/placeholder/400/320";
                        e.currentTarget.alt = "Image failed to load";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
