import React, {useState} from "react";
import "./RuleForm.css";
import "./WhenForm.css";
import TextField from "@material-ui/core/TextField";
import Button from "../Button";
import {VscDebugAlt} from "@react-icons/all-files/vsc/VscDebugAlt";
import ObjectList from "../../lists/ObjectList";
import {request} from "../../../../remote_api/uql_api_endpoint";
import WhenChips from "./WhenChips";

export default function WhenForm({dataType, initCondition, onSubmit, onEvaluate}) {

    const [condition, setCondition] = useState(initCondition);
    const [sampleEvents, setSampleEvents] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [savedCondition, setSavedCondition] = useState(initCondition);

    const onReady = (response) => {
        if(response !== false) {
            setSampleEvents(response.data);
            setSavedCondition(condition);
            onSubmit(condition);
        }

    }

    const onEvaluateClick = () => {
        request(
            onEvaluate(condition),
            setLoading,
            setError,
            onReady
        );
    }

    const onConditionDelete = ()=>{
        setSavedCondition("");
        onSubmit("");
    }

    const renderList = (evaluationData, loading, error) => {

        const header = (evaluationData) => {
            if (evaluationData && evaluationData.total) {
                return <React.Fragment>
                    <h1 className="EvalHeader">Then rule will evaluate
                        about {evaluationData ? evaluationData.total : "unknown"} <u>{dataType}</u> a month</h1>
                    <h2 className="SubHeader">Please find sample events below</h2>
                </React.Fragment>
            }
        }

        return <React.Fragment>
            {header(evaluationData)}
            <ObjectList data={evaluationData}
                        loading={loading}
                        errors={error}
                        timeField={(row) => [row.timeStamp, row.scope, row.eventType]}
                        timeFieldLabel="Timestamp"
                        filterFields={[]}/>
        </React.Fragment>

    }

    return <section className="RuleForm IfForm">

            <div className="Rule">
                <h1 className="Header">When <WhenChips condition={savedCondition }
                                                       onDelete={onConditionDelete}/></h1>
            </div>

            <div className="Code">

                <div className="Elevate">
                    <div className="Description">Type condition to evaluate its range. Click EVALUATE to see its potential impact.</div>
                    <TextField
                        label="Condition"
                        multiline
                        rows={2}
                        value={condition}
                        onChange={(ev) => {
                            setCondition(ev.target.value)
                        }}
                        variant="outlined"
                        fullWidth
                    />
                    <div className="Buttons">
                        <Button label="Evaluate & save"
                                icon={<VscDebugAlt size={20} style={{marginRight: "5px"}}/>}
                                onClick={onEvaluateClick}
                        />
                    </div>
                </div>
                {renderList(sampleEvents, loading, error)}
            </div>


    </section>
}