import React from "react";
import Link from "next/link";

const Button = (props: any) => {
    return (
        <Link href={'/' + props.link}>
            <a className="mt-6">
                <button className={`text-white py-4 px-12 rounded-full shadow-lg cursor-pointer w-max font-bold relative ${props.classpara}`}>
                    {props.text}
                </button>
            </a>
        </Link>
    );
};

export const ClickEventButton = (props: any) => {
    return (
        <a className="mt-6" onClick={props.eventFunction}>
            <button className={`text-white py-4 px-12 rounded-full shadow-lg cursor-pointer w-max font-bold relative ${props.classpara}`}>
                {props.text}
            </button>
        </a>
    );
}

export default Button;
