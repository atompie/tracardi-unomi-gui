import React from "react";
import "./DetailBox.css";


export default function DetailBox({children, style}) {
    return <div className="DetailBox" style={style}>
        {children}
    </div>
}