import { NextPage } from "next";
import Breadcrumb from "../../UIComponents/Breadcrumb";
import { useRouter } from "next/dist/client/router";
import { Fragment, useEffect, useState } from "react";
import SingleBlogDetail from "../../components/Blogs/SingleBlogDetail";
import { API_BASE_URL } from "../../lib/constants";
import Head from "next/head";

export const getServerSideProps = async (context: any) => {
  const result = await fetch(`${API_BASE_URL}blog/${context.params.blog}`);
  const res = await result.json();
  return {
    props: { blog: res },
  };
};

const BlogDetail: NextPage = ({ blog }: any) => {
  console.log(blog);
  useEffect(() => {}, []);

  return (
    <Fragment>
      <Head>
        <title>{`${blog.post.meta_title} - GerDentUSA`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={blog.post.meta_description}
        />
        <meta
          name="keywords"
          content={blog.post.meta_keywords}
        />
      </Head>

      <SingleBlogDetail blog={blog} />
    </Fragment>
  );
};

export default BlogDetail;
