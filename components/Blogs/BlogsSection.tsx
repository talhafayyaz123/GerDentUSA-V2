import Link from "next/link";
import React from "react";
import { useContext, useEffect } from "react";
import { MainContext } from "../../contexts/MainContext";
import BlogSection from "../Home/Blog/BlogSection";

const BlogsSection = (props: any) => {
  const { setIsLoading, redirectTo } = useContext(MainContext);

  let num: any = props.searchBlogs.posts_totals / props.searchBlogs.per_page;
  if (num - parseInt(num) > 0) {
    num = parseInt(num) + 1;
  }
  let paging = {
    counts: num,
    current: props.searchBlogs.posts.current_page,
    start: 1,
    end: 5,
  };

  const range = (start: number, end: number, step = 1) => {
    let output = [];
    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }
    for (let i = start; i <= end; i += step) {
      output.push(i);
    }
    return output;
  };

  const paginateFunc = (url: any, pageNumber: any = paging.counts) => {
    if (pageNumber <= paging.counts && pageNumber >= 1) {
      redirectTo(url);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading, props]);

  return (
    <div className="Cart-page relative">
      <div className="cart-page-container width mt-14 mb-28">
        <h2 className="text-3xl font-bold">Blogs</h2>
        <section className="blog">
          <div className="flex flex-col lg:flex-row">
            <div className="blogs-wrapper flex flex-col items-center w-full">
              <div className="blogs-imgs-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12 mb-10 gap-6">
                {props.searchBlogs.posts != undefined &&
                  props.searchBlogs.posts.data.map((recentBlog: any) => {
                    return (
                      <BlogSection
                        key={recentBlog.id}
                        blog={recentBlog}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          {paging.counts > 1 ? (
            <div className="flex m-2 mt-10 overflow-hidden w-max rounded border border-solid border-gray-300">
              {/* Got to start of page */}
              {paging.start > 2 && (
                <a
                  className={`border-l border-solid border-gray-300 px-3 py-2 cursor-pointer`}
                  onClick={() => paginateFunc(`/blog?page=1`, 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                </a>
              )}

              {/* Go to prev page */}
              <a
                className={`border-l border-solid border-gray-300 p-2 cursor-pointer`}
                onClick={() =>
                  paginateFunc(
                    `/blog?page=${paging.current - 1}`,
                    paging.current - 1
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </a>

              {range(paging.start, paging.end).map((num: any, index: any) => {
                return (
                  <Link
                    key={index}
                    href={`/blog?page=${num}`}
                  >
                    <a
                      className={`border-l border-solid border-gray-300 px-3 py-2 cursor-pointer ${
                        paging.current == num
                          ? "paging active text-white shadow-lg"
                          : ""
                      }`}
                      onClick={() => setIsLoading(true)}
                    >
                      {num}
                    </a>
                  </Link>
                );
              })}

              {/* Go to next page */}
              <a
                className={`border-l border-r border-solid border-gray-300 p-2 cursor-pointer`}
                onClick={() =>
                  paginateFunc(
                    `/blog?page=${Number(paging.current) + 1}`,
                    Number(paging.current) + 1
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {/* Got to end of page */}
              {paging.end < paging.counts && (
                <a
                  className={`px-3 py-2 cursor-pointer`}
                  onClick={() =>
                    paginateFunc(`/blog?page=${paging.counts}`, paging.counts)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogsSection;
