import React from "react";
import "./DataAnalytics.css";
import DataAnalytics from "./DataAnalytics";

export default function SessionsAnalytics() {

    const onLoadDataRequest = (query) => {
        return {
            url: '/session/chart/data',
            method: "post",
            data: query
        }
    }

    const onLoadHistogramRequest = (query) => {
        return {
            url: '/session/chart/histogram',
            method: "post",
            data: query
        }
    }

    return <DataAnalytics
        enableFiltering={true}
        type="session"
        detailsLabel="Session details"
        timeFieldLabel = "timestamp"
        filterFields={['itemId','itemType', 'scope', 'profile', 'timeStamp', 'size', 'lastEventDate']}
        timeField={(row) => [row.timeStamp,row.scope, row.properties.userAgentName]}
        onLoadHistogramRequest={onLoadHistogramRequest}
        onLoadDataRequest={onLoadDataRequest}
    />

}