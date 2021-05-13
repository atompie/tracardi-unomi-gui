import React from "react";
import "./MethodTag.css";

export default function MethodTag({method}) {
    const methodName = method.toUpperCase() + "Tag";
    return <span className={methodName + " MethodTag"}>{method.toUpperCase()}</span>
}