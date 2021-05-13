import RightPaperHeader from "../RightPaperHeader";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import SegmentForm from "../forms/SegmentForm";

export default function SegmentFormDrawer(
    {
        init,
        width,
        label,
        open,
        onClose
    }) {

    const onSegmentClose = (ev) => {
        onClose(ev);
    }

    return <Drawer anchor="right" open={open} onClose={onSegmentClose}>
        <div style={{width: (width) ? width : 1200, overflowX: "hidden"}}>
            <RightPaperHeader onClose={onSegmentClose}>
                <span style={{fontWeight: 600}}>{label}</span>
            </RightPaperHeader>
            {open && <SegmentForm init={init}/>}
        </div>
    </Drawer>
}
