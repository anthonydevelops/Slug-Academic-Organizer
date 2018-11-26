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
                    alt="slug"
                    src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2My45MzUgMjYzLjkzNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjYzLjkzNSAyNjMuOTM1IiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgogIDxwYXRoIGQ9Im0xODguODM1LDkzLjI0OGMtNi4zMTktMTAuOTc2LTEzLjk4Mi0xOC43MDUtMTguODYyLTIyLjk3M2wxNy4wMDktNDAuMDk3YzcuMDUxLTAuOTI5IDEyLjUyOS03LjMwNSAxMi41MjktMTUuMDIyLTIuODQyMTdlLTE0LTguMzU3LTYuNDE1LTE1LjE1Ni0xNC4zMDEtMTUuMTU2LTcuODg4LDAtMTQuMzA1LDYuNzk5LTE0LjMwNSwxNS4xNTUgMCwzLjE4IDAuOTM0LDYuMTMgMi41Miw4LjU3bC0xNi42MjEsMzkuMTg0LTM1LjE5NC0xNC4wMTFjLTEuMTE1LTcuMTg2LTcuMDAyLTEyLjY5MS0xNC4wOTUtMTIuNjkxLTcuODg4LDAtMTQuMzA1LDYuNzk4LTE0LjMwNSwxNS4xNTMgMCw4LjM1NSA2LjQxNywxNS4xNTIgMTQuMzA1LDE1LjE1MiAzLjQ0OCwwIDYuNjE1LTEuMyA5LjA4OC0zLjQ2MmwzNi4yOTYsMTQuNDQ5Yy0xLjAwOCwxMC40NTYtMy43MTYsMzMuNDE1LTkuMDA2LDQ2LjE4OS0xMi4zNCwyOS43OTItMjkuNjMsNDIuMDc4LTQ0Ljg4Niw1Mi45MTgtMTIuMzk4LDguODExLTI0LjEwOSwxNy4xMzItMzAuNTMyLDMyLjYzOS0xMS42NzYsMjguMTgzIDMuNjk4LDQ4LjY4IDEyLjUwNCw1My43MDMgMS4xNDgsMC42NTUgMi40MzEsMC45ODUgMy43MTYsMC45ODUgMS4wOTMsMCAyLjE4Ny0wLjIzOCAzLjIwMi0wLjcxOCAyLjIxMi0xLjA0NCAzLjc3Ni0zLjEwMiA0LjE4OS01LjUxMyAwLjEzNi0wLjc5IDAuMjU3LTEuNjE3IDAuMzgzLTIuNDc5IDAuNjg5LTQuNzM3IDEuNDAyLTkuNjM1IDYuMzk5LTE1LjY4MiAzLjE4Ni0zLjg1NCAxMS4yNzYtNi40NTYgMjAuNjQ2LTkuNDY5IDIxLjc4Mi03LjAwNSA1NC42OTktMTcuNTkgNzIuNjA3LTYwLjgyNiAxMy45OTYtMzMuNzg2IDUuOTM5LTU5Ljk3Ni0zLjI4Ni03NS45OTh6bS0xMC41NzEsNzAuMjZjLTE1LjI1MiwzNi44MjEtNDEuOTE3LDQ1LjM5Ni02My4zNDIsNTIuMjg2LTExLjYxLDMuNzM0LTIxLjYzNyw2Ljk1OC0yNy42MTYsMTQuMTk0LTIuODA4LDMuMzk4LTQuNzUsNi42NjQtNi4xMjMsOS43MDgtMi4yNzUtNS45NTUtMy4xNTItMTQuMzI0IDEuMTQ5LTI0LjcxIDQuNzcxLTExLjUyIDEzLjg1OS0xNy45NzcgMjUuMzY0LTI2LjE1MiAxNi4wNjctMTEuNDE3IDM2LjA2My0yNS42MjcgNTAuMDU0LTU5LjQwNSA0LjcyLTExLjM5NSA3LjU0MS0yOC43NDQgOS4wNjktNDEuMTg4IDIuOTQ3LDMuMzI0IDYuMTQzLDcuNDk5IDkuMDE3LDEyLjQ5MSAxMC45NzIsMTkuMDU3IDExLjc4OCw0MC4xNzcgMi40MjgsNjIuNzc2eiIgZmlsbD0iI0ZGREE0NCIvPgo8L3N2Zz4K"
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
