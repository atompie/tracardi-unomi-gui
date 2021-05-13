import React from 'react';
import "./ProfileCard.css";
import "./Card.css";

export default function ProfileCard({data, onClick}) {

    return (
        <div onClick={(ev) => {
            onClick(data.profileId)
        }} className="Card">
            <span className="Avatar ProfileAvatar">P</span>
            <span className="name">{data.profileId}</span>
        </div>
    );
}