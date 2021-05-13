import Button from "../forms/Button";
import {BiTimeFive} from "@react-icons/all-files/bi/BiTimeFive";
import React from "react";
const NowDateTime = ({onDateSelect,datetime}) => {

    const onNowClick = () => {
        const date = {
            ...datetime,
            relative: {
                type: null,
                value: null,
                entity: null
            },
            now: "now"
        }
        onDateSelect(date);
    }

    return <div className="DateNow">
        <div>
            Setting the time to "now" means that on every refresh this time will be set to current
            date and time.
        </div>
        <Button label="Set to NOW"
                style={{width: 240, marginLeft: 20}}
                icon={<BiTimeFive size={20} style={{marginRight: 5}}/>}
                onClick={() => onNowClick()}
        />
    </div>
}

export default NowDateTime;