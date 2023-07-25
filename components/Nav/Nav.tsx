import { useState } from "react";
import BelowNavigation from "../Menus/BelowNavigation";
import DesktopNav from "../Menus/DeskTopNavgation";
import { MainContext } from "../../contexts/MainContext";
import { useContext, useEffect } from "react";
import TopBar from "./TopBar";
import MegaMenu from "./MegaMenu";
import AddressNav from "./AddressNav";
import Link from "next/link";
import { SessionContext } from "../../contexts/SessionContext";
import Image from "next/dist/client/image";
import { gsap } from "gsap";
import HeaderCart from "../HeaderCart";
import SignIn from "../signin";
import OnScrollNav from "./OnScrollNav";
import { useRouter } from "next/router";
import SignInDropDown from "./SignInDropDown";
import SearchBar from "./SearchBar";
import Logo from "../../public/assets/icons/logo.svg";

const Nav = (props: any) => {
  const { isTopBar, setIsTopBar, onScroll_Nav, totalCartItems, setIsLoading } = useContext(MainContext);
  const { session, destroySession, setSession } = useContext(SessionContext);
  const [IsSearchListPropup, setIsSearchListPropup] = useState(false);

  const router = useRouter();

  const topBarCloseFunc = async () => {
    setIsTopBar(0);
    await localStorage.setItem("rm_topBar", "Y");
  };

  const ncOpenBtnFunc = () => {
    let ncOpener: any = document.querySelector(".nav-categories-inner-wrapper.nav"),
      ncWrapper = document.querySelector(".nav-categories-wrapper.nav");

    document.body.classList.add("body-height");
    let ncTl = gsap.timeline();
    ncTl
      .set(ncWrapper, { autoAlpha: 1 })
      .fromTo(
        ncWrapper,
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          ease: "expo.in",
        }
      )
      .fromTo(
        ncOpener,
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          ease: "expo.out",
        },
        "<0.5"
      )
      .fromTo(
        ncOpener.querySelectorAll(".nc-mega-menu-links-container"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.05,
        },
        "<80%"
      );
  };

  const ncCloseBtnFunc = (e: any) => {
    let ncCloseBtn = document.querySelectorAll(".nav-categories-inner-container.nav, .nc-close-btn, .nc-close-btn path, .nc-mega-menu-links-wrapper, .nc-mega-menu-link a"),
      ncWrapper = document.querySelector(".nav-categories-wrapper.nav");

    ncCloseBtn.forEach((btn) => {
      if (e.target === btn) {
        gsap.to(ncWrapper, { autoAlpha: 0, duration: 0.3, onComplete: () => document.body.classList.remove("body-height") });
      }
    });
  };

  const cartOpenBtnFunc = () => {
    let cartContainer = document.querySelector(".cart-container"),
      cartWrapper = document.querySelector(".cart-container-wrapper");

    document.body.classList.add("body-height");
    let cartTl = gsap.timeline();
    cartTl
      .set(cartContainer, { autoAlpha: 1 })
      .fromTo(
        cartContainer,
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          ease: "expo.in",
        }
      )
      .fromTo(
        cartWrapper,
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          ease: "expo.out",
        },
        "<0.5"
      );
  };

  const signInShow = () => {
    let signInUpContainer = document.querySelector(".sign-in-up-container");

    document.body.classList.add("body-height");
    let signContOpenTl = gsap.timeline();
    signContOpenTl
      .set(signInUpContainer, { autoAlpha: 1 })
      .fromTo(
        signInUpContainer,
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          ease: "expo.inOut",
        }
      )
      .from(
        ".sign-in-up-wrapper",
        {
          autoAlpha: 0,
          scale: 0.85,
          ease: "back(2)",
        },
        "<90%"
      );
  };

  const Logout = async () => {
    await destroySession();
    await setSession(undefined);
    router.push("/");
  };

  const removeOverlay = (e: any) => {
    var searchCloseBtn = document.querySelectorAll(".input-bg, .mob-search-bar-container");

    searchCloseBtn.forEach((btn) => {
      if (e.target === btn) {
        document.body.classList.remove("body-height");
        setIsSearchListPropup(false);
      }
    });
  };

  useEffect(() => {
    const mainManu = async () => {
      try {
        let rm_topbar = localStorage.getItem("rm_topBar");
        if (rm_topbar == null) {
          await setIsTopBar(1);
        } else {
          await setIsTopBar(0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    mainManu();

    gsap.set(".nav-categories-wrapper.nav, .sign-in-up-container, .cart-container", { autoAlpha: 0 });
  }, [onScroll_Nav]);

  return (
    <>
      <OnScrollNav
        session={session}
        signInShow={signInShow}
        Logout={Logout}
        cartOpenBtnFunc={cartOpenBtnFunc}
        totalCartItems={totalCartItems}
        IsSearchListPropup={IsSearchListPropup}
        setIsSearchListPropup={setIsSearchListPropup}
        menuRecord={props.menuRecord}
      />
      <header className="top-0 left-0 z-20 w-full bg-white border-b border-solid border-gray-300">
        <div className="header-inner-container flex flex-col">
          {/* top bar*/}
          <TopBar isTopBar={isTopBar} topBarCloseFunc={topBarCloseFunc} />
          {/* top bar ends here */}

          {/* logo nav bar */}
          <div className="header-container border-b border-gray-300 border-solid hidden">
            <div className="header-wrapper flex justify-between items-center width logo-bar width">
              <div className="first-logo logo">
                <Link href="/">
                  <a className="cursor-pointer" onClick={() => setIsLoading(true)}>
                    <Image src={Logo} alt="GerDentUSA" priority />
                  </a>
                </Link>
              </div>
              {/* nav search bar */}
              <div className="input-container w-2/4">
                <div className={`input-bg fixed w-screen h-screen top-0 left-0 z-20 ${!IsSearchListPropup ? "hidden" : ""}`} onClick={(e) => removeOverlay(e)} />
                {onScroll_Nav == false && <SearchBar key={1} setClass={"input-wrapper flex items-center lite-blue-bg-color rounded-lg relative z-30"} IsSearchListPropup={IsSearchListPropup} setIsSearchListPropup={setIsSearchListPropup} />}
              </div>
              {/* cart- sign in */}
              <div className="cart-signin-wrapper flex justify-between items-center">
                {/* cart */}
                <div className="cart-icon-wrapper cursor-pointer" onClick={() => cartOpenBtnFunc()}>
                  <div className="cart flex items-center">
                    <div className="cart-icon relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="#bbb">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <div className="cart-quantity dark-blue-bg rounded-full w-4 h-4 absolute top-0 right-0 text-xs text-center text-white">{totalCartItems}</div>
                    </div>
                    <span className="ml-1">Cart</span>
                  </div>
                </div>

                {/* sign in */}
                <SignInDropDown session={session} setIsLoading={setIsLoading} Logout={Logout} signInShow={signInShow} />
              </div>
            </div>
          </div>
          {/* third nav bar */}
          <nav className="flex justify-between">
            <div className="nav-wrapper text-gray-600 flex justify-between items-center py-1 sm:py-2 lg:py-4 width">
              <div className="nav-categories-container mr-0 sm:mr-6 z-100 relative">
                <div className="nc-icon-wrapper nav cursor-pointer flex items-center border rounded border-gray-300 border-solid p-2 sm:p-3" onClick={() => ncOpenBtnFunc()}>
                  <ul className="hamburger">
                    <li className="first" />
                    <li className="second" />
                    <li className="third" />
                  </ul>
                  <div className="n-c font-bold text-black hidden ml-0 sm:ml-4">Our Products</div>
                </div>
              </div>
              <div className="first-logo tb-logo logo hidden">
                <Link href="/">
                  <a className="cursor-pointer">
                    <Image src={Logo} alt="GerDentUSA" priority />
                  </a>
                </Link>
              </div>
              {/* nav categories links */}
              <div className={`nav-categories-wrapper nav fixed top-0 left-0 w-screen z-50`} onClick={(e) => ncCloseBtnFunc(e)}>
                <div className="nav-categories-inner-container nav overflow-y-scroll h-screen">
                  <div className={`nav-categories-inner-wrapper nav flex flex-col shadow-lg h-auto bg-gray-100 z-30 relative`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 nc-close-btn relative cursor-pointer self-end m-2 sm:m-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => ncCloseBtnFunc(e)}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* mega menu */}
                    {props.menuRecord.menu_categories != undefined
                      ? props.menuRecord.menu_categories.map((menu: any) => {
                          return <MegaMenu ncCloseBtnFunc={ncCloseBtnFunc} key={menu.id} menu={menu} sub_categories={props.menuRecord.sub_categories[menu.id]} />;
                        })
                      : ""}
                  </div>
                </div>
              </div>
              {/* mega menu ends here */}
              {/* navigation links for desktop */}
              <DesktopNav />
              {/* delivery address */}
              <AddressNav setIsLoading={setIsLoading} signInShow={signInShow} />
            </div>
          </nav>
        </div>
      </header>
      <BelowNavigation cartOpenBtnFunc={cartOpenBtnFunc} signInShow={signInShow} setIsSearchListPropup={setIsSearchListPropup} IsSearchListPropup={IsSearchListPropup} />
      <SignIn />
      <HeaderCart />
    </>
  );
};

export default Nav;
