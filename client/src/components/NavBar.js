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
        <Navbar
          color="faded"
          dark
          expand="md"
          role="navigation"
          className="text-center"
        >
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse isOpen={!this.state.isOpen} navbar>
            <Nav navbar vertical>
              <NavItem className="navi-link link-2">
                <NavLink tag={Link} to="/" active>
                  <div>
                    <ion-icon size="large" name="clipboard" />
                  </div>
                  Planner
                </NavLink>
              </NavItem>
              <NavItem className="navi-link link-3">
                <NavLink tag={Link} to="/calendar" active>
                  <div>
                    <ion-icon size="large" name="calendar" />
                  </div>
                  Calendar
                </NavLink>
              </NavItem>
              <NavItem className="navi-link link-4">
                <NavLink tag={Link} to="/grades" active>
                  <div>
                    <ion-icon size="large" name="stats" />
                  </div>
                  Grades
                </NavLink>
              </NavItem>
              <NavItem className="navi-link link-5">
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
