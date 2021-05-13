import React from "react";
import "./RuleForm.css";
import "./SaveForm.css";
import WhenChips from "./WhenChips";
import ThenChips from "./ThenChips";
import Button from "../Button";
import {BsCheckCircle} from "@react-icons/all-files/bs/BsCheckCircle";
import NameChips from "./NameChips";
import ScopeChips from "./ScopeChips";
import TagsChips from "./TagsChips";
import SuccessTag from "../../misc/SuccessTag";

export default function SaveForm({
                                     formType,
                                     initCondition, initActions, initScope,
                                     initName,
                                     initTags,
                                     initDesc,
                                     onSubmit,
                                     success
                                 }) {

    const status = () => {
        if (success !== null) {
            return (success) ? "Elevate ElevateOk" : "Elevate ElevateFailed";
        }
        return "Elevate";
    }

    return <div className="RuleForm SaveForm">

        <div className={status()}>

            <h1 className="Header" style={{marginTop: 0}}>Summary</h1>

            <div className="Rule">
                <h1 className="Header">
                    {formType} <NameChips name={initName}/>
                </h1>
                <h1>
                    In scope <ScopeChips scope={initScope}/> With tags <TagsChips tags={initTags}/>
                </h1>
                <h1>
                    When <WhenChips
                    condition={initCondition}/>
                </h1>
                {initActions && <h1>
                    Then <ThenChips
                    actions={initActions}/>
                </h1>}

            </div>

            <h1 className="Header" style={{marginTop: 0}}>Description</h1>
            {(initDesc) ? initDesc : "No description provided."}

            <div className="Buttons">
                <Button label="save & commit"
                        icon={<BsCheckCircle size={24} style={{marginRight: 5}}/>}
                        onClick={onSubmit}
                        disabled={success}
                />
                {success && <SuccessTag label={"Saved without errors"}/>}
            </div>

        </div>

    </div>
}