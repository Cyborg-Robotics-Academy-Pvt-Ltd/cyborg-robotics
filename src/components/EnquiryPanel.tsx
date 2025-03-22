import React from "react";
import Head from "next/head";
import Link from "next/link";

interface EnquiryData {
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
      <section className="mx-auto md:w-[82%] lg:w-[85%] bg-red-800 text-white py-4   md:py-8 rounded-3xl">
        <div className="flex flex-col lg:flex-row items-center justify-center ">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-6">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div className="min-w-[100px] flex items-center">
                  <div className="text-sm md:text-base uppercase opacity-80 mr-1 font-medium text-white">
                    Teacher:
                  </div>
                  <div className="text-sm md:text-base">Certified Trainer</div>
                </div>

                <div className="min-w-[100px] flex items-center gap-1">
                  <div className="text-sm md:text-base uppercase opacity-80 font-medium">
                    Mode:
                  </div>
                  <div className="text-sm md:text-base ">{item.mode}</div>
                </div>
                <div className="min-w-[100px] flex items-center gap-1 ">
                  <div className="text-sm md:text-base uppercase opacity-80  font-medium">
                    Duration:
                  </div>
                  <div className="text-sm md:text-base truncate">
                    {item.duration}
                  </div>
                </div>
              </React.Fragment>
            ))}
            <Link
              href="https://api.whatsapp.com/send?phone=917028511161&text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
              target="_blank"
              className=""
              rel="noopener noreferrer"
            >
              <button className=" uppercase bg-white text-black px-2 md:px-3 py-2 rounded-xl text-sm md:text-sm font-medium hover:bg-gray-100 transition-colors ">
                Enroll your child
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnquiryPanel;
