import React from "react";
import Link from "next/link";
import Styles from "./Ui.module.css";
import { API_BASE_URL } from "../../lib/constants";
import axios from "axios";

const BlogsSearch = (props: any) => {
  const blogSearchApiHandler = async (e: any) => {
    let value = e.target.value;
    const res = await axios.get(`${API_BASE_URL}blog-search?value=${value}`);
    props.setsearchBlogs(res?.data);
  };
  return (
    <div className="bg-gray-100">
      <div className="breadcrumb py-2 text-black width leading-snug">
        <input
          type="search"
          placeholder="Search Blogs"
          onChange={(e) => blogSearchApiHandler(e)}
          className={`${Styles.blogsearch} blogsearch p-3 focus:outline-none rounded-lg lite-blue-bg-color text-gray-600 w-2/12`}
        />
      </div>
    </div>
  );
};

export default BlogsSearch;
