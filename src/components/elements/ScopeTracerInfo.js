import React from "react";
import "./forms/Forms.css";
import "./ScopeTrackerInfo.css";
import DetailBox from "./details/DetailBox";
import docco from './TrackerTheme';
import {MiniHeader} from "./Headers";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function ScopeTrackerInfo({scope, trackerHost}) {

    const tracker = "<script type=\"text/javascript\">\n" +
        "    var unomiOption = {\n" +
        "        scope: '"+scope+"',\n" +
        "        url: '"+trackerHost+"'\n" +
        "    };\n" +
        "    window.unomiTracker || (window.unomiTracker = {}), function () {\n" +
        "        function e(e) {\n" +
        "            for (unomiTracker.initialize({\"Apache Unomi\": unomiOption}); n.length > 0;) {\n" +
        "                var r = n.shift(), t = r.shift();\n" +
        "                unomiTracker[t] && unomiTracker[t].apply(unomiTracker, r)\n" +
        "            }\n" +
        "        }\n" +
        "\n" +
        "        for (var n = [], r = [\"trackSubmit\", \"trackClick\", \"trackLink\", \"trackForm\", \"initialize\", \"pageview\", \"identify\", \"reset\", \"group\", \"track\", \"ready\", \"alias\", \"debug\", \"page\", \"once\", \"off\", \"on\", \"personalize\"], t = 0; t < r.length; t++) {\n" +
        "            var i = r[t];\n" +
        "            window.unomiTracker[i] = function (e) {\n" +
        "                return function () {\n" +
        "                    var r = Array.prototype.slice.call(arguments);\n" +
        "                    return r.unshift(e), n.push(r), window.unomiTracker\n" +
        "                }\n" +
        "            }(i)\n" +
        "        }\n" +
        "        unomiTracker.load = function () {\n" +
        "            var n = document.createElement(\"script\");\n" +
        "            n.type = \"text/javascript\", n.async = !0, n.src = unomiOption.url + \"/tracker/unomi-tracker.min.js\", n.addEventListener ? n.addEventListener(\"load\", function (n) {\n" +
        "                \"function\" == typeof e && e(n)\n" +
        "            }, !1) : n.onreadystatechange = function () {\n" +
        "                \"complete\" !== this.readyState && \"loaded\" !== this.readyState || e(window.event)\n" +
        "            };\n" +
        "            var r = document.getElementsByTagName(\"script\")[0];\n" +
        "            r.parentNode.insertBefore(n, r)\n" +
        "        }, document.addEventListener(\"DOMContentLoaded\", unomiTracker.load), unomiTracker.page()\n" +
        "    }();\n" +
        "</script>"

    return <DetailBox>
        <MiniHeader>Please paste this code into your web page</MiniHeader>
        <SyntaxHighlighter language="javascript" wrapLongLines={true} style={docco}>
            {tracker}
        </SyntaxHighlighter>
    </DetailBox>
}