import NameChips from "../forms/NewRuleForm/NameChips";
import ScopeChips from "../forms/NewRuleForm/ScopeChips";
import TagsChips from "../forms/NewRuleForm/TagsChips";
import WhenChips from "../forms/NewRuleForm/WhenChips";
import ThenChips from "../forms/NewRuleForm/ThenChips";
import React from "react";
import './UqlDetails.css';

const UqlDetails = ({data, type}) => {

    const Name = () => <React.Fragment>{type}  <NameChips name={data.uql.name}/></React.Fragment>
    const Inscope = () => <React.Fragment>In scope <ScopeChips scope={data.uql.scope}/></React.Fragment>
    const WithTags = () => <React.Fragment>With tags <TagsChips tags={data.uql.tags}/></React.Fragment>
    const Condition = () => <React.Fragment>Runs when <WhenChips condition={data.uql.condition}/></React.Fragment>
    const Actions = () => <React.Fragment>Then executes <ThenChips actions={data.uql.actions}/></React.Fragment>

    const RenderChips = () => {
        if (typeof data.uql !== "undefined") {
            return <div className="UqlChips">
                <Name/> <Inscope/> {data.uql.tags && <WithTags/>} <Condition/> {data.uql.actions && <Actions/>}
            </div>
        }
        return "";
    }

    return <RenderChips/>;
}

export default UqlDetails;