import {connect} from "react-redux";
import React from "react";
import {deleteData, getData} from "../../remote_api/uql_api_endpoint";
import ListDetailView from "../elements/ListDetailView";
import FilterListWrapper from "../elements/FilterListWrapper";
import RuleCard from "../elements/lists/cards/RuleCard";
import RuleDetails from "../elements/details/RuleDetails";
import CenteredCircularProgress from "../elements/progress/CenteredCircularProgress";
import TopInfoBar from "../TopInfoBar";
import Breadcrumps from "../elements/misc/Breadcrumps";
import {showAlert} from "../../redux/reducers/alertSlice";
import RuleFormDrawer from "../elements/drawers/RuleFormDrawer";
import Button from "../elements/forms/Button";
import {CgPlayListAdd} from "@react-icons/all-files/cg/CgPlayListAdd";

const Rules = ({showAlert}) => {

    const init = {
        actions: [],
        condition: "",
        scope: "",
        name: "",
        tags: [],
        description: "",
    }

    const [editInitData, setEditInitData] = React.useState(init);
    const [formToggle, setFormToggle] = React.useState(false);
    const [loadingDetails, setLoadingDetails] = React.useState(false);
    const [errorDetails, setErrorDetails] = React.useState(false);
    const [ready, setReady] = React.useState(false);

    const none = () => {
    }

    const onDeleteOk = (data) => {
        setReady(false);
    }

    const onClick = (id) => {
        getData('/rule/' + id, setLoadingDetails, setErrorDetails, setReady);
    }

    const onAdd = () => {
        setEditInitData({
            actions: [],
            condition: "",
            scope: "",
            name: "",
            tags: [],
            description: "",
        });
        setFormToggle(true);
    }

    const onDelete = (id) => {
        deleteData('/rule/' + id, none, none, onDeleteOk);
    }

    const onEdit = (data) => {
        setEditInitData({
            actions: data.actions,
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
            actions: data.actions,
            condition: data.condition,
            scope: data.scope,
            name: '',
            tags: data.tags,
            description: data.description,
        });
        setFormToggle(true);
    }

    const details = () => {
        if (ready !== false) {
            return <RuleDetails data={ready.data}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onDuplicate={onDuplicateEdit}
            />
        } else if (loadingDetails === true) {
            return <CenteredCircularProgress/>
        } else if (errorDetails !== false) {
            showAlert({message: errorDetails[0].msg, type: "error", hideAfter: 2000});
            return ""
        }
    }

    const blocks = () => {
        return <FilterListWrapper
            endPoinyUrl="/rule/select"
            renderList={
                (data) => {
                    return data.map((row, index) => (
                        <RuleCard key={index} data={row} onClick={onClick}/>
                    ))
                }
            }
            filterLabel="Type condition to filter rules"
            filterKey="filterRuleQuery"
        />
    }

    return <React.Fragment>

        <TopInfoBar buttons={[<Button
            label="Add rule"
            onClick={onAdd}
            icon={<CgPlayListAdd size={24} style={{marginRight: 5}}/>}/>]}>
            <Breadcrumps/>
        </TopInfoBar>
        <ListDetailView list={blocks} detail={details}/>
        <RuleFormDrawer
            init={editInitData}
            label="Create Rule"
            open={formToggle}
            onClose={() => setFormToggle(false)}
        />
    </React.Fragment>
}

const mapProps = (state) => {
    return {}
}
export default connect(
    mapProps,
    {showAlert}
)(Rules)
