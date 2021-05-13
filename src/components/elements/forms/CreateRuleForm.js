import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {FormControl} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import {createRule} from "../../../remote_api/uql_api_endpoint";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import "./CreateRuleForm.css";
import "./Forms.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select scope and rule name', 'Type rule description', 'Create condition', 'Create action', 'Submit rule'];
}

function KeyValueFragment({name, value}) {
    return <div style={{paddingLeft: "5px"}}>
        <div style={{fontWeight: 400, minWidth: 100, display: "inline-block", padding: 5}}>{name}:</div>
        <span style={{
            padding: 5,
            borderBottom: "solid 1px #ccc",
            display: "inline-block",
            minWidth: 450,
        }}>{value}</span>
    </div>
}

function RuleConditionFragment({conditionValue, handleConditionChange}) {

    return <React.Fragment>
        <div  className="description">
            Condition is SQL like condition that describes when the rule should be triggered.
            Please refer to documentation to see the syntax of conditions.
        </div>
        <TextField
            id="rule-condition"
            label="Rule condition"
            multiline
            size="small"
            variant="outlined"
            value={conditionValue}
            onChange={handleConditionChange}
        />
        <FormHelperText>Example: (scope="my-site1" OR scope="my-site2") AND event:type="view"</FormHelperText>
    </React.Fragment>
}

function RuleDescFragment({descValue, handleDescChange}) {
    return <React.Fragment>
        <div  className="description">
            Rule description can be any string that describes rule's purpose. It corresponds with the action that will
            fire when
            condition is met.
        </div>
        <TextField id="rule-desc"
                   label="Rule description"
                   variant="outlined"
                   size="small"
                   value={descValue}
                   onChange={handleDescChange}/>
        <FormHelperText>Example: Add points to loyalty card with every purchase</FormHelperText>
    </React.Fragment>
}

function RuleNameFragment({nameValue, handleNameChange, scope, handleScopeChange}) {
    const classes = useStyles();
    return <React.Fragment>
        <div className="description">
            Set scope and rule name. Scope is an id of your site and rule name can be any string that identifies rule.
            Rule id is made out of rule name by replacing spaces with hyphens and lowering the string.
        </div>
        <div style={{display: "flex"}}>
            <div style={{marginRight: 10}}>
                <TextField
                    required
                    label="Scope"
                    value={scope}
                    onChange={handleScopeChange}
                    variant="outlined"
                    size="small"
                />
                <FormHelperText>Scope</FormHelperText>
            </div>
            <div>
                <TextField required
                           label="Rule name"
                           variant="outlined"
                           size="small"
                           value={nameValue}
                           onChange={handleNameChange}/>
                <FormHelperText>Example: points with every purchase</FormHelperText>
            </div>

        </div>
    </React.Fragment>
}

function RuleActionFragment({actionValue, handleActionChange}) {
    return <React.Fragment>
        <div className="description">
            Rule actions is a set of predefined actions that will fire when the condition is fulfilled.
        </div>
        <TextField
            id="rule-action"
            label="Rule action"
            multiline
            variant="outlined"
            size="small"
            value={actionValue}
            onChange={handleActionChange}
        />
        <FormHelperText>Example: IncreaseLoyalityCardPoints(100), CopyEventsToProfileProperties()</FormHelperText>
    </React.Fragment>
}

function SubmitRule({scope, name, desc, condition, action, handleReset}) {
    const classes = useStyles();

    const [resetDisabled, setResetDisabled] = React.useState(false);
    const [submitDisabled, setSubmitDisabled] = React.useState(false);
    const handleResetDisabled = (toggle) => {
        setResetDisabled(toggle);
    };
    const handleSubmitDisabled = (toggle) => {
        setSubmitDisabled(toggle);
    };

    const [submitResult, setSubmitResult] = React.useState('');
    const [submitResultType, setSubmitTypeResult] = React.useState('');
    const handleSubmitResult = (message) => {
        setSubmitResult(message);
    };
    const handleSubmitTypeResult = (type) => {
        setSubmitTypeResult(type);
    };

    const handleSubmitClick = () => {
        let params = {
            "scope": scope,
            "name": name,
            "desc": desc,
            "condition": condition,
            "action": action
        }

        const ok = (response) => {
            console.log(response)
            handleSubmitTypeResult("success");
            handleSubmitResult("Rule created.");
            handleSubmitDisabled(false)
        }

        const failed = (e) => {
            handleSubmitDisabled(false)
            handleSubmitTypeResult("error");
            if (typeof (e.response) != "undefined") {
                handleSubmitResult(e.response.data.detail);
            } else {
                handleSubmitResult(e.toString());
            }
        }

        const loading = () => {
            handleSubmitDisabled(true)
            handleSubmitTypeResult("loading");
            handleSubmitResult("Loading");
        }

        createRule(params, loading, ok, failed);
    }

    const handleResetClick = () => {
        handleReset();
        handleSubmitDisabled(false)
    };

    const submitStatus = (message, type) => {
        if (message !== "") {
            return <Alert severity={type} style={{marginTop: 20}}>
                <AlertTitle>{type.toUpperCase()}</AlertTitle>
                <pre style={{width: "515px", overflow: "auto"}}>{message}</pre>
            </Alert>
        }
    }

    return <React.Fragment>
        <div>All steps completed - here is your rule summary</div>
        <div style={{marginTop: 20}}>
            <KeyValueFragment name={"Scope"} value={scope}/>
            <KeyValueFragment name={"Name"} value={name}/>
            <KeyValueFragment name={"Description"} value={desc}/>
            <KeyValueFragment name={"Condition"} value={condition}/>
            <KeyValueFragment name={"Actions"} value={action}/>
        </div>
        {submitStatus(submitResult, submitResultType)}
        <div style={{marginTop: 10}}>
            <Button onClick={handleSubmitClick} className={classes.button} variant="contained"
                    color="primary" disabled={submitDisabled}>
                Submit
            </Button>
            <Button onClick={handleResetClick} className={classes.button} disabled={resetDisabled}>
                Back
            </Button>
        </div>

    </React.Fragment>
}


export default function CreateRuleForm() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);


    const [scope, setScope] = React.useState('');
    const handleScopeChange = (event) => {
        setScope(event.target.value);
    };

    const [conditionValue, setConditionValue] = React.useState('');
    const handleConditionChange = (event) => {
        setConditionValue(event.target.value);
    };

    const [actionValue, setActionValue] = React.useState('');
    const handleActionChange = (event) => {
        setActionValue(event.target.value);
    };

    const [nameValue, setNameValue] = React.useState('');
    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };

    const [descValue, setDescValue] = React.useState('');
    const handleDescChange = (event) => {
        setDescValue(event.target.value);
    };

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        handleBack()
    }

    const getStepContent = (step) => {

        switch (step) {
            case 0:
                return <RuleNameFragment
                    nameValue={nameValue} handleNameChange={handleNameChange}
                    scope={scope} handleScopeChange={handleScopeChange}/>
            case 1:
                return <RuleDescFragment descValue={descValue} handleDescChange={handleDescChange}/>
            case 2:
                return <RuleConditionFragment conditionValue={conditionValue}
                                              handleConditionChange={handleConditionChange}/>
            case 3:
                return <RuleActionFragment actionValue={actionValue} handleActionChange={handleActionChange}/>
            case 4:
                return <SubmitRule scope={scope}
                                   name={nameValue}
                                   desc={descValue}
                                   condition={conditionValue}
                                   action={actionValue}
                                   handleReset={handleReset}/>
            default:
                return 'Unknown step';
        }
    }
    const buttons = () => {
        if (activeStep < steps.length - 1)
            return <React.Fragment>
                {activeStep !== 0 &&
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                </Button>
                }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}>
                    Next
                </Button>
            </React.Fragment>
    }
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label} onClickCapture={() => {
                        setActiveStep(index)
                    }}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <FormControl className={classes.formControl}>{getStepContent(index)}</FormControl>
                            <div className={classes.actionsContainer}>
                                <div>
                                    {buttons()}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
