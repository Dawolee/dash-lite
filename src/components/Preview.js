import React, { Component } from "react"
import Button from "react-bootstrap/Button"

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    let { url, closePlayer, preview_id } = this.props
    return (
      //using video tag so no analytics get sent(except for usage i guess)
      <div className="preview_div">
        <p id="preview_id">Media ID: {preview_id} is playing</p>
        <video width="100%" height="auto" autoPlay controls src={url}></video>
        <Button onClick={closePlayer}>Close Player</Button>
      </div>
    )
  }
}
