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

import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import { useEffect } from "react"; //a hook that GIVES  "side-effects"

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.


import { useHistory } from "react-router-dom"; // allows us to access our path / route history.


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

function TreasurerTravel() {
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

  ///SUBMIT NEW TRAVEL LOG


  const [fullname, setFullname] = useState("");
  const [date, setDate] = useState("");
  const [position, setPosition] = useState("");
  const [purpose, setPurpose] = useState("");
  const [errorList, setErrorList] = useState([]);

  const submitTravel = (e) => {
  
    e.preventDefault()

    Axios.post("https://orgserver.herokuapp.com/submitTravel", {
      email: localStorage.getItem("Email"),
      fullname: fullname,
      date: date,
      position: position,
      purpose: purpose,


    })
      .then((res) => {

        alert("New Travel Created Successfully!")
        window.location.reload();


      })
      .catch((err) => {

        setErrorList(err.response.data);


      })

  }

  ///ENDDDDDDDDD



  /////FETCHING THE OFFICIAL ATTENDANCE DATA 

  const [AttendanceList, setTravelList] = useState([]);
  const isLoaded = [true];
  useEffect(() => {


    if (isLoaded) {
      window.location.reload();

      Axios.post("https://orgserver.herokuapp.com/displayAllTravel",

        { headers: { "x-access-token": localStorage.getItem('treasurer') }, email: localStorage.getItem("Email") }

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
      headerName: "FullName",
      width: 170,
      className: "userId",
      headerAlign: "center",
      headerClassName: 'headColor'
    },
    {
      field: `_id`,
      headerName: "Travel Log Number",
      width: 130,
      className: "userId",
      headerAlign: "center",
      headerClassName: 'headColor'
    },
 
    {
      field: "position",
      headerName: "Position",
      width: 170,
      headerAlign: "left",
      headerClassName: 'headColor'
    },
    {
      field: "purpose",
      headerName: "Purpose",
      width: 150,
      headerAlign: "left",
      headerClassName: "super-app-theme--header",
      headerClassName: 'headColor'
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerAlign: "left",
      headerClassName: 'headColor'
    },

    {
      field: "actionview",
      headerName: "Manage",
      width: 122,
      headerClassName: 'headColor',
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/treasurerdeleteTravel/${data.row._id}`}>
            {" "}
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    }

  ];

   //    ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
   let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
   if(localStorage.getItem('treasurer')==null){
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

          <Typography variant="h6" noWrap style={{ paddingLeft: "300px", color:"black" }} >
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
          <Link to={`/Dashboard`} style={{ fontSize: "40px" }}> <i
              className="bi bi-house-door-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Home</span>

            </Link>

            <br></br>

            <Link to={`/treasurerOrganizational`} style={{ fontSize: "40px" }}> <i
              className="bi bi-diagram-3-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Official</span>
            </Link>

            <br></br>
            <Link to={`/treasurerTravel`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-cursor-fill"
              style={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"white" }}>Travel Log</span>
            </Link>
     
            <br></br>
            <Link to={`/treasurerRequest`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-file-earmark-text"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Data</span>
            </Link>

        


          </div>

        </List>

        <Divider />

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <br></br>

        <br></br>


        {/* ADD BUTTON TRAVEL LOG */}
        <div>
        <Button style={{backgroundColor:"#B4B4B4", color: "black", marginLeft:"15%"}} onClick={handleClickOpen}>
            Input New in Travel Log
      </Button>
          <br></br>
          <br></br>
          <Dialog
            fullScreen
            open={openTravelLog}
            onClose={saveTravelLog}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative' }} style={{backgroundColor:"#F8F8F8", color: "black"}}>
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
                  Add new Travel Log
            </Typography>

              </Toolbar>
            </AppBar>
            <List>
              <br></br>
              <br></br>
              <br></br>


              <div style={{ marginTop: "50px" }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-8 col-xl-6">
                  <center>
                    <div className="card rounded-3">
                      <img src="https://pilipinaspopcorn.com/wp-content/uploads/2017/03/M._Cuenco_Avenue_Cebu_City_-_panoramio-1280x720.jpg" className="w-100" style={{ borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem' }} alt="Sample photo" />
                      <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Travel Details</h3>
                        <form className="px-md-2">
                          <div className="form-outline mb-4">
                            <input type="text" className="form-control"  onChange={(event) => {
                              setFullname(event.target.value);
                            }} />
                            <label className="form-label" htmlFor="form3Example1q" style={{color:"#2CA555", borderColor:"black"}}>Name</label>
                            {/* FOR THE ERROR OF FULLNAME */}
                            <small
                              id="emailHelp"
                              className="form-text text-danger"
                            >
                              {errorList.fullname}

                            </small>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline datepicker">
                                <input type="date" className="form-control" style={{color:"#2CA555"}} id="exampleDatepicker1" placeholder="Date" onChange={(event) => {
                                  setDate(event.target.value);
                                }} />
                                <label htmlFor="exampleDatepicker1" className="form-label"></label>
                                {/* FOR THE ERROR OF FULLNAME */}
                                <small
                                  id="emailHelp"
                                  className="form-text text-danger"
                                >
                                  {errorList.date}

                                </small>
                              </div>
                            </div>

                          </div>
                          <div className="form-outline mb-4">
                           

                            <select className="form-select" style={{color:"#2CA555"}} aria-label="Default select example" 
                             onChange={(event) => {
                                  setPosition(event.target.value);
                                }}>
                            <option value="" hidden >
                                  Select Position
                                </option>
                               <option value="Official">Official</option>
                              <option value="Secretary">Secretary</option>
                              <option alue="Treasure">Treasurer</option>
                              <option alue="Brgy.Captain">Brgy.Captain</option>
                              <option alue="Sangguniang Kabataan">Sangguniang Kabataan</option>
                            </select>
                            <small
                              id="emailHelp"
                              className="form-text text-danger"
                            >
                              {errorList.position}

                            </small>
                          </div>

                          <div className="row mb-4 pb-2 pb-md-0 mb-md-5">
                            <div className="col-md-6">
                              <div className="form-outline">
                                <input type="text" id="form3Example1w" className="form-control" onChange={(event) => {
                                  setPurpose(event.target.value);
                                }} />
                                <label className="form-label" style={{color:"#2CA555"}} htmlFor="form3Example1w">Purpose</label>
                                {/* FOR THE ERROR OF FULLNAME */}
                                <small
                                  id="emailHelp"
                                  className="form-text text-danger"
                                >
                                  {errorList.purpose}

                                </small>
                              </div>
                            </div>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              style={{borderColor:"#2CA555"}}
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              required
                            />
                            <label class="form-check-label" for="flexCheckDefault">
                              I understand taking this action with my permission
                            </label>
                          </div>
                          <br></br>

                          <button type="submit" onClick={submitTravel} className="btn btn-success btn-lg mb-1" style={{backgroundColor:"#2CA555"}}>Submit</button>
                        </form>
                      </div>

                    </div>
                    </center>
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
export default TreasurerTravel;
