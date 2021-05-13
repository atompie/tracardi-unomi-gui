import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {request} from "../../../../remote_api/uql_api_endpoint";
import "./RuleForm.css";
import "./ActionCard.css";
import "./ThenForm.css";
import "./ActionFormTemplate.css";
import {SiGithubactions} from "@react-icons/all-files/si/SiGithubactions";
import ActionForm from "./ActionForm";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AiOutlineSearch} from "@react-icons/all-files/ai/AiOutlineSearch";
import Button from "../Button";
import ErrorBox from "../../../errors/ErrorBox";
import ThenChips from "./ThenChips";
import WhenChips from "./WhenChips";
import {VscJson} from "@react-icons/all-files/vsc/VscJson";
import {CgPlayListRemove} from "@react-icons/all-files/cg/CgPlayListRemove";
import {CgPlayListAdd} from "@react-icons/all-files/cg/CgPlayListAdd";
import {VscReferences} from "@react-icons/all-files/vsc/VscReferences";
import {BsFileArrowDown} from "@react-icons/all-files/bs/BsFileArrowDown";
import {BsFileArrowUp} from "@react-icons/all-files/bs/BsFileArrowUp";

function ActionCard({actionData, onClick}) {

    const onCardClick = () => {
        onClick(actionData);
    }

    const icon = (icon) => {
        if (icon === "json") {
            return <VscJson size={50}/>;
        } else if (icon === "addToList") {
            return <CgPlayListAdd size={50}/>;
        } else if (icon === "copy") {
            return <VscReferences size={50}/>;
        } else if (icon === "removeFromList") {
            return <CgPlayListRemove size={50}/>;
        } else if(icon === "increment") {
            return <BsFileArrowUp size={50}/>
        } else if(icon === "decrement") {
            return <BsFileArrowDown size={50}/>
        }
        else {
            return <SiGithubactions size={50}/>;
        }
    }

    return <div className="ActionCard" onClick={onCardClick}>
        <div className="Icon">{icon(actionData.metadata.icon)}</div>
        <div className="Title">{actionData.function}</div>
        <div className="Description">{actionData.metadata.description}</div>
    </div>
}

export default function ThenFrom({initCondition, initActions, onSubmit}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [actionForm, setActionForm] = useState(null);

    const onSearch = () => {
        request({
            url: '/action/search?query=' + encodeURIComponent(searchQuery),
            method: "get"
        }, setLoading, setError, onReady, false);
    }

    useEffect(onSearch, [searchQuery])

    const onReady = (data) => {
        setError(false);
        setActionForm(null);
        setSearchResult(data);
    }

    const setFilterChange = (ev) => {
        setSearchQuery(ev.target.value);
    }

    const onActionConfiguration = (data) => {
        setActionForm(data);
    }

    const onActionReady = (actionSignature) => {
        if (actionSignature) {
            onSubmit([...initActions, actionSignature])
            onActionClose();
        }
    }

    const onActionClose = () => {
        setActionForm(null);
    }

    const onChipDelete = (id) => {
        const reducedArr = [...initActions];
        reducedArr.splice(id, 1);
        onSubmit(reducedArr)
    }

    function displayActionCards(searchResult) {
        if (searchResult.data) {
            return searchResult.data.map((row, index) => <ActionCard
                    key={index}
                    actionData={row}
                    onClick={onActionConfiguration}
                />
            )
        }
    }

    return <div className="RuleForm ThenForm">
        <div className="Rule">
            <h1 className="Header">When <WhenChips condition={initCondition}/> Then <ThenChips
                actions={initActions} onDelete={onChipDelete}/></h1>

        </div>
        <div className="SearchInput">
            <TextField id="search-input" label="Search for actions"
                       onChange={setFilterChange}
                       size="small"
                       fullWidth
                       value={searchQuery}
                       variant="outlined"
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <AiOutlineSearch size={24}/>
                               </InputAdornment>
                           ),
                       }}
            />
            <Button label="Search" onClick={onSearch}/>
        </div>

        {error !== false && <ErrorBox errorList={error}/>}

        {!actionForm && <div className="ActionSelector">
            {displayActionCards(searchResult)}
        </div>}

        {actionForm && <ActionForm
            data={actionForm}
            onSubmit={onActionReady}
            onClose={onActionClose}
        />}

    </div>
}