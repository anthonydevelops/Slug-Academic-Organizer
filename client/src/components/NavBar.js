import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../styles/NavBar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" dark expand="md" role="navigation">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={!this.state.isOpen} navbar>
            <Nav navbar vertical className="mx-auto">
              <NavItem className="sections planner">
                <NavLink tag={Link} to="/" active>
                  <div>
                    <ion-icon size="large" name="clipboard" />
                  </div>
                  Planner
                </NavLink>
              </NavItem>
              <NavItem className="sections calendar">
                <NavLink tag={Link} to="/calendar" active>
                  <div>
                    <ion-icon size="large" name="calendar" />
                  </div>
                  Calendar
                </NavLink>
              </NavItem>
              <NavItem className="sections grades">
                <NavLink tag={Link} to="/grades" active>
                  <div>
                    <ion-icon size="large" name="stats" />
                  </div>
                  Grades
                </NavLink>
              </NavItem>
              <NavItem className="sections status">
                <NavLink tag={Link} to="/progress" active>
                  <div>
                    <ion-icon size="large" name="school" />
                  </div>
                  Progress
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
