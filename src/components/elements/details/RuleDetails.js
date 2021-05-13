import React, {useEffect, useState} from "react";
import theme from "../../../themes/inspector_light_theme";
import {ObjectInspector} from "react-inspector";
import "../lists/cards/SourceCard.css";
import DetailBox from "./DetailBox";
import {MiniHeader} from "../Headers";
import DetailHeader from "./DetailHeader";
import "./Details.css";
import "./RuleDetails.css";
import ConfirmationDialog from "../misc/ConfirmationDialog";
import MetaSwitches from "../misc/MetaSwitches";
import Button from "../forms/Button";
import ObjectList from "../lists/ObjectList";
import {request} from "../../../remote_api/uql_api_endpoint";
import moment from "moment";
import Tabs, {TabCase} from "../tabs/Tabs";
import BluredBox from "../misc/BluredBox";
import RuleStats from "./RuleStats";
import UqlDetails from "./UqlDetails";

function TriggeredByEvents({data}) {

    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(data.uql && data.uql?.metadata) {
            const query = 'timeStamp>DATE("' + moment.unix(data.uql.metadata.timestamp).toISOString() + '") AND scope="' + data.uql.scope + '" AND ' + data.uql.condition

            setLoading(true);
            request({
                    url: '/event/select?simplified=0&limit=5',
                    method: "post",
                    header: {"Content-type": "text/plain"},
                    data: query
                },
                setLoading,
                setError,
                (data) => {
                    setReady(data)
                }
            );
        }
    }, [data])

    const render = () => {

        return <ObjectList data={ready.data}
                           loading={loading}
                           errors={error}
                           timeFieldLabel="timestamp"
                           timeFieldWidth={0}
                           filterFields={['itemId', 'itemType', 'scope', 'profile', 'timeStamp', 'size', 'lastEventDate']}
                           timeField={(row) => [row.scope]}
        />
    }

    return render();
}

function RuleDetails({data, onDelete, onEdit, onDuplicate}) {

    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const onEditClick = () => {
        if (data.uql) {
            onEdit(data.uql);
        }
    }

    const onDuplicateClick = () => {
        if (data.uql) {
            onDuplicate(data.uql);
        }
    }

    const onDeleteClick = () => {
        if (data.uql) {
            setOpenConfirmation(true);
        }
    }

    const onConfirmedDelete = () => {
        setOpenConfirmation(false);
        if (data.uql) {
            onDelete(data.unomi.metadata.id);
        }
    }

    const onDeleteClose = () => {
        setOpenConfirmation(false);
    }

    const isChrome = !!window.chrome;

    const detailBoxStyle = (isChrome)
        ? {zIndex: 5, backgroundColor: "rgba(255,255,255,.3)", marginBottom: 0}
        : {zIndex: 5, marginBottom: 0};

    const TriggeredEvents = ({data}) => {
        if(data.uql && data.uql?.metadata) {
            return <React.Fragment>
                <div style={{margin: 5}}>Example events that trigger this rule</div>
                <TriggeredByEvents data={data}/>
            </React.Fragment>
        }
        return <div style={{margin: 5}}>This rule was not created in TRACARDI. Therefore there is no information on events triggering this rule.</div>
    }

    return <div style={{height: "inherit"}}>
        <DetailHeader label={data.unomi.metadata.name}/>

        <div className="RightTabScroller" style={{height: "calc(100% - 122px)", overflowY: "scroll"}}>

            <BluredBox style={{position: "sticky", top: 8}}>

                    <DetailBox style={detailBoxStyle}>
                        {data.uql && <React.Fragment>
                            <MiniHeader>Rule</MiniHeader>
                            <UqlDetails data={data} type="Rule"/>
                        </React.Fragment>}

                        {data.unomi.metadata.description && <div>
                            <MiniHeader>description</MiniHeader>
                            {data.unomi.metadata.description}
                        </div>}

                        <div className="DetailActionButtons">
                            <Button onClick={onEditClick} label="Edit" disabled={typeof data.uql === "undefined"}/>
                            <Button onClick={onDuplicateClick} label="Duplicate" disabled={typeof data.uql === "undefined"}/>
                            <Button onClick={onDeleteClick} label="Delete" disabled={typeof data.uql === "undefined"}/>
                            <ConfirmationDialog open={openConfirmation} title="Do you want to delete this rule?"
                                                content="This action can not be undone." onClose={onDeleteClose}
                                                onAgree={onConfirmedDelete}
                            />
                        </div>
                    </DetailBox>

            </BluredBox>

            <div style={{margin: "10px"}}>
                <Tabs tabs={["Triggered by", "Raw", "Stats", "Settings"]}>
                    <TabCase id={0}>
                        <div style={{margin: "0 10px"}}>
                            <TriggeredEvents data={data}/>
                        </div>
                    </TabCase>
                    <TabCase id={1}>
                        <div style={{margin: "20px"}} className="MoveUpOpacity">
                            <ObjectInspector data={data} theme={theme} expandLevel={2}/>
                        </div>
                    </TabCase>
                    <TabCase id={2}>
                        <div style={{margin: "20px"}} className="MoveUpOpacity">
                            <RuleStats id={data.unomi.itemId}/>
                        </div>
                    </TabCase>
                    <TabCase id={3}>
                        <div style={{margin: "20px"}} className="MoveUpOpacity">
                            <MetaSwitches index="rule" id={data.unomi.itemId} meta={data.unomi.metadata}/>
                        </div>
                    </TabCase>
                </Tabs>
            </div>


        </div>

    </div>

}

export default RuleDetails;
