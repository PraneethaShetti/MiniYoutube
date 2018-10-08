/* global gapi */
import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import Searchresultthumb from './searchresultthumb';
import './CSS/styles.css';
const API_KEY = 'AIzaSyBcbdgVrYczp0g1gAdH8TKVx72eljduNsw';


class Mainframe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gapiReady: false,
            searchedText: '',
            currentResults: [],
            currentVideo: '',
            currentVideoId: '',
            showPlayer: 'none'
        }
        this.loadYoutubeApi = this.loadYoutubeApi;
        this.getDataFromYoutube = this.getDataFromYoutube;
    }
    loadYoutubeApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";

        script.onload = () => {
            gapi.load('client', () => {
                gapi.client.setApiKey(API_KEY);
                gapi.client.load('youtube', 'v3', () => {
                    this.setState({ gapiReady: true });
                });
            });
        };

        document.body.appendChild(script);
    }


    componentDidMount() {
        this.loadYoutubeApi();
    }

    getDataFromYoutube() {
        var searchText = this.state.searchedText;
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            order: "ViewCount",
            //q: encodeURIComponent(searchText.replace(/%20/g, "+")),
            q: searchText,
            maxResults: 10,
        });
        // execute the request
        var self = this;
        request.execute(function (response) {
            var result = response.items.map((value) => {
                return {
                    videoId: value.id.videoId,
                    thumbnail: value.snippet.thumbnails.medium.url,
                    description: value.snippet.description,
                    title: value.snippet.title
                }
            })
            if (result.length > 0) {
                self.setState({ currentResults: result, showPlayer: 'none' })
            } else {
                self.setState({ currentResults: [] })
            }
        });
    }

    onSearchText(evt) {
        this.setState({ searchedText: evt.target.value })
    }

    clickListner(video) {
        var embedCode = "https://www.youtube.com/embed/" + video.videoId
        this.setState({ showPlayer: 'block', currentVideoId: embedCode, currentVideo: video })
        window.scrollTo(0, 0)
    }

    render() {
        if (this.state.gapiReady) {
            return (
                <div>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <Row>
                                    <Col>
                                        <div className="searchBtn">
                                            <h1 className="quote">Where words fail Music speaks...!!</h1>
                                            <input className="searchBar" type="text" placeholder="Search Youtube Video" value={this.state.searchedText} onChange={this.onSearchText.bind(this)} />
                                            <button className="btn btn-primary searchbtn" onClick={this.getDataFromYoutube.bind(this)}><i className="fa fa-search"></i></button>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="selectedVideo" style={{ display: this.state.showPlayer }}>
                                            <iframe width="100%" height="315" src={this.state.currentVideoId} title="playVideo" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                                            <h2>{this.state.currentVideo.title}</h2>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <div className="searchResult">
                                    <div className="resultDes"><h3>Top 10 results of your search.</h3></div>
                                    {
                                        this.state.currentResults.map((element, index) => {
                                            return <Searchresultthumb key={index} onClickVideo={this.clickListner.bind(this, element)} youtubeData={element} />
                                        })
                                    }

                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        } else {
            return (
                <h1>Loading...Please give us a moment.!</h1>
            );
        }
    }
}

export default Mainframe;