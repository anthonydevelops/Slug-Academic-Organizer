import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
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
        <Navbar color="faded" expand="md" role="navigation">
          <NavbarBrand href="/" className="mr-auto" />
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse isOpen={!this.state.isOpen} navbar>
            <Nav navbar vertical className="mx-auto">
              <NavItem className="sections planner">
                <NavLink activeClassName="active" tag={RRNavLink} exact to="/">
                  <div>
                    <ion-icon size="large" name="clipboard" />
                  </div>
                  Planner
                </NavLink>
              </NavItem>
              <NavItem className="sections calendar">
                <NavLink
                  activeClassName="active"
                  tag={RRNavLink}
                  to="/calendar"
                >
                  <div>
                    <ion-icon size="large" name="calendar" />
                  </div>
                  Calendar
                </NavLink>
              </NavItem>
              <NavItem className="sections grades">
                <NavLink activeClassName="active" tag={RRNavLink} to="/grades">
                  <div>
                    <ion-icon size="large" name="stats" />
                  </div>
                  Grades
                </NavLink>
              </NavItem>
              <NavItem className="sections status">
                <NavLink
                  activeClassName="active"
                  tag={RRNavLink}
                  to="/progress"
                >
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
