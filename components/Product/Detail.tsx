import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, ImagePath } from "../../lib/constants";
import { MainContext } from "../../contexts/MainContext";
import ProductCategory from "../Home/Products/ProductCategory";
import RightSection from "../Home/Products/RightSection";
import Image from "next/dist/client/image";
import { gsap } from "gsap";
import Styles from "./Product.module.css";
import { MessageContext } from "../../contexts/MessageContext";
import Head from "next/head";
import ReactStars from "react-stars";
const Detail = (props: any) => {
  // const image = `${BASE_URL}up_data/products/images/medium/${props.product.image}`
  const image =
    props.images.length > 0
      ? `${ImagePath}${props.images[0].cf_image_id}/medium`
      : `${BASE_URL}up_data/products/images/medium/${props.product.image}`;
  const lgImage =
    props.images.length > 0
      ? `${ImagePath}${props.images[0].cf_image_id}/large`
      : `${BASE_URL}up_data/products/images/large/${props.product.image}`;

  const [Qty, setQty] = useState(1);
  const { addToCart, totalCartItems, setTotalCartItems, setIsLoading } =
    useContext(MainContext);
  const { setAlert } = useContext(MessageContext);

  const changeQty = (qtyValue: any) => {
    setQty(Number(qtyValue));
  };

  const decrementQty = () => {
    if (Qty > 1) {
      setQty(Qty - 1);
    }
  };

  const addCart = async (product: any, qty: number) => {
    await addToCart(product, qty);
    await setTotalCartItems(totalCartItems + Number(qty));

    await setAlert({
      type: "info",
      display: true,
      message: "Item added in cart",
    });

    cartOpenBtnFunc();
  };

  const showImageFunc = () => {
    document.body.classList.add("body-height");

    let enlargedImgContainer = document.querySelector(
        ".enlarged-img-container"
      ),
      enlargedImgWrapper: any = document.querySelector(".enlarged-img-wrapper");

    let enlargeImgTl = gsap.timeline();
    enlargeImgTl
      .set(enlargedImgContainer, { autoAlpha: 1 })
      .fromTo(
        enlargedImgContainer,
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          ease: "expo.inOut",
        }
      )
      .from(
        enlargedImgWrapper,
        {
          scale: 0.75,
          autoAlpha: 0,
          ease: "back(2)",
        },
        "<90%"
      )
      .from(
        enlargedImgWrapper.querySelectorAll(".product-img-gallery div"),
        {
          scale: 0.5,
          autoAlpha: 0,
          ease: "back(2)",
          stagger: 0.1,
        },
        "<90%"
      );
  };

  const hideImageFunc = (e: any) => {
    let enlargedImgContainer = document.querySelector(
        ".enlarged-img-container"
      ),
      closeEnlargedImgContainer = document.querySelectorAll(
        ".enlarged-img-container, .enlarged-close-btn, .enlarged-close-btn path"
      );

    closeEnlargedImgContainer.forEach((btn) => {
      if (e.target === btn) {
        gsap.to(enlargedImgContainer, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => document.body.classList.remove("body-height"),
        });
      }
    });
  };

  const replacingImageGalllary = (e: any) => {
    let productImg = document.querySelectorAll(
      ".enlarged-img-wrapper .popup-img img, .product-img-wrapper img"
    );

    let clickedImgSrc = e.target.getAttribute("src");
    let clickedImgSrcSet = e.target.getAttribute("srcset");
    productImg.forEach((img: any) => {
      img.src = clickedImgSrc.replaceAll("thumbnail", "large");
      img.srcset = clickedImgSrcSet.replaceAll("thumbnail", "large");
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
      )
      .fromTo(
        ".alert-show",
        {
          xPercent: -50,
          autoAlpha: 0,
        },
        {
          xPercent: 0,
          ease: "back(2)",
          autoAlpha: 1,
          onComplete: () => {
            gsap.to(".alert-show", {
              xPercent: -50,
              autoAlpha: 0,
              duration: 0.3,
              delay: 2,
            });
          },
        },
        "<90%"
      );
  };

  useEffect(() => {
    setIsLoading(false);
    gsap.set(".enlarged-img-container", { autoAlpha: 0 });
    setQty(1);
    console.log(333);
  }, [setIsLoading]);

  return (
    <>
      <Head>
        <title>{`${props.product.meta_title}`}</title>
        <meta
          name="description"
          content={props.product.meta_description}
        />
        <meta
          name="keywords"
          content={props.product.meta_keywords}
        />
      </Head>
      <section className="product-page-product-wrapper width grid grid-cols-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:gap-x-6 justify-items-center w-full">
        <div className="product-page-left-col w-full flex flex-col items-center col-span-1 overflow-hidden">
          <div className="product-img-container cursor-pointer">
            <div
              className="product-img-wrapper relative overflow-hidden"
              onClick={() => showImageFunc()}
            >
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  layout="responsive"
                  width={400}
                  height={400}
                  className=""
                  src={image}
                  alt={props.product.name}
                  blurDataURL={image}
                  placeholder="blur"
                  priority
                  lazyBoundary="400px"
                />
              </div>
            </div>
            <div className="enlarge-img-wrapper flex justify-center items-center cursor-pointer text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#151515"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-sm">click to see the large image</p>
            </div>
            {props.images.length > 1 && (
              <div className="product-img-gallery mt-4">
                <div className="product-img-gallary-wrapper grid grid-cols-5 gap-2">
                  {props.images.map((img: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="opacity-60 border border-solid border-gray-300 sm-img"
                      >
                        <Image
                          layout="responsive"
                          width={50}
                          height={50}
                          src={`${ImagePath}${img.cf_image_id}/thumbnail`}
                          alt=""
                          onClick={(e) => replacingImageGalllary(e)}
                          lazyBoundary="400px"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div
            className={`enlarged-img-container flex justify-center items-center fixed top-0 left-0 w-screen h-screen z-50 cursor-pointer overflow-hidden flex justify-center items-center`}
            onClick={(event) => hideImageFunc(event)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 enlarged-close-btn absolute top-5 right-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ffffff"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div
              className={`enlarged-img-wrapper justify-center w-10/12 lg:w-7/12 bg-white flex flex-col md:flex-row m-8 p-4 rounded shadow-lg ${
                props.images.length > 1 ? "" : Styles.enlargedImg
              }`}
            >
              <div
                className={`h-auto w-full md:w-8/12 ${Styles.popUpImg} popup-img`}
              >
                <Image
                  layout="responsive"
                  width={400}
                  height={400}
                  src={lgImage}
                  alt={props.product.name}
                  lazyBoundary="400px"
                />
              </div>
              {props.images.length > 1 && (
                <div className="product-img-gallery mt-4 w-full md:w-4/12">
                  <div className="gallery-product-title text-lg my-4 font-semibold">
                    Dental Extraction Kit
                  </div>
                  <div className="product-img-gallary-wrapper grid grid-cols-5 gap-4">
                    {props.images.map((img: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="opacity-60 border border-solid border-gray-300"
                        >
                          <Image
                            layout="responsive"
                            width={50}
                            height={50}
                            src={`${ImagePath}${img.cf_image_id}/thumbnail`}
                            alt={props.product.name}
                            onClick={(e) => replacingImageGalllary(e)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="product-page-center-col flex flex-col mt-10 md:mt-0 md:col-span-2 lg:col-span-3 w-full md:pl-8">
          <h2 className="product-title text-3xl font-bold leading-normal">
            {props.product.name}
          </h2>

          <div className="product-sku font-semibold mt-6">
            SKU:
            <span className="sku ml-2 dark-blue-color">
              {props.product.sku}
            </span>
          </div>
          <div className="availability-wrapper mt-6 font-semibold">
            Availability:{" "}
            <span className="stock ml-2 dark-blue-color">In Stock</span>
          </div>
          <div className="product-sku font-semibold mt-6">
            <ReactStars
              count={5}
              size={22}
              color1={"#FFCC00"}
            />
          </div>
          <div
            className="product-description text-gray-600 mt-6 leading-normal"
            dangerouslySetInnerHTML={{
              __html: props.product.short_description,
            }}
          ></div>
          {props.product.price_discounted != "" &&
          props.product.price_discounted != 0 &&
          props.product.price_discounted != null ? (
            <>
              <div className="border-gray-300 border-solid border-t dark-blue-color font-bold mt-10 mt-2 pt-10 text-2xl">
                ${props.product.price_discounted}
              </div>
              <div className="font-bold line-through old-price text-lg text-red-400">
                ${props.product.price_catalog}
              </div>
            </>
          ) : (
            <div className="border-gray-300 border-solid border-t dark-blue-color font-bold mt-10 mt-2 pt-10 text-2xl">
              ${props.product.price_catalog}
            </div>
          )}
          <div className="product-quantity-wrapper mt-6 flex items-center">
            <div className="mr-6">Quantity</div>

            <button
              className="dark-blue-bg text-white py-2 px-2 font-bold sm:mr-6 relative"
              onClick={() => decrementQty()}
            >
              -
            </button>
            <input
              type="text"
              min={1}
              maxLength={2}
              className="p-2 w-2/12 border-gray-300 border-solid border rounded mr-6"
              defaultValue={Qty}
              value={Qty}
              onChange={(e) => changeQty(e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <button
              className="dark-blue-bg text-white py-2 px-2 font-bold sm:mr-6 relative"
              onClick={() => setQty((prevCount) => prevCount + 1)}
            >
              +
            </button>
          </div>
          <div className="button-wrapper flex flex-col sm:flex-row mt-6">
            <button
              className="add-cart-btn dark-blue-bg text-white py-4 px-8 rounded-full shadow-lg cursor-pointer w-max font-bold sm:mr-6 relative"
              onClick={() => addCart(props.product, Qty)}
            >
              Add To Cart
            </button>
            {/* <button className="buy-now-btn dark-blue-bg text-white py-4 px-12 rounded-full shadow-lg cursor-pointer w-max font-bold mt-4 sm:mt-0 relative">
                            Buy Now
                        </button> */}
          </div>

          <div className="category-name mt-6 text-sm">
            Categories:
            <span>
              {props.product_categories.map(
                (product_categorie: any, index: any) => (
                  <ProductCategory
                    key={index}
                    product_categorie={product_categorie}
                  />
                )
              )}
            </span>
          </div>
          <div className="notice lite-blue-bg-color p-4 text-gray-600 rounded-lg text-sm mt-6">
            <p className="leading-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#333"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
              &nbsp; All instruments are for Human Dental use only, if looking
              for Veterinary Instruments, please visit &nbsp;
              <a
                className="border-b border-solid border-black primary-blue-color"
                href="https://www.gervetusa.com/"
              >
                GerVetUSA.com
              </a>
              , for Human Surgical Instruments please visit &nbsp;
              <a
                className="border-b border-solid border-black primary-blue-color"
                href="https://www.germedusa.com/"
              >
                GerMedUSA.com
              </a>
              .
            </p>
          </div>
        </div>
        <RightSection />
      </section>
      {/* <Alerts display={alert.display} type={alert.type} message={alert.message} /> */}
    </>
  );
};

export default Detail;
