import React, { Component } from 'react';
import Navbar from '../components/Navbar';

class About extends Component {
    render() {
        return(
            <div>
                <Navbar/>
                <h1>About</h1>
                <p>ShortIt is an open source url shortener project. <br />The source code is
                available <a href="https://github.com/JonathanStefanov/ShortItv2">here</a></p>
            </div>

        );
    }
}

export default About