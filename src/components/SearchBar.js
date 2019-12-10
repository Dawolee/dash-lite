import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import { fetchVideos } from "./index"

export default class SearchBar extends Component {
  handleSubmit = e => {
    let { searchResults } = this.props
    e.preventDefault()
    e.stopPropagation()
    fetchVideos(1000, 0, searchResults, e.target.searchVal.value)
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Control
          as="input"
          id="searchVal"
          placeholder="Search for videos..."
          autoComplete="off"
        />
      </Form>
    )
  }
}
