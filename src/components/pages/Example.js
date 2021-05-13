import {connect} from "react-redux";
import {
    increaseNotificationNumber,
    decreaseNotificationNumber,
    resetNotificationNumber
} from "../../redux/reducers/notificationSlice";
import React from "react";
import {showAlert} from "../../redux/reducers/alertSlice";
import {showWarningIcon, hideWarningIcon} from "../../redux/reducers/warningIconSlice";
import {increaseProgress, decreaseProgress, resetProgress} from "../../redux/reducers/progressSlice";
import JsObjectList from "../elements/lists/JsObjectList";

const Example = ({
                  increaseNotificationNumber,
                  decreaseNotificationNumber,
                  resetNotificationNumber,
                  showAlert,
                  showWarningIcon,
                  hideWarningIcon,
                  increaseProgress,
                  decreaseProgress,
                  resetProgress,
                  uqlQuery,
                  ...props
              }) => {

    const _showWarning = () => {
        showWarningIcon({message: "UQL is invalid, expected {askas} but got string."});
        increaseNotificationNumber();
    }
    const _hideWarning = () => {
        hideWarningIcon();
    }



    return (
        <React.Fragment>
            {/*<Button variant="contained" color="primary" onClick={() => increaseNotificationNumber()}>+</Button>*/}
            {/*{props.notification.value}*/}
            {/*<Button variant="contained" color="primary" onClick={() => decreaseNotificationNumber()}>-</Button>*/}

            {/*<Button variant="contained" color="secondary"*/}
            {/*        onClick={() => showAlert({type: "success", message: "Ok"})}>Show success popup</Button>*/}
            <Button variant="contained" color="secondary"
                    onClick={() => showAlert({type: "warning", message: "warning"})}>Show warning popup</Button>

            {/*<Button variant="contained" onClick={_showWarning}>Show alert icon + increase notifications</Button>*/}
            {/*<Button onClick={_hideWarning}>Hide warning</Button>*/}

            {/*<Button onClick={() => increaseProgress({value: 10})}>Increase progress</Button>*/}
            {/*<Button onClick={() => decreaseProgress({value: 10})}>Decrease progress</Button>*/}
            {/*<Button onClick={() => resetProgress()}>Reset progress</Button>*/}
            <JsObjectList uql={uqlQuery.uql}></JsObjectList>

        </React.Fragment>
    );
}

const mapProps = (state) => {
    return {
        notification: state.notificationReducer,
        uqlQuery: state.uqlReducer,
    }
}
export default connect(
    mapProps,
    {
        increaseNotificationNumber,
        decreaseNotificationNumber,
        resetNotificationNumber,
        showAlert,
        showWarningIcon,
        hideWarningIcon,
        increaseProgress,
        decreaseProgress,
        resetProgress
    },
)(Example)
