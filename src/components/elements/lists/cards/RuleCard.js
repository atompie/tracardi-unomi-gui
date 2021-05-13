import React from 'react';
import "./Card.css";
import "./RuleCard.css";
import {VscVmOutline} from "@react-icons/all-files/vsc/VscVmOutline";
import {VscEyeClosed} from "@react-icons/all-files/vsc/VscEyeClosed";
import {VscEye} from "@react-icons/all-files/vsc/VscEye";
import {VscVmRunning} from "@react-icons/all-files/vsc/VscVmRunning";
import {VscGistSecret} from "@react-icons/all-files/vsc/VscGistSecret";
import {VscFile} from "@react-icons/all-files/vsc/VscFile";
import {VscExclude} from "@react-icons/all-files/vsc/VscExclude";

export default function RuleCard({data, onClick}) {

    return (
            <div onClick={(ev)=>{onClick(data.metadata.id)}} className="Card RuleCard">
                <span className="enabled">{data.metadata.enabled ? <VscVmRunning size={24} style={{color: "darkgreen"}}/>: <VscVmOutline size={24} style={{color: "darkred"}}/>}</span>
                <span className="hidden">{data.metadata.hidden ? <VscEyeClosed size={24}/> : <VscEye size={24} />}</span>
                <span className="readonly">{data.metadata.readOnly ? <VscGistSecret size={24}/> : <VscFile size={24}/>}</span>
                <span className="missing">{data.metadata.missingPlugins ? <VscExclude size={24} style={{color: "darkred"}}/>: ""}</span>
                <span className="scope">{data.metadata.scope}</span>
                <span className="name">{data.metadata.name}</span>
            </div>
    );
}
