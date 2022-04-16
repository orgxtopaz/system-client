import React from "react";
import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
///FORM,YUP, ALL FOR VALIDATION ALSO AXIOS FOR THE API

import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

 import "./css/update.css";

//IMPORT FOR THE TOASTIFY
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update() {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userList, setUserList] = useState([]);
  const [errorList, setErrorList] = useState([]);

  // //UPDATE DATA ON DATABASE
  let { updateId } = useParams(); //THE USER's ID WHICH BEEN PASSED THROUGH THE URL /
  const defaultId = updateId.split("*").slice(0, 1).join(" ");
  const defaultContactNumber = updateId.split("*").slice(1, 2).join(" ");
  const defaultEmail = updateId.split("*").slice(2, 3).join(" ");
  const defaultLocation = updateId.split("*").slice(3, 4).join(" ");

  //CONFIGURING TOASTIFY
  toast.configure();
  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

  const updateUser = (e) => {
    e.preventDefault();

    Axios.put(`https://orgserver.herokuapp.com/update/${defaultId}`, {
      id: defaultId,
      email: email,
      location: location,
      contactNumber: contactNumber,
    })
      .then((response) => {
        // console.log("Updated Success");

        const CustomToast = (closeToast) => {
          return (
            <div style={{ width: "300px" }}>
              <p> Please confirm the update to the following:</p>
              <p className="text-left font-weight-normal">
                {"💌 Email Address: " + email}
              </p>
              <p className="text-left font-weight-normal">
                {"📞 Contact Number: " + contactNumber}
              </p>
              <p className="text-left font-weight-normal">
                {"🌍 Location: " + location}
              </p>

              <button type="submit" onClick={save} className="btn ">
                <i
                  className="btn  bi bi-check2"
                  style={{ fontSize: "25px" }}
                ></i>
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

        //----------------------------------

        //IF CANCEL, THEN UPDATE THE VALUE OF THE SPECIFIC USER BY ITS DEFAULT VALUES
        function cancel() {
          Axios.put(`https://orgserver.herokuapp.com/updatecancel/${defaultId}`, {
            id: defaultId,
            email: defaultEmail,
            location: defaultLocation,
            contactNumber: defaultContactNumber,
          });
          window.location.reload();
        }

        function save() {
          toast.success("Updated Successfully❗", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          history.push("/"); //GOING BACK TO HOME PAGE / MAIN PAGE
          window.location.reload();
        }
      })
      .catch((err) => setErrorList(err.response.data));
  };

  const [userDetails, setUserDetails] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------
  const isLoaded = [true];
  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect
  useEffect(() => {
    if (isLoaded) {
      window.location.reload();

      Axios.get(`https://orgserver.herokuapp.com/view/${defaultId}`).then((response) => {
        setUserDetails(response.data);
      });
    }
  }, isLoaded);

  return (
    <>
      <form>
        <div className="container" style={{ top: "330px", height: "420px" }}>
          <div className="svg-background"></div>
          <div className="svg-background2"></div>
          <div className="circle"></div>
          <img
            className="menu-icon"
            src="https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png"
          />
          <img
            className="profile-img"
            src="data:image/png;base64,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"
          />
          <div className="text-container" style={{ left: "230px" }}>
            <div className="form-group">
              <input
                type="text"
                value={"📌ID: " + userDetails._id}
                readOnly
                className="form-control"
                style={{ width: "90%" }}
              />
            </div>
            <p></p>

            <div className="form-group">
              <input
                type="text"
                value={"🗣️Full Name: " + userDetails.fullname}
                readOnly
                className="form-control"
                style={{ width: "90%" }}
              />
            </div>
            <p></p>
            <div className="form-group">
              <input
                type="email"
                defaultValue={userDetails.email}
                className="form-control"
                style={{ width: "90%" }}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />

              <small id="emailHelp" className="form-text text-danger">
                {errorList.email}
              </small>
            </div>

            <div className="form-group">
              <input
                type="text"
                style={{ width: "90%" }}
                defaultValue={userDetails.contactNumber}
                className="form-control"
                onChange={(event) => {
                  setContactNumber(event.target.value);
                }}
                name="contactNumber"
              />

              <small id="emailHelp" className="form-text text-danger">
                {errorList.contactNumber}
              </small>
            </div>

            <div className="form-group">
              <select
                className="form-select custom-select "
                style={{
                  width: "90%",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "11px",
                }}
                id="inlineFormCustomSelect"
                aria-label="Default select example"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
                name="location"
                defaultValue={userDetails.location}
              >
                <option value="" hidden>
                  🌍 Select Location
                </option>
                <option
                  value="Manila"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "11px",
                  }}
                  id="inlineFormCustomSelect"
                >
                  {" "}
                  🇵🇭 Manila
                </option>
                <option
                  value="Cebu"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "11px",
                  }}
                >
                  🇵🇭 Cebu
                </option>
              </select>
              <small id="emailHelp" className="form-text text-danger">
                {errorList.location}
              </small>
            </div>

            <div className="form-group">
              <input
                type="text"
                value={"📅 Registered Date: " + userDetails.date}
                style={{ width: "90%" }}
                readOnly
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn " onClick={updateUser}>
              <i
                className="btn bi bi-save-fill"
                style={{ fontSize: "25px" }}
              ></i>
            </button>
          </div>
        </div>
      </form>

      <Link to="/">
        <i
          className="btn  bi bi-arrow-counterclockwise"
          style={{ fontSize: "40px" }}
        ></i>
      </Link>
    </>
  );
}

export default Update;
