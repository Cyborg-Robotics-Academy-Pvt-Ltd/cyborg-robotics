"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/assets/logo.png";
interface FooterProps {
  theme: string;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const isDarkMode = currentTheme === "dark";

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setCurrentTheme(e.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    setCurrentTheme(mediaQuery.matches ? "dark" : "light");

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <div>
      <div className={` pt-9 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
          <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
            <div className="md:w-[316px] mb-6 md:mb-0">
              <h1
                className={`font-extrabold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <Image src={logo} width={120} height={120} alt="logo" />
              </h1>
              <p
                className={`mt-[18px] text-[15px] font-normal ${
                  isDarkMode ? "text-white/[80%]" : "text-black/[80%]"
                }`}
              >
                LEGO electronics combine creativity and technology, allowing
                enthusiasts to build and program their own electronic devices.
                With a variety of components, users can create interactive
                models that respond to their environment, fostering innovation
                and learning in electronics.
              </p>
              <div className="mt-[18px] flex gap-4">
                <ul className="wrapper">
                  <li className="icon facebook">
                    <span className="tooltip">Facebook</span>
                    <svg
                      viewBox="0 0 320 512"
                      height="1.2em"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                    </svg>
                  </li>
                  <li className="icon twitter">
                    <span className="tooltip">Twitter</span>
                    <svg
                      height="1.8em"
                      fill="black"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      className="twitter"
                    >
                      <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                    </svg>
                  </li>
                  <Link href="https://www.instagram.com/">
                    <li className="icon instagram">
                      <span className="tooltip">Instagram</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.2em"
                        fill="black"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923.445.444.445.89.923.923.444.205.526.478.972.923.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                      </svg>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="md:w-[316px] mb-6 md:mb-0">
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8472 14.8554L16.4306 12.8764L16.4184 12.8707C16.1892 12.7727 15.939 12.7333 15.6907 12.7562C15.4424 12.7792 15.2037 12.8636 14.9963 13.002C14.9718 13.0181 14.9484 13.0357 14.9259 13.0545L12.6441 14.9998C11.1984 14.2976 9.70595 12.8164 9.00376 11.3895L10.9519 9.07294C10.9706 9.0495 10.9884 9.02606 11.0053 9.00075C11.1407 8.79384 11.2229 8.55667 11.2445 8.31035C11.2661 8.06402 11.2264 7.81618 11.1291 7.58887V7.57762L9.14438 3.15356C9.0157 2.85662 8.79444 2.60926 8.51362 2.44841C8.2328 2.28756 7.9075 2.22184 7.58626 2.26106C6.31592 2.42822 5.14986 3.05209 4.30588 4.01615C3.4619 4.98021 2.99771 6.21852 3.00001 7.49981C3.00001 14.9436 9.05626 20.9998 16.5 20.9998C17.7813 21.0021 19.0196 20.5379 19.9837 19.6939C20.9477 18.85 21.5716 17.6839 21.7388 16.4136C21.7781 16.0924 21.7125 15.7672 21.5518 15.4864C21.3911 15.2056 21.144 14.9843 20.8472 14.8554ZM16.5 19.4998C13.3185 19.4963 10.2682 18.2309 8.01856 15.9813C5.76888 13.7316 4.50348 10.6813 4.50001 7.49981C4.49648 6.58433 4.82631 5.69887 5.42789 5.00879C6.02947 4.3187 6.86167 3.87118 7.76907 3.74981C7.7687 3.75355 7.7687 3.75732 7.76907 3.76106L9.73782 8.16731L7.80001 10.4867C7.78034 10.5093 7.76247 10.5335 7.74657 10.5589C7.60549 10.7754 7.52273 11.0246 7.5063 11.2825C7.48988 11.5404 7.54035 11.7981 7.65282 12.0307C8.5022 13.7679 10.2525 15.5051 12.0084 16.3536C12.2428 16.465 12.502 16.5137 12.7608 16.495C13.0196 16.4762 13.2692 16.3907 13.485 16.2467C13.5091 16.2305 13.5322 16.2129 13.5544 16.1942L15.8334 14.2498L20.2397 16.2232C20.2397 16.2232 20.2472 16.2232 20.25 16.2232C20.1301 17.1319 19.6833 17.9658 18.9931 18.5689C18.3028 19.172 17.4166 19.5029 16.5 19.4998Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="ml-[18px]">
                  <Link
                    href="mailto:help@lorem.com"
                    className={`font-Inter text-[14px] font-medium ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    help@lorem.com
                  </Link>
                  <p
                    className={`font-Inter text-[12px] font-medium ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Support Email
                  </p>
                </div>
              </div>
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 4.5C8.25832 4.5 7.5333 4.71993 6.91661 5.13199C6.29993 5.54404 5.81928 6.12971 5.53545 6.81494C5.25162 7.50016 5.17736 8.25416 5.32205 8.98159C5.46675 9.70902 5.8239 10.3772 6.34835 10.9017C6.8728 11.4261 7.54098 11.7833 8.26841 11.9279C8.99584 12.0726 9.74984 11.9984 10.4351 11.7145C11.1203 11.4307 11.706 10.9501 12.118 10.3334C12.5301 9.7167 12.75 8.99168 12.75 8.25C12.75 7.25544 12.3549 6.30161 11.6517 5.59835C10.9484 4.89509 9.99456 4.5 9 4.5ZM9 10.5C8.55499 10.5 8.11998 10.368 7.74997 10.1208C7.37996 9.87357 7.09157 9.52217 6.92127 9.11104C6.75097 8.6999 6.70642 8.2475 6.79323 7.81105C6.88005 7.37459 7.09434 6.97368 7.40901 6.65901C7.72368 6.34434 8.12459 6.13005 8.56105 6.04323C8.9975 5.95642 9.4499 6.00097 9.86104 6.17127C10.2722 6.34157 10.6236 6.62996 10.8708 6.99997C11.118 7.36998 11.25 7.80499 11.25 8.25C11.25 8.84674 11.0129 9.41903 10.591 9.84099C10.169 10.2629 9.59674 10.5 9 10.5ZM9 0C6.81273 0.00248131 4.71575 0.872472 3.16911 2.41911C1.62247 3.96575 0.752481 6.06273 0.75 8.25C0.75 11.1938 2.11031 14.3138 4.6875 17.2734C5.84552 18.6108 7.14886 19.8151 8.57344 20.8641C8.69954 20.9524 8.84978 20.9998 9.00375 20.9998C9.15772 20.9998 9.30796 20.9524 9.43406 20.8641C10.856 19.8147 12.1568 18.6104 13.3125 17.2734C15.8859 14.3138 17.25 11.1938 17.25 8.25C17.2475 6.06273 16.3775 3.96575 14.8309 2.41911C13.2843 0.872472 11.1873 0.00248131 9 0ZM9 19.3125C7.45031 18.0938 2.25 13.6172 2.25 8.25C2.25 6.45979 2.96116 4.7429 4.22703 3.47703C5.4929 2.21116 7.20979 1.5 9 1.5C10.7902 1.5 12.5071 2.21116 13.773 3.47703C15.0388 4.7429 15.75 6.45979 15.75 8.25C15.75 13.6153 10.5497 18.0938 9 19.3125Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="ml-[18px]">
                  <Link
                    href="mailto:help@lorem.com"
                    className={`font-Inter text-[14px] font-medium ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Sub Nerul, Mumbia, India, 123456
                  </Link>
                  <p
                    className={`font-Inter text-[12px] font-medium ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Address
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`mt-6 flex w-full flex-col justify-between ${
                isDarkMode ? "text-white" : "text-black"
              } sm:flex-row md:mt-0 md:max-w-[341px]`}
            >
              <div className="mb-6 sm:mb-0">
                <p
                  className={`font-inter text-[18px] font-medium leading-normal ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Pages
                </p>
                <ul>
                  <li className="mt-[15px]">
                    <Link
                      className={`hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mt-[15px]">
                    <Link
                      className={`hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      href="/our-tutors"
                    >
                      News
                    </Link>
                  </li>
                  <li className="mt-[15px]">
                    <Link
                      className={`hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      href="/become-a-tutor"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="mt-[15px]">
                    <Link
                      className={`hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      href="/plans-and-pricing"
                    >
                      Plans and pricing
                    </Link>
                  </li>
                  <li className="mt-[15px]">
                    <Link
                      className={`hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      href="/terms-and-conditions"
                    >
                      Terms and conditions
                    </Link>
                  </li>
                  <li className="mt-[15px]">
                    <Link
                      className={`hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      href="/privacy-policy"
                    >
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                <p
                  className={`font-inter text-[18px] font-medium ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Download the app
                </p>
                <div className="flex gap-4 sm:flex-col">
                  <Link target="_blank" href="#">
                    <Image
                      alt="facebook icon"
                      loading="lazy"
                      width={168}
                      height={50}
                      src="https://www.englishyaari.com/img/google-store.svg"
                    />
                  </Link>
                  <Link target="_blank" href="#">
                    <Image
                      alt="facebook icon"
                      loading="lazy"
                      width={168}
                      height={50}
                      src="https://www.englishyaari.com/img/apple-store.svg"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr
            className={`mt-[30px] ${isDarkMode ? "text-white" : "text-black"}`}
          />
          <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
            <p
              className={`text-[10px] font-normal md:text-[12px] ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              © Copyright All Rights Reserved by Cyborg. PVT. LTD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
