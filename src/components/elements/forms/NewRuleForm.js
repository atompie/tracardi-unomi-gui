import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./NewRuleForm.css";
import ThenFrom from "./NewRuleForm/ThenForm";
import WhenForm from "./NewRuleForm/WhenForm";
import NameForm from "./NewRuleForm/NameForm";
import SaveForm from "./NewRuleForm/SaveForm";
import {request} from "../../../remote_api/uql_api_endpoint";
import ErrorBox from "../../errors/ErrorBox";

function getSteps() {
    return ['When event', 'Then', 'Name & Tags', 'Save it'];
}

export default function NewRuleForm({init}) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    // Process status
    const [configuredActions, setConfiguredActions] = useState(init.actions);
    const [configuredCondition, setConfiguredCondition] = useState(init.condition);
    const [configuredScope, setConfiguredScope] = useState(init.scope);
    const [configuredName, setConfiguredName] = useState(init.name);
    const [configuredTags, setConfiguredTags] = React.useState(init.tags)
    const [configuredDescription, setConfiguredDescription] = useState(init.description);
    const [error, setError] = useState(false);
    const [successfulSubmit, setSuccessfulSubmit] = useState(null);

    const steps = getSteps();

    const onRuleSubmit = () => {
        const payload = {
            name: configuredName,
            description: configuredDescription,
            scope: configuredScope,
            tags: configuredTags,
            condition: configuredCondition,
            actions: configuredActions
        };
        request({
                url: "/rule",
                method: "post",
                data: payload
            },
            () => {
            },
            setError,
            (data) => {
                setSuccessfulSubmit(data !== false);

            }
        )
    }

    const onEvaluate = (condition) => {
        return {
            url: '/event/select?simplified=0&limit=5',
            method: "post",
            header: {"Content-type": "text/plain"},
            data: condition
        }
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <WhenForm
                    dataType="events"
                    initCondition={configuredCondition}
                    onEvaluate={onEvaluate}
                    onSubmit={setConfiguredCondition}/>;
            case 1:
                return <ThenFrom
                    initCondition={configuredCondition}
                    initActions={configuredActions}
                    onSubmit={setConfiguredActions}/>;
            case 2:
                return <NameForm
                    formType="Rule"
                    initCondition={configuredCondition}
                    initActions={configuredActions}
                    initScope={configuredScope}
                    initName={configuredName}
                    initTags={configuredTags}
                    initDesc={configuredDescription}
                    onScopeSubmit={setConfiguredScope}
                    onNameSubmit={setConfiguredName}
                    onDescSubmit={setConfiguredDescription}
                    onTagsSubmit={setConfiguredTags}

                />;
            case 3:
                return <SaveForm
                    formType="Rule"
                    initCondition={configuredCondition}
                    initActions={configuredActions}
                    initScope={configuredScope}
                    initName={configuredName}
                    initTags={configuredTags}
                    initDesc={configuredDescription}
                    onSubmit={onRuleSubmit}
                    success={successfulSubmit}
                />;
            default:
                return 'Unknown step';
        }
    }

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const setActive = (step) => {
        setSuccessfulSubmit(null);
        setError(false);
        setActiveStep(step);
    }

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActive((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActive((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActive((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActive(0);
    };

    const nav = () => {

        const NextButton = () => {
            let buttonProps = {
                variant: "contained",
                color: "primary",
                onClick: handleNext
            }

            if (activeStep !== steps.length - 1) {
                return <Button {...buttonProps}>Next</Button>
            }

            return <Button disabled={true} variant="contained">Next</Button>
        }

        return activeStep === steps.length ? (
            <div>
                <Typography>
                    All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset}>
                    Reset
                </Button>
            </div>
        ) : (
            <nav className="Navigation">
                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                {isStepOptional(activeStep) && (
                    <Button variant="contained"
                            color="primary"
                            onClick={handleSkip}>
                        Skip
                    </Button>
                )}
                <NextButton/>
            </nav>
        )
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            padding: "15px",
            backgroundColor: "inherit"
        }
    }));

    const classes = useStyles();

    return (
        <div className="NewRule">
            <div className="Top">
                <Stepper activeStep={activeStep} className={classes.root}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label}
                                  onClickCapture={() => {
                                      setActive(index)
                                  }}
                                  style={{cursor: "pointer"}}
                                  {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {nav()}
            </div>

            {error && <ErrorBox errorList={error}/>}

            <section className="NewRuleForm">{getStepContent(activeStep)}</section>

        </div>
    );
}


