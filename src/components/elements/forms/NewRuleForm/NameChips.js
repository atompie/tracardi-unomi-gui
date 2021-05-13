import Chip from "@material-ui/core/Chip";
import React from "react";
import {VscError} from "@react-icons/all-files/vsc/VscError";
import {VscServerProcess} from "@react-icons/all-files/vsc/VscServerProcess";

const NameChips = ({name, onDelete}) => {

    if(name === "") {
        return <Chip
            icon={<VscError size={24} color={"#d81b60"}/>}
            label="Missing name"
            style={{color:"#d81b60", border: "solid #d81b60 2px", backgroundColor: "inherit"}}/>
    }
    return <Chip
        icon={<VscServerProcess size={24} color={"#0069c0"}/>}
        label={name}
        style={{color:"#0069c0", border: "solid #0069c0 2px", backgroundColor: "inherit"}}
        onDelete={onDelete}
    />
}

export default NameChips;