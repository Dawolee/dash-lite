import React, { Component } from "react"
import { fetchVideos, SearchBar, VideoRow, Preview } from "./index"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
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
      url: ""
    }
  }

  closePlayer = () => {
    this.setState({ preview: false })
  }

  //should've used Redux for this as passing state around from VideoRow back up to VideosList is getting out of hand
  handlePreview = url => {
    this.setState({ preview: true, url })
  }

  searchResults = videos => {
    this.setState({ videos, view: "search" })
  }

  updateVideos = videos => {
    this.setState({ videos: this.state.videos.concat(videos), loading: false })
  }

  componentDidMount() {
    fetchVideos(this.state.limit, 0, this.updateVideos)
  }

  handleClick = e => {
    this.setState({ offset: this.state.offset + 10 }, () => {
      fetchVideos(this.state.limit, this.state.offset, this.updateVideos)
    })
  }

  render() {
    let { videos, view, loading, preview, url } = this.state
    return (
      <div>
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
