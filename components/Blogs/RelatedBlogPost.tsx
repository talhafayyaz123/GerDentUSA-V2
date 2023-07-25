import React from "react";
import { BASE_URL } from "../../lib/constants";
import Link from "next/link";
import Image from "next/dist/client/image";
import Style from "../Blogs/SingleBlogDetail.module.css";

const RelatedBlogPost = (props: any) => {
  return (
    <Link href={`/blog/${props.related_post.slug}`}>
      <a className={`recent-blog mt-4 ${Style.recentBlog}`}>
        <div
          className={`img-wrapper p-2 border border-solid border-gray-300 ${Style.imgWrapper}`}
        >
          <Image
            className="w-full"
            src={`${BASE_URL}up_data/blog/${props.related_post.image}`}
            layout="responsive"
            width={900}
            height={479}
            alt="latest-blog"
          />
        </div>
        <div className="recent-blog-title mt-2 leading-snug">
          {props.related_post.name}
        </div>
      </a>
    </Link>
  );
};

export default RelatedBlogPost;
