import React, { Component } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

export default class OptionBar extends Component {
  render() {
    let { handleToggle } = this.props
    return (
      <Navbar bg="light">
        <Navbar.Brand href="#home">Dash-Lite</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleToggle("videosList")}>Videos</Nav.Link>
          <Nav.Link onClick={() => handleToggle("players")}>Players</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}
