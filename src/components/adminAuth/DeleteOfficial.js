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
import deleteOfficial from '../img/deleteOfficiallogo.svg' // relative path to image 

import FileBase64 from "react-file-base64";


  //CONFIGURING TOASTIFY
toast.configure();

function Delete() {
  
  let { userId } = useParams();

  const [userDetails, setUserDetails] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------
  const isLoaded = [true];
  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect
  useEffect(() => {
    if (isLoaded) {
      window.location.reload();

      Axios.post(`https://orgserver.herokuapp.com/viewOfficial/${userId}`,{
        headers: { "x-access-token": localStorage.getItem('admin') }, email: localStorage.getItem("Email")

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

  //FUNCTION TO DELETE USER
  const deleteUser = () => {
  
    function save() {
      toast.success("Deleted Successfully❗", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });

       ////DELETE DATA ON DATABASE------------------------------------------
      Axios.post(`https://orgserver.herokuapp.com/deleteOfficial/${userId}`,{
        headers: { "x-access-token": localStorage.getItem('admin') }, email: localStorage.getItem("Email")

      }).then(
        (response) => {
          console.log("User Deleted Successfully!");
          history.push("/createOfficial"); //GOING BACK TO HOME PAGE / MAIN PAGE
          window.location.reload();
        
        }
      );
    
    }

    //----------------------------------
    const cancel = () => {
      window.location.reload();
    };

    const CustomToast = (closeToast) => {
      return (
        <div style={{ width: "300px" }}>
          <p>Are you sure you want to delete the record?</p>
          <button type="submit" onClick={save} className="btn ">
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



  /////FUNCTION TO UPDATE USER
  const [updateContactNumber, setUpdateContactNumber] = useState(userDetails.contactNumber);
  const [updatePassword, setUpdatePassword] = useState(userDetails.password);
  const [item, setItem] = useState({ image: userDetails.image });


    const updateUser = () => {
  
      function saveUpdate() {
        toast.success("Official Updated Successfully❗", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
  
         ////UPDATE DATA ON DATABASE------------------------------------------
    
        Axios.put(`https://orgserver.herokuapp.com/updateOfficial`,
  
        {
          
          headers: { "x-access-token":localStorage.getItem('admin'),
 
        
        },
        email: userDetails.email,
        updateContactNumber:updateContactNumber,
        updatePassword:updatePassword,
        image:item.image


       
        }
        
        )
        
        
        
        
        
        
        .then(
          (response) => {
            console.log("User Updated Successfully!");
            history.push("/createOfficial"); //GOING BACK TO HOME PAGE / MAIN PAGE
            window.location.reload();
          
          }
        );
      
      }
  
      //----------------------------------
      const cancel = () => {
        window.location.reload();
      };
  
      const CustomToast = (closeToast) => {
        return (
          <div style={{ width: "300px" }}>
            <p>Are you sure you want to update the record?</p>
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
   if(localStorage.getItem('admin')==null){
    history.push("/")
   }

  return (
    <>
     <div className="container" style={{top:"330px",height:"395px"}}>
          <div className="svg-background"></div>
          <div className="svg-background2"></div>
          <div className="circle"></div>
 
     

          <img
            className="profile-img"
            src={userDetails.image}
          ></img>
          <div className="text-container" style={{left:"230px"}}>
           
            <p></p>
            <div className="form-group">
            <FileBase64
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) => setItem({ ...item, image: base64 })}

                />
            </div>

            <div className="form-group">
              <input
                type="text"
                value={"🗣️ " + userDetails.fullname}
                readOnly
                className="form-control"
                 style={{width:"90%"}}
              />
            </div>
            <p></p>
            <div className="form-group">
              <input
                type="email"
                value={"💌 "+userDetails.email}
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
                 
                 defaultValue={userDetails.contactNumber}
                className="form-control"
              

                onChange={(event) => {
                  setUpdateContactNumber(event.target.value);
                }}
              />       
              <p></p>
            
            </div>

            
        
          

            <div className="form-group">
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




            <div className="form-group">
              <input
                type="text"
                 style={{width:"90%"}}
                 
                 defaultValue={userDetails.password}
                className="form-control"
                
                
                onChange={(event) => {
                  setUpdatePassword(event.target.value);
                }}
              />       
              <p></p>
            
            </div>

            <button type="submit"  onClick={updateUser} className="btn "  >
              
              <i
            className="btn  bi bi-pencil-square"
            style={{ fontSize: "25px", color: "#A3FF83" }}
  
          ></i>
              </button>

            <button type="submit"  onClick={deleteUser} className="btn "  >
              
            <i
          className="btn  bi bi-trash-fill"
          style={{ fontSize: "25px", color:"red" }}

        ></i>
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

export default Delete;
