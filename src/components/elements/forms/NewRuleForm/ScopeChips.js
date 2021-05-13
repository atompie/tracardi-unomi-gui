import Chip from "@material-ui/core/Chip";
import React from "react";
import {VscError} from "@react-icons/all-files/vsc/VscError";
import {IoCodeWorkingOutline} from "@react-icons/all-files/io5/IoCodeWorkingOutline";

const ScopeChips = ({scope, onDelete}) => {

    if(scope === "") {
        return <Chip
            icon={<VscError size={24} color={"#d81b60"}/>}
            label="Missing scope"
            style={{color:"#d81b60", border: "solid #d81b60 2px", backgroundColor: "inherit"}}/>
    }
    return <Chip
        icon={<IoCodeWorkingOutline size={24} color={"#0069c0"}/>}
        label={scope}
        style={{color:"#0069c0", border: "solid #0069c0 2px", backgroundColor: "inherit"}}
        onDelete={onDelete}
    />
}

export default ScopeChips;