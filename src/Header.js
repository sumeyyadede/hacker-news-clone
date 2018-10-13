import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import PropTypes from "prop-types";
import "./Header.css";
import hackerNewsLogo from "./Y_Combinator_logo.png";


const Header = () => {
    return (
        <div>
          <Navbar expand="sm" light className="Header">
            <Collapse navbar>
              <Nav navbar>
                  <NavItem>
                      <NavLink href="/"><img className="img" src={hackerNewsLogo} width="18" height="18" alt="Hacker News Logo" ></img></NavLink>
                  </NavItem>          
                  <NavbarBrand className="hnname" href="/">Hacker News</NavbarBrand>
                  <NavItem>
                      <NavLink href="/newest">new</NavLink>
                  </NavItem>
                  <span className="span">|</span>
                  <NavItem>
                      <NavLink href="">comments</NavLink>
                  </NavItem>            
                  <span className="span">|</span>
                  <NavItem>
                      <NavLink href="/show">show</NavLink>
                  </NavItem>
                  <span className="span">|</span>
                  <NavItem>
                      <NavLink href="/ask">ask</NavLink>
                  </NavItem>                
                  <span className="span">|</span>
                  <NavItem>
                      <NavLink href="/jobs">jobs</NavLink>
                  </NavItem>                
                  <span className="span">|</span>
                  <NavItem>
                      <NavLink href="">submit</NavLink>
                  </NavItem>            
              </Nav>
            </Collapse>
            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="td-log">login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
};

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default Header;
