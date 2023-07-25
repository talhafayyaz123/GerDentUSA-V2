import React from "react";
import Slider from "react-slick";
import ProductCarousel from "./ProductCarousel";


const ProductLike = (props: any) => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    
    return (
        <>
            <section className="product-page-related-products-container width">
                <div className="product-page-related-products-wrapper">
                    <div className="related-products-title text-2xl font-semibold">
                        Items You Might Like
                    </div>
                    <div className="related-products-carasoul w-full h-full mt-6">
                        <Slider {...settings}>
                            {
                                props.recommended_products.data.map((recommended_products: any) => <ProductCarousel key={recommended_products.id} recommended_products={recommended_products} />)
                            }
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductLike