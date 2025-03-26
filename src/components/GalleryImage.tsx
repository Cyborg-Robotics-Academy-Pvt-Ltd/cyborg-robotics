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
import { motion } from "framer-motion";
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
    <motion.div
      className="max-w-4xl  mx-auto p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:gap-4 gap-2">
        {selectedImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="w-full md:h-80 overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <Image
              src={image.imageUrl}
              width={850}
              height={700}
              alt={`Gallery ${image.id}`}
              objectFit="cover"
              className="w-full  object-cover md:h-80 h-64" // Reduced height for mobile
            />
          </motion.div>
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
    </motion.div>
  );
}
