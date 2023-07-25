import ReviewSection from "./ReviewSection";
import ShippingAndReturns from "./ShippingAndReturns";
import Style from "../Product/ReviewsSection.module.css";
import { useState } from "react";

const ReviewsSection = (props: any) => {
  const [Section, setSection] = useState(1);
  return (
    <>
      <section className="product-detail-reviews bg-white sm-width my-14">
        <div className="product-detail-reviews-wrapper bg-gray-100 py-6 px-4 sm:px-14 rounded-lg">
          <div className="product-detail-review-title flex w-full justify-center text-lg sm:text-2xl font-semibold border-b border-solid border-gray-300 pb-4">
            <h2
              className={`mr-10 pb-2 cursor-pointer description-btn ${
                Section == 1 && "dark-blue-color"
              }`}
              onClick={() => setSection(1)}
            >
              Description
            </h2>
            <h2
              className={`pb-2 cursor-pointer reviews-btn ${
                Section == 2 && "dark-blue-color"
              }`}
              onClick={() => setSection(2)}
            >
              Reviews
            </h2>
            &nbsp; &nbsp; &nbsp;{" "}
            <h2
              className={`pb-2 cursor-pointer shipping-btn ${
                Section == 3 && "dark-blue-color"
              }`}
              onClick={() => setSection(3)}
            >
              Shipping & Returns
            </h2>
          </div>

          <div
            className={`${Style.productDetail} mt-14 ${
              (Section == 2 || Section == 3) && "hidden"
            }`}
            dangerouslySetInnerHTML={{ __html: props.product.full_description }}
          ></div>
          <ReviewSection showSection={Section == 2 ? true : false} />

          <ShippingAndReturns showSection={Section == 3 ? true : false} />
        </div>
      </section>
    </>
  );
};

export default ReviewsSection;
