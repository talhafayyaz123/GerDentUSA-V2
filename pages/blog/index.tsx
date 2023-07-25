import React, { useState } from "react";
import { NextPage } from "next";
import Blogs from "../../components/Blogs/Blogs";
import { API_BASE_URL } from "../../lib/constants";

export const getServerSideProps = async (context: any) => {
  const currentPage = context.query.page != undefined ? context.query.page : 1;
  const res = await fetch(`${API_BASE_URL}blog?page=${currentPage}`);
  const data = await res.json();
  return {
    props: {
      blogs: data,
    },
  };
};

const blogs: NextPage = ({ blogs }: any) => {
  return <Blogs blogs={blogs}></Blogs>;
};

export default blogs;
