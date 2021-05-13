import React from "react";
import "./DataAnalytics.css";
import EventDetails from "../elements/details/EventDetails";
import DataAnalytics from "./DataAnalytics";

export default function EventsAnalytics() {


    const onLoadDataRequest = (query) => {
        return {
            url: '/event/chart/data',
            method: "post",
            data: query
        }
    }

    const onLoadHistogramRequest = (query) => {
        return {
            url: '/event/chart/histogram',
            method: "post",
            data: query
        }
    }

    const onLoadDetails = (id) => {
        return {
            url: "/event/" + id, method: "get"
        }
    }

    const displayDetails = (data) => <EventDetails data={data}/>

    return <DataAnalytics
        type="event"
        enableFiltering={true}
        detailsLabel="Event details"
        timeFieldLabel = "timestamp"
        filterFields={['itemType', 'scope', 'eventType', 'sessionId', 'profileId', 'timeStamp']}
        timeField={(row) => [row.timeStamp,row.scope, row.eventType]}
        onLoadHistogramRequest={onLoadHistogramRequest}
        onLoadDataRequest={onLoadDataRequest}
        onLoadDetails={onLoadDetails}
        detailsDrawerWidth={600}
        displayDetails={displayDetails}
    />

}