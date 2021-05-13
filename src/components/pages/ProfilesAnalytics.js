import React from "react";
import "./DataAnalytics.css";
import DataAnalytics from "./DataAnalytics";
import ProfileDetails from "../elements/details/ProfileDetails";

export default function ProfilesAnalytics() {


    const onLoadDataRequest = (query) => {
        return {
            url: '/profile/chart/data',
            method: "post",
            data: query
        }
    }

    const onLoadHistogramRequest = (query) => {
        return {
            url: '/profile/chart/histogram',
            method: "post",
            data: query
        }
    }

    const onLoadDetails = (id) => {
        return {
            url: "/profile/" + id, method: "get"
        }
    }

    const displayDetails = (data) => <ProfileDetails data={data}/>

    return <DataAnalytics
        type="profile"
        enableFiltering={true}
        detailsLabel="Profile details"
        timeFieldLabel = "last visit"
        timeField={(row) => [row.properties.lastVisit]}
        filterFields={['itemType', 'systemProperties.lastUpdated']}
        onLoadHistogramRequest={onLoadHistogramRequest}
        onLoadDataRequest={onLoadDataRequest}
        onLoadDetails={onLoadDetails}
        displayDetails={displayDetails}
        detailsDrawerWidth={1200}
    />

}