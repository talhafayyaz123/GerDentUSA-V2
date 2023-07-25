import Image from "next/image";
import { BASE_URL } from "../../lib/constants";
import styles from "./HeroSection.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const HeroSection = (props: any) => {
  return (
    <>
      <section
        className={`home-hero w-full relative overflow-hidden flex flex-col justify-center items-center`}
      >
        <Carousel
          autoPlay={true}
          axis="horizontal"
          infiniteLoop
        >
          {props.banners.map((value: any, index: any) => {
            return (
              <Image
                layout="intrinsic"
                src={`${BASE_URL}up_data/banners/${value.image}`}
                width={1920}
                height={500}
              />
            );
          })}
        </Carousel>

        {/* <div className="relative text-white width flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-center primary-blue-color hm-hero-title">
                        {props.banners.name}
                    </h1>
                    <div className="text-lg sm:text-3xl leading-normal text-gray-600 text-center mt-6 w-full md:w-2/4 hm-hero-detail" dangerouslySetInnerHTML={{ __html: props.banners.banner_text }}></div>
                </div> */}
      </section>
    </>
  );
};

export default HeroSection;
