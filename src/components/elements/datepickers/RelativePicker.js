import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default function RelativePicker({type, onDateSelect, datetime}) {

    const defaultType = type==="FromDate" ? "minus" : "plus";
    const [periodType, setPeriodType] = useState((datetime?.relative?.type) ? datetime.relative.type : defaultType);
    const [period, setPeriod] = useState((datetime?.relative?.value) ? datetime.relative.value : 15);
    const [periodEntity, setPeriodEntity] = useState((datetime?.relative?.entity) ? datetime.relative.entity : "minutes");

    useEffect(() => {
        const date = {
            ...datetime,
            relative: {
                type: periodType,
                value: period,
                entity: periodEntity
            },
            now: null
        }
        onDateSelect(date);
    }, [periodType, period, periodEntity])

    return <div className="PeriodPicker">
        <div className="PeriodHeader">
            Select period
        </div>
        <div className="PeriodForm">

            <span style={{margin: 10, fontSize: "1.5em", textTransform: "uppercase"}}>{defaultType}</span>

            <TextField
                id="standard-number"
                type="number"
                variant="outlined"
                size="small"
                value={period}
                onChange={(ev) => setPeriod(ev.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{width: 100, margin: 2}}
            />
            <TextField
                select
                variant="outlined"
                size="small"
                value={periodEntity}
                style={{width: 150}}
                onChange={(ev) => setPeriodEntity(ev.target.value)}
            >
                <MenuItem value={"minutes"} selected>Minutes</MenuItem>
                <MenuItem value={"hours"}>Hour</MenuItem>
                <MenuItem value={"days"}>Days</MenuItem>
                <MenuItem value={"weeks"}>Weeks</MenuItem>
                <MenuItem value={"months"}>Months</MenuItem>
                <MenuItem value={"years"}>Years</MenuItem>
            </TextField>
        </div>
        <div className="PeriodsList">
            <div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('minutes');
                    setPeriod(15)
                }}>{defaultType} 15 minutes</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('minutes');
                    setPeriod(30)
                }}>{defaultType} 30 minutes</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('hours');
                    setPeriod(1)
                }}>{defaultType} 1 hour</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('hours');
                    setPeriod(3)
                }}>{defaultType} 3 hours</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('hours');
                    setPeriod(8)
                }}>{defaultType} 8 hours</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('hours');
                    setPeriod(12)
                }}>{defaultType} 12 hours</span></div>
            </div>
            <div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('days');
                    setPeriod(1)
                }}>{defaultType} day</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('days');
                    setPeriod(2)
                }}>{defaultType} 2 days</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('weeks');
                    setPeriod(1)
                }}>{defaultType} week</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('weeks');
                    setPeriod(2)
                }}>{defaultType} 2 weeks</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('months');
                    setPeriod(1)
                }}>{defaultType} month</span></div>
                <div><span onClick={() => {
                    setPeriodType(defaultType);
                    setPeriodEntity('years');
                    setPeriod(1)
                }}>{defaultType} year</span></div>
            </div>
        </div>

    </div>
}