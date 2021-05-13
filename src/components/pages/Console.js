import React from "react";
import QueryResponseColumns from "../elements/QueryResponseColumns";
import TopInfoBar from "../TopInfoBar";
import Breadcrumps from "../elements/misc/Breadcrumps";
import Input from "../elements/forms/inputs/Input";

const Console = () => {

    const savedUql = localStorage.getItem("consoleUql");
    const [uql, setUql] = React.useState(((savedUql) ? savedUql : ""));

    function onQuery(q) {
        setUql(q);
        localStorage.setItem("consoleUql", q);
    }

    return <React.Fragment>

        <TopInfoBar>
            <Breadcrumps/>
        </TopInfoBar>
        <div style={{margin: "7px 5px"}}>
            <Input variant="outlined" label="UQL" onEnterPressed={onQuery} initValue={uql}/>
        </div>

        <QueryResponseColumns uql={uql} />;

    </React.Fragment>

}
export default Console;

