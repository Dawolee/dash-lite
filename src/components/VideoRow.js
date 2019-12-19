import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"

export default class VideoRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false
    }
  }

  handleClick = e => {
    if (e.target.value === "play_preview") {
      alert("preview coming")
    } else {
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
  }

  handleToast = e => {}

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
              <Button
                size="sm"
                name="mediaid"
                value={mediaID}
                onClick={this.handleClick}
                className="row-buttons"
              >
                Media ID
              </Button>
              <Button
                size="sm"
                name="hls"
                value={`https://cdn.jwplayer.com/manifests/${mediaID}.m3u8`}
                onClick={this.handleClick}
                className="row-buttons"
              >
                HLS
              </Button>
              <Button
                size="sm"
                name="playlist"
                value={`https://cdn.jwplayer.com/v2/media/${mediaID}`}
                onClick={this.handleClick}
                className="row-buttons"
              >
                Media Playlist
              </Button>
              <Button
                size="sm"
                name="single_line"
                value={`https://cdn.jwplayer.com/players/${mediaID}-PLAYERID.js`}
                onClick={this.handleClick}
                className="row-buttons"
              >
                Single Line
              </Button>
              <Button
                size="sm"
                name="preview_video"
                value="play_preview"
                onClick={this.handleClick}
                className="row-buttons"
              >
                Preview Video
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    )
  }
}
