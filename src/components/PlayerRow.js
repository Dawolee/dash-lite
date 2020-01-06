import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { displayToast } from "./index"

export default class PlayerRow extends Component {
  handleClick = e => {
    let { playerID } = this.props
    let copyValue = ""

    if (e === "playerid") {
      copyValue = playerID
    } else {
      copyValue = `https://cdn.jwplayer.com/libraries/${playerID}.js`
    }

    //annoying workaround to copy to clipboard
    let dummy = document.createElement("input")
    document.body.appendChild(dummy)
    dummy.setAttribute("value", copyValue)
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
    document.execCommand("copy")
    displayToast(e)
  }

  render() {
    let { title, eventKey } = this.props
    return (
      <div>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={eventKey}>
              {title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
              <DropdownButton
                id="dropdown_player"
                title="Select Option"
                onSelect={this.handleClick}
              >
                <Dropdown.Item eventKey="playerid">Player ID</Dropdown.Item>
                <Dropdown.Item eventKey="player_url">Player URL</Dropdown.Item>
              </DropdownButton>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    )
  }
}
