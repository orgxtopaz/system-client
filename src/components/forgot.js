import React from 'react'
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


import "./css/component.css"// import "../../server/routes/user.routes";
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters


import "bootstrap/dist/css/bootstrap.min.css";
import "./css/all.css";

import "./css/register.css";
import forgotImg from './img/forgotPass.png' // relative path to image 




function Forgot() {

  


    let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

    const [email, setEmail] = useState("");




    const verifiedNow = (e) => {
        e.preventDefault();

   
        const data = {
         
            email: email,
          
        }

        Axios.post("https://orgserver.herokuapp.com/forgot", data)

            .then(res => {

                alert(res.data)
                history.push("/") //GOINF BACK TO LOG IN PAGE
            })
            .catch(err => {
                alert(err.response.data)
            })

    }

 


    ///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
    //    ///CHECKING IF USER IS SK AND  AUTHENTICATED WITH TOKEN
   ///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
if(localStorage.getItem('Official')!=null){
    history.push("/Dashboard")
   }else if(localStorage.getItem('sk')!=null){
     history.push("/skDashboard")
   }
   else if(localStorage.getItem('secretary')!=null){
     history.push("/secretaryDashboard")
   }
   else if(localStorage.getItem('treasurer')!=null){
     history.push("/treasurerDashboard")
   }
   else if(localStorage.getItem('captain')!=null){
     history.push("/Dashboard")
   }
   else if(localStorage.getItem('admin')!=null){
    history.push("/Dashboard")
  }








    return (
        <>
            <center>
                <div>
                    <br></br>
                    <br></br>
                    <h1>FORGOT PASSWORD</h1>

                    <br></br>
                   
                    <form className="user" style={{ width: '50%', backgroundColor: '#5DD185', borderRadius: '2%' }}>
                        
                        <br></br>
        
                        <img src={forgotImg} style={{width:"10%", marginBottom:"3.5%",}}>

                        </img>
                        <br></br>
                        <div className="form-group">
                            <input type="text" style={{ borderColor: "#2CA555", width: '60%' }} className="form-control form-control-user" id="exampleInputPassword" placeholder="Email Address"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                                <input type="checkbox" className="custom-control-input" id="customCheck" /> 
                            </div>
                        </div>
                            <button style={{ borderColor: "#2CA555", width: '30%', marginTop:"-7%", backgroundColor: '#2CA555', color: 'white' }} type="submit" onClick={verifiedNow} className="btn btn-primary">Reset Password</button>
                        
                        <hr />

                    </form>
                </div>
            </center>
        </>
    )
}


export default Forgot
