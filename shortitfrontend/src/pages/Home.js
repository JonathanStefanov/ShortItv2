import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Shortener from '../components/Shortener'
import './Home.css';
import axios from 'axios';
import Cookies from 'universal-cookie'



class Home extends Component {


    /*isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }*/

    componentWillMount() {
        const cookies = new Cookies();
        const testToken = cookies.get('token');

        if(typeof testToken === "undefined"){ // If there is no token it sets one
            axios.get('http://localhost:8000/api/get_token')
                .then(response => {
                    const token = response["data"]["token"]; // Getting the token ans
                    cookies.set('token', token, { path: '/' });  // Setting the cookie
                })
                .catch(error => (
                    console.log(error)
                ))
        }



    }

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