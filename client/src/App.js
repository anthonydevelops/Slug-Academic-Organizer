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
                    alt="snail"
                    src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMS45OTggNTExLjk5OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjk5OCA1MTEuOTk4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojQzI3QzU5OyIgY3g9IjIwMy42IiBjeT0iMjU0LjgzOCIgcj0iMTQ3LjcxIi8+CjxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgOyIgZD0iTTIzMS42NjIsMzY3LjI3MWMtNDYuMTcsMC04OS4zOTEtMjcuMjE2LTEwOC41Ny03MC45NzMgIGMtMTAuMzI4LTIzLjU2MS0xMC44NjItNDkuNzM0LTEuNTA0LTczLjY5OGM5LjM1Ny0yMy45NjMsMjcuNDg3LTQyLjg0OCw1MS4wNDktNTMuMTc2YzM5LjY2OS0xNy4zODYsODYuMDg2LDAuNzM5LDEwMy40NzUsNDAuNDA4ICBjMTQuMjQxLDMyLjQ5Mi0wLjYwNSw3MC41MTMtMzMuMDk4LDg0Ljc1NmMtNi44OTYsMy4wMjItMTQuMTAxLDQuNDU0LTIxLjE4OSw0LjQ1NGMtMjAuNDA2LDAuMDAyLTM5Ljg4OS0xMS44NS00OC41OTItMzEuNzA0ICBjLTEuNjYzLTMuNzkzLDAuMDY0LTguMjE3LDMuODU4LTkuODhjMy43OTYtMS42NjQsOC4yMTgsMC4wNjUsOS44OCwzLjg1OGM4LjQwNiwxOS4xNzUsMzAuODQ0LDI3Ljk0LDUwLjAyMSwxOS41MzMgIGMyNC45MTYtMTAuOTIyLDM2LjMwMy00MC4wNzksMjUuMzgxLTY0Ljk5NmMtMTQuMDY2LTMyLjA5NC01MS42Mi00Ni43NTctODMuNzE1LTMyLjY5MWMtNDEuMDYzLDE4LTU5LjgyOCw2Ni4wNTEtNDEuODI4LDEwNy4xMTQgIGMxOS44NjcsNDUuMzI3LDY5LjI2NSw3MC4zMzcsMTE3LjQ2Miw1OS40NjljNC4wMzktMC45MDgsOC4wNTUsMS42MjcsOC45NjYsNS42NjdjMC45MTEsNC4wNC0xLjYyNiw4LjA1NS01LjY2Nyw4Ljk2NiAgQzI0OC45MzgsMzY2LjMzLDI0MC4yNDcsMzY3LjI3MSwyMzEuNjYyLDM2Ny4yNzF6Ii8+CjxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgOyIgZD0iTTE3MC43MDUsMTEwLjgxM0MxMDQuOTY2LDEyNS43NjgsNTUuODk4LDE4NC41Nyw1NS44OTgsMjU0LjgzNyAgYzAsODEuNTc2LDY2LjEzLDE0Ny43MDYsMTQ3LjcwNiwxNDcuNzA2YzMzLjg0MSwwLDY1LjAxNy0xMS4zODksODkuOTIzLTMwLjUzMUMxMDMuMDgxLDM0My41MjUsMTMyLjU3NywxNTEuNzc1LDE3MC43MDUsMTEwLjgxM3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGOTgxMTsiIGQ9Ik0zNTQuNjM2LDEzMy45NzljLTIuNjY4LDAtNS4yNS0xLjQyNi02LjYwNi0zLjkzOGwtMTQuOTg3LTI3Ljc1OCAgYy0xLjk2OC0zLjY0NS0wLjYwOC04LjE5NSwzLjAzNi0xMC4xNjNjMy42NDUtMS45NjgsOC4xOTQtMC42MDgsMTAuMTYzLDMuMDM2bDE0Ljk4NywyNy43NThjMS45NjgsMy42NDUsMC42MDgsOC4xOTUtMy4wMzYsMTAuMTYzICBDMzU3LjA2LDEzMy42ODksMzU1LjgzOSwxMzMuOTc5LDM1NC42MzYsMTMzLjk3OXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGREFCNTsiIGQ9Ik0zMTkuMDAxLDE5NC41NzN2NzguMzI0YzAsNDIuMTczLTM0LjE4OCw3Ni4zNi03Ni4zNiw3Ni4zNkgxMjQuNjM3ICBjLTU3Ljg1MywwLTEwOC41NjIsMzguNjg4LTEyMy44NDQsOTQuNDg3bDAsMGMtMy44MjUsMTMuOTY3LDYuNjg2LDI3Ljc0NCwyMS4xNjgsMjcuNzQ0aDI5Mi40MTYgIGM5NC4xMDgsMCwxNzAuMzk3LTc2LjI4OSwxNzAuMzk3LTE3MC4zOTdWMTk0LjU3M2MwLTQ1Ljc3Ni0zNy4xMDktODIuODg2LTgyLjg4NS04Mi44ODZsMCwwICBDMzU2LjExLDExMS42ODgsMzE5LjAwMSwxNDguNzk3LDMxOS4wMDEsMTk0LjU3M3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGOTgxMTsiIGQ9Ik00NDkuMTM4LDEzMy45NzljLTEuMjAzLDAtMi40MjMtMC4yOS0zLjU1Ny0wLjkwMWMtMy42NDUtMS45NjgtNS4wMDQtNi41MTktMy4wMzYtMTAuMTYzICBsMTQuOTg3LTI3Ljc1OGMxLjk2OS0zLjY0NSw2LjUxNi01LjAwMywxMC4xNjMtMy4wMzZjMy42NDUsMS45NjgsNS4wMDQsNi41MTksMy4wMzYsMTAuMTYzbC0xNC45ODcsMjcuNzU4ICBDNDU0LjM4OCwxMzIuNTU0LDQ1MS44MDUsMTMzLjk3OSw0NDkuMTM4LDEzMy45Nzl6Ii8+CjxjaXJjbGUgc3R5bGU9ImZpbGw6I0VBRUFFQTsiIGN4PSI0ODAuNTciIGN5PSI3MS45MzUiIHI9IjMxLjQyOCIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNDE0QjU4OyIgZD0iTTQ4MC41NzIsODMuMTQzYy00LjE0MywwLTcuNS0zLjM1Ny03LjUtNy41di03LjQxNWMwLTQuMTQzLDMuMzU3LTcuNSw3LjUtNy41czcuNSwzLjM1Nyw3LjUsNy41ICB2Ny40MTVDNDg4LjA3Miw3OS43ODUsNDg0LjcxNSw4My4xNDMsNDgwLjU3Miw4My4xNDN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkI2NTU7IiBkPSJNMzE5LjAwMSwxOTQuNTczdjc4LjMyNGMwLDQyLjE3My0zNC4xODgsNzYuMzYtNzYuMzYsNzYuMzZIMTI0LjYzNyAgYy01Ny44NTMsMC0xMDguNTYyLDM4LjY4OC0xMjMuODQ0LDk0LjQ4N2wwLDBjLTMuODI1LDEzLjk2Nyw2LjY4NiwyNy43NDQsMjEuMTY4LDI3Ljc0NGgyOTIuNDE2ICBjOTQuMTA4LDAsMTcwLjM5Ny03Ni4yODksMTcwLjM5Ny0xNzAuMzk3VjE5NC41NzNjMC00NS43NzYtMzcuMTA5LTgyLjg4Ni04Mi44ODUtODIuODg2bDAsMCAgQzM1Ni4xMSwxMTEuNjg4LDMxOS4wMDEsMTQ4Ljc5NywzMTkuMDAxLDE5NC41NzN6Ii8+CjxnPgoJPGVsbGlwc2Ugc3R5bGU9ImZpbGw6I0ZGNkU2RTsiIGN4PSIzNTEuMzEiIGN5PSIxOTEuMjQ4IiByeD0iMjAuOTk5IiByeT0iMTYuNzIzIi8+Cgk8ZWxsaXBzZSBzdHlsZT0iZmlsbDojRkY2RTZFOyIgY3g9IjQ1Mi40NiIgY3k9IjE5MS4yNDgiIHJ4PSIyMC45OTkiIHJ5PSIxNi43MjMiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojNDE0QjU4OyIgZD0iTTQwMS44ODcsMTk1LjE2NGMtNi42ODMsMC0xMy4wMzYtMi44OTMtMTcuNDMyLTcuOTM4Yy0yLjcyMi0zLjEyMy0yLjM5Ni03Ljg2LDAuNzI4LTEwLjU4MSAgYzMuMTIyLTIuNzIxLDcuODYtMi4zOTYsMTAuNTgxLDAuNzI4YzEuNTQ3LDEuNzc0LDMuNzc4LDIuNzkyLDYuMTIzLDIuNzkyYzIuMzQ1LDAsNC41NzctMS4wMTgsNi4xMjUtMi43OTMgIGMyLjcyMS0zLjEyMyw3LjQ1OS0zLjQ0OCwxMC41ODEtMC43MjVjMy4xMjMsMi43MjEsMy40NDcsNy40NTksMC43MjYsMTAuNTgxQzQxNC45MjIsMTkyLjI3MSw0MDguNTY4LDE5NS4xNjQsNDAxLjg4NywxOTUuMTY0eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZBNzMzOyIgZD0iTTM2MS4zODYsMzE5LjY1NHYyNC4yMzhjMCw0OC4xMDItMzguOTk1LDg3LjA5Ny04Ny4wOTcsODcuMDk3SDE1Ny40NTMgIGMtMzEuNDk5LDAtNjEuMTAzLDE1LjA1LTc5LjY2Myw0MC41bDAsMGgyMzYuNTg1YzM4LjM2MywwLDczLjc2Mi0xMi42ODEsMTAyLjI0MS0zNC4wNzRjMTYuMzA3LTI1LjMxNywyNS43NzEtNTUuNDU4LDI1Ljc3MS04Ny44MSAgdi0yOS45NTFjMC0yMi4zNjgtMTguMTMzLTQwLjUwMS00MC41MDEtNDAuNTAxbDAsMEMzNzkuNTE5LDI3OS4xNTMsMzYxLjM4NiwyOTcuMjg2LDM2MS4zODYsMzE5LjY1NHoiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRUFFQUVBOyIgY3g9IjMyMy4yIiBjeT0iNzEuOTM1IiByPSIzMS40MjgiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzQxNEI1ODsiIGQ9Ik0zMjMuMjAxLDgzLjE0M2MtNC4xNDMsMC03LjUtMy4zNTctNy41LTcuNXYtNy40MTVjMC00LjE0MywzLjM1Ny03LjUsNy41LTcuNXM3LjUsMy4zNTcsNy41LDcuNSAgdjcuNDE1QzMzMC43MDEsNzkuNzg1LDMyNy4zNDQsODMuMTQzLDMyMy4yMDEsODMuMTQzeiIvPgo8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjE7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDsiIGQ9Ik0xODAuNzc0LDM0OS4yNThoLTU2LjEzN2MtNTcuODUzLDAtMTA4LjU2MiwzOC42ODgtMTIzLjg0NSw5NC40ODdsMCwwICBjLTMuODI1LDEzLjk2Nyw2LjY4NywyNy43NDUsMjEuMTY4LDI3Ljc0NWgyMDMuOTUzQzE2MS40MTUsNDUyLjc0NywxNDUuODE4LDM4My42NCwxODAuNzc0LDM0OS4yNTh6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
                  />
                </span>
                <span className="cap">S</span>lug <span className="cap">O</span>
                rganizer
              </h1>
            </div>
          </div>
          <div className="row full-content">
            <div className="navs col-12 col-md-2">
              <NavBar />
            </div>
            <div className="main col-12 col-md-10">
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
