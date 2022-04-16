import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


////FOR REGISTER FORM IMPORTS

import "../../components/css/all.css"

import "../../components/css/register.css"

import registerImage  from '../img/register.svg' // relative path to image 

import Axios from "axios"; //allows us to make GET and POST requests from the browser.




/////BUTTON 
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.


import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
import { useEffect } from "react"; //a hook that GIVES  "side-effects"


//BUTTON ADD NEW TRAVEL LOG

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




////ENDDDDDD

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .headColor': {       backgroundColor: '#2CA555',       color: 'white'     },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color:"gray"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function CreateOfficial() {



  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  /////////////////////TABLE

  //ADD NEW TRAVEL LOG BUTTON
  const [openTravelLog, setOpenTravelLog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenTravelLog(true);
  };

  const cancel = () => {
    setOpenTravelLog(false);
  };
  const saveTravelLog = () => {
    alert("SADgs")
  };

  // ENDDDDDDDDD

  ///ADD NEW USER

   //  // NO USE
  //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [position, setPosition] = useState("");

  const [errorList, setErrorList] = useState([]);


  const addUser = (e) => {
    e.preventDefault();
 
    //CHECKIING IF EMAIL EXIST
    console.log(errorList)


      Axios.post("https://orgserver.herokuapp.com/add",
      
      {
      
        fullname: fullname,
        email: email,
        password: password,
        position: position,
        contactNumber: contactNumber,
        headers: { "x-access-token": localStorage.getItem('admin') }, 
       
      })
        .then((res) => {  

          let verifyToken = res.data.verifyToken;
        
          let emailToken = res.data.email
          

          localStorage.setItem("verifyToken", 'Bearer ' + verifyToken);

          ///GETTING THE EMAIL THAT USER USE IN REGISTER AND STORE IT IN LOCALSTORAGE.
          localStorage.setItem("emailToken", emailToken);
       
          history.push(`/verify/${res.data.user._id}`)
        }) 
        .catch ((err) => {
                   
            setErrorList(err.response.data);
 

            if(errorList[27]=='1'){
              console.log(errorList)
           
              alert("Email Exist Create New!")
          
            }
    
 
       
        })
  
      }



  



  /////FETCHING THE OFFICIAL ATTENDANCE DATA SPECIFIC

  const [AttendanceList, setTravelList] = useState([]);
  const isLoaded = [true];
  useEffect(() => {


    if (isLoaded) {
      window.location.reload();

      Axios.post("https://orgserver.herokuapp.com/displayOfficial",

        {
           headers: { "x-access-token": localStorage.getItem('admin') }, email: localStorage.getItem("Email")
          
          
        }

      )


        .then((response) => {
          setTravelList(response.data);


        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert("GAdsgsdgd")
    }
  }, isLoaded);




 

  ///ATTENDANCE TABLE


  let columns = [
    {
      field: `fullname`,
      headerName: "Fullname",
      width: 200,
      className: "userId",
      headerAlign: "center",
      headerClassName: 'headColor'
    },
 
    {
      field: "position",
      headerName: "Position",
      width: 150,
      headerAlign: "left",
      headerClassName: 'headColor'
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerAlign: "left",
      // headerClassName: "super-app-theme--header",
      headerClassName: 'headColor'
      
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 160,
      headerAlign: "left",
      headerClassName: 'headColor'
    },

  
    {
      field: "actiondelete",
      headerName: "MANAGE",
      width: 150,
      headerClassName: 'headColor',
      
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/deleteOfficial/${data.row._id}`}>
            {" "}
            <i
              className="bi bi-pencil-square"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    },

  ];

   //    ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
   let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
   if(localStorage.getItem('admin')==null){
    history.push("/")
   }
   
  return (

    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.js"
        ></script>
      </Helmet>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap style={{ paddingLeft: "300px",color:"black" }} >
          Web-based Management System for Barangay Officials of Nalhub, Dalaguete, Cebu
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <div className="sidebar">

          <Link to={`/adminDashboard`} style={{ fontSize: "40px" }}> <i
              className="bi bi-house-door-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px",color:"black" }}>Home</span>

            </Link>

            <br></br>

            <Link to={`/adminOrganizational`} style={{ fontSize: "40px" }}> <i
              className="bi bi-diagram-3-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px",color:"black" }}>Announcement</span>
            </Link>

            <br></br>
            <Link to={`/adminTravel`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-cursor-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px",color:"black" }}>Travel Log</span>
            </Link>

            <br></br>
            <Link to={`/createOfficial`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-people-fill"
              style={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px",color:"white" }}>Create official</span>
            </Link>
           
            <br></br>
            <Link to={`/request`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-file-earmark-text"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px",color:"black" }}>Data</span>
            </Link>

          </div>

        </List>

        <Divider />

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <br></br>

        <br></br>


        {/* ADD BUTTON Create account */}
        <div>
          <Button style={{backgroundColor:"#B4B4B4", color: "black", marginLeft:"15%"}} onClick={handleClickOpen}>
            Create Official Account
      </Button>
          <br></br>
          <br></br>
          <Dialog
            fullScreen
            open={openTravelLog}
            onClose={saveTravelLog}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative'}} style={{backgroundColor:"#F8F8F8", color: "black"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={cancel}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Add new Official
            </Typography>

              </Toolbar>
            </AppBar>
            <List>
              <br></br>
              <br></br>
              <br></br>


              <div style={{ marginTop: "50px" }}>

              <div>
      {/* Custom fonts for this template*/}
      <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        {/* Custom styles for this template*/}
        <link href="css/register.min.css" rel="stylesheet" />


        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" > 
              <img style={{width:"93%",height:"auto"}}  src={registerImage}></img>

              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user" style={{borderColor: "black"}} id="exampleFirstName" placeholder="Full Name"   onChange={(event) => {
                                  setfullname(event.target.value);
                                }} name="fullname"/>

                                {/* FOR THE ERROR OF FULLNAME */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.fullname}
                   
                              </small>


                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" style={{borderColor: "black"}} id="exampleLastName" placeholder="Contact Number"    onChange={(event) => {
                                  setContactNumber(event.target.value);
                                }}
                                name="contactNumber" />

                                
                                {/* FOR THE ERROR OF ContactNumber */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.contactNumber}
                   
                              </small>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control form-control-user" style={{borderColor: "black"}} id="exampleInputEmail" placeholder="Email Address"   onChange={(event) => {
                                  setEmail(event.target.value);
                                }}
                                required
                                name="email" />

                                
                                {/* FOR THE ERROR OF EMAIL */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.email}
                   
                              </small>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        
                        <input type="password"  className="form-control form-control-user" style={{borderColor: "black"}} id="exampleInputPassword" placeholder="Password"    onChange={(event) => {
                                  setPassword(event.target.value);
                                }}
                                name="password"  />

                                
                                {/* FOR THE ERROR OF PASSWORD */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.password}
                   
                              </small>
                      </div>


                      <div className="col-sm-6 mb-3 mb-sm-0">

                      <select
                             
                                className="form-select " 
                                id="inlineFormCustomSelect form3Example4cd"
                                aria-label="Default select example"
                                onChange={(event) => {
                                  setPosition(event.target.value);
                                }}
                                name="location"
                                placeholder="sdsd"
                                style={{ borderColor: "black" ,height:"50px",borderRadius:"10rem",fontFamily:"'Raleway', sans-serif"}}
                              >
                                <option value="" hidden>
                                  Select POSITION
                                </option>
                                <option value="official" style={{fontFamily:"'Raleway', sans-serif"}}>Official</option>
                                <option value="secretary" style={{fontFamily:"'Raleway', sans-serif"}}>Secretary</option>
                                <option value="treasurer" style={{fontFamily:"'Raleway', sans-serif"}}>Treasurer</option>
                                <option value="captain" style={{fontFamily:"'Raleway', sans-serif"}}>Brgy.Captain</option>
                                <option value="sk" style={{fontFamily:"'Raleway', sans-serif"}}>Sangguniang Kabataan</option>

                              </select>
                        
                        

                                
                                {/* FOR THE ERROR OF POSITION */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.position}
                   
                              </small>
                      </div>
                     
                    </div>
                    <center>
                    <button onClick={addUser} className="btn btn-primary btn-user btn-block btn-success" style={{width:"60%"}}>
                      Create Official Account
                    </button>
                    </center>
                    <hr />
                  
                  </form>
                 
                  <div className="text-center">
                   <small>Only SK Official can create Account for Officials!</small>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

                
                
              </div>



              <Divider />


            </List>
          </Dialog>
        </div>
        {/* END ADD NEW TRAVEL LOG BUTTON */}

        {/* TABLE RENDERED */}
        <center>
        <div style={{ height: 400, width: '70%' }}>

          {/* data grid include filtering, columns. */}

          <DataGrid
            rows={AttendanceList}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}


          // checkboxSelection
          />
        </div>
        </center>
      </main>
    </div>

  );
}
export default CreateOfficial;








