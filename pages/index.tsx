import type { NextPage } from "next";
import Head from "next/dist/shared/lib/head";
import Image from "next/image";
import About from "../components/Home/About";
import CategoryList from "../components/Home/Category/CategoryList";
import ProductList from "../components/Home/Products/ProductList";
import BlogList from "../components/Home/Blog/BlogList";
import { MainContext } from "../contexts/MainContext";
import { useContext, useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import FaqList from "../components/Home/Faqs/FaqList";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { API_BASE_URL } from "../lib/constants";
import styles from "../styles/Index.module.css";

export const getStaticProps = async ({ params }: any) => {
  const res = await fetch(`${API_BASE_URL}home`).then((response) =>
    response.json()
  );
  const resData = await res;
  return {
    props: { homeData: resData },
  };
};

const Home: NextPage = ({ homeData }: any) => {
  const { Loaded, setLoaded, setIsLoading } = useContext(MainContext);

  useEffect(() => {
    let home_loader = localStorage.getItem("home-loader");
    setLoaded(home_loader);

    const heroIntro = async () => {
      let home_loader = localStorage.getItem("home-loader");
      await setLoaded(home_loader);
      if (home_loader == null) {
        let LoaderTl = gsap
          .timeline({
            defaults: {
              duration: 0.7,
            },
          })
          .to(".loader-layer-2 img", {
            y: -100,
            autoAlpha: 0,
            duration: 1,
          })
          .fromTo(
            ".loader-layer-2",
            {
              y: 0,
            },
            {
              y: -1000,
              ease: "circ",
            }
          )
          .fromTo(
            ".loader-layer-1",
            {
              y: 0,
            },
            {
              y: -1000,
              stagger: 0.5,
              ease: "circ",
            },
            "<0.075"
          );

        setTimeout(() => {
          localStorage.setItem("home-loader", "1");
          setLoaded(home_loader);
        }, 5000);
      }

      gsap
        .timeline({
          defaults: {
            duration: 0.7,
          },
        })
        .fromTo(
          ".home-hero",
          {
            yPercent: 25,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "expo.in",
            delay: 0.2,
          },
          "<"
        )
        .fromTo(
          ".home-hero",
          {
            scale: 0.7,
          },
          {
            scale: 1,
            ease: "expo.in",
          }
        )
        .fromTo(
          ".hm-hero-title .char",
          {
            // yPercent: 100,
            autoAlpha: 0,
          },
          {
            // yPercent: 0,
            autoAlpha: 1,
            ease: "back(1)",
            stagger: 0.02,
          }
        )
        .fromTo(
          ".hm-hero-detail .char",
          {
            // yPercent: 100,
            autoAlpha: 0,
          },
          {
            // yPercent: 0,
            autoAlpha: 1,
            ease: "back(1)",
            stagger: 0.02,
          },
          "<0.5"
        );

      // all headings
      document
        .querySelectorAll(
          ".featured-category-wrapper h2, .featured-products-wrapper h2, .about-wrapper h2.about-heading, .blogs-wrapper h2, .faqs h2"
        )
        .forEach((heading) => {
          gsap.fromTo(
            heading.querySelectorAll(".char"),
            {
              // yPercent: 100,
              autoAlpha: 0,
            },
            {
              // yPercent: 0,
              autoAlpha: 1,
              ease: "back(1)",
              stagger: 0.02,
              scrollTrigger: {
                trigger: heading,
                start: "top 90%",
              },
            }
          );
        });

      // featured category
      document.querySelectorAll(".featured-category").forEach((fc) => {
        gsap.fromTo(
          fc,
          {
            scale: 0,
          },
          {
            scale: 1,
            ease: "back(1)",
            scrollTrigger: {
              trigger: fc,
              start: "top 90%",
            },
          }
        );
      });

      // featured products & blogs
      document.querySelectorAll(".featured-product, .blog").forEach((fp) => {
        gsap.fromTo(
          fp,
          {
            // yPercent: 10,
            autoAlpha: 0,
          },
          {
            // yPercent: 0,
            autoAlpha: 1,
            scrollTrigger: {
              trigger: fp,
              start: "top 90%",
            },
          }
        );
      });
    };

    gsap.registerPlugin(ScrollTrigger);

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    ScrollTrigger.matchMedia({
      "(min-width: 1201px)": function () {
        let spanWrapper = document.querySelectorAll(
          ".hm-hero-title, .hm-hero-detail, .featured-category-wrapper h2, .featured-products-wrapper h2, .about-wrapper h2, .blogs-wrapper h2, .faqs h2"
        );
        spanWrapper.forEach((wrapper: any) => {
          wrapper.innerHTML = wrapper.textContent.replace(
            /\S/g,
            "<span class='char'>$&</span>"
          );
        });
        if (home_loader == null) {
          let loadTl = gsap.timeline();
          loadTl
            .set("body", {
              autoAlpha: 1,
            })
            .from(".loader-layer-2 img", {
              y: 100,
              autoAlpha: 0,
              duration: 1,
              onComplete: () => {
                heroIntro();
              },
            });
        } else {
          heroIntro();
        }
      },
    });
    setIsLoading(false);
  }, [setLoaded, setIsLoading, homeData]);

  return (
    <>
      {Loaded == null && (
        <div className={`hidden ${styles.loaderWrapper}`}>
          <div className="fixed top-0 left-0 w-screen h-screen z-50 dark-blue-bg loader-layer-1" />
          <div className="fixed top-0 left-0 w-screen h-screen z-50 lite-blue-bg-color loader-layer-2 flex justify-center items-center">
            <div className="loader-logo-wrapper overflow-hidden relative">
              <Image
                layout="fixed"
                width={200}
                height={80}
                className="logo absolute top-0 left-0"
                src="/assets/icons/logo.svg"
                alt="logo"
              />
            </div>
          </div>
        </div>
      )}

      <Head>
        <title>{`${homeData.page.meta_title} - GerDentUSA`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={homeData.page.meta_description}
        />
        <meta
          name="keywords"
          content={homeData.page.meta_keywords}
        />
      </Head>

      {/* hero section */}
      <HeroSection banners={homeData.banners} />

      {/* featured category section */}
      <CategoryList
        Categories={homeData.featured_categories}
        title="Our Featured Categories"
      />

      {/* main category section */}
      {/* <CategoryList Categories={homeData.main_categories} title="Our Main Categories" /> */}

      {/* featured products section */}
      <ProductList Products={homeData.featured_products} />

      {/* about section */}
      <About about={homeData.page} />

      {/* blog section */}
      <BlogList Blogs={homeData.blogs} />

      {/* faqs section */}
      <FaqList Faqs={homeData.faqs} />
    </>
  );
};

export default Home;
