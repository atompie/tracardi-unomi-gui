import React, {useState} from "react";
import Tabs, {TabCase} from "../tabs/Tabs";
import "./DateTimePicker.css";
import Popover from "@material-ui/core/Popover";
import {makeStyles} from "@material-ui/core";
import Button from "../forms/Button";
import CalendarPicker from "./CalendarPicker";
import RelativePicker from "./RelativePicker";
import {IoCalendarOutline} from "@react-icons/all-files/io5/IoCalendarOutline";
import NowDateTime from "./NowDateTime";

export default function DataTimePicker({type, datetime, onDatetimeSelect}) {

    const activeTab = (datetime) => {
        if(datetime?.now && datetime.now === "now") {
            return 2;
        }

        if(datetime?.relative?.value && datetime.relative.value != null) {
            return 1;
        }

        return 0;
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [tab, setTab] = useState(activeTab(datetime));

    const onDateTimeSet = (datetime) => {
        onDatetimeSelect(datetime);
    }

    const handleDisplay = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'datetime-popover' : undefined;

    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: 5,
            transform: "none",
            transition: "none"
        },
    }));

    const classes = useStyles();

    const datetimeString = (datetime) => {
        if (datetime?.now) {
            return datetime.now;
        }

        if (datetime?.relative?.value) {
            return datetime.relative.type + " " + datetime.relative.value + " " + datetime.relative.entity
        }

        return datetime.year + "/" + datetime.month + "/" + datetime.date + " @ " +
            datetime.hour + ":" + datetime.minute + ":" + datetime.second + datetime.meridiem;
    }

    return <div>
        <Button
            icon={<IoCalendarOutline size={24} style={{marginRight: 5}}/>}
            style={{width: 240, marginLeft: 5, padding: "6px 15px"}}
            label={datetimeString(datetime)}
            onClick={handleDisplay}
        />
        <Popover
            id={id}
            className={classes.root}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <div className="DateTimePicker">
                <Tabs tabs={["Date & time", "Relative", "Now"]} defaultTab={tab} onTabSelect={setTab}>
                    <TabCase id={0}>
                        <CalendarPicker onDateSelect={onDateTimeSet} datetime={datetime}/>
                    </TabCase>
                    <TabCase id={1}>
                        <RelativePicker type={type} onDateSelect={onDateTimeSet} datetime={datetime}/>
                    </TabCase>
                    <TabCase id={2}>
                        <NowDateTime onDateSelect={onDateTimeSet} datetime={datetime}/>
                    </TabCase>
                </Tabs>
            </div>
        </Popover>
    </div>


}