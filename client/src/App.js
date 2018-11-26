import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Planner from "./components/ClassLogging";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import Grades from "./components/GPACalculator";
import Progress from "./components/Major";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "" //server response
    };
  }

  //makes get request to server after the component mounts
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12" id="head-title">
              <h1>
                <span>
                  <img
                    alt="happy snail"
                    src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGQUEzMzA7IiBkPSJNMzM2LjY4LDE0Ny4yMTNjLTQuMjY4LDAtNy43MjYtMy40NTktNy43MjYtNy43MjZjMC0yNS41ODEsNi43NTgtNDUuMDUzLDIwLjA4NS01Ny44NzIgICBjMTYuMzY0LTE1Ljc0LDM2LjUxLTE1LjE0NiwzNy4zNy0xNS4xMTNjNC4yNjQsMC4xNjYsNy41ODYsMy43NTYsNy40Miw4LjAyYy0wLjE2NSw0LjI2NC0zLjc0NCw3LjU4Ny04LjAyLDcuNDIgICBjLTAuMDk4LTAuMDAyLTE0LjcxNC0wLjI0Ni0yNi4yMzYsMTAuOTgxYy0xMC4wNjUsOS44MDctMTUuMTY4LDI1LjQ3NC0xNS4xNjgsNDYuNTY0ICAgQzM0NC40MDYsMTQzLjc1NSwzNDAuOTQ3LDE0Ny4yMTMsMzM2LjY4LDE0Ny4yMTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkFBMzMwOyIgZD0iTTQzMy44NzksMzcyLjA2NWwzMC40MTYsMzAuNDE2YzEwLjkxMywxMC45MTMsMjguNjA3LDEwLjkxMywzOS41MiwwICAgYzEwLjkxMy0xMC45MTMsMTAuOTEzLTI4LjYwNywwLTM5LjUybC0zMC40MTYtMzAuNDE2TDQzMy44NzksMzcyLjA2NXoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGQUEzMzA7IiBkPSJNNDE1LjYwMSwxNTcuMDc4Yy00LjI2OCwwLTcuNzI2LTMuNDU5LTcuNzI2LTcuNzI2YzAtMjUuNTgxLDYuNzU4LTQ1LjA1MywyMC4wODUtNTcuODc0ICAgYzE2LjM2NC0xNS43NCwzNi41MDktMTUuMTQ1LDM3LjM2OS0xNS4xMTNjNC4yNjQsMC4xNjYsNy41ODYsMy43NTYsNy40Miw4LjAyYy0wLjE2NSw0LjI2NC0zLjc1Myw3LjU4OC04LjAyLDcuNDIgICBjLTAuMTA0LTAuMDAyLTE0LjcxNC0wLjI0Ni0yNi4yMzUsMTAuOTgxYy0xMC4wNjUsOS44MDctMTUuMTY4LDI1LjQ3NC0xNS4xNjgsNDYuNTY0ICAgQzQyMy4zMjcsMTUzLjYyLDQxOS44NjksMTU3LjA3OCw0MTUuNjAxLDE1Ny4wNzh6Ii8+CjwvZz4KPGVsbGlwc2Ugc3R5bGU9ImZpbGw6I0M4NkQ1QzsiIGN4PSIxNjkuMzEiIGN5PSIzMDcuNjQyIiByeD0iMTY5LjMxIiByeT0iMTQ5LjgwOSIvPgo8cGF0aCBzdHlsZT0iZmlsbDojQjI0RDQwOyIgZD0iTTE2OS4zMTUsNDA4LjEyN2MtNjYuMTYyLDAtMTE5Ljk4OS00NS4wNzgtMTE5Ljk4OS0xMDAuNDg2czUzLjgyNy0xMDAuNDg2LDExOS45ODktMTAwLjQ4NiAgczExOS45ODksNDUuMDc4LDExOS45ODksMTAwLjQ4NkMyODkuMzA1LDM2My4wNDksMjM1LjQ3OCw0MDguMTI3LDE2OS4zMTUsNDA4LjEyN3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0M4NkQ1QzsiIGQ9Ik0xNjkuMzE1LDM1OC44MDFjLTM4LjMwNCwwLTcwLjY2NC0yMy40MjgtNzAuNjY0LTUxLjE2YzAtMjcuNzMxLDMyLjM2LTUxLjE2LDcwLjY2NC01MS4xNiAgczcwLjY2NCwyMy40MjgsNzAuNjY0LDUxLjE2QzIzOS45NzksMzM1LjM3MywyMDcuNjE5LDM1OC44MDEsMTY5LjMxNSwzNTguODAxeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZDRTFDOyIgZD0iTTM2MS45ODUsMTIyLjE2NkwzNjEuOTg1LDEyMi4xNjZjLTcwLjY3NSwwLTEyNy45NjcsNTcuMjkyLTEyNy45NjcsMTI3Ljk2NnY2MS4zNzUgIGMwLDUzLjg3Mi0yNC40MjUsODguMTc3LTUyLjk1OSwxMDkuODc0Yy0xNS4yODksMTEuNjI2LTYuOSwzNi4wNzEsMTIuMzA4LDM2LjA3MWgxMjMuMzAyYzk1LjcwMSwwLDE3My4yODItNzcuNTgxLDE3My4yODItMTczLjI4MiAgdi0zNC4wMzdDNDg5Ljk1MiwxNzkuNDU5LDQzMi42NiwxMjIuMTY2LDM2MS45ODUsMTIyLjE2NnoiLz4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkFBMzMwOyIgZD0iTTIxMS45NjYsNDIxLjM4MmMyOC41MzQtMjEuNjk3LDUyLjk1OS01Ni4wMDIsNTIuOTU5LTEwOS44NzR2LTYxLjM3NSAgIGMwLTY1LjQ0Miw0OS4xMjctMTE5LjQwNCwxMTIuNTEzLTEyNy4wMzVjLTUuMDY2LTAuNjEtMTAuMjIxLTAuOTMxLTE1LjQ1My0wLjkzMWwwLDBjLTcwLjY3MywwLTEyNy45NjYsNTcuMjkyLTEyNy45NjYsMTI3Ljk2NiAgIHY2MS4zNzVjMCw1My44NzEtMjQuNDI1LDg4LjE3Ny01Mi45NTksMTA5Ljg3NGMtMTUuMjg5LDExLjYyNi02LjksMzYuMDcxLDEyLjMwOCwzNi4wNzFoMzAuOTA1ICAgQzIwNS4wNjYsNDU3LjQ1MiwxOTYuNjc3LDQzMy4wMDcsMjExLjk2Niw0MjEuMzgyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZBQTMzMDsiIGQ9Ik0zMzAuMTEyLDQxOC4zNzRjLTkuMTM0LDAtMTguMjY4LTMuNDc3LTI1LjIyMi0xMC40MzFsLTMwLjQxNy0zMC40MTYgICBjLTMuMDE3LTMuMDE3LTMuMDE3LTcuOTEsMC0xMC45MjdjMy4wMTgtMy4wMTcsNy45MS0zLjAxNywxMC45MjcsMGwzMC40MTYsMzAuNDE2YzcuODgzLDcuODg0LDIwLjcxMSw3Ljg4MiwyOC41OTQsMCAgIGM3Ljg4Mi03Ljg4Myw3Ljg4Mi0yMC43MS0wLjAwMS0yOC41OTRsLTMwLjQxNi0zMC40MTZjLTMuMDE3LTMuMDE3LTMuMDE3LTcuOTEsMC0xMC45MjdjMy4wMTgtMy4wMTcsNy45MS0zLjAxNywxMC45MjcsMCAgIGwzMC40MTYsMzAuNDE2YzEzLjkwNywxMy45MDgsMTMuOTA3LDM2LjUzOCwwLDUwLjQ0N0MzNDguMzgxLDQxNC44OTgsMzM5LjI0Nyw0MTguMzc0LDMzMC4xMTIsNDE4LjM3NHoiLz4KPC9nPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMzQjQ4NEE7IiBkPSJNMzQ4LjQ5NywyNDkuODI5Yy00LjI2OCwwLTcuNzI2LTMuNDU5LTcuNzI2LTcuNzI2di05LjU0N2MwLTQuMjY3LDMuNDU4LTcuNzI2LDcuNzI2LTcuNzI2ICAgYzQuMjY4LDAsNy43MjYsMy40NTksNy43MjYsNy43MjZ2OS41NDdDMzU2LjIyMywyNDYuMzY5LDM1Mi43NjUsMjQ5LjgyOSwzNDguNDk3LDI0OS44Mjl6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojM0I0ODRBOyIgZD0iTTQ1My45OTQsMjQ5LjgyOWMtNC4yNjgsMC03LjcyNi0zLjQ1OS03LjcyNi03LjcyNnYtOS41NDdjMC00LjI2NywzLjQ1OC03LjcyNiw3LjcyNi03LjcyNiAgIGM0LjI2OCwwLDcuNzI2LDMuNDU5LDcuNzI2LDcuNzI2djkuNTQ3QzQ2MS43MiwyNDYuMzY5LDQ1OC4yNjEsMjQ5LjgyOSw0NTMuOTk0LDI0OS44Mjl6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojM0I0ODRBOyIgZD0iTTQwMS4yNDYsMjU0LjkyNGMtNy4zMDQsMC0xNC4xNy0zLjA2My0xOC44MzctOC40MDJjLTIuODA4LTMuMjEzLTIuNDgtOC4wOTQsMC43MzMtMTAuOTAyICAgYzMuMjEyLTIuODA4LDguMDkzLTIuNDgxLDEwLjkwMiwwLjczMmMxLjczMiwxLjk4Miw0LjM1NywzLjExOCw3LjIwMSwzLjExOGMyLjg0NCwwLDUuNDctMS4xMzcsNy4yMDItMy4xMTkgICBjMi44MDktMy4yMTIsNy42OS0zLjU0LDEwLjkwMi0wLjczYzMuMjEyLDIuODA4LDMuNTQxLDcuNjksMC43MzEsMTAuOTAyQzQxNS40MTMsMjUxLjg2Miw0MDguNTQ4LDI1NC45MjQsNDAxLjI0NiwyNTQuOTI0eiIvPgo8L2c+CjxnPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZDRTFDOyIgY3g9IjM4Ni4xMTIiIGN5PSI3NC4yMjQiIHI9IjE5LjY3NiIvPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZDRTFDOyIgY3g9IjQ2NS4wMzQiIGN5PSI4NC4wODMiIHI9IjE5LjY3NiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
                  />
                </span>
                <span className="cap">S</span>lug <span className="cap">O</span>
                rganizer
              </h1>
            </div>
          </div>
          <div className="row full-content">
            <div className="navs col-2">
              <NavBar />
            </div>
            <div className="main col-10">
              <Switch>
                <Route exact path="/" component={Planner} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/grades" component={Grades} />
                <Route path="/progress" component={Progress} />
              </Switch>
            </div>
          </div>
          <div className="row bot-footer">
            <div>
              Icons made by{" "}
              <a href="https://www.freepik.com/" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>{" "}
              is licensed by{" "}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </a>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
