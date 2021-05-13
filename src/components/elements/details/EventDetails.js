import React from "react";
import theme from "../../../themes/inspector_light_theme";
import {ObjectInspector} from "react-inspector";
import "../lists/cards/SourceCard.css";
import "./RuleDetails.css";
import DetailBox from "./DetailBox";
import {MiniHeader} from "../Headers";
import DetailHeader from "./DetailHeader";
import Properties from "./DetailProperties";
import "./Details.css";

export default function EventDetails({data}) {

    function Ids({data}) {
        const ids = {
            "Event Id": data.itemId,
            "Session id": data.sessionId,
            "Profile id": data.profileId
        }

        return <Properties properties={ids}/>
    }

    function Other({data}) {
        const ids = {
            "Event Type": data.eventType,
            "Scope": data.scope,
            "Persistent": data.persistent,
            "Version": data.version,
            "Timestamp": data.timeStamp
        }

        return <Properties properties={ids}/>
    }

    return <div style={{height: "inherit"}}>
        <DetailHeader label={data.itemId}/>

        <div className="RightTabScroller">

            <DetailBox>
                <MiniHeader>Ids</MiniHeader>
                <Ids data={data}/>
            </DetailBox>

            <DetailBox>
                <MiniHeader>Properties</MiniHeader>
                <Properties properties={data.properties}/>
            </DetailBox>

            <DetailBox>
                <MiniHeader>Source</MiniHeader>
                <Properties properties={data.source}/>
            </DetailBox>

            <DetailBox>
                <MiniHeader>Target</MiniHeader>
                <Properties properties={data.target}/>
            </DetailBox>

            <DetailBox>
                <MiniHeader>Other</MiniHeader>
                <Other data={data}/>
            </DetailBox>

            <DetailBox>
                <MiniHeader>Raw UNOMI data</MiniHeader>
                <ObjectInspector data={data} theme={theme} expandLevel={3}/>
            </DetailBox>

        </div>
    </div>;

}