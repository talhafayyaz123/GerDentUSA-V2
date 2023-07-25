import React from 'react'
import { BASE_URL } from '../../lib/constants'
import Link from 'next/link'
import Image from 'next/dist/client/image'
import Style from "../Blogs/SingleBlogDetail.module.css"

const RecentBlog = (props: any) => {
    return (
        <Link href={`/blog/${props.recent_post.slug}`}>
            <a className={`recent-blog mt-4 ${Style.recentBlog}`}>
                <div className={`img-wrapper p-2 border border-solid border-gray-300 ${Style.imgWrapper}`}>
                    <Image className="w-full" src={`${BASE_URL}up_data/blog/${props.recent_post.image}`} layout="responsive" width={900} height={479} alt="recent-blog" />
                </div>
                <div className="recent-blog-title mt-2 leading-snug">
                    {props.recent_post.name}
                </div>
            </a>
        </Link>
    )
}

export default RecentBlog
