import React from "react";
import "./NameForm.css";
import TextField from "@material-ui/core/TextField";
import "./RuleForm.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import UqlDetails from "../../details/UqlDetails";

export default function NameForm({
                                     formType,
                                     initCondition,
                                     initActions,
                                     initScope,
                                     initName,
                                     initTags,
                                     initDesc,
                                     onScopeSubmit,
                                     onNameSubmit,
                                     onDescSubmit,
                                     onTagsSubmit,
                                 }) {

    return <div className="RuleForm RuleNameForm">
        <div className="Rule">
            <h1 className="Header">
                <UqlDetails type={formType}
                            data={
                                {
                                    uql: {
                                        name: initName,
                                        scope: initScope,
                                        tags: initTags,
                                        condition: initCondition,
                                        actions: initActions
                                    }

                                }
                            }
                />
            </h1>
        </div>
        <div className="Elevate">
            <h1 className="Header" style={{marginTop: 0}}>Scope</h1>
            <div className="Description">Set scope and {formType.toLowerCase()} name. Scope is an id of your site.</div>
            <TextField
                label="Scope"
                value={initScope}
                onChange={(ev) => {
                    onScopeSubmit(ev.target.value)
                }}
                size="small"
                variant="outlined"
            />

            <h1 className="Header">Name</h1>
            <div className="Description">{formType} name can be any string that
                identifies {formType.toLowerCase()}. {formType} id is made out of {formType.toLowerCase()}
                name by replacing spaces with hyphens and lowering the string
            </div>
            <TextField
                label={formType + " name"}
                value={initName}
                onChange={(ev) => {
                    onNameSubmit(ev.target.value)
                }}
                size="small"
                variant="outlined"
                fullWidth
            />

            <h1 className="Header">Tags <sup style={{fontSize: "70%"}}>* optional</sup></h1>
            <div className="Description">Tags will help you to find a {formType.toLowerCase()}.
            </div>
            <ReactTagInput
                tags={(initTags) ? initTags : []}
                onChange={(newTags) => onTagsSubmit(newTags)}
                removeOnBackspace={true}
                maxTags={10}
                placeholder="Type tag and press enter"
            />

            <h1 className="Header">Description <sup style={{fontSize: "70%"}}>* optional</sup></h1>
            <div className="Description">Description will help you to understand what a {formType.toLowerCase()} is
                doing.
            </div>
            <TextField
                label={formType + " description"}
                value={initDesc}
                multiline
                rows={3}
                onChange={(ev) => {
                    onDescSubmit(ev.target.value)
                }}
                variant="outlined"
                fullWidth
            />

        </div>

    </div>

}