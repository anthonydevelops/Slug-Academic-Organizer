import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        <Navbar color="faded" dark expand="md" role="navigation">
          <div className="home-link">
            <NavbarBrand tag={Link} to="/" className="font-weight-bold mr-auto">
              Slug Organizer
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse isOpen={!this.state.isOpen} navbar>
            <Nav className="ml-auto text-justify" navbar>
              <NavItem className="link-2">
                <NavLink tag={Link} to="/">
                  Classes
                </NavLink>
              </NavItem>
              <NavItem className="link-3">
                <NavLink tag={Link} to="/pnp">
                  Pass / No Pass
                </NavLink>
              </NavItem>
              <NavItem className="link-4">
                <NavLink tag={Link} to="/gpa">
                  GPA
                </NavLink>
              </NavItem>
              <NavItem className="link-7">
                <NavLink tag={Link} to="/major">
                  Major Requirements
                </NavLink>
              </NavItem>
              <NavItem className="link-5">
                <NavLink tag={Link} to="/ge">
                  GE
                </NavLink>
              </NavItem>
              <NavItem className="link-6">
                <NavLink tag={Link} to="/calendar">
                  Calendar
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
