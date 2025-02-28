import React from "react";
import Head from "next/head";
import Link from "next/link";

interface EnquiryData {
  size: string;
  age: string;
  mode: string;
  duration: string;
}

interface EnquiryPanelProps {
  data: EnquiryData[];
}

const EnquiryPanel: React.FC<EnquiryPanelProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Enroll Your Child - Certified Trainer</title>
        <meta
          name="description"
          content="Enroll your child in a 1-on-1 class with a certified trainer. Suitable for ages 10-15 years. Call us for details on fees."
        />
      </Head>
      <section className="mx-auto w-[90%] bg-red-800 text-white p-3 md:p-5 rounded-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-3 md:gap-6 lg:gap-8 w-full lg:w-auto">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div className="min-w-[120px] flex items-center">
                  <div className="text-sm md:text-base uppercase opacity-80 mr-2 font-medium text-white">
                    Teacher:
                  </div>
                  <div className="text-xs md:text-sm ">Certified Trainer</div>
                </div>
                <div className="min-w-[120px] flex items-center gap-1">
                  <div className="text-sm md:text-base uppercase opacity-80 mr-2 font-medium">
                    Size:
                  </div>
                  <div className="text-xs md:text-sm ">{item.size}</div>
                </div>
                <div className="min-w-[120px] flex items-center gap-1">
                  <div className="text-sm md:text-base uppercase opacity-80 font-medium">
                    Age:
                  </div>
                  <div className="text-xs md:text-sm ">{item.age}</div>
                </div>
                <div className="min-w-[120px] flex items-center gap-1">
                  <div className="text-sm md:text-base uppercase opacity-80 font-medium">
                    Mode:
                  </div>
                  <div className="text-xs md:text-sm ">{item.mode}</div>
                </div>
                <div className="min-w-[120px] flex items-center gap-1">
                  <div className="text-sm md:text-base uppercase opacity-80 font-medium">
                    Duration:
                  </div>
                  <div className="text-xs md:text-sm ">{item.duration}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <Link
            href="https://api.whatsapp.com/send?phone=917028511161&text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="lg:w-auto uppercase bg-white text-red-800 px-2 md:px-3 py-2 rounded-full text-sm md:text-sm font-medium hover:bg-gray-100 transition-colors">
              Enroll your child
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default EnquiryPanel;
