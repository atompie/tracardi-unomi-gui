import React from "react";
import theme from "../../../themes/inspector_light_theme";
import {ObjectInspector} from "react-inspector";
import "../lists/cards/SourceCard.css";
import "./RuleDetails.css";
import DetailBox from "./DetailBox";
import {MiniHeader} from "../Headers";
import DetailHeader from "./DetailHeader";
import "./Details.css";
import ConfirmationDialog from "../misc/ConfirmationDialog";
import MetaSwitches from "../misc/MetaSwitches";
import UqlDetails from "./UqlDetails";
import BluredBox from "../misc/BluredBox";
import Tabs, {TabCase} from "../tabs/Tabs";
import Button from "../forms/Button";

export default function SegmentDetails({data, onEdit, onDuplicate, onDelete}) {

    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const onDeleteClick = () => {
        setOpenConfirmation(true);
    }

    const onDuplicateClick = () => {
        if (data.uql) {
            onDuplicate(data.uql);
        }
    }

    const onEditClick = () => {
        if (data.uql) {
            onEdit(data.uql);
        }
    }

    const onConfirmedDelete = () => {
        setOpenConfirmation(false);
        onDelete(data.unomi.metadata.id);
    }

    const onDeleteClose = () => {
        setOpenConfirmation(false);
    }

    const isChrome = !!window.chrome;

    const detailBoxStyle = (isChrome)
        ? {zIndex: 5, backgroundColor: "rgba(255,255,255,.3)", marginBottom: 0}
        : {zIndex: 5, marginBottom: 0}

    return <React.Fragment>
        <DetailHeader label={data.unomi.metadata.name}/>

        <div className="RightTabScroller" style={{height: "calc(100% - 175px)"}}>

            <BluredBox style={{position: "sticky", top: 8}}>
                <DetailBox style={detailBoxStyle}>
                    {data.uql && <React.Fragment>
                        <MiniHeader>Segment logic</MiniHeader>
                        <UqlDetails data={data} type="Segment"/>
                    </React.Fragment>}

                    {data.unomi.metadata.description && <div>
                        <MiniHeader>description</MiniHeader>
                        {data.unomi.metadata.description}
                    </div>}

                    <div className="DetailActionButtons">
                        <Button onClick={onEditClick} label="Edit" disabled={typeof data.uql === "undefined"}/>
                        <Button onClick={onDuplicateClick} label="Duplicate" disabled={typeof data.uql === "undefined"}/>
                        <Button onClick={onDeleteClick} label="Delete" disabled={typeof data.uql === "undefined"}/>
                        <ConfirmationDialog open={openConfirmation} title="Do you want to delete this segment?"
                                            content="This can not be undone." onClose={onDeleteClose}
                                            onAgree={onConfirmedDelete}
                        />
                    </div>
                </DetailBox>
            </BluredBox>

            <div style={{margin: "10px"}}>
                <Tabs tabs={["Stats", "Raw", "Settings"]}>
                    <TabCase id={0}>
                        <div style={{margin: "0 10px"}}>
                        </div>
                    </TabCase>
                    <TabCase id={1}>
                        <div style={{margin: "20px"}} className="MoveUpOpacity">
                            <ObjectInspector data={data} theme={theme} expandLevel={3}/>
                        </div>
                    </TabCase>
                    <TabCase id={2}>
                        <div style={{margin: "20px"}} className="MoveUpOpacity">
                            <MetaSwitches index="segment" id={data.unomi.metadata.id} meta={data.unomi.metadata}/>
                        </div>
                    </TabCase>
                </Tabs>
            </div>
        </div>
    </React.Fragment>

}