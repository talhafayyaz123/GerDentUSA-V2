import { useEffect } from "react";
import { BASE_URL } from "../../lib/constants";
import Breadcrumb from "../../UIComponents/Breadcrumb";
import Style from "../Blogs/SingleBlogDetail.module.css";
import RecentBlog from "./RecentBlog";
import RelatedBlogPost from "./RelatedBlogPost";
import Image from "next/dist/client/image";
import SocialInks from "../Social/Links";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
//import styles from "./Product.module.css";

const SingleBlogDetail = (props: any) => {
  useEffect(() => {}, []);

  const date = new Date(
    props.blog.post != undefined && props.blog.post.created_at
  );

  const data = { name: `${props.blog.breadcrumbs}` };

  return (
    <>
      <Breadcrumb data={data} />

      {props.blog.post != undefined && (
        <div className="mb-28 mt-14 relative width flex flex-col lg:flex-row">
          <div className="blog-container leading-normal text-gray-600 lg:w-9/12 lg:mr-16">
            <h2 className="text-3xl font-bold blog-title text-black leading-snug">
              {props.blog.post.heading_content}
            </h2>
            <div className="mt-4 text-gray-600 font-semibold font-bold">
              Posted On:
              <span className="blog-date">
                {" "}
                {date.toLocaleString("default", { month: "long" })}{" "}
                {date.getDate()},{date.getFullYear()}
              </span>
            </div>

            <div className="mt-1 text-gray-600 font-semibold font-bold">
              <span className="blog-date">
                <SocialInks />
              </span>
            </div>

            <div className="mt-4">
              <Image
                src={`${BASE_URL}up_data/blog/${props.blog.post.image}`}
                layout="responsive"
                width={900}
                height={479}
                alt={props.blog.post.heading_content}
              />
            </div>
            <div className="blog-content">
              <div
                className={Style.detail}
                dangerouslySetInnerHTML={{
                  __html: props.blog.post.full_content,
                }}
              ></div>
            </div>

            <section className={`${Style.relatedPost} py-28`}>
              <div className="featured-products-wrapper width flex flex-col items-center">
                <h2 className="text-3xl font-bold text-center">
                  Related Posts
                </h2>

                <div className="featured-products-imgs-container mt-10 w-full">
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={12}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    autoplay={{ delay: 3000 }}
                    modules={[FreeMode, Pagination]}
                    className={`${Style.post} mySwiper`}
                  >
                    {props.blog.related_posts != undefined &&
                      props.blog.related_posts.data.map((related_post: any) => (
                        <SwiperSlide key={related_post.id}>
                          <RelatedBlogPost
                            related_post={related_post}
                            key={related_post.id}
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </section>
          </div>

          <div className="recent-blogs mt-6 lg:mt-0 lg:w-3/12">
            <h2 className="leading-snug text-black text-3xl font-bold">
              Recent Posts
            </h2>
            <div className="recent-blog-wrapper grid sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 lg:grid-cols-1">
              {props.blog.recent_posts != undefined &&
                props.blog.recent_posts.data.map((recent_post: any) => {
                  return (
                    <RecentBlog
                      recent_post={recent_post}
                      key={recent_post.id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlogDetail;
