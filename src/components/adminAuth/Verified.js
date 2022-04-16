import React from 'react'
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


import "../css/component.css"// import "../../server/routes/user.routes";
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters


import "bootstrap/dist/css/bootstrap.min.css";
import "../css/all.css"

import "../css/register.css"


function Verify() {

    //STORING/GETTING EMAIL OF THE USER WHICH IS STORED ON LOCALSTORAGE
    const userEmail = localStorage.getItem('emailToken')


    let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

    const [code, setCode] = useState("");



    let { userId } = useParams()

    const verifiedNow = (e) => {
        e.preventDefault();

        console.log(userId)
        const data = {
            code: code,
            email: userEmail,
            userId: userId
        }

        Axios.put("https://orgserver.herokuapp.com/verify", data)

            .then(res => {

                alert(res.data)
                history.push("/createOfficial") //GOINF BACK TO LOG IN PAGE

            })
            .catch(err => {
                alert(err.response.data)
            })

    }

    const isLoaded = [true];
    useEffect(() => {
        if (isLoaded) {
            window.location.reload();

            Axios.get("https://orgserver.herokuapp.com/", { headers: { Authorization: localStorage.getItem('verifyToken') } })
        }
    }, isLoaded);


    ///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
    //    ///CHECKING IF USER IS SK AND  AUTHENTICATED WITH TOKEN
    if (localStorage.getItem('admin') == null) {
        history.push("/")
    }









    return (
        <>
            <center>
                <div>
                    <br></br>
                    <br></br>
                    <h1>VERIFY YOUR EMAIL</h1>

                    <br></br>

                    <form className="user" style={{ width: '60%', backgroundColor: '#5DD185', borderRadius: '2%' }}>
                        <div className="form-group">

                            <br></br>
                            <i style={{ fontSize: '4em', color: 'black' }} className="bi bi-shield-lock-fill"></i>
                            <br></br>
                            <input type="email" style={{ borderColor: "#2CA555", width: '60%' }} className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address"


                                value={userEmail} />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <input type="text" style={{ borderColor: "#2CA555", width: '60%' }} className="form-control form-control-user" id="exampleInputPassword" placeholder="Code"
                                onChange={(event) => {
                                    setCode(event.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                                <input type="checkbox" className="custom-control-input" id="customCheck" /> 
                            </div>
                        </div>
                            <button style={{ borderColor: "#2CA555", width: '30%', backgroundColor: '#2CA555', color: 'white' }} type="submit" onClick={verifiedNow} className="btn btn-primary">Verify Account</button>
                        
                        <hr />

                    </form>
                </div>
            </center>
        </>
    )
}


export default Verify
