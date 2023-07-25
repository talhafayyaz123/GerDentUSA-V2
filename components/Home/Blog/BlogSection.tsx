import React from "react";
import { BASE_URL } from "../../../lib/constants";
import Button from "../../../UIComponents/Button";
import Image from "next/dist/client/image";

const BlogSection = ( props : any ) => {

    return (
        <div className="blog bg-gray-100 shadow-lg p-3 text-center flex flex-col items-center rounded-lg">
            <div className="img flex justify-center overflow-hidden rounded-lg">
                <Image layout="intrinsic" width={400} height={217}
                    src={`${BASE_URL}up_data/blog/${props.blog.image}`}
                    alt={props.blog.name}
                />
            </div>
            <h3 className="font-bold text-black text-center text-xl mt-4">
                {props.blog.name.substring(0,20)} ...
            </h3>
            <p className="mt-2 text-gray-600 leading-normal">
                {props.blog.short_content.substring(0,60)} ...
            </p>
            <div className="post-date mt-2">{props.blog.publish_date}</div>
            <Button text="Read More" link={`blog/${props.blog.slug}`} classpara="dark-blue-bg read-more-btn" />
        </div>
    );
};

export default BlogSection;
