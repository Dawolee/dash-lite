import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"

export default class PlayerRow extends Component {
  handleClick = e => {
    //annoying workaround to copy to clipboard
    let dummy = document.createElement("input")
    document.body.appendChild(dummy)
    dummy.setAttribute("value", e.target.value)
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
    document.execCommand("copy")
    this.handleToast(e.target.name)
  }

  handleToast = e => {}

  render() {
    let { title, playerID, eventKey } = this.props
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
              <Button
                size="sm"
                name="playerID"
                value={playerID}
                onClick={this.handleClick}
                className="row-buttons"
              >
                Player ID
              </Button>
              <Button
                size="sm"
                name="url"
                value={`https://cdn.jwplayer.com/libraries/${playerID}.js`}
                onClick={this.handleClick}
                className="row-buttons"
              >
                Cloud Hosted URL
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    )
  }
}
