import Chip from "@material-ui/core/Chip";
import React from "react";
import {VscError} from "@react-icons/all-files/vsc/VscError";
import {CgHashtag} from "@react-icons/all-files/cg/CgHashtag";

function TagsChips({tags, onDelete}) {

    const onChipDelete = (id) => {
        return () => {
            onDelete(id);
        }
    }

    const render = () => {
        if (typeof tags ==="undefined" || tags.length === 0) {
            return <Chip
                icon={<VscError size={24} color={"#d81b60"}/>}
                label="No tags yet"
                style={{color: "#d81b60", border: "solid #d81b60 2px", backgroundColor: "inherit"}}/>
        }

        let props = {
            icon: <CgHashtag size={24} color={"#0069c0"}/>,
            style: {color: "#0069c0", border: "solid #0069c0 2px", backgroundColor: "inherit"}
        }


        return tags.map((signature, index) => {

                if (onDelete) {
                    props = {...props, onDelete:onChipDelete(index)}
                }

                return <Chip
                    key={index}
                    label={signature}
                    {...props}
                />
            }
        );
    }

    return render();

}

export default TagsChips;