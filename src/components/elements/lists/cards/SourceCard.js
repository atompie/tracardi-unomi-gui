import React from 'react';
import "./SourceCard.css";
import "./Card.css";

export default function SourceCard({data, onClick}) {

    return (
        <div onClick={(ev)=>{onClick(data.itemId)}} className="Card">
            <span className="Avatar ScopeAvatar">S</span>
            <span className="name">{data.name}</span>
            <span className="scope">{data.hostname}</span>
        </div>
    );
}