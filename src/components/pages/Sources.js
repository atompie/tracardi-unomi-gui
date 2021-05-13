import {connect} from "react-redux";
import React from "react";
import {deleteData, getData} from "../../remote_api/uql_api_endpoint";
import ListDetailView from "../elements/ListDetailView";
import FilterListWrapper from "../elements/FilterListWrapper";
import SourceCard from "../elements/lists/cards/SourceCard";
import SourceDetails from "../elements/details/SourceDetails";
import TopInfoBar from "../TopInfoBar";
import Breadcrumps from "../elements/misc/Breadcrumps";
import CenteredCircularProgress from "../elements/progress/CenteredCircularProgress";
import {showAlert} from "../../redux/reducers/alertSlice";
import SourceFormDrawer from "../elements/drawers/SourceFormDrawer";
import {CgPlayListAdd} from "@react-icons/all-files/cg/CgPlayListAdd";
import Button from "../elements/forms/Button";

const Sources = ({showAlert}) => {

    const [formToggle, setFormToggle] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [ready, setReady] = React.useState(false);

    const onClick = (id) => {
        getData('/source/'+id, setLoading, setError, setReady)
    }

    const onAdd = () => {
        setFormToggle(true);
    }

    const onDeleteOk = (data) => {
        setReady(false);
    }

    const onDelete = (id) => {
        deleteData('/source/' + id, ()=>{}, ()=>{}, onDeleteOk);
    }

    const details = () =>  {
        if(loading===true) {
            return <CenteredCircularProgress/>
        } else if (ready !== false) {
            return <SourceDetails data={ready.data} onDelete={onDelete}/>
        } else if (error !== false) {
            showAlert({message: error[0].msg, type: "error", hideAfter:2000});
            return ""
        }
    }

    const blocks = () => (<FilterListWrapper
        endPoinyUrl="/source/select"
        renderList={
            (data) => {
                return data.map((row, index) => (
                    <SourceCard key={index} data={row} onClick={onClick}/>
                ))
            }
        }
        filterLabel="Type scope name to filter"
        filterKey="filterScopeQuery"
    />);

    return <React.Fragment>
        <TopInfoBar buttons={[<Button
            label="Add source"
            onClick={onAdd}
            icon={<CgPlayListAdd size={24} style={{marginRight: 5}}/>}/>]}>
            <Breadcrumps/>
        </TopInfoBar>
        <ListDetailView list={blocks} detail={details}/>
        <SourceFormDrawer
            width={1000}
            label="Create Source"
            open={formToggle}
            onClose={() => setFormToggle(false)}
        />
    </React.Fragment>

}

const mapProps = (state) => {
    return { }
}
export default connect(
    mapProps,
    {showAlert}
)(Sources)
