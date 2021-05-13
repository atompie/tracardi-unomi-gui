import React, {useEffect, useState} from "react";
import "./DataAnalytics.css";
import ObjectFiltering from "../elements/forms/ObjectFiltering";
import moment from "moment";
import DataBrowsingList from "./DataBrowsingList";
import BarChartElement from "../elements/charts/BarChart";

export default function DataAnalytics(
    {
        type,
        onLoadDataRequest,
        onLoadHistogramRequest,
        onLoadDetails,
        detailsLabel,
        timeField,
        timeFieldLabel,
        displayDetails,
        detailsDrawerWidth,
        filterFields
    }) {

    const getQuery = (type, label) => {
        const key = type + label
        let storedData;
        storedData = localStorage.getItem(key);
        if (!storedData) {
            storedData = ""
            localStorage.setItem(key, storedData);
        }

        return storedData;
    }
    const getSavedData = (type, label) => {
        const key = type + label
        let storedData;
        try {
            storedData = JSON.parse(localStorage.getItem(key));
        } catch (SyntaxError) {
            storedData = null;
        }

        if (!storedData) {
            const now = moment();

            const initDate = {
                year: now.format("YYYY"),
                month: now.format("MM"),
                meridiem: now.format('a'),
                date: now.format("DD"),
                hour: now.format('hh'),
                minute: now.format('mm'),
                second: now.format("ss"),
                relative: {
                    type: null,
                    value: null,
                    entity: null
                },
                now: null
            }

            if (label === "DateTo") {
                initDate.now = "now"
            }

            if (label === "DateFrom") {
                initDate.relative = {
                    type: "minus",
                    value: 15,
                    entity: "days"
                }
            }

            localStorage.setItem(key, JSON.stringify(initDate));
            storedData = initDate;
        }
        return storedData
    }

    const encodeParams = (init) => {
        return {
            ...init,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            rand: Math.random().toString()
        };
    }

    const [refresh, setRefresh] = useState(getRefreshRate());
    const [query, setQuery] = useState(encodeParams({
        fromDate: getSavedData(type, "DateFrom"),
        toDate: getSavedData(type, "DateTo"),
        query: getQuery(type, "Query"),
        limit: 10
    }));

    useEffect(() => {
        let timer;
        if (refresh > 0) {
            timer = setInterval(
                () => setQuery(encodeParams(query)),
                refresh * 1000
            );
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }

        };
    }, [refresh, query])

    const onFilter = ({to, from, query}) => {
        setQuery(encodeParams({
            fromDate: from,
            toDate: to,
            query: query,
            limit: 10
        }))
    }

    const onRefreshChange = (rate) => {
        localStorage.setItem(type + "RefreshRate", rate);
        setRefresh(rate);
    }

    function getRefreshRate() {
        const rate = localStorage.getItem(type + "RefreshRate");
        return (rate) ? rate : 0;
    }

    return <div className="DataAnalytics">
        <ObjectFiltering
            type={type}
            initDate={query}
            initRefresh={refresh}
            onFilterClick={onFilter}
            onRefreshChange={onRefreshChange}
        />

        <div className="Data">
            <DataBrowsingList
                onLoadDataRequest={onLoadDataRequest}
                onLoadHistogramRequest={onLoadHistogramRequest}
                onLoadDetails={onLoadDetails}
                timeFieldLabel={timeFieldLabel}
                filterFields={filterFields}
                timeField={timeField}
                initQuery={query}
                displayDetails={displayDetails}
                detailsDrawerWidth={detailsDrawerWidth}
                detailsLabel={detailsLabel}
            >
                <BarChartElement onLoadRequest={onLoadHistogramRequest(query)}
                                 columns={[{label: "events", color: "#039be5", stackId: "events"}]}/>
            </DataBrowsingList>
        </div>

    </div>


}