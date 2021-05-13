import React from "react";
import theme from "../../../themes/inspector_light_theme";
import {ObjectInspector} from "react-inspector";
import "../lists/cards/SourceCard.css";
import "./RuleDetails.css";
import {MiniHeader} from "../Headers";
import DetailHeader from "./DetailHeader";
import "./Details.css";
import Properties from "./DetailProperties";
import Tabs, {TabCase} from "../tabs/Tabs";
import DataBrowsingList from "../../pages/DataBrowsingList";
import LineChartElement from "../charts/LineChart";

export default function ProfileDetails({data}) {

    const filterQuery = {
        fromDate: {
            relative: {
                type: "minus",
                value: 1,
                entity: "week"
            },
            now: null
        },
        toDate: {
            relative: {
                type: null,
                value: null,
                entity: null
            },
            now: "now"
        },
        query: 'profileId="' + data.itemId + '"',
        limit: 10
    }

    const encodeParams = () => {
        return {
            ...filterQuery,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            rand: Math.random().toString()
        };
    }

    const query = encodeParams();

    const onLoadEventDataRequest = (filterQuery) => {
        return {
            url: '/event/chart/data',
            method: "post",
            data: filterQuery
        }
    }
    const onLoadEventHistogramRequest = (filterQuery) => {
        return {
            url: '/event/chart/histogram',
            method: "post",
            data: filterQuery
        }
    }

    const onLoadSessionHistogramRequest = (filterQuery) => {
        return {
            url: '/session/chart/histogram',
            method: "post",
            data: filterQuery
        }
    }

    const onLoadSessionDataRequest = (filterQuery) => {
        return {
            url: '/session/chart/data',
            method: "post",
            data: filterQuery
        }
    }

    return <div style={{height: "inherit"}}>
        <DetailHeader label={data.itemId}/>
        <div className="RightTabScroller">

            <Tabs tabs={["Properties", "Segments", "Events", "Sessions", "Raw"]}>
                <TabCase id={0}>
                    <div className="Box10">
                        <MiniHeader>Properties</MiniHeader>
                        <Properties properties={data.properties}/>
                        <MiniHeader>System Properties</MiniHeader>
                        <Properties properties={data.systemProperties}/>
                    </div>
                </TabCase>
                <TabCase id={1}>
                    <div className="Box10">
                        <Properties properties={data.segments}/>
                    </div>
                </TabCase>
                <TabCase id={2}>
                    <DataBrowsingList
                        onLoadDataRequest={onLoadEventDataRequest}
                        timeFieldLabel="timestamp"
                        filterFields={['itemType', 'scope', 'eventType', 'sessionId', 'profileId', 'timeStamp']}
                        timeField={(row) => [row.timeStamp, row.scope, row.eventType]}
                        initQuery={query}
                    >
                        <LineChartElement onLoadRequest={onLoadEventHistogramRequest(query)}
                                          columns={[{label: "events", color: "#039be5", stackId: "events"}]}/>
                    </DataBrowsingList>
                </TabCase>
                <TabCase id={3}>
                    <DataBrowsingList
                        onLoadDataRequest={onLoadSessionDataRequest}
                        timeFieldLabel="timestamp"
                        filterFields={['itemType', 'scope', 'eventType', 'sessionId', 'profileId', 'timeStamp']}
                        timeField={(row) => [row.timeStamp, row.scope, row.eventType]}
                        initQuery={query}
                    >
                        <LineChartElement onLoadRequest={onLoadSessionHistogramRequest(query)}
                                          columns={[{label: "events", color: "#039be5", stackId: "events"}]}/>
                    </DataBrowsingList>
                </TabCase>
                <TabCase id={4}>
                    <div className="Box10">
                        <ObjectInspector data={data} theme={theme} expandLevel={3}/>
                    </div>
                </TabCase>
            </Tabs>
        </div>
    </div>;

}