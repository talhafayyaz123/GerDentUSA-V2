import React, { useEffect } from "react";

const ReviewSection = (props: any) => {
  useEffect(() => {}, [props]);

  return (
    <>
      <div
        className={`review-form mt-14 ${
          props.showSection == true ? "" : "hidden"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 product-title text-3xl font-bold leading-normal">
              <h2>Shipping and Returns</h2>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-12 page-content mb-5">
              <h3>
                <u>
                  <span className="col-md-12 text-2xl font-bold leading-normal">
                    Stainless Steel Instruments
                  </span>
                </u>
              </h3>
             <br></br> <p>
                All GerDentUSA surgical instruments are guaranteed for life
                against manufacturing defects, provided that the instrument is
                used for its intended surgical purpose. GerDentUSA will either
                repair or replace the instrument Free of Charge at our
                discretion*. Our liability under this guarantee shall be limited
                to the repair or replacement of defective merchandise. Our
                guarantee is unqualified because our own quality control
                inspectors check GerDentUSA surgical instruments.
              </p>
              <ul>
                <li className="mt-6">
                  Our instruments are carefully examined by our surgical
                  instrument experts.
                </li>
                <li className="mt-6">
                  No instrument is shipped unless it meets our standards.
                </li>
                <li className="mt-6">
                  Tungsten carbide instruments are included except for jaw
                  inserts and Gold handles by a separate warranty.
                </li>
              </ul>
              <h3>
                <br></br>
                <span className="col-md-12 text-2xl font-bold leading-normal">
                  <u>Tungsten Carbide Jaw Inserts Needle and Scissors</u>
                </span>
              </h3> <br></br>
              <p>
                GerDentUSA surgical instruments with tungsten carbide inserts
                are warranted for five full years of normal use. &nbsp;During
                this warranty period, if any adjustments become necessary,
                GerDentUSA will repair, sharpen (for TC scissors) or replace the
                instrument. A nominal charge will be made for repairs once the
                warranty period has expired.<br></br>
                The non-TC portion of the instrument is guaranteed under
                GerDentUSA's Lifetime Warranty.
              </p>
              <p> <br></br>
                <strong>*Note:&nbsp;</strong>GerDentUSA's experts will examine
                the tool and decide whether the tool can be repaired or
                replaced.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
