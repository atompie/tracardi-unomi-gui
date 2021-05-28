import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AppBox from "./AppBox";
import {connect, useDispatch} from "react-redux";
import {hideAlert} from "../redux/reducers/alertSlice";
import Logout from "./authentication/Logout";
import SignIn from "./authentication/SignIn";
import SocialSplash from "./elements/misc/SocialSplash";
import PrivateRoute from "./authentication/PrivateRoute";
import "./App.css";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = ({alert}) => {

    const [splash, setSplash] = useState(true);
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(hideAlert())
    };

    const onContinueClick = () => {
        setSplash(false);
    }

    const application = () => {
        if(splash) {
            return <SocialSplash onClick={onContinueClick}/>
        } else {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <SignIn/>
                        </Route>
                        <Route exact path="/logout">
                            <Logout/>
                        </Route>
                        <PrivateRoute path="/" roles={["unomi"]}>
                            <AppBox/>
                        </PrivateRoute>
                    </Switch>
                    <Snackbar open={alert.show} autoHideDuration={alert.hideAfter} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={alert.type}>
                            <pre style={{margin: 0, overflow: "auto", maxWidth: "500px"}}>{alert.message}</pre>
                        </Alert>
                    </Snackbar>

                </Router>
            );
        }
    }

    return application();
}

const mapState = (state) => {
    return {
        alert: state.alertReducer,
    }
}
export default connect(mapState)(App);
