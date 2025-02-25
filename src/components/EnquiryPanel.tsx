import React from "react";

const EnquiryPanel = () => {
  return (
    <div className="mx-auto w-[90%] bg-red-700 text-white p-3 md:p-5 rounded-lg  top-0 z-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap items-start lg:items-center gap-3 md:gap-6 lg:gap-8 w-full lg:w-auto">
          <div className="min-w-[120px]">
            <div className="text-xs md:text-sm uppercase opacity-80">
              Teacher:
            </div>
            <div className="text-sm md:text-base font-medium">
              Certified Trainer
            </div>
          </div>

          <div className="min-w-[120px]">
            <div className="text-xs md:text-sm uppercase opacity-80">Size:</div>
            <div className="text-sm md:text-base font-medium">1 on 1 class</div>
          </div>

          <div className="min-w-[120px]">
            <div className="text-xs md:text-sm uppercase opacity-80">Age:</div>
            <div className="text-sm md:text-base font-medium">5-6 Years</div>
          </div>

          <div className="min-w-[120px]">
            <div className="text-xs md:text-sm uppercase opacity-80">
              Duration:
            </div>
            <div className="text-sm md:text-base font-medium">15 classes</div>
          </div>

          <div className="min-w-[120px]">
            <div className="text-xs md:text-sm uppercase opacity-80">Fees:</div>
            <div className="text-sm md:text-base font-medium">
              Call Us for details
            </div>
          </div>
        </div>

        {/* Button */}
        <button className=" lg:w-auto bg-white text-red-800 px-2 md:px-3 py-2 rounded-2xl text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
          ENROLL YOUR CHILD
        </button>
      </div>
    </div>
  );
};

export default EnquiryPanel;
