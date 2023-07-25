import React from "react";
import Image from "next/dist/client/image";
import shippingOptionImg from "../../../public/assets/img/shipping-options-img.png";
import paymentImg from "../../../public/assets/img/payment-img.png";
import deliveryVanSvg from "../../../public/assets/icons/delivery-van.svg";
import Styles from "../Home/Products/Product.module.css";
import Link from "next/link";
import Logo from "../../public/assets/icons/logo.svg";
import FBLogo from "../../public/assets/icons/facebook.svg";
import TwLogo from "../../public/assets/icons/twitter.svg";
import LiLogo from "../../public/assets/icons/linkedin.svg";
import Insta from "../../public/assets/icons/instagram.svg";
import YoutubeLogo from "../../public/assets/icons/youtube.svg";
import PinterestLogo from "../../public/assets/icons/pinterest.svg";

export default function SocialInks() {
  return (
    <div className="product-page-right-col-wrapper  p-4 w-full rounded-lg h-full">
      <div className="social-info flex mt-2">
        <Link href={"https://www.facebook.com/gerdentusa/"}>
          <a
            className="mr-3"
            target="_blank"
          >
            <Image
              className={Styles.image}
              src={FBLogo}
              alt="facebook account"
            />
          </a>
        </Link>
        <Link href={"https://twitter.com/Gerdentusa"}>
          <a
            className="mr-3"
            target="_blank"
          >
            <Image
              className={Styles.image}
              src={TwLogo}
              alt="twitter account"
            />
          </a>
        </Link>
        <Link href={"https://www.linkedin.com/company/gerdentusa"}>
          <a
            className="mr-3 linkedin"
            target="_blank"
          >
            <Image
              className={Styles.image}
              src={LiLogo}
              alt="linkedin account"
            />
          </a>
        </Link>
        <Link href={"https://www.instagram.com/gerdentusa"}>
          <a
            className="mr-3"
            target="_blank"
          >
            <Image
              className={Styles.image}
              src={Insta}
              alt="instagram account"
            />
          </a>
        </Link>
        <Link href={"https://www.youtube.com/channel/UCmNTSHQhI4xQRqHFvrHQiNg"}>
          <a
            className="mr-3"
            target="_blank"
          >
            <Image
              className={Styles.image}
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
  );
}
