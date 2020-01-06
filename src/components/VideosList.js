import React, { Component } from "react"
import {
  fetchVideos,
  SearchBar,
  VideoRow,
  Preview,
  fetchTemplateKey
} from "./index"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Toast from "react-bootstrap/Toast"
import { apiKey, apiSecret } from "../secrets"

export default class VideosList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey,
      apiSecret,
      videos: [],
      limit: 10,
      offset: 0,
      view: "list",
      loading: true,
      preview: false,
      url: "",
      key: "",
      showToast: false
    }
  }

  //helper function to close preview player
  closePlayer = () => {
    this.setState({ preview: false })
  }

  //should've used Redux for this as passing state around from VideoRow back up to VideosList is getting out of hand
  handlePreview = id => {
    this.setState({
      preview: true,
      url: `https://cdn.jwplayer.com/videos/${id}-${this.state.key}.mp4`
    })
  }

  searchResults = videos => {
    this.setState({ videos, view: "search" })
  }

  //helper function to update video array for VideoRow
  updateVideos = videos => {
    this.setState({ videos: this.state.videos.concat(videos), loading: false })
  }

  //helper function to update template key for preview player
  updateTemplateKey = key => {
    this.setState({ key })
  }

  //grab videos and template key when component is mounted
  componentDidMount() {
    fetchVideos(this.state.limit, 0, this.updateVideos)
    fetchTemplateKey(this.updateTemplateKey)
  }

  //handling click of "More Videos" button
  handleClick = e => {
    this.setState({ offset: this.state.offset + 10 }, () => {
      fetchVideos(this.state.limit, this.state.offset, this.updateVideos)
    })
  }

  //handle display of Toast
  handleToast = e => {
    this.setState({ showToast: true })
  }

  hideToast = () => {
    this.setState({ showToast: false })
  }

  render() {
    let { videos, view, loading, preview, url, showToast } = this.state
    return (
      <div>
        <Toast
          animation={true}
          onClose={this.hideToast}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
        {preview && <Preview url={url} closePlayer={this.closePlayer} />}
        <SearchBar searchResults={this.searchResults} />
        {!loading && (
          <Accordion>
            {videos.map((video, index) => (
              <VideoRow
                key={index}
                eventKey={index}
                title={video.title}
                mediaID={video.key}
                handlePreview={this.handlePreview}
                handleToast={this.handleToast}
              />
            ))}
          </Accordion>
        )}
        {loading && <h4 className="fetching-msg">Fetching your videos...</h4>}
        {view === "list" && !loading && (
          <Button block variant="secondary" onClick={this.handleClick}>
            More Videos
          </Button>
        )}
      </div>
    )
  }
}
