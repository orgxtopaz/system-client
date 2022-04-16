import React from "react";

///FORM,YUP, ALL FOR VALIDATION ALSO AXIOS FOR THE API
import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes
import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/view.css";
//IMPORT FOR THE TOASTIFY
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import viewEditRequest from '../img/viewEditRequest.svg'

  //CONFIGURING TOASTIFY
toast.configure();

function ViewSpecificTotalAttendance() {
  
  let { userId } = useParams();

  const [userDetails, setUserDetails] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------
  const isLoaded = [true];
  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect
  useEffect(() => {
    
    if (isLoaded) {
      window.location.reload();

      Axios.post(`https://orgserver.herokuapp.com/viewSpecificTotalAttendance/${userId}`,{
        headers: { "x-access-token": localStorage.getItem('secretary') }, email: localStorage.getItem("Email")

      }
      
      ).then(
        (response) => {
          setUserDetails(response.data);
        }
      );
    }
  }, isLoaded);






  //WHEN USER CLICK THE BUTTON DELETE
  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

  /////FUNCTION TO MAKE REQUEST


 
  const [overallTotalAbsent , setOverallTotalAbsent] = useState("");
  const [requestTo , setRequestTo] = useState("");
 


    const request = () => {


  
      function saveUpdate() {
        toast.success("Request Submitted Successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
  
         ////UPDATE DATA ON DATABASE------------------------------------------
    
        Axios.post(`https://orgserver.herokuapp.com/salaryRequest`,
  
        {
          
          headers: { "x-access-token":localStorage.getItem('secretary'),
 
        
        },
        fullname : userDetails.fullname,
        email : userDetails.email,
        position : userDetails.position,
        overallTotalHours : userDetails.overallTotalHours,
        overallTotalDays: userDetails.overallTotalDays,
        overallTotalAbsent: overallTotalAbsent,
        requestTo: requestTo,
        status :userDetails.status

       
        }
        
        )
        
  
        
        .then(
          () => {
            history.push("/secretaryDashboard"); //GOING BACK TO HOME PAGE / MAIN PAGE
            window.location.reload();
          
          }
        )
        .catch((err) => {
          alert(err.response.data)
          window.location.reload();

        })
      
      }
  
      //----------------------------------
      const cancel = () => {
        window.location.reload();
      };
  
      const CustomToast = (closeToast) => {
        return (
          <div style={{ width: "300px" }}>
            <p>Are you sure you want to make this request?</p>
            <button type="submit" onClick={saveUpdate} className="btn ">
              <i className="btn  bi bi-check2" style={{ fontSize: "25px" }}></i>
            </button>
  
            <button type="submit" onClick={cancel} className="btn ">
              <i className="btn  bi bi-x" style={{ fontSize: "25px" }}></i>
            </button>
  
          </div>
        );
      };
  
      ///--------------------------------
      toast.info(<CustomToast />, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeOnClick: false,
        icon: false,
      });
    };




   //    ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
   if(localStorage.getItem('secretary')==null){
    history.push("/")
   }

  return (
    <>
    <br></br>
    <div className="row" style={{marginLeft:"50%"}}>
  <div className="col-sm-4">

              <input
                type="text"
                value={"🏅 "+userDetails.position}
                style={{width:"90%"}}
                readOnly
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
     
  </div>
  <div className="col-sm-4">
  <input
                type="text"
                value={"👤 "+userDetails.fullname}
                style={{width:"90%"}}
                readOnly
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
  </div>
  <div className="col-sm-4">
  <input
                type="text"
                value={"📩 "+userDetails.email}
                style={{width:"90%"}}
                readOnly
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
  </div>
</div>
    
  

      
     

     <div className="container" style={{top:"330px",height:"395px"}}>
          <div className="svg-background"></div>
          <div className="svg-background2"></div>
          <div className="circle"></div>
          
          {/* <img
            className="menu-icon"
            src="https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png"
          /> */}


          <img
            className="profile-img"
            src={viewEditRequest}
          ></img>
          <div className="text-container" style={{left:"230px"}}>
           
            <p></p>

            <div className="form-group">
              <input
                type="text"
                value={"🕓 Total Hours: " + userDetails.overallTotalHours}
                readOnly
                className="form-control"
                 style={{width:"90%"}}
              />
            </div>
            <p></p>
            <div className="form-group">
              <input
                type="email"
                value={"📅 Days Present: "+userDetails.overallTotalDays}
                className="form-control"
                 style={{width:"90%"}}
                 readOnly
            
            
              />
              <p></p>
            
              
            </div>

            <div className="form-group">
              <input
                type="text"
                 style={{width:"90%"}}
                 
                defaultValue=""
                className="form-control"
                placeholder="❌ Days Absent: "
              

                onChange={(event) => {
                  setOverallTotalAbsent(event.target.value);
                }}
              />       
              <p></p>
            
            </div>
  
            <div className="col-sm-6 mb-3 mb-sm-0">

            <select
                             
                className="form-select " 
                id="inlineFormCustomSelect form3Example4cd"
                aria-label="Default select example"
                 onChange={(event) => {
                   setRequestTo(event.target.value);
                  }}
              
                placeholder="sdsd"
                style={{ borderColor: "black" ,height:"32px",fontFamily:"'Raleway', sans-serif",width:"190%",backgroundColor:'#72FF1B', fontSize:"13px"}}
              >
                <option value="" hidden>
                  Request to
                </option>
                <option value="admin" style={{fontFamily:"'Raleway', sans-serif"}}>Admin</option>
                <option value="treasurer" style={{fontFamily:"'Raleway', sans-serif"}}>Treasurer</option>
               

              </select>

              </div>
        

              <br></br>

              <div class="form-check" style={{marginRight:'1%'}}>
                            <input
                              class=" custom-checkbox"
                              style={{borderColor:"#2CA555"}}
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              required
                            />
                            <small class="form-check-label" for="flexCheckDefault">
                              I understand taking this action
                            </small>
                          </div>
                          <br></br>

            <button type="submit"  onClick={request} className="btn" style={{backgroundColor:"#2CA555",color:"white"}} >
               SUBMIT
              </button>


           
          </div>
        </div>

        <Link to="/createOfficial">
        <i
          className="btn  bi bi-arrow-counterclockwise"
          style={{ fontSize: "40px" }}
        ></i>
      </Link>
    </>
  );
}

export default ViewSpecificTotalAttendance;
