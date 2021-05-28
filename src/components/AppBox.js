import React from "react";
import "./AppBox.css";
import MainMenu from "./menu/MainMenu";
import MainContent from "./MainContent";
import SubContent from "./SubContent";
import SubMenu from "./menu/SubMenu";
import SubMenuItem from "./menu/SubMenuItem";
import MainMenuItem from "./menu/MainMenuItem";
import {Route, Redirect} from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import Sources from "./pages/Sources";
import Events from "./pages/Events";
import Rules from "./pages/Rules";
import Segments from "./pages/Segments";
import Console from "./pages/Console";
import ManualPage from "./pages/manual/ManualPage";
import {RouteCase, RouteSwitch} from "./elements/misc/RouteCase";
import EventsAnalytics from "./pages/EventsAnalytics";
import ProfilesAnalytics from "./pages/ProfilesAnalytics";
import SessionsAnalytics from "./pages/SessionsAnalytics";
import {GoDatabase} from "@react-icons/all-files/go/GoDatabase";
import {VscDebugConsole} from "@react-icons/all-files/vsc/VscDebugConsole";
import {FaTools} from "@react-icons/all-files/fa/FaTools";
import {ImExit} from "@react-icons/all-files/im/ImExit";

const AppBox = () => {

    return <MainContent>

        <MainMenu>
            <MainMenuItem icon={<GoDatabase size={20}/>} title={"Data"} link="/home" defaultLink="/home"/>
            <MainMenuItem icon={<FaTools size={20}/>} title={"Set-up"} link="/setup"/>
            <MainMenuItem icon={<VscDebugConsole size={20}/>} title={"Dev"} link="/dev"/>
            <MainMenuItem icon={<ImExit size={20}/>} title={"Logout"} link="/logout"/>
        </MainMenu>

        <PrivateRoute exact path="/" roles={["unomi"]}>
            <Redirect to='/home/events'/>
        </PrivateRoute>

        <PrivateRoute path="/home" roles={["unomi"]}>
            <SubMenu title="Data">
                <SubMenuItem link="/home/events" defaultLink={["/home", "/"]}>Events</SubMenuItem>
                <SubMenuItem link="/home/profiles">Profiles</SubMenuItem>
                <SubMenuItem link="/home/sessions">Sessions</SubMenuItem>
            </SubMenu>
            <Redirect to='/home/events'/>
        </PrivateRoute>

        <PrivateRoute path="/setup" roles={["unomi"]}>
            <SubMenu title="Set-up">
                <SubMenuItem link="/setup/sources">Sources</SubMenuItem>
                {/*<SubMenuItem link="/setup/events" defaultLink={["/setup"]}>Events</SubMenuItem>*/}
                <SubMenuItem link="/setup/rules" defaultLink={["/setup"]}>Rules</SubMenuItem>
                <SubMenuItem link="/setup/segments">Segments</SubMenuItem>
            </SubMenu>
        </PrivateRoute>

        <PrivateRoute path="/dev" roles={["unomi"]}>
            <SubMenu title="Dev">
                <SubMenuItem link="/dev/console" defaultLink={["/dev"]}>Console</SubMenuItem>
                <SubMenuItem link="/dev/manual/uql">UQL Manual</SubMenuItem>
                <RouteSwitch>
                    <RouteCase link="/dev/manual/uql">
                        <SubMenuItem link="/dev/manual/uql/select">&gt; Select UQL</SubMenuItem>
                        <SubMenuItem link="/dev/manual/uql/create">&gt; Create UQL</SubMenuItem>
                        <SubMenuItem link="/dev/manual/uql/delete">&gt; Delete UQL</SubMenuItem>
                    </RouteCase>
                </RouteSwitch>
            </SubMenu>
        </PrivateRoute>

        <SubContent>
            <div className="contentPane">
                <div className="content">

                    <PrivateRoute path="/home/events" roles={["unomi"]}>
                        <EventsAnalytics/>
                    </PrivateRoute>

                    <PrivateRoute path="/home/profiles" roles={["unomi"]}>
                        <ProfilesAnalytics/>
                    </PrivateRoute>

                    <PrivateRoute path="/home/sessions" roles={["unomi"]}>
                        <SessionsAnalytics/>
                    </PrivateRoute>

                    <PrivateRoute exact path="/home" roles={["unomi"]}>

                    </PrivateRoute>

                    <PrivateRoute exact path="/" roles={["unomi"]}>

                    </PrivateRoute>

                    <PrivateRoute path="/setup/sources" roles={["unomi"]}>
                        <Sources/>
                    </PrivateRoute>
                    <PrivateRoute path="/setup/events" roles={["unomi"]}>
                        <Events/>
                    </PrivateRoute>
                    <PrivateRoute path="/setup/rules" roles={["unomi"]}>
                        <Rules/>
                    </PrivateRoute>
                    <PrivateRoute path="/setup/segments" roles={["unomi"]}>
                        <Segments/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/setup" roles={["unomi"]}>
                        <Rules/>
                    </PrivateRoute>

                    <PrivateRoute path="/dev/console" roles={["unomi"]}>
                        <Console/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/dev" roles={["unomi"]}>
                        <Console/>
                    </PrivateRoute>

                    <Route exact path="/dev/manual/uql/select">
                        <ManualPage mdFile="uql/select"/>
                    </Route>
                    <Route exact path="/dev/manual/uql/create">
                        <ManualPage mdFile="uql/create"/>
                    </Route>
                    <Route exact path="/dev/manual/uql/delete">
                        <ManualPage mdFile="uql/delete"/>
                    </Route>
                    <Route exact path="/dev/manual/uql">
                        <ManualPage mdFile="start"/>
                    </Route>
                </div>
            </div>
        </SubContent>
    </MainContent>
}

export default AppBox;