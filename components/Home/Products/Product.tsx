import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ImagePath } from "../../../lib/constants";
import { MainContext } from "../../../contexts/MainContext";
import Image from "next/dist/client/image";
import { MessageContext } from "../../../contexts/MessageContext";
import { gsap } from "gsap";

const Product = (props: any) => {
  const {
    redirectTo,
    addToCart,
    totalCartItems,
    setTotalCartItems,
    countTotalCartSum,
    getProductQty,
    className,
  } = useContext(MainContext);
  const { setAlert } = useContext(MessageContext);

  const [qty, setQty] = useState(0);
  // const [proQty, setProQty] = useState(getProductQty(props.product.id))

  const addCart = async (product: any, qtyNum: any = 0, type = "add") => {
    let quantity = qty;
    let alertType = "info";
    let alertMsg = "";
    if (type == "add") {
      quantity = quantity + qtyNum;
      alertMsg = "Item added in cart";
    }

    if (type == "sub") {
      quantity = quantity - qtyNum;
      alertType = "danger";
      alertMsg = "Item removed from cart";
    }
    if (quantity >= 0) {
      await addToCart(product, qtyNum, type);
      await countTotalCartSum();
      let currentProductQty = await getProductQty(product.id);
      await setQty(currentProductQty);
      await setAlert({
        type: alertType,
        display: true,
        message: alertMsg,
      });
      gsap.timeline().fromTo(
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
    }
  };

  const price =
    props.product.price_discounted != null &&
    props.product.price_discounted != 0 ? (
      <>
        <span className="new-price mr-2 font-bold">
          ${props.product.price_discounted}
        </span>
        <span className="old-price text-xs text-red-400 line-through">
          ${props.product.price_catalog}
        </span>
      </>
    ) : (
      <span className="new-price mr-2 font-bold">
        ${props.product.price_catalog}
      </span>
    );

  const ProductClickFunc = async (e: any) => {
    e.preventDefault();
    let productContainer: any = document.querySelector(".featured-product"),
      productImgWrapper: any = document.querySelector(
        ".featured-products-img-wrapper"
      ),
      productImgWrapperImg: any = document.querySelector(
        ".featured-products-img-wrapper img"
      ),
      AddIcon: any = document.querySelector("svg.add_to_Cart"),
      AddIconPath: any = document.querySelector("svg.add_to_Cart path");
    console.log(e.target.classList[1]);
    if (e.target.classList[1] == "featured-product") {
      redirectTo(`/${props.product.slug}`);
    }

    // when clicking on plus sign
    if (
      e.target.classList.value === AddIcon.classList.value ||
      e.target.getAttribute("d") === AddIconPath.getAttribute("d")
    ) {

      if (e.target.classList.value === AddIcon.classList.value) {

        e.target.nextSibling.classList.toggle("hidden");
        e.target.nextSibling.classList.toggle("flex");
      } else if (e.target.getAttribute("d") === AddIconPath.getAttribute("d")) {
      
        e.target.parentElement.nextSibling.classList.toggle("hidden");
        e.target.parentElement.nextSibling.classList.toggle("flex");
      }
    }
  };

  useEffect(() => {
    const getCurrentQty = async () => {
      let currentQty = await getProductQty(props.product.id);
      await setQty(currentQty);
    };
    getCurrentQty();
  }, [props.product]);

  return (
    <Link href={`/${props.product.slug}`}>
      <a
        className="featured-product relative shadow-lg rounded-lg bg-white flex flex-col p-4 cursor-pointer"
        onClick={(e) => ProductClickFunc(e)}
      >
        {props.product.price_discounted != null &&
        props.product.price_discounted != 0 ? (
          <div className="sale-notify absolute top-4 left-4 uppercase text-xs dark-blue-bg w-max text-white rounded-full px-2 py-1 font-bold tracking-widest z-10">
            Sale
          </div>
        ) : (
          ""
        )}
        <div className="featured-products-img-wrapper flex justify-center featured-product-img productImage">
          <Image
            layout="intrinsic"
            width={200}
            height={200}
            src={`${ImagePath}${
              props.product.files.length > 0 &&
              props.product.files[0].cf_image_id
            }/medium`}
            alt={props.product.files.length > 0 && props.product.name}
            blurDataURL={`${ImagePath}${
              props.product.files.length > 0 &&
              props.product.files[0].cf_image_id
            }/medium`}
            placeholder="blur"
            lazyBoundary="400px"
          />
        </div>
        <style jsx>{`
          .productImage {
            padding-left: 25%;
          }
        `}</style>

        <div className="add-icon-wrapper relative z-10 self-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 relative self-end cursor-pointer z-10 add_to_Cart"
            fill="#52A0F2"
            viewBox="0 0 24 24"
            stroke="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              className="addBtn"
            />
          </svg>
          <div className="add-minus-qty-wrapper bg-white shadow-lg rounded-full text-black border border-solid border-gray-300 absolute top-full right-0 hidden">
            <div
              id="quanity-minus"
              className="quantity quanity-minus py-2 px-3.5 text-normal hover:bg-gray-100 rounded-l-full cursor-pointer"
              onClick={(e) => addCart(props.product, 1, "sub")}
            >
              -
            </div>
            <input
              name="product-quantity"
              id={`product-quantity${props.product.id}`}
              type="text"
              min={1}
              size={4}
              className="hover:bg-gray-100 text-center bg-white inline-block"
              value={qty}
              onChange={(e) => addCart(props.product, 1, "change")}
            />
            <div
              id="quanity-add"
              className="quantity quanity-add py-2 px-3 text-normal hover:bg-gray-100 rounded-r-full cursor-pointer"
              onClick={(e) => addCart(props.product, 1, "add")}
            >
              +
            </div>
          </div>
        </div>
        <div className="feature-product-detail-wrapper">
          <div className="price flex mt-4">{price}</div>
          <div className="product-description leading-snug mt-4">
            {props.product.name}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Product;
