import React, {useState} from "react";
import Button from "../Button";
import "./ActionForm.css";
import TextField from "@material-ui/core/TextField";
import {VscRunAll} from "@react-icons/all-files/vsc/VscRunAll";
import ErrorBox from "../../../errors/ErrorBox";
import {BsCheckCircle} from "@react-icons/all-files/bs/BsCheckCircle";

function PatternToComponent({template, params, onChange, errors, initInputValues}) {
    const pattern = /\${(.*?)}/g
    const matches = template.match(pattern)
    const parts = template.split(pattern)
    const errorMap = (typeof errors !== "undefined") ? errors : {}
    const initInpust = (typeof initInputValues !== "undefined") ? initInputValues : {}

    const [inputValues, setInputValues] = useState(initInpust);

    if (!matches) {
        return <div className="NoPatternToComponent">
            <VscRunAll size={30}/>
            <span className="Template">{template}</span>
        </div>
    }

    const onInputChange = (id) => {
        return (ev) => {
            let newValues = {...inputValues};
            newValues[id] = ev.target.value.replace('"', "");
            onChange(newValues);
            setInputValues(newValues);
        }
    }

    const display = (matches, part) => {
        const partToMatch = "${" + part + "}";
        if (matches.includes(partToMatch)) {
            if (typeof params[part] === "undefined") {
                return "ERROR: " + part + " undefined in template";
            }
            const value = params[part];
            const id = part;
            switch (value.type.toLowerCase()) {
                case "input":
                    const inputValue = id in inputValues ? inputValues[id] : "";
                    return <span style={{display: "inline-block"}}>
                        <TextField value={inputValue}
                                   onChange={onInputChange(id)}
                                   size="small"
                                   variant="outlined"
                                   error={id in errorMap}
                                   {...value.props}/>
                    </span>;
                default:
                    return <span className="Part">>{part}</span>;
            }

        } else {
            return <span className="Part">{part}</span>;
        }
    }
    return <div className="PatternToComponent">
        <VscRunAll size={30}/>
        {
            parts.map(
                (part, index) => (
                    <React.Fragment key={part + index}>
                        {display(matches, part)}
                    </React.Fragment>
                )
            )
        }
    </div>
}

export default function ActionForm({data, onSubmit, onClose}) {

    const template = (str, obj) => str.replace(/\${(.*?)}/g, (x, g) => g in obj ? obj[g] : "");
    const [errors, setErrors] = useState({});
    const [paramsValues, setParamValues] = useState({});
    let params = paramsValues

    if (typeof data.metadata.form === "undefined") {
        return <ErrorBox errorList={[
            {
                msg: "No form definded on server side",
                type: "Misconfiguration",
                loc: "Server side action API"
            }
        ]}/>;
    }

    function ActionStep({actions, onChange, initInputValues, errors}) {
        return actions.map((action, index) => {
            return <PatternToComponent
                key={index}
                template={action.template}
                params={data.metadata.form.params}
                onChange={onChange}
                errors={errors}
                initInputValues={initInputValues}
            />
        })
    }

    const onParamChange = (dataObject) => {
        params = dataObject;
    }

    const checkForErrors = (config) => {
        let errors = {};
        for (const [param, paramConfig] of Object.entries(config)) {
            if (!(param in params) || params[param] === "") {
                errors[param] = "Field cannot be empty";
            }

            const regex = new RegExp(paramConfig.validate.regexp, "g");
            if (!regex.test(params[param])) {
                errors[param] = paramConfig.validate.error;
            }
        }

        setParamValues(params);
        setErrors(errors);

        return Object.keys(errors).length > 0;
    }

    const onFormSubmit = () => {
        if (!checkForErrors(data.metadata.form.params)) {
            const signature = template(data.metadata.form.signature, params);
            onSubmit(signature)
        }
    }

    function displayErrors(errors) {
        function items(errors) {
            if (Object.keys(errors).length > 0) {
                return Object.entries(errors).map((value, index) => {
                    return {
                        msg: "[" + value[0] + "] " + value[1],
                        loc: "ActionForm.js [137]",
                        type: "Exception"
                    }
                });
            }
        }

        function section(errors) {
            if (Object.keys(errors).length > 0) {
                return <ErrorBox errorList={items(errors)}/>
            }
            return "";
        }

        return section(errors);
    }

    return <div className="ActionForm">
        <h1 className="Header">This action performs the following</h1>
        <section className="Template">
            <ActionStep actions={data.metadata.form.steps}
                        initInputValues={paramsValues}
                        errors={errors}
                        onChange={onParamChange}/>
        </section>
        {displayErrors(errors)}
        <section className="Buttons">
            <Button label="Save"
                    icon={<BsCheckCircle size={24} style={{marginRight: 5}}/>}
                    onClick={onFormSubmit}/>
            <Button label="close" onClick={onClose}/>

        </section>
    </div>
}