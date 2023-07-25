import React from "react";
import Link from "next/link";
//import Styles from "./Ui.module.css";
import { API_BASE_URL } from "../lib/constants";

const Breadcrumb = (props: any) => {
  return (
    <div className="bg-gray-100">
      <div className="breadcrumb py-4 text-black width leading-snug">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span> / </span>
        <a>{props.data != undefined && props.data.name}</a>
      </div>
    </div>
  );
};

export default Breadcrumb;
