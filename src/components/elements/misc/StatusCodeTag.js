import React from "react";
import "./StatusCodeTag.css";

export default function StatusCodeTag({...props}) {
    const methodName = "StatusCode" + props.children;
    return <span className={methodName + " StatusCodeTag"}>{props.children}</span>
}