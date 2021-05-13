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
            <MainMenuItem icon={<GoDatabase size={20}/>} title={"Data"} link="/app/home" defaultLink="/app/home"/>
            <MainMenuItem icon={<FaTools size={20}/>} title={"Set-up"} link="/app/setup"/>
            <MainMenuItem icon={<VscDebugConsole size={20}/>} title={"Dev"} link="/app/dev"/>
            <MainMenuItem icon={<ImExit size={20}/>} title={"Logout"} link="/app/logout"/>
        </MainMenu>

        <PrivateRoute exact path="/app" roles={["unomi"]}>
            <Redirect to='/app/home/events'/>
        </PrivateRoute>

        <PrivateRoute path="/app/home" roles={["unomi"]}>
            <SubMenu title="Data">
                <SubMenuItem link="/app/home/events" defaultLink={["/app/home", "/app"]}>Events</SubMenuItem>
                <SubMenuItem link="/app/home/profiles">Profiles</SubMenuItem>
                <SubMenuItem link="/app/home/sessions">Sessions</SubMenuItem>
            </SubMenu>
            <Redirect to='/app/home/events'/>
        </PrivateRoute>

        <PrivateRoute path="/app/setup" roles={["unomi"]}>
            <SubMenu title="Set-up">
                <SubMenuItem link="/app/setup/sources">Sources</SubMenuItem>
                {/*<SubMenuItem link="/app/setup/events" defaultLink={["/app/setup"]}>Events</SubMenuItem>*/}
                <SubMenuItem link="/app/setup/rules" defaultLink={["/app/setup"]}>Rules</SubMenuItem>
                <SubMenuItem link="/app/setup/segments">Segments</SubMenuItem>
            </SubMenu>
        </PrivateRoute>

        <PrivateRoute path="/app/dev" roles={["unomi"]}>
            <SubMenu title="Dev">
                <SubMenuItem link="/app/dev/console" defaultLink={["/app/dev"]}>Console</SubMenuItem>
                <SubMenuItem link="/app/dev/manual/uql">UQL Manual</SubMenuItem>
                <RouteSwitch>
                    <RouteCase link="/app/dev/manual/uql">
                        <SubMenuItem link="/app/dev/manual/uql/select">&gt; Select UQL</SubMenuItem>
                        <SubMenuItem link="/app/dev/manual/uql/create">&gt; Create UQL</SubMenuItem>
                        <SubMenuItem link="/app/dev/manual/uql/delete">&gt; Delete UQL</SubMenuItem>
                    </RouteCase>
                </RouteSwitch>
            </SubMenu>
        </PrivateRoute>

        <SubContent>
            <div className="contentPane">
                <div className="content">

                    <PrivateRoute path="/app/home/events" roles={["unomi"]}>
                        <EventsAnalytics/>
                    </PrivateRoute>

                    <PrivateRoute path="/app/home/profiles" roles={["unomi"]}>
                        <ProfilesAnalytics/>
                    </PrivateRoute>

                    <PrivateRoute path="/app/home/sessions" roles={["unomi"]}>
                        <SessionsAnalytics/>
                    </PrivateRoute>

                    <PrivateRoute exact path="/app/home" roles={["unomi"]}>

                    </PrivateRoute>

                    <PrivateRoute exact path="/app" roles={["unomi"]}>

                    </PrivateRoute>

                    <PrivateRoute path="/app/setup/sources" roles={["unomi"]}>
                        <Sources/>
                    </PrivateRoute>
                    <PrivateRoute path="/app/setup/events" roles={["unomi"]}>
                        <Events/>
                    </PrivateRoute>
                    <PrivateRoute path="/app/setup/rules" roles={["unomi"]}>
                        <Rules/>
                    </PrivateRoute>
                    <PrivateRoute path="/app/setup/segments" roles={["unomi"]}>
                        <Segments/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/app/setup" roles={["unomi"]}>
                        <Rules/>
                    </PrivateRoute>

                    <PrivateRoute path="/app/dev/console" roles={["unomi"]}>
                        <Console/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/app/dev" roles={["unomi"]}>
                        <Console/>
                    </PrivateRoute>

                    <Route exact path="/app/dev/manual/uql/select">
                        <ManualPage mdFile="uql/select"/>
                    </Route>
                    <Route exact path="/app/dev/manual/uql/create">
                        <ManualPage mdFile="uql/create"/>
                    </Route>
                    <Route exact path="/app/dev/manual/uql/delete">
                        <ManualPage mdFile="uql/delete"/>
                    </Route>
                    <Route exact path="/app/dev/manual/uql">
                        <ManualPage mdFile="start"/>
                    </Route>
                </div>
            </div>
        </SubContent>
    </MainContent>
}

export default AppBox;