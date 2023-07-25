import { useState, useContext, useEffect } from "react";
import signIn from "../pages/api/signin";
import { MessageContext } from "../contexts/MessageContext";
import Register from "./Register";
import { SessionContext } from "../contexts/SessionContext";
import { useRouter } from "next/router";
import Image from "next/dist/client/image";
import { MainContext } from "../contexts/MainContext";
import { gsap } from "gsap";
import Logo from "../public/assets/icons/logo.svg";
import FBLogo from "../public/assets/icons/facebook.svg";
import TwLogo from "../public/assets/icons/twitter.svg";
import LiLogo from "../public/assets/icons/linkedin.svg";

const SignIn = (props: any) => {
  // const [isLoginClick, setIsLoginClick] = useState(0)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { message, setMessage } = useContext(MessageContext);
  const { session, storeSession, destroySession, setSession } =
    useContext(SessionContext);
  const { setIsLoading } = useContext(MainContext);

  const router = useRouter();

  const closeSignInUpBox = (e: any) => {
    let signInUpContainer = document.querySelector(".sign-in-up-container"),
      closeSignInUpContBtn = document.querySelectorAll(
        ".sign-in-up-container, .close-sign-in-up-btn, .close-sign-in-up-btn path, button[type=submit], #signup, .privacy-policy-link"
      );

    document.body.classList.remove("body-height");
    closeSignInUpContBtn.forEach((btn) => {
      if (e.target === btn) {
        runGsap();
      }
    });
  };

  const runGsap = () => {
    gsap.to(".sign-in-up-container", {
      autoAlpha: 0,
      duration: 0.3,
      onComplete: () => document.body.classList.remove("body-height"),
    });
  };

  const showSignUpBtn = () => {
    let signInPanel: any = document.querySelector(".sign-in-wrapper");
    let signUpPanel: any = document.querySelector(".sign-up-wrapper");
    signUpPanel.classList.remove("hidden");
    signInPanel.classList.add("hidden");
  };

  const signInFunc = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    let formData = {
      email: email,
      password: password,
    };
    const res: any = await signIn(formData);
    if (res != undefined && res.data.error != undefined) {
      await setMessage(res.data);
    } else {
      setMessage();
      storeSession("user", res.data);
      runGsap();
      router.push("/dashboard");
    }
    setPassword("");
    setEmail("");
    setIsLoading(false);
  };

  const [LtoRGsap, setLtoRGsap] = useState(gsap.timeline({ paused: true }));

  const ForgetFunc = async () => {
    await LtoRGsap.restart();
  };

  const ForgetBackFunc = async () => {
    await LtoRGsap.reverse();
  };

  const submitForgetForm = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    let formData: any = {
      email: email,
    };
    let result: any = await fetch(`/api/user/forgetpass`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json());
    if (result.message == "success") {
      ForgetBackFunc();
    }
    await setMessage({ [result.message]: result.response });
    setIsLoading(false);
  };

  useEffect(() => {
    gsap.set("#signin", { autoAlpha: 1 });
    gsap.set("#forgetPass", { x: 400, autoAlpha: 0, display: "none" });

    LtoRGsap.to("#signin", {
      x: -400,
      autoAlpha: 0,
    })
      .set("#signin", { display: "none" })
      .set("#forgetPass", { display: "block" })
      .to("#forgetPass", {
        x: 0,
        autoAlpha: 1,
      });
  }, []);

  return (
    <>
      <div
        className={`sign-in-up-container fixed top-0 left-0 w-screen h-screen z-50 flex justify-center md:items-center overflow-x-hidden overflow-y-scroll p-2`}
      >
        <div className="sign-in-up-wrapper bg-white rounded-lg shadow-lg px-4 py-4 sm:py-8 flex flex-col justify-center items-center h-max overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 self-end -mt-2 sm:-mt-4 cursor-pointer close-sign-in-up-btn"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={(e) => closeSignInUpBox(e)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <Image
            className="logo"
            src={Logo}
            alt="GerDentUSA"
          />
          <div className="sign-in-wrapper w-full flex flex-col justify-center items-center mt-2 sm:mt-4 px-2">
            <h2 className="font-semibold text-2xl">Welcome Back!</h2>
            <p className="mt-4 text-gray-600 leading-normal w-full text-center">
              <span>Don&apos;t have an account?</span>
              <span className="dark-blue-color font-semibold">
                <a
                  className="show-signup-btn cursor-pointer"
                  onClick={() => showSignUpBtn()}
                >
                  &nbsp; Create an account
                </a>
              </span>
            </p>
            {message != "" &&
            message != undefined &&
            message.error != undefined ? (
              <small className="bg-red-500 text-xs p-1 rounded text-white w-full text-center">
                {message.error}
              </small>
            ) : (
              ""
            )}
            {message != "" &&
              message != undefined &&
              message.success != undefined && (
                <small className="bg-blue-500 text-xs p-1 rounded text-white w-full text-center">
                  {message.success}
                </small>
              )}
            <form
              id="signin"
              className="text-sm block w-full"
              onSubmit={(e) => signInFunc(e)}
            >
              <div>
                <label
                  className="block w-full text-gray-600 mt-2 sm:mt-4 "
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid border-gray-300 focus:outline-none"
                  type="email"
                  id="signin-email"
                  placeholder="Enter you email ..."
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label
                  className="block w-full text-gray-600 mt-2 sm:mt-4 "
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid border-gray-300 focus:outline-none"
                  type="password"
                  id="signin-password"
                  placeholder="Enter password ..."
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="on"
                />
              </div>
              <div className="remember-forgot-wrapper flex flex-col sm:flex-row justify-center sm:justify-between items-center text-sm w-full mt-2 sm:mt-4">
                <div className="remember flex justify-center sm:justify-start items-center w-full sm:w-6/12">
                  <div className="switch-wrapper w-2/12 sm:w-3/12 h-max rounded-full bg-gray-200 inline mr-2 cursor-pointer">
                    <div className="switch-circle bg-white rounded-full shadow-lg" />
                  </div>
                  <span className="cursor-pointer w-max sm:w-9/12">
                    Remember me
                  </span>
                </div>
                <a
                  onClick={() => ForgetFunc()}
                  className="forgot cursor-pointer w-max sm:w-6/12 text-right mt-2 sm:mt-0 text-red-400"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-2 sm:mt-4">
                <button
                  type="submit"
                  className="btn w-full px-8 py-3 dark-blue-bg text-white rounded-full shadow-lg mt-2 sm:mt-4 inline-block text-center relative text-lg"
                  onSubmit={(e) => signInFunc(e)}
                >
                  Sign In
                </button>
              </div>
            </form>
            <form
              id="forgetPass"
              className="text-sm block w-full"
              onSubmit={(e) => submitForgetForm(e)}
            >
              <div>
                <label
                  className="block w-full text-gray-600 mt-2 sm:mt-4 "
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid border-gray-300 focus:outline-none"
                  type="email"
                  id="forget-email"
                  placeholder="Enter you email ..."
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="text-right">
                <a
                  onClick={() => ForgetBackFunc()}
                  className="block w-full text-red-400 mt-2 sm:mt-4 cursor-pointer"
                >
                  Back
                </a>
              </div>
              <div className="mt-2 sm:mt-4">
                <button
                  type="submit"
                  className="btn w-full px-8 py-4 dark-blue-bg text-white rounded-full shadow-lg mt-2 sm:mt-4 inline-block text-center relative"
                >
                  Send Email
                </button>
              </div>
            </form>
            {/* <p className="continue mt-2 sm:mt-6 text-sm text-gray-600">
                        or continue with
                    </p>
                    <div className="social-login-wrapper flex justify-center items-center w-full mt-2 sm:mt-4">
                        <a href="#">
                            <Image src={FBLogo} alt="facebook" />
                        </a>
                        <a href="#" className="mx-4">
                            <Image src={TwLogo} alt="twitter" />
                        </a>
                        <a href="#" className="linkedin">
                            <Image src={LiLogo} alt="linkedin" />
                        </a>
                    </div> */}
          </div>
          <Register closeSignInUpBox={closeSignInUpBox} />
        </div>
      </div>
    </>
  );
};
export default SignIn;
