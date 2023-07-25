import { useContext, useEffect } from "react";
import { MainContext } from "../../../contexts/MainContext";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import styles from "./Product.module.css";

const ProductList = (props: any) => {
  SwiperCore.use([Autoplay]);

  const { setIsLoading } = useContext(MainContext);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <>
      <section className="featured-products py-28 bg-gray-100">
        <div className="featured-products-wrapper width flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center">
            Our Featured Products
          </h2>

          <div className="featured-products-imgs-container mt-10 w-full">
            <Swiper
              slidesPerView={5}
              spaceBetween={12}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{ delay: 3000 }}
              speed={500}
              loop={true}
              navigation={true}
              modules={[FreeMode, Pagination]}
              className={`${styles.product} mySwiper productSwiper`}
            >
              {props.Products.data.map((product: any) => (
                <SwiperSlide key={product.id}>
                  <Product
                    key={product.id}
                    product={product}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
