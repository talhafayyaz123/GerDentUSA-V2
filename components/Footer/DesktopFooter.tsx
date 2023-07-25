import React from "react";
import Newsletter from "./Newsletter";
import FooterLinks from "./FooterLinks";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/icons/logo.svg";
import FBLogo from "../../public/assets/icons/facebook.svg";
import TwLogo from "../../public/assets/icons/twitter.svg";
import LiLogo from "../../public/assets/icons/linkedin.svg";
import Insta from "../../public/assets/icons/instagram.svg";
import YoutubeLogo from "../../public/assets/icons/youtube.svg";
import PinterestLogo from "../../public/assets/icons/pinterest.svg";
import styles from "./Footer.module.css";

const DesktopFooter = (props: any) => {
  return (
    <div
      className={`${styles.footer} footer-wrapper flex flex-col sm:flex-row width`}
    >
      <div className="footer-company-details w-12/12 sm:w-6/12 lg:w-3/12 mr-4">
        <Link href="/">
          <a onClick={() => props.setIsLoading(true)}>
            {" "}
            <Image
              className="logo -mt-8"
              src={Logo}
              alt="GerDentUSA"
            />{" "}
          </a>
        </Link>
        <div className="company-detail text-gray-600 leading-normal text-sm">
          GerDentUSA is a reliable manufacturer/supplier of dental surgical
          instruments. We place high value on instrument’s innovation and
          precision craftsmanship.
        </div>
        <div className="social-info flex mt-4">
          <Link href={"https://www.facebook.com/gerdentusa/"}>
            <a className="mr-3">
              <Image
                className={styles.image}
                src={FBLogo}
                alt="facebook account"
              />
            </a>
          </Link>
          <Link href={"https://twitter.com/Gerdentusa"}>
            <a className="mr-3">
              <Image
                className={styles.image}
                src={TwLogo}
                alt="twitter account"
              />
            </a>
          </Link>
          <Link href={"https://www.linkedin.com/company/gerdentusa"}>
            <a className="mr-3 linkedin">
              <Image
                className={styles.image}
                src={LiLogo}
                alt="linkedin account"
              />
            </a>
          </Link>
          <Link href={"https://www.instagram.com/gerdentusa"}>
            <a className="mr-3">
              <Image
                className={styles.image}
                src={Insta}
                alt="instagram account"
              />
            </a>
          </Link>
          <Link
            href={"https://www.youtube.com/channel/UCmNTSHQhI4xQRqHFvrHQiNg"}
          >
            <a className="mr-3">
              <Image
                className={styles.image}
                src={YoutubeLogo}
                alt="youtube account"
              />
            </a>
          </Link>
          {/* <Link href={'https://www.pinterest.com/gerdentusa'}>
                        <a>
                            <Image className={styles.image} src={PinterestLogo} alt="pinterest account" />
                        </a>
                        </Link>
                    */}
        </div>
      </div>
      <FooterLinks setIsLoading={props.setIsLoading} />
      <Newsletter />
    </div>
  );
};

export default DesktopFooter;
