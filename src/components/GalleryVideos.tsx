"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

export default function Gallery() {
  const slideData = [
    {
      id: "1",
      videoUrl:
        "https://res.cloudinary.com/dz8enfjtx/video/upload/v1742552839/jvqogzudnrpzjf5626ac.mp4",
    },
    {
      id: "2",
      videoUrl:
        "https://res.cloudinary.com/dz8enfjtx/video/upload/v1742552847/petloc1v3auqj7ggiqvv.mp4",
    },
    {
      id: "3",
      videoUrl:
        "https://res.cloudinary.com/dz8enfjtx/video/upload/v1742553723/ujdcm22x3go3klpvzycw.mp4",
    },
    {
      id: "4",
      videoUrl:
        "https://res.cloudinary.com/dz8enfjtx/video/upload/v1746082108/upvvefm3ajfhenonvabk.mp4",
    },
    {
      id: "5",
      videoUrl:
        "https://res.cloudinary.com/dz8enfjtx/video/upload/v1746082318/db0en0g499gaubzxxpsz.mp4",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.min(
    100,
    Math.ceil(slideData.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedImages = slideData.slice(
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
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {selectedImages.map(
          (video: { id: string; videoUrl: string }, index: number) => (
            <motion.div
              key={video?.id}
              className="w-full aspect-video overflow-hidden rounded-2xl"
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
              <video
                src={video.videoUrl}
                width={1080}
                height={600}
                controls
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          )
        )}
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
