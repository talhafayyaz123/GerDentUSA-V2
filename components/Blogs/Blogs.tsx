import React, { useState } from "react";
import Breadcrumb from "../../UIComponents/Breadcrumb";
import BlogsSection from "../../components/Blogs/BlogsSection";
import BlogsSearch from "../../components/Blogs/BlogsSearch";
import { Fragment } from "react";
import Head from "next/head";

const Blogs = (props: any) => {
  const data = { name: "Blogs" };
  const [searchBlogs, setsearchBlogs] = useState(props.blogs);

  return (
    <Fragment>
      <Head>
        <title>{`Blogs - GerDentUSA`}</title>
      </Head>
      <Breadcrumb data={data} />
      <BlogsSearch setsearchBlogs={setsearchBlogs} />
      <BlogsSection
        searchBlogs={searchBlogs}
        setsearchBlogs={setsearchBlogs}
      />
    </Fragment>
  );
};

export default Blogs;
