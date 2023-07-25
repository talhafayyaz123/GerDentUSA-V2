import { useEffect } from "react";
import ProductPage from "../Product/ProductPage";

const Product = (props: any) => {

    useEffect(() => {
    }, [props])

    return (
        <>
            <link rel="stylesheet" href="/assets/css/slick.css" />
            <link rel="stylesheet" href="/assets/css/slick-theme.css" />

            {/* main content for product page */}
            {props.slug != undefined ? <ProductPage url={props.slug} view={props.view} /> : ''}
        </>
    );
};

export default Product;