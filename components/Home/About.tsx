import styles from "./About.module.css";
import { useEffect, useState } from "react";
import { ClickEventButton } from "../../UIComponents/Button";

const About = (props: any) => {
  const [content, setContent] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);
  const [isReadLess, setIsReadLess] = useState(false);
  let length = 500;
  let string = props.about.content;

  const readMoreFunc = () => {
    let string = props.about.content.split("{READ_MORE}");
    setContent(string[0] + string[1]);
    setIsReadLess(true);
  };
  const readLessFunc = () => {
    let string = props.about.content.split("{READ_MORE}");
    setContent(string[0]);
    setIsReadLess(false);
    console.log("readLessFunc");
  };

  useEffect(() => {
    string = string.split("{READ_MORE}");
    setContent(string[0]);
    setIsReadMore(true);
  }, [length, string]);

  return (
    <section className={`py-28 relative w-full h-full ${styles.aboutDetail}`}>
      {/* <div className={styles.imgoverlay}> */}
      {/* <Image layout="intrinsic" src={AboutBgImage} /> */}
      {/* </div> */}
      <div className="about-container width relative flex flex-col justify-center items-center">
        <div className="about-wrapper md:w-4/6 lg:w-3/6 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center text-black about-heading">
            {props.about.heading}
          </h1>

          <div
            className={`text-gray-600 text-left mt-6 mb-2 leading-normal ${styles.leadingNormal}`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>

          {
            <ClickEventButton
              eventFunction={isReadLess ? readLessFunc : readMoreFunc}
              text={`${isReadLess ? "Read Less" : "Read More"}`}
              classpara="dark-blue-bg read-more-btn "
            />
          }
        </div>
      </div>
    </section>
  );
};

export default About;
