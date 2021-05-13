import {connect} from "react-redux";
import React from "react";
import {deleteData, getData} from "../../remote_api/uql_api_endpoint";
import SegmentDetails from "../elements/details/SegmentDetails";
import ListDetailView from "../elements/ListDetailView";
import FilterListWrapper from "../elements/FilterListWrapper";
import SegmentCard from "../elements/lists/cards/SegmentCard";
import TopInfoBar from "../TopInfoBar";
import Breadcrumps from "../elements/misc/Breadcrumps";
import {showAlert} from "../../redux/reducers/alertSlice";
import {CgPlayListAdd} from "@react-icons/all-files/cg/CgPlayListAdd";
import Button from "../elements/forms/Button";
import SegmentFormDrawer from "../elements/drawers/SegmentFormDrawer";


const Segments = ({showAlert}) => {

    const init = {
        condition: "",
        scope: "",
        name: "",
        tags: [],
        description: "",
    }

    const [editInitData, setEditInitData] = React.useState(init);
    const [formToggle, setFormToggle] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [ready, setReady] = React.useState(false);

    const none = () => {}

    const onAdd = () => {
        setEditInitData({
            condition: "",
            scope: "",
            name: "",
            tags: [],
            description: "",
        });
        setFormToggle(true);
    }
    const onEdit = (data) => {
        setEditInitData({
            condition: data.condition,
            scope: data.scope,
            name: data.name,
            tags: data.tags,
            description: data.description,
        });
        setFormToggle(true);
    }

    const onDuplicateEdit = (data) => {
        setEditInitData({
            condition: data.condition,
            scope: data.scope,
            name: '',
            tags: data.tags,
            description: data.description,
        });
        setFormToggle(true);
    }

    const onDeleteOk = (data) => {
        setReady(false);
    }
    const onClick = (id) => {
        getData('/segment/' + id, setLoading, setError, setReady)
    }

    const onDelete = (id) => {
        deleteData('/segment/' + id, none, none, onDeleteOk);
    }

    const details = () => {
        if (ready !== false) {
            return <SegmentDetails data={ready.data}
                                   onEdit={onEdit}
                                   onDuplicate={onDuplicateEdit}
                                   onDelete={onDelete}/>
        } else if (error !== false) {
            showAlert({message: error[0].msg, type: "error", hideAfter:2000});
            return ""
        }
    }

    const blocks = () => {
        return <FilterListWrapper
            endPoinyUrl="/segment/select"
            renderList={
                (data) => {
                    return data.map((row, index) => (
                        <SegmentCard key={index} data={row} onClick={onClick}/>
                    ))
                }
            }
            filterLabel="Type condition to filter segments"
            filterKey="segmentFilterQuery"
        />
    }

    return <React.Fragment>

        <TopInfoBar buttons={[
            <Button
                label="Add segment"
                onClick={onAdd}
                icon={<CgPlayListAdd size={24} style={{marginRight:5}}/>}/>
        ]}>
            <Breadcrumps/>
        </TopInfoBar>
        <ListDetailView list={blocks} detail={details}/>
        <SegmentFormDrawer
            init={editInitData}
            label="Create Segment"
            open={formToggle}
            onClose={() => setFormToggle(false)}
        />
    </React.Fragment>;
}

const mapProps = (state) => {
    return {
        notification: state.notificationReducer,
        uqlQuery: state.uqlReducer,
    }
}
export default connect(
    mapProps,
    {showAlert}
)(Segments)
