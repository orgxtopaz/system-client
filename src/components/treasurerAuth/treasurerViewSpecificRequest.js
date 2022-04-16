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
import viewEditRequestTreasurer from '../img/viewEditRequest.svg'

  //CONFIGURING TOASTIFY
toast.configure();

function TreasurerViewSpecificRequest() {
  
  let { userId } = useParams();

  const [userDetails, setUserDetails] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------
  const isLoaded = [true];
  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect
  useEffect(() => {
    if (isLoaded) {
      window.location.reload();

      Axios.post(`https://orgserver.herokuapp.com/viewSpecificRequest/${userId}`,{
        headers: { "x-access-token": localStorage.getItem('treasurer') }, email: localStorage.getItem("Email")

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

  const [salary , setSalary] = useState("");
  const [choose , setChoose] = useState("");



    const request = () => {

      function saveUpdate() {
        toast.success("Request Successfully Updated!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
  
         ////UPDATE DATA ON DATABASE------------------------------------------
    
        Axios.post(`https://orgserver.herokuapp.com/manageRequest`,
  
        {
          
          headers: { "x-access-token":localStorage.getItem('treasurer'),
 
        
        },


        salary : salary,
        email : userDetails.email,
        choose :choose,
        presents:userDetails.overallTotalDays,
        absents:userDetails.overallTotalAbsent,
        manage :userDetails.requestTo,
        name :userDetails.fullname,
        position :userDetails.position,
      

       
        }
        
        )
        
  
        
        .then(
          () => {
            history.push("/treasurerRequest"); //GOING BACK TO HOME PAGE / MAIN PAGE
            window.location.reload();
          
          }
        )
        .catch((err) => {
          alert(err.response.data)
          history.push("/treasurerRequest"); //GOING BACK TO HOME PAGE / MAIN PAGE

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
            <p>Are you sure you want to 
update this request?</p>
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
   if(localStorage.getItem('treasurer')==null){
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
          <img
            className="menu-icon"
            src="https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png"
          />
          <img
            className="profile-img"
            src={viewEditRequestTreasurer}
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
                 value={"❌ Days Absent: "+userDetails.overallTotalAbsent}

                defaultValue=""
                className="form-control"
                readOnly
              
              />       
              <p></p>
            
            </div>
  

            <div className="form-group">
              <input
                type="text"
                 style={{width:"90%"}}
                 placeholder="Salary ₱ : "

                className="form-control"
                onChange={(event) => {
                    setSalary(event.target.value);
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
                    setChoose(event.target.value);
                    }}
                
                    placeholder="sdsd"
                    style={{ borderColor: "black" ,height:"32px",fontFamily:"'Raleway', sans-serif",width:"190%", backgroundColor:'#72FF1B'}}
                >
                    <option value="" hidden >
                    Choose
                    </option>
                    <option value="Approved" style={{fontFamily:"'Raleway', sans-serif", fontSize:"15px"}}>Approve</option>
                    <option value="Cancelled" style={{fontFamily:"'Raleway', sans-serif", fontSize:"15px"}}>Cancel</option>
                

                </select>
 
                </div>



         

              <br></br>

              <div class="form-check">
                            <input
                              class="form-check-input"
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

            <button type="submit"  onClick={request} className="btn " style={{backgroundColor:"#2CA555",color:"white"}} >
              
               SUBMIT
              </button>


           
          </div>
        </div>

        <Link to="/treasurerRequest">
        <i
          className="btn  bi bi-arrow-counterclockwise"
          style={{ fontSize: "40px" }}
        ></i>
      </Link>
    </>
  );
}

export default TreasurerViewSpecificRequest;
