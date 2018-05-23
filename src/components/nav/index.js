import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  render() {
    return (
      <nav
        style={{ paddingBottom: 0, backgroundColor: 'brown' }}
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <div className="headerContainer container">
          <img
            src={require('../../img/logo.jpg')}
            style={{ width: 50, height: 50 }}
          />
          <a className="navbar-brand js-scroll-trigger" href="/">
            Easy Learn
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="/students">
                  Students
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="/doctors">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="/courses">
                  Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="/manageCourses">
                  Manage Courses
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      // <Navbar color="light" light expand="md">
      //   <NavbarBrand href="/">Easy Learn - Registrer portal</NavbarBrand>
      //   <NavbarToggler onClick={this.toggle} />
      //   <Collapse isOpen={this.state.isOpen} navbar>
      //     <Nav className="ml-auto" navbar>
      //       <NavItem>
      //         <NavLink href="/students/">Students</NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink href="/courses/">Courses</NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink href="/manageCourses/">Manage Courses</NavLink>
      //       </NavItem>
      //     </Nav>
      //   </Collapse>
      // </Navbar>
    )
  }
}
