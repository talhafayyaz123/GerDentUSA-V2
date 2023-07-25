import React from "react";
import Detail from "./Detail";
import ProductLike from "./ProductLike";
import ReviewsSection from "./ReviewsSection";
import { useEffect } from "react";
import Breadcrumb from "../../UIComponents/Breadcrumb";


const ProductPage = (props: any) => {
  useEffect(() => {}, [props]);

  return (
    <>
      <Breadcrumb data={props.view.product} />
      <div className="Categoery-page relative">
        <div className="product-page-container mb-28 mt-14">
          <div className="product-page-wrapper">
            {props.view.product != undefined ? (
              <Detail
                product={props.view.product}
                product_categories={props.view.product_categories}
                images={props.view.images}
                sub_products={props.view.sub_products}
              />
            ) : (
              ""
            )}

            {/* product details and reviews section */}
            {props.view.product != undefined ? (
              <ReviewsSection product={props.view.product} />
            ) : (
              ""
            )}

            {/* related products */}
            {props.view.recommended_products != undefined ? (
              <ProductLike
                recommended_products={props.view.recommended_products}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
