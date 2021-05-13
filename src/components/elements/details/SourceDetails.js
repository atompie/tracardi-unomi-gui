import React from "react";
import ScopeTracerInfo from "../ScopeTracerInfo";
import theme from "../../../themes/inspector_light_theme";
import {ObjectInspector} from "react-inspector";
import "../lists/cards/SourceCard.css";
import "./SourceDetails.css";
import DetailBox from "./DetailBox";
import DetailHeader from "./DetailHeader";
import {MiniHeader} from "../Headers";
import {Button} from "@material-ui/core";
import "./Details.css";
import Properties from "./DetailProperties";
import ConfirmationDialog from "../misc/ConfirmationDialog";

export default function SourceDetails({data, onDelete}) {

    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const onClick = () => {
        setOpenConfirmation(true);
    }

    const onConfirmedDelete = () => {
        setOpenConfirmation(false);
        onDelete(data.itemId)
    }

    const onDeleteClose = () => {
        setOpenConfirmation(false);
    }

    return <React.Fragment>
        <DetailHeader label={data.name}/>

        <div className="RightTabScroller" style={{height: "calc(100% - 195px)"}}>
            <DetailBox>
                <MiniHeader>Data</MiniHeader>
                <Properties properties={data}/>
            </DetailBox>
            <ScopeTracerInfo scope={data.name} trackerHost={data.hostname}/>
            <DetailBox>
                <MiniHeader>GET /scope</MiniHeader>
                <ObjectInspector data={data} theme={theme} expandLevel={3}/>
            </DetailBox>
        </div>
        <div className="DetailActionButtons">
            <Button onClick={onClick} variant="outlined" color="primary">
                Delete
            </Button>
            <ConfirmationDialog open={openConfirmation} title="Do you want to delete this source?"
                                content="This action can not be undone." onClose={onDeleteClose}
                                onAgree={onConfirmedDelete}
            />
        </div>
    </React.Fragment>

}