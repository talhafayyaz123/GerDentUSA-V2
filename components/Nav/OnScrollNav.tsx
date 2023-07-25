import React, { useContext, useEffect } from "react";
import { gsap } from "gsap";
import { MainContext } from "../../contexts/MainContext";
import Link from "next/dist/client/link";
import OnScrollCatMenus from "./onScrollCatMenus";
import Image from "next/dist/client/image";
import SignInDropDown from "./SignInDropDown";
import SearchBar from "./SearchBar";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const OnScrollNav = (props: any) => {
  const { onScroll_Nav, setOnScrollNav, setIsLoading } = useContext(MainContext);

  const OpenCatMenu = () => {
    let allNavTl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    allNavTl
      .add(() => document.body.classList.add("body-height"))
      .set(".all-navigations-container", { autoAlpha: 1 })
      .fromTo(
        ".all-navigations-container .nav-categories-wrapper",
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
        }
      )
      .fromTo(
        ".all-navigations-container .nav-link-wrapper",
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
        },
        "<"
      )
      .from(".all-navigations-container .all-cat, .all-navigations-container .nav-categories-wrapper .nc-mega-menu-links-wrapper", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.075,
        ease: "power1",
      })

      .from(
        ".all-navigations-container .nav-link-wrapper li",
        {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          ease: "power1",
        },
        "<"
      );

    ScrollTrigger.matchMedia({
      "(min-width: 1280px)": function () {
        gsap.set(".all-navigations-container", { autoAlpha: 0 });
      },
      "(max-width: 1279px)": function () {
        gsap.set(".all-navigations-container", { autoAlpha: 0 });
        document.body.classList.remove("body-height");
      },
    });
  };

  const hideCatMenu = () => {
    gsap.to(".all-navigations-container", {
      autoAlpha: 0,
      duration: 0.3,
      onComplete: () => document.body.classList.remove("body-height"),
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const handleScroll = () => {
      if (window.scrollY > 200) {
        document.querySelector(".header-container.fixed")?.classList.add("header-reveal");
        if (onScroll_Nav == false) {
          setOnScrollNav(true);
        }
      } else {
        document.querySelector(".header-container.fixed")?.classList.remove("header-reveal");
        if (onScroll_Nav == true) {
          setOnScrollNav(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    gsap.set(".all-navigations-container", { autoAlpha: 0 });
  }, [onScroll_Nav]);

  return (
    <>
      <div className={`fixed top-0 left-0 header-container border-t border-b border-gray-300 border-solid bg-white top-0 left-0 w-full z-50 bg-white hidden ${onScroll_Nav == false ? "" : "header-reveal"}`}>
        <div className={`header-wrapper flex justify-between items-center width logo-bar width`}>
          <div className="first-logo logo flex items-center">
            <Link href={"/"}>
              <a className="cursor-pointer" onClick={() => setIsLoading(true)}>
                <Image layout="fixed" width={200} height={80} src="/assets/icons/logo.svg" alt="GerDentUSA" priority />
              </a>
            </Link>
            <ul className="hamburger all-navigations-icon mr-0 sm:ml-4 border-2 border-solid border-gray-300 rounded p-2 cursor-pointer" onClick={() => OpenCatMenu()}>
              <li className="first" />
              <li className="second" />
              <li className="third" />
            </ul>
          </div>
          {/* nav search bar */}
          <div className="input-container w-2/4">
            <div className="input-bg absolute w-screen h-screen top-0 left-0 z-50 hidden" />
            {onScroll_Nav == true && <SearchBar key={2} setClass={"input-wrapper flex items-center lite-blue-bg-color rounded-lg relative z-30"} IsSearchListPropup={props.IsSearchListPropup} setIsSearchListPropup={props.setIsSearchListPropup} />}
          </div>
          {/* cart- sign in */}
          <div className="cart-signin-wrapper flex justify-between items-center">
            {/* cart */}
            <div className="cart-icon-wrapper cursor-pointer" onClick={() => props.cartOpenBtnFunc()}>
              <div className="cart flex items-center">
                <div className="cart-icon relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="#bbb">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <div className="cart-quantity dark-blue-bg rounded-full w-4 h-4 absolute top-0 right-0 text-xs text-center text-white">{props.totalCartItems}</div>
                </div>
                <span className="ml-1">Cart</span>
              </div>
            </div>

            {/* sign in */}
            <SignInDropDown session={props.session} redirectTo={props.redirectTo} Logout={props.Logout} signInShow={props.signInShow} />
          </div>
        </div>
      </div>
      <div className={`all-navigations-container w-screen h-screen fixed top-0 left-0 z-50 flex`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 absolute top-6 cursor-pointer right-10 all-nav-close-btn z-10" viewBox="0 0 20 20" fill="#000" onClick={() => hideCatMenu()}>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        {/* nav categories links */}
        <div className="nav-categories-wrapper relative w-6/12 p-6 z-50">
          <div className="nav-categories-inner-container p-6">
            <div className="nav-categories-inner-wrapper flex flex-col shadow-lg h-full">
              <div className="font-semibold p-2 pl-4 text-lg text-white all-cat">Our Products</div>
              {/* mega menu */}
              {props.menuRecord.menu_categories != undefined
                ? props.menuRecord.menu_categories.map((menu: any) => {
                    return <OnScrollCatMenus key={menu.id} menu={menu} sub_categories={props.menuRecord.sub_categories[menu.id]} />;
                  })
                : ""}
            </div>
          </div>
        </div>
        <ul className="nav-link-wrapper flex flex-col w-6/12 bg-gray-300 p-6">
          <li className="mt-6 relative text-2xl w-max relative">
            <Link href={"/"}>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  setIsLoading(true);
                  hideCatMenu();
                }}
              >
                {" "}
                Home{" "}
              </a>
            </Link>
          </li>
          <li className="mt-6 relative text-2xl w-max relative">
            <Link href={"/all-instruments"}>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  setIsLoading(true);
                  hideCatMenu();
                }}
              >
                {" "}
                All Instruments{" "}
              </a>
            </Link>
          </li>
          <div className="mt-6 relative cursor-pointer mega-menu-links-container">
            <li className="mega-menu-links-wrapper-desk flex items-center w-max relative">
              <span className="mr-1 text-2xl w-max relative">About Us</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            </li>
            <div className="mega-menu-links-inner-wrapper flex flex-col absolute top-6 left-0 z-10 bg-white rounded-lg shadow-lg border border-gray-300 border-solid opacity-0 invisible">
              <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                <Link href={"/pages/about-us"}>
                  <a
                    className="cursor-pointer"
                    onClick={(e) => {
                      setIsLoading(true);
                      hideCatMenu();
                    }}
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </Link>
              </div>
              <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                <Link href={"/pages/our-mission"}>
                  <a
                    className="cursor-pointer"
                    onClick={(e) => {
                      setIsLoading(true);
                      hideCatMenu();
                    }}
                  >
                    {" "}
                    Our Mission{" "}
                  </a>
                </Link>
              </div>
              <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                <Link href={"/pages/payment-info"}>
                  <a
                    className="cursor-pointer"
                    onClick={(e) => {
                      setIsLoading(true);
                      hideCatMenu();
                    }}
                  >
                    {" "}
                    Payment Info{" "}
                  </a>
                </Link>
              </div>
              <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                <Link href={"/pages/shipping-and-returns"}>
                  <a
                    className="cursor-pointer"
                    onClick={(e) => {
                      setIsLoading(true);
                      hideCatMenu();
                    }}
                  >
                    {" "}
                    Shipping &amp; Returns{" "}
                  </a>
                </Link>
              </div>
              <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                <Link href={"/pages/condition-of-use"}>
                  <a
                    className="cursor-pointer"
                    onClick={(e) => {
                      setIsLoading(true);
                      hideCatMenu();
                    }}
                  >
                    {" "}
                    Condition Of Use{" "}
                  </a>
                </Link>
              </div>
              <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                <Link href={"/contacts"}>
                  <a
                    className="cursor-pointer"
                    onClick={(e) => {
                      setIsLoading(true);
                      hideCatMenu();
                    }}
                  >
                    {" "}
                    Contact Us{" "}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <li className="mt-6 relative cursor-pointer text-2xl w-max relative">
            <Link href={"/downloads"}>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  setIsLoading(true);
                  hideCatMenu();
                }}
              >
                {" "}
                Downloads{" "}
              </a>
            </Link>
          </li>
          <li className="mt-6 relative text-2xl w-max relative">
            <Link href={"/pages/videos"}>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  setIsLoading(true);
                  hideCatMenu();
                }}
              >
                {" "}
                Videos{" "}
              </a>
            </Link>
          </li>
          <li className="mt-6 relative text-2xl w-max relative">
            <Link href={"/blog"}>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  setIsLoading(true);
                  hideCatMenu();
                }}
              >
                {" "}
                Blogs{" "}
              </a>
            </Link>
          </li>
          <li className="mt-6 relative text-2xl w-max relative">
            <Link href={"/show-special/greater-ny-dental-meeting"}>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  setIsLoading(true);
                  hideCatMenu();
                }}
              >
                {" "}
                Show Special{" "}
              </a>
            </Link>
          </li>
          <li className="relative mt-6 text-2xl w-max relative">
            <Link href={"/trade-shows"}>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  setIsLoading(true);
                  hideCatMenu();
                }}
              >
                {" "}
                Trade Shows{" "}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OnScrollNav;
