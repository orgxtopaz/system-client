import React from 'react'
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import loginImage from './img/login.svg' // relative path to image 
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/all.css"

import "./css/register.css"


function Login() {

     //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED
let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
 
 const [password, setPassword] = useState("");
 const [email, setEmail] = useState("");



 const loginNow =(e)=>{
  e.preventDefault();

  const data ={
      password: password,
      email: email
  }
  
  Axios.post("https://orgserver.herokuapp.com/login",data)

  .then(res =>{


     //IF AUTH IS = TRUE comes from the backend!
   if (res.data.auth){

     if(res.data.position ==="official" || res.data.position ==="captain" || res.data.position ==="sk"){
      console.log(res.data)
      localStorage.setItem("Official", res.data.token);
      localStorage.setItem("Email", res.data.email);
      localStorage.setItem("fullname", res.data.fullname);
      localStorage.setItem("position", res.data.position);
      history.push(`/Dashboard`); 

     } else if(res.data.position ==="admin"){       
      localStorage.setItem("admin", res.data.token);
      localStorage.setItem("Email", res.data.email);
      localStorage.setItem("fullname", res.data.fullname);
      localStorage.setItem("position", res.data.position);
      history.push(`/adminDashboard`); 

     }
     else if(res.data.position ==="secretary"){       
      localStorage.setItem("secretary", res.data.token);
      localStorage.setItem("Email", res.data.email);
      localStorage.setItem("fullname", res.data.fullname);
      localStorage.setItem("position", res.data.position);
      history.push(`/secretaryDashboard`); 
     }

     else if(res.data.position ==="treasurer"){       
      localStorage.setItem("treasurer", res.data.token);
      localStorage.setItem("Email", res.data.email);
      localStorage.setItem("fullname", res.data.fullname);
      localStorage.setItem("position", res.data.position);


      history.push(`/treasurerDashboard`); 
     }

    
   }
    

  })
   .catch(err =>{
      alert(err.response.data.message)
      
 })

}

///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
if(localStorage.getItem('Official')!=null){
history.push("/Dashboard")
}else if(localStorage.getItem('sk')!=null){
history.push("/Dashboard")
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


return (
  <>
  <div>


<div className="row justify-content-center">
  <div className="col-xl-10 col-lg-12 col-md-9">
    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        {/* Nested Row within Card Body */}
        <div className="row">
          <div className="col-lg-6 d-none d-lg-block bg-login-image">
           <img style={{width:"100%",height:"auto",marginBottom:"-50%"}} src={loginImage} alt="image1"></img>

          </div>
          <div className="col-lg-6">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 mb-4" style={{color: "#2CA555"}}>WELCOME  !</h1>
              </div>
              <form className="user">
                <div className="form-group">
                  <input type="email" style={{borderColor: "#2CA555"}} className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."
                   onChange={(event) => {
                    setEmail(event.target.value)}} />
                </div> 
                <div className="form-group">
                  <input type="password" style={{borderColor: "#2CA555"}} className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" 

                  onChange={(event) => {
                            setPassword(event.target.value)}} />
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox small">
                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                    <label className="custom-control-label"  htmlFor="customCheck">Remember
                      Me</label>
                  </div>
                </div>
                <center>
                <button onClick={loginNow} className="btn btn-success btn-user btn-block" style={{width:"60%"}}>
                  Login
                </button>
                </center>
                <hr />
               
              </form>
      
              <div className="text-center">
                <a className="small" href="/forgot" style={{color: "#2CA555"}}>Forgot Password?</a>
              </div>

           
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      
  </div>
  </>
)
}

export default Login
