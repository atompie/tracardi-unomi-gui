import React from "react";
import "./SubMenu.css";
import SocialButton from "../elements/misc/SocialButton";
import {FaFacebookSquare} from "@react-icons/all-files/fa/FaFacebookSquare";
import {GrTwitter} from "@react-icons/all-files/gr/GrTwitter";
import {IoLogoYoutube} from "@react-icons/all-files/io/IoLogoYoutube";

export default function SubMenu({title, children}) {
    return <div className="SubMenu">
        <div className="SubMenuHeader"><span>Tracardi</span> {title}</div>
        {children}
        <div className="SubMenuFiller">
            <div className="Branding">
                <div className="BrandName">TRACARDI <span> ver. 0.4.0</span></div>
                <div className="TagName">Customer Data Platform</div>
            </div>

            <div className="SupportUs">
                <div className="Title">Subscribe to support us:</div>
                <SocialButton icon={<FaFacebookSquare size={20}/>} link="https://bit.ly/3uPwP5a" className="Social"/>
                <SocialButton icon={<GrTwitter size={20}/>} link="https://bit.ly/3uVJwLJ" className="Social"/>
                <SocialButton icon={<IoLogoYoutube size={20}/>} link="https://bit.ly/3pbdbPR" className="Social"/>
            </div>
        </div>
    </div>
}