"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GalleryImageData } from "../../utils/Images";

const ITEMS_PER_PAGE = 6;

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.min(
    100,
    Math.ceil(GalleryImageData.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedImages = GalleryImageData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {selectedImages.map((image) => (
          <div
            key={image.id}
            className="w-full h-64 overflow-hidden rounded-2xl"
          >
            <Image
              src={image.imageUrl}
              width={700}
              height={600}
              alt={`Gallery ${image.id}`}
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="my-4 ">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={prevPage} href="#" />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={nextPage} href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
