import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Planner from "./components/ClassLogging";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import Grades from "./components/GPACalculator";
import Progress from "./components/Major";
import "./App.css";
// import "./styles/NavBar.css";

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
      //this lets connect to different components of our site
      <Router>
        <div className="container-fluid main">
          <div className="row">
            <div className="home-link col-12">
              <h1>Slug Organizer</h1>
            </div>
          </div>
          <div className="row">
            <div className="navi-col col-2">
              <NavBar />
            </div>
            <div className="content col-10">
              <Switch>
                <Route exact path="/" component={Planner} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/grades" component={Grades} />
                <Route path="/progress" component={Progress} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
