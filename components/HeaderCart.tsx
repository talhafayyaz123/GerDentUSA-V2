import { MainContext } from "../contexts/MainContext";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../lib/constants";
import Image from "next/dist/client/image";
import { gsap } from "gsap";

const HeaderCart = (props: any) => {
  const {
    cart,
    countTotalCartSum,
    redirectTo,
    removeCompleteCart,
    getCartTotalCounts,
    cartTotals,
  } = useContext(MainContext);

  const [subTotal, setSubTotal] = useState(0);

  const hidCartFunc = (e: any) => {
    let cartCloseBtn = document.querySelectorAll(
        ".cart-container, .cart-close-btn, .cart-close-btn path, .cart-proceed-btn"
      ),
      cartContainer = document.querySelector(".cart-container"),
      cartInner = document.querySelector(".cart-item-quantity-wrapper");

    cartCloseBtn.forEach((btn) => {
      if (e.target === btn) {
        gsap.to(cartContainer, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => document.body.classList.remove("body-height"),
        });
      }
    });
  };

  const redirectToCart = (e: any, url: any) => {
    hidCartFunc(e);
    redirectTo(url);
  };

  const addCartQty = async (e: any, index: any) => {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    await getCartTotalCounts();
    countTotalCartSum();
  };

  const removeCartQty = async (e: any, index: any) => {
    if (cart[index].quantity == 1) {
      cart.splice(index, 1);
      if (cart.length == 0) {
        removeCompleteCart();
      }
    } else {
      cart[index].quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    await getCartTotalCounts();
    countTotalCartSum();
  };

  const countSubTotal = () => {
    if (cart.length > 0) {
      let subTotalCount = 0;
      cart.map((cartItem: any) => {
        subTotalCount += cartItem.quantity * cartItem.price;
      });
      setSubTotal(subTotalCount);
    } else {
      setSubTotal(0);
    }
  };

  useEffect(() => {}, [cart]);

  return (
    <div
      className={`cart-container bg-gray-100 fixed top-0 right-0 w-screen h-screen z-50 flex justify-end`}
      onClick={(e) => hidCartFunc(e)}
    >
      <div
        className={`cart-container-wrapper bg-white shadow-lg relative overflow-x-hidden overflow-y-scroll bg-white`}
      >
        <div className="cart-container-inner-wrapper flex flex-col justify-between w-full h-full">
          <h2 className="text-2xl font-semibold p-2 sm:p-4 border-b border-gray-300 border-solid flex justify-between items-center">
            <span>Shopping Cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer cart-close-btn"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={(e) => hidCartFunc(e)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </h2>
          <div className="cart-items-container h-full overflow-hidden overflow-y-scroll">
            {cart.length > 0 ? (
              cart.map((cartItem: any, index: any) => {
                return (
                  <div
                    key={index + 1}
                    className="cart-item flex items-center justify-between py-2 border-b border-solid border-gray-300"
                  >
                    <div className="mr-2">
                      <Image
                        layout="intrinsic"
                        width={200}
                        height={200}
                        src={`${BASE_URL}up_data/products/images/medium/${cartItem.attributes.image}`}
                        alt="cart-product"
                      />
                    </div>
                    <div className="flex flex-col text-gray-600 text-xs sm:text-sm">
                      <span className="cart-item-description">
                        {cartItem.name}
                      </span>
                      <span className="cart-item-sku dark-blue-color mt-2">
                        {cartItem.attributes.sku}
                      </span>
                      <span className="cart-item-quantity-wrapper mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 inline cursor-pointer minus"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#aaa"
                          onClick={(e) => removeCartQty(e, index)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="cart-item-quantity mx-2">
                          {cartItem.quantity}
                        </span>
                        <a
                          className="cursor-pointer"
                          onClick={(e) => addCartQty(e, index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 inline cursor-pointer plus"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#aaa"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </a>
                      </span>
                    </div>
                    <div className="cart-item-price font-semibold mr-1 cartHeader">
                      ${cartItem.price}
                    </div>
                    <style jsx>{`
                      .cartHeader {
                        position: relative;
                        right: 15px;
                      }
                    `}</style>
                  </div>
                );
              })
            ) : (
              <div className="cart-item flex items-center justify-center p-5 border-b border-solid border-gray-200">
                {" "}
                Your cart is empty!
              </div>
            )}
          </div>
          {cart.length > 0 ? (
            <div className="subtotal-detail-wrapper border-t border-solid border-gray-300 w-full h-max p-2 sm:p-4">
              <h3 className="text-lg flex justify-between items-center font-semibold checkout">
                <span>Subtotal</span>
                <span>${cartTotals.subTotal}</span>
              </h3>
              <div className="cart-notice mt-4 text-sm text-gray-600">
                Final price and discounts will be determined at the time of
                payment processing.
              </div>
              <style jsx>{`
                .checkout {
                  padding-right: 17px;
                }
              `}</style>
              <a
                className="cart-proceed-btn"
                onClick={(e) => redirectToCart(e, "/cart")}
              >
                <button className="cart-proceed-btn btn w-full px-8 py-4 dark-blue-bg text-white rounded-full shadow-lg mt-4 inline-block text-center relative">
                  Proceed To Checkout
                </button>
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
