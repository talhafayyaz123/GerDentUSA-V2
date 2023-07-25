import React from "react";
import Link from "next/link";
import { FaArrowCircleUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import Style from "./footer.module.css";

const BottomFooter = () => {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 1500) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="copy-right-wrapper w-full bg-white text-sm text-center mt-10 h-20 flex items-center justify-center mb-20 lg:mb-0">
      <div className="copy-right">
        Copyright © 2021
        <span>
          &nbsp;
          <Link href="/">
            <a className="border-b border-black border-solid">
              GerDentUSA.com.
            </a>
          </Link>
          &nbsp;
        </span>
        All Right Reserved.
      </div>
      <FaArrowCircleUp
        className={`${Style.scrollTop}`}
        onClick={scrollTop}
        style={{
          height: 40,
          left: "45%",
          display: showScroll ? "flex" : "none",
        }}
      />
    </div>
  );
};

export default BottomFooter;
