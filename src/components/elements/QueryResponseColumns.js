import React, {useEffect} from "react";
import "./QueryResponseColumns.css";
import PlayArrow from '@material-ui/icons/PlayArrow';
import theme from "../../themes/inspector_light_theme";
import {ObjectInspector} from "react-inspector";
import MethodTag from "./misc/MethodTag";
import StatusCodeTag from "./misc/StatusCodeTag";
import {fetchData, putData} from "../../remote_api/uql_api_endpoint";
import CenteredCircularProgress from "./progress/CenteredCircularProgress";
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';


function QueryResponseColumns({uql}) {

    const [rightLoading, setRightLoading] = React.useState(false);
    const [rightError, setRightError] = React.useState(false);
    const [leftLoading, setLeftLoading] = React.useState(false);
    const [leftError, setLeftError] = React.useState(false);
    const [requestJson, setRequestJson] = React.useState(false);
    const [responseJson, setResponseJson] = React.useState(false);
    const [jsonStatus, setJsonStatus] = React.useState("OK");
    const [disablePlay, setDisablePlay] = React.useState(false);


    const onRequestReady = (data) => {
        setRequestJson(data);
        setDisablePlay(false);
        setResponseJson(false);
    }

    useEffect(
        () => {
            fetchData(uql, '/console/uql2unomi/request', setLeftLoading, setLeftError, onRequestReady);
        }, [uql]
    );

    const onJsonUpdate = (content) => {
        if(content.error === false) {
            let d = requestJson
            d.data.body = content.jsObject
            setRequestJson(d);
            setJsonStatus("OK");
            setDisablePlay(false);
        } else {
            setDisablePlay(true);
            setJsonStatus("ERROR "+ content.error.reason + " (line: "+content.error.line+")");
        }
    }

    const JsonTree = (obj, loading, error) => {
        if (loading === true) {
            return <CenteredCircularProgress/>
        } else if (error !== false) {
            return <pre>
                {error}
            </pre>
        }
        if(typeof obj.data !== "undefined")
            return <ObjectInspector data={obj.data.body} theme={theme} expandLevel={3}/>
    }

    const JsonEditor = (obj, leftLoading) => {
        if (leftLoading === true) {
            return <CenteredCircularProgress/>
        } else if (leftError !== false) {
            return <pre>
                {leftError}
            </pre>
        }
        if(typeof obj.data !== "undefined") {
            return <JSONInput
                id          = 'a_unique_id'
                placeholder = { obj.data.body }
                locale      = { locale }
                onChange    = {onJsonUpdate}
                colors      = {{
                    background: "transparent",
                    default: "black",
                    number: "green",
                    keys: "rgb(68, 68, 68)",
                    string: "rgb(0, 105, 192)",
                    primitive: "rgb(170, 0, 0)",
                    error: "darkred"
                }}
                style      = {{
                    body: {fontSize: "13px", lineHeight: "1.2"},
                    warningBox: {background: "#ccc"},
                    errorMessage: {fontSize: "15px", color: "black", margin: "-2px 0 0 0"}
                }}
                width       = "100%"
                height      = "100%"
            />
        }

    }

    const LeftInfo = (request, leftLoading) => {
        if (leftLoading === false && typeof request !== "undefined" && request !== false) {
            return <React.Fragment>
                {request.data.method && <MethodTag method={request.data.method}/>}
                {request.data.url && <span>URL: {request.data.url}</span>}
                {request.data.expectedStatus && <span>EXPECT: <StatusCodeTag>{request.data.expectedStatus}</StatusCodeTag></span>}
            </React.Fragment>
        }
    }

    const RightInfo = (response, rightLoading) => {
        if (rightLoading === false && typeof response !== "undefined" && response !== false) {
            return <React.Fragment>
                {response.data.status && <span>RESPONSE: <StatusCodeTag>{response.data.status}</StatusCodeTag></span>}
            </React.Fragment>
        }
    }

    const leftColumn = (request) => {
        return <React.Fragment>
            <div className="RequestInfo">
                {LeftInfo(request, leftLoading)}
            </div>
            <div className="RequestBody">
                {JsonEditor(request, leftLoading)}
            </div>
            <div className="RequestStatus">
                {jsonStatus}
            </div>
        </React.Fragment>

    }

    const rightColumn = (response) => {
        return <React.Fragment>
            <div className="ResponseInfo">
                {RightInfo(response, rightLoading)}
            </div>
            <div className="ResponseBody">
                {JsonTree(response, rightLoading, rightError)}
            </div>
            <div className="ResponseStatus">
                OK
            </div>
        </React.Fragment>
    }

    const Play = ({disable}) => {
        let cls = 'RunQuery';

        if(disable === true) {
            cls = 'DisableQuery'
        }

        const onRun = () => {
            if (requestJson !== false && disable === false) {
                putData(requestJson.data, '/console/uql2unomi/response', setRightLoading, setRightError, setResponseJson)
            }
        }

        return <div className={cls} onClick={onRun}>
            <PlayArrow/>
        </div>
    }

    return (
        <div className="QueryResponseColumns">
            <div className="QueryResponseLeftColumn">
                {leftColumn(requestJson)}
            </div>
            <Play disable={disablePlay}/>
            <div className="QueryResponseRightColumn">
                {rightColumn(responseJson)}
            </div>
        </div>

    );
}
export default QueryResponseColumns;
// const mapProps = (state) => {
//     return {
//         uqlStatement: state.uqlReducer,
//     }
// }
// export default connect(
//     mapProps,
//     {},
// )(QueryResponseColumns)
