import { useContext } from "react";
import { MainContext } from "../../../contexts/MainContext";
import { ClickEventButton } from "../../../UIComponents/Button";
import BlogSection from "./BlogSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import styles from "./Blog.module.css";

const BlogList = (props: any) => {
  const { redirectTo } = useContext(MainContext);
  SwiperCore.use([Autoplay]);

  const redirectBtnFunc = () => {
    redirectTo("/blog");
  };

  return (
    <>
      <section className="blog pt-28">
        <div className="blog-container flex flex-col lg:flex-row width">
          <div className="blogs-wrapper flex flex-col items-center w-full">
            <h2 className="text-3xl text-center font-bold">Our Recent Blogs</h2>
            <div className="blogs-imgs-container grid grid-cols-1 sm:grid-cols-1 mt-12">
              <Swiper
                slidesPerView={4}
                spaceBetween={18}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{ delay: 3000 }}
                modules={[FreeMode, Pagination]}
                speed={500}
                loop={true}
                touchRatio={1.5}
                navigation={true}
                effect={"flip"}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                className={`${styles.blog} mySwiper blogSwiper`}
              >
                {props.Blogs.map((recentBlog: any, index: any) => (
                  <SwiperSlide key={index}>
                    <BlogSection
                      key={index}
                      blog={recentBlog}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <ClickEventButton
              text="All Blogs"
              eventFunction={redirectBtnFunc}
              classpara="primary-blue-bg read-all-blogs-btn"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
