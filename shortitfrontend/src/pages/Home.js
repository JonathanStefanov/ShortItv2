import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Shortener from '../components/Shortener'
import './Home.css';

class Home extends Component {
    render() {
        return(
            <div>
                <Navbar/>
                <Shortener/>

            </div>
        )
    }

}

export default Home