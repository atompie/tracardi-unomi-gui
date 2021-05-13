import React, {useState} from "react";
import {FormControl, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {remote} from "../../../remote_api/entrypoint";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Stepper from "@material-ui/core/Stepper";
import "./Forms.css";
import "./CreateSourceForm.css";
import TextField from "@material-ui/core/TextField";

export default function CreateSourceForm() {

    const [showTrackerCode, setShowTrackerCode] = useState(false);
    const [scope, setScope] = useState('');
    const [name, setName] = useState('');
    const [trackerApiUrl, setTrackerApiUrl] = useState('http://localhost:8181');

    const onNameChange = (ev) => {
        setName(ev.target.value);
    }

    const onScopeChange = (ev) => {
        setScope(ev.target.value);
    }

    const onTrackerApiChange = (ev) => {
        setTrackerApiUrl(ev.target.value);
    }

    const handleSubmitClick = () => {
        remote({
            url: '/source',
            method: 'post',
            data: {"name": scope, "hostname": trackerApiUrl, "scope": scope}
        }).then(response => {
            setShowTrackerCode(true);
            handleNext();
        }).catch((e) => {
            setShowTrackerCode(false);
        });
    }

    const TrackerCode = () => {
        if (showTrackerCode) {
            return <React.Fragment>
                <Typography variant="h6">Source created</Typography>
                <div className="ScopeDesc" style={{marginTop: 20}}>Please find tracker javascript code in source tab and then copy and paste it in your head tag of your web page.
                </div>

            </React.Fragment>
        }
        return "";
    }

    function getSteps() {
        return ['Scope and name', 'Type context server api host', 'Confirmation'];
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const buttons = () => {
        if (activeStep < steps.length - 2)
            return <React.Fragment>
                {activeStep !== 0 && <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className="Button"
                >
                    Back
                </Button>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className="Button">
                    Next
                </Button>
            </React.Fragment>
    }

    const getStepContent = (step) => {

        switch (step) {
            case 0:
                return <React.Fragment>
                    <div className="ScopeDesc">
                        Type source scope and name. Scope is usually a namespace for all your events and it is
                        associated with your file or business activity.
                    </div>
                    <div style={{marginBottom: 20}}>
                        <TextField
                            variant="outlined"
                            size="small"
                            onChange={onScopeChange}
                            value={scope}
                            label="Scope"
                            style={{marginRight: 5}}/>
                        <TextField
                            variant="outlined"
                            size="small"
                            onChange={onNameChange}
                            value={name}
                            label="Name"/>
                    </div>
                </React.Fragment>
            case 1:
                return <React.Fragment>
                    <div className="ScopeDesc">
                        Tracker API URL is a host name and port where the context server api is located. Usually it is
                        http://localhost:8181 or
                        for dockerized platforms http://context-server:8181.
                    </div>
                    <div style={{marginBottom: 20, width: "80%"}}>
                        <TextField
                            variant="outlined"
                            size="small"
                            onChange={onTrackerApiChange}
                            label="Tracker API"
                            value={trackerApiUrl}
                        />
                    </div>
                    <div>
                        <Button onClick={handleSubmitClick}
                                variant="contained"
                                color="primary">
                            Submit
                        </Button>
                    </div>
                </React.Fragment>
            case 2:
                return <TrackerCode/>

            default:
                return 'Unknown step';
        }
    }

    return <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
            <Step key={label} onClickCapture={() => {
                setActiveStep(index)
            }}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                    <FormControl>{getStepContent(index)}</FormControl>
                    <div>
                        <div>
                            {buttons()}
                        </div>
                    </div>
                </StepContent>
            </Step>
        ))}
    </Stepper>

}