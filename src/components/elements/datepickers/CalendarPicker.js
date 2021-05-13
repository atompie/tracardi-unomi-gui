import React, {useEffect, useState} from "react";
import PickyDateTime from "react-picky-date-time";
import "./CalendarPicker.css";

export default function CalendarPicker({onDateSelect, datetime}) {

    const [year, setYear] = useState(datetime.year);
    const [month, setMonth] = useState(datetime.month);
    const [meridiem, setMeridiem] = useState(datetime.meridiem);
    const [day, setDay] = useState(datetime.date);
    const [second, setSecond] = useState(datetime.second);
    const [minute, setMinute] = useState(datetime.minute);
    const [hour, setHour] = useState(datetime.hour);

    useEffect(() => {
        let date = {
            year:year,
            month:month,
            meridiem:meridiem,
            date:day,
            hour:hour,
            minute:minute,
            second:second,
            relative: {
                type: null,
                value: null,
                entity: null
            },
            now: null
        }
        onDateSelect(date);
    },[year, month, day, hour, minute, second, meridiem])

    const onResetTime = (d) => {
        setHour(d.clockHandHour.value);
        setMinute(d.clockHandMinute.value);
        setSecond(d.clockHandSecond.value);
        setMeridiem(d.meridiem);
    }

    const onResetDefaultTime = (d) => {
        setHour(d.clockHandHour.value);
        setMinute(d.clockHandMinute.value);
        setSecond(d.clockHandSecond.value);
        setMeridiem(d.meridiem);
    }

    const onResetDefaultDate = (d) => {
        setDay(d.date);
        setMonth(d.month);
        setYear(d.year);
    }

    const onResetDate = (d) => {
        setDay(d.date);
        setMonth(d.month);
        setYear(d.year);
    }

    const onClearTime = (d) => {
        setHour(d.clockHandHour.value);
        setMinute(d.clockHandMinute.value);
        setSecond(d.clockHandSecond.value);
        setMeridiem(d.meridiem);
    }

    return  <PickyDateTime
        size="xs"
        mode={1}
        show={true}
        locale="en-us"
        onClose={() => {}}
        defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // OPTIONAL. format: "HH:MM:SS AM"
        defaultDate={`${month}/${day}/${year}`}
        onYearPicked={(d) => setYear(d.year)}
        onMonthPicked={(d) => setMonth(d.month)}
        onDatePicked={(d) => setDay(d.date)}
        onResetDate={onResetDate}
        onResetDefaultDate={onResetDefaultDate}
        onSecondChange={(d) => setSecond(d.value)}
        onMinuteChange={(d) => setMinute(d.value)}
        onHourChange={(d) => setHour(d.value)}
        onMeridiemChange={setMeridiem}
        onResetTime={onResetTime}
        onResetDefaultTime={onResetDefaultTime}
        onClearTime={onClearTime}
    />
}