import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { displayToast } from "./index"

export default class VideoRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false,
      toast: ""
    }
  }

  handleClick = e => {
    let { handlePreview, mediaID } = this.props
    let copyValue = ""

    if (e === "play_preview") {
      handlePreview(mediaID)
      return
    } else if (e === "mediaid") {
      copyValue = mediaID
    } else if (e === "hls_stream") {
      copyValue = `https://cdn.jwplayer.com/manifests/${mediaID}.m3u8`
    } else if (e === "v2_media") {
      copyValue = `https://cdn.jwplayer.com/v2/media/${mediaID}`
    } else if (e === "single_line") {
      copyValue = `https://cdn.jwplayer.com/players/${mediaID}-PLAYERID.js`
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
    let { title, mediaID, eventKey } = this.props
    return (
      <div>
        <Card>
          <Card.Header>
            <Image
              src={`https://cdn.jwplayer.com/v2/media/${mediaID}/poster.jpg?width=120`}
              fluid
              className="video_thumbnail"
            />
            <Accordion.Toggle as={Button} variant="link" eventKey={eventKey}>
              {title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
              <DropdownButton
                id="dropdown_media"
                title="Select Option"
                onSelect={this.handleClick}
              >
                <Dropdown.Item eventKey="mediaid">Media ID</Dropdown.Item>
                <Dropdown.Item eventKey="hls_stream">HLS Stream</Dropdown.Item>
                <Dropdown.Item eventKey="v2_media">
                  V2 Media Playlist
                </Dropdown.Item>
                <Dropdown.Item eventKey="single_line">
                  JS Single Line Embed
                </Dropdown.Item>
                <Dropdown.Item eventKey="play_preview">
                  Preview Video
                </Dropdown.Item>
              </DropdownButton>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    )
  }
}
