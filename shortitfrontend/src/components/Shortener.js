import React, { Component } from 'react';
import './Shortener.css';
import axios from 'axios';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Cookies from "universal-cookie";
import RecentLinks from "./RecentLinks";

class Shortener extends Component{

    constructor(props) {
        super(props);
        this.state = { value: '',
                        shortUrl: '',
                        visible: false,
                        hrefUrl: '',
                        recentLinksVisible: false,
                        token: '',
                        links: []};
    }

    show() { // Show fct for Rodal
        this.setState({ visible: true });
    }

    isEmpty(obj) {
    return Object.keys(obj).length === 0;
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
            const hrefUrl = "/r/" + this.state.shortUrl;
            this.setState({ hrefUrl: hrefUrl});
            this.setState({ visible: true });
        }
        else{
            alert("Something went wrong. Please check your URL")
        }

        this.getRecentUrls();




        event.preventDefault();



    };

    getRecentUrls() {
        const cookies = new Cookies();
        const token = cookies.get('token');


        const apiLink = 'http://localhost:8000/api/get_links/' + token;  // Getting the urls of the user
        axios.get(apiLink) // TODO: Change the server url
            .then(response => {
                if(this.isEmpty(response["data"])) { // Check if the response is empty = is there is no url
                    this.setState({recentLinksVisible: false});
                }
                else{
                    this.setState({recentLinksVisible: true});
                    this.setState({ links: response["data"]} ) // To send the the RecentLinks component
                }
            });

    }

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
        const cookies = new Cookies();
        const token = cookies.get('token');
        axios.post('http://localhost:8000/api/', { // TODO: change the server url
            "long_url" : longUrl,
            "short_url" : shortUrl,
            "creator": token
        });

    };

     componentDidMount() {
         // Already getting a shortUrl so there is no bug
         this.getShortUrl();
         this.getRecentUrls();


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
                <Rodal visible={this.state.visible}
                       onClose={this.hide.bind(this)}
                       enterAnimation="slideUp"
                       leaveAnimation="slideDown">
                    <div>
                        <h4>Success!</h4><br />
                        <p>Your Link Has Successfully Been Created!</p>
                        <p><a href={ this.state.hrefUrl }>{this.state.hrefUrl}</a></p>
                    </div>
                </Rodal>
                {this.state.recentLinksVisible && <RecentLinks links={this.state.links}/>}
            </div>
        )
    }
}

export default Shortener


