import React from "react";
import Image from "next/dist/client/image";
import shippingOptionImg from "../../../public/assets/img/shipping-options-img.png";
import paymentImg from "../../../public/assets/img/payment-img.png";
import deliveryVanSvg from "../../../public/assets/icons/delivery-van.svg";
import Styles from "./Product.module.css";
import Link from "next/link";
import Logo from "../../public/assets/icons/logo.svg";
import FBLogo from "../../../public/assets/icons/facebook.svg";
import TwLogo from "../../../public/assets/icons/twitter.svg";
import LiLogo from "../../../public/assets/icons/linkedin.svg";
import Insta from "../../../public/assets/icons/instagram.svg";
import YoutubeLogo from "../../../public/assets/icons/youtube.svg";
import PinterestLogo from "../../public/assets/icons/pinterest.svg";

export default function RightSection() {
  const infoBoxFunc = () => {
    let infoWrapper: any = document.querySelector(
      ".info-box-wrapper .info-box"
    );
    infoWrapper.classList.remove("hidden");
    setTimeout(() => {
      infoWrapper.classList.add("opacity-1-trans");
      infoWrapper.classList.remove("opacity-0");
    }, 100);
  };

  const infoBoxCloseFunc = () => {
    let infoWrapper: any = document.querySelector(
      ".info-box-wrapper .info-box"
    );
    infoWrapper.classList.add("opacity-0");
    infoWrapper.classList.remove("opacity-1-trans");
    setTimeout(() => {
      infoWrapper.classList.add("hidden");
    }, 200);
  };

  const infoBox2Func = () => {
    let infoWrapper: any = document.querySelector(
      ".info-box-wrapper .info-box2"
    );
    infoWrapper.classList.remove("hidden");
    setTimeout(() => {
      infoWrapper.classList.add("opacity-1-trans");
      infoWrapper.classList.remove("opacity-0");
    }, 100);
  };

  const infoBox2CloseFunc = () => {
    let infoWrapper: any = document.querySelector(
      ".info-box-wrapper .info-box2"
    );
    infoWrapper.classList.add("opacity-0");
    infoWrapper.classList.remove("opacity-1-trans");
    setTimeout(() => {
      infoWrapper.classList.add("hidden");
    }, 200);
  };

  const infoBox3Func = () => {
    let infoWrapper: any = document.querySelector(
      ".info-box-wrapper .info-box3"
    );
    infoWrapper.classList.remove("hidden");
    setTimeout(() => {
      infoWrapper.classList.add("opacity-1-trans");
      infoWrapper.classList.remove("opacity-0");
    }, 100);
  };

  const infoBox3CloseFunc = () => {
    let infoWrapper: any = document.querySelector(
      ".info-box-wrapper .info-box3"
    );
    infoWrapper.classList.add("opacity-0");
    infoWrapper.classList.remove("opacity-1-trans");
    setTimeout(() => {
      infoWrapper.classList.add("hidden");
    }, 200);
  };

  return (
    <div className="product-page-right-col md:col-span-3 mt-8 lg:mt-0 lg:col-span-1">
      <div className="product-page-right-col-wrapper bg-gray-100 p-4 w-full rounded-lg h-full">
        <div className="product-page-returns-policy mt-4 flex flex-col justify-center text-sm md:w-max lg:w-full">
          <div className="button-wrapper flex flex-col items-center w-full mt-3 mb-6">
            <button
              className={`${Styles.phoneBtn} num-btn  py-2 px-4 rounded-full shadow-lg cursor-pointer w-max font-bold relative`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (833)906-7575
            </button>
            <button
              className={`${Styles.chatBtn} chat-btn bg-white dark-blue-color py-2 px-4 rounded-full shadow-lg cursor-pointer w-max font-bold relative mt-4`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              Chat Now
            </button>
          </div>
          <div className="font-semibold w-full flex justify-between relative info-box-wrapper">
            <span>Returns &amp; Warranty</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer"
              viewBox="0 0 20 20"
              fill="#52A0F2"
              onMouseOver={() => infoBoxFunc()}
              onMouseLeave={() => infoBoxCloseFunc()}
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="info-box absolute top-1 right-8 bg-white p-4 rounded text-xs z-10 text-gray-600 leading-snug shadow-lg hidden opacity-0">
              <div className="info-title font-semibold text-black">
                Return &amp; Warranty
              </div>
              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                <span className="font-semibold text-black">Easy Returns</span>
              </div>
              <p className="mt-2 pb-2 border-b border-solid border-gray-300">
                If any of GerVetUSA instrument Malfunctions or conk outs, we’re
                here to repair or replace your instrument depending upon the
                warranty of the tool.
              </p>
              <div className="info-warranty pt-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="warranty-title text-black font-semibold">
                    Warranty Details
                  </div>
                </div>
                <p className="mt-2">
                  The below instruments manufactured by GerVetUSA have limited
                  warranties:
                </p>
                <ul className="warranty-lists list-disc pl-3 sm:pl-6">
                  <li className="mt-2">
                    Tungsten carbide Scissors &gt; 5 years
                  </li>
                  <li className="mt-2">
                    Tungsten Carbide Needle holders &gt; 1 year
                  </li>
                  <li className="mt-2">Diamond Dust instruments &gt; 1 year</li>
                  <li className="mt-2">Titanium instruments &gt; 3 years</li>
                  <li className="mt-2">
                    Silver or Chrome plated instruments &gt; 1 year
                  </li>
                  <li className="mt-2">Super-cut scissors &gt; 1 year</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#52A0F2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Germen Made
          </div>
          <div className="mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#52A0F2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Free repair
          </div>
          <div className="product-page-warranty mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#52A0F2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            5 years warranty
          </div>
          <div className="product-page-delivery">
            <div className="mt-6 font-semibold flex justify-between w-full relative info-box-wrapper">
              <span>Delivery</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="#52A0F2"
                onMouseOver={() => infoBox2Func()}
                onMouseLeave={() => infoBox2CloseFunc()}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="info-box2 absolute top-1 right-8 bg-white p-4 rounded text-xs z-10 text-gray-600 leading-snug shadow-lg hidden opacity-0">
                <div className="info-title font-semibold text-black">
                  Shipping Options
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 -ml-2 popup-img">
                    <Image
                      src={deliveryVanSvg}
                      alt="Worldwide Delivery"
                    />
                  </div>
                  <span className="font-semibold text-black">
                    Worldwide Shipping
                  </span>
                </div>
                <p>
                  We ship via UPS and USPS. Any First time Orders which exceed
                  $300.00 or more automatically qualify for free standard
                  shipping (US Only), this excludes Puerto Rico, Hawaii &amp;
                  Alaska.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#52A0F2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Free delivery Canada/ USA
            </div>
            <div className="mt-4">
              <Image
                src={shippingOptionImg}
                alt="Shipping Options"
              />
            </div>
          </div>
          <div className="product-page-payments mt-6 flex flex-col justify-center text-sm">
            <div className="font-semibold w-full flex justify-between relative info-box-wrapper">
              <span>Payments</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="#52A0F2"
                onMouseOver={() => infoBox3Func()}
                onMouseLeave={() => infoBox3CloseFunc()}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="info-box3 absolute top-1 right-8 bg-white p-4 rounded text-xs z-10 text-gray-600 leading-snug shadow-lg hidden opacity-0">
                <div className="info-title font-semibold text-black">
                  Payment Options
                </div>
                <div className="flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold text-black">
                    Secure and Reliable
                  </span>
                </div>
                <p className="mt-2">
                  Your credit card is processed securely through our own credit
                  card processing service, each transaction is verified against
                  name, address and CVV numbers, your card is being removed from
                  our system after processing the transaction.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Image
                src={paymentImg}
                alt="Payment Options"
              />
            </div>
          </div>

          <div className="font-semibold product-page-payments mt-6 flex flex-col justify-center text-sm">
            <div className="social-info flex mt-4">
              <Link href={"https://www.facebook.com/gerdentusa/"}>
                <a
                  className="mr-3"
                  target="_blank"
                >
                  <Image
                    className={Styles.image}
                    src={FBLogo}
                    alt="facebook account"
                  />
                </a>
              </Link>
              <Link href={"https://twitter.com/Gerdentusa"}>
                <a
                  className="mr-3"
                  target="_blank"
                >
                  <Image
                    className={Styles.image}
                    src={TwLogo}
                    alt="twitter account"
                  />
                </a>
              </Link>
              <Link href={"https://www.linkedin.com/company/gerdentusa"}>
                <a
                  className="mr-3 linkedin"
                  target="_blank"
                >
                  <Image
                    className={Styles.image}
                    src={LiLogo}
                    alt="linkedin account"
                  />
                </a>
              </Link>
              <Link href={"https://www.instagram.com/gerdentusa"}>
                <a
                  className="mr-3"
                  target="_blank"
                >
                  <Image
                    className={Styles.image}
                    src={Insta}
                    alt="instagram account"
                  />
                </a>
              </Link>
              <Link
                href={
                  "https://www.youtube.com/channel/UCmNTSHQhI4xQRqHFvrHQiNg"
                }
              >
                <a
                  className="mr-3"
                  target="_blank"
                >
                  <Image
                    className={Styles.image}
                    src={YoutubeLogo}
                    alt="youtube account"
                  />
                </a>
              </Link>
              {/* <Link href={'https://www.pinterest.com/gerdentusa'}>
                        <a>
                            <Image className={styles.image} src={PinterestLogo} alt="pinterest account" />
                        </a>
                        </Link>
                    */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
