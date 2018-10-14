import React, { Component } from 'react';
import './Shortener.css';
import axios from 'axios';
import Rodal from 'rodal';

import 'rodal/lib/rodal.css';


class Shortener extends Component{

    constructor(props) {
        super(props);
        this.state = { value: '',
                        shortUrl: '',
                        visible: false,
                        hrefUrl: ''};
    }

    show() { // Show fct for Rodal
        this.setState({ visible: true });
    }

    hide() { // Hide fct for Rodal
        this.setState({ visible: false });
    }

    // Arrow fx for binding
    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    testUrl(url) {
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return (regexp.test(url));

    }


    handleSubmit = event => {
        if(this.testUrl(this.state.value)){ // If the link is correct, we're going to get a shorturl and submit everything to the backend
            this.getShortUrl(); // Gets the short url
            this.postUrls(this.state.value, this.state.shortUrl);
            const hrefUrl = "/r/" + this.state.shortUrl
            this.setState({ hrefUrl: hrefUrl});
            this.setState({ visible: true });
        }
        else{
            alert("Something went wrong. Please check your URL")
        }
        event.preventDefault();

    };

     getShortUrl() {
        axios.get('http://localhost:8000/api/get_short_url') // TODO: Change the server url
            .then(response => {
                const url = response["data"]["short_url"];
                this.setState({ shortUrl: url });
            })
            .catch( (error) => {
                console.log(error);
            });


    }

    // Arrow fx for binding
    postUrls = (longUrl, shortUrl) => {
        axios.post('http://localhost:8000/api/', {
            "long_url" : longUrl,
            "short_url" : shortUrl,
        })

    };

     componentWillMount() {
         // Already getting a shortUrl so there is no bug
         this.getShortUrl()

     }


    render() {
        return(
            <div className="content">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="center">
                        <h4>Short Your Link!</h4>
                        <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" className="btn btn-primary" value="Submit!" />
                </div>
            </form>
                <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} enterAnimation="slideUp" leaveAnimation="slideDown">
                    <div>
                        <h4>Success!</h4><br />
                        <p>Your Link Has Successfully Been Created!</p>
                        <p><a href={ this.state.hrefUrl }>{this.state.hrefUrl}</a></p>
                    </div>
                </Rodal>
            </div>
        )
    }
}

export default Shortener


