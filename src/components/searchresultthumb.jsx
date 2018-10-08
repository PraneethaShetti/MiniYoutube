import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Searchresultthumb extends Component {
    render() {
        return (
            <div onClick={this.props.onClickVideo} className="resultThumb">
                <Row >
                    <Col sm={12}>
                        <img src={this.props.youtubeData.thumbnail} alt="" />
                    </Col>
                    <Col sm={12}>
                        <h3>{this.props.youtubeData.title}</h3>
                        {/* <p className="resultDescription" style={{ border: "2px dotted green" }}>{this.props.youtubeData.description}</p> */}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Searchresultthumb;