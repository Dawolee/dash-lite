import jsSHA from "jssha"
import { apiKey, apiSecret } from "../secrets"

function rand(digits) {
  return Math.floor(
    Math.random() * parseInt("8" + "9".repeat(digits - 1)) +
      parseInt("1" + "0".repeat(digits - 1))
  )
}

export { default as OptionBar } from "./OptionBar"
export { default as VideosList } from "./VideosList"
export { default as Players } from "./Players"
export { default as SearchBar } from "./SearchBar"

let apiCallHelper = () => {
  let api_format = "json"
  let api_key = apiKey
  let api_nonce = rand(8)
  let api_timestamp = Math.floor(new Date().getTime() / 1000)

  let call_string =
    "api_format=" +
    api_format +
    "&api_key=" +
    api_key +
    "&api_nonce=" +
    api_nonce +
    "&api_timestamp=" +
    api_timestamp

  return call_string
}

export let fetchVideos = (
  limit = 10,
  offset = 0,
  callback,
  searchString = ""
) => {
  let api_secret = apiSecret
  let requestString =
    apiCallHelper() + "&result_limit=" + limit + "&result_offset=" + offset

  if (searchString) {
    requestString += "&search=" + searchString
  }

  let shaObj = new jsSHA("SHA-1", "TEXT")
  shaObj.update(requestString + api_secret)
  let api_signature = shaObj.getHash("HEX")

  //need cors proxy to make request
  let cors_anywhere = "https://cors-anywhere.herokuapp.com/"

  requestString =
    "https://api.jwplatform.com/v1/videos/list?" +
    requestString +
    "&api_signature=" +
    api_signature

  fetch(cors_anywhere + requestString, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Management API response: ", data)
      callback(data.videos)
    })
    .catch(error => console.error("Error:", error))
}

export let fetchPlayers = callback => {
  let api_secret = apiSecret
  let requestString = apiCallHelper()
  let shaObj = new jsSHA("SHA-1", "TEXT")

  shaObj.update(requestString + api_secret)

  let api_signature = shaObj.getHash("HEX")

  //need cors proxy to make request
  let cors_anywhere = "https://cors-anywhere.herokuapp.com/"

  requestString =
    "https://api.jwplatform.com/v1/players/list?" +
    requestString +
    "&api_signature=" +
    api_signature

  fetch(cors_anywhere + requestString, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Management API response: ", data)
      callback(data.players)
    })
    .catch(error => console.error("Error:", error))
}
