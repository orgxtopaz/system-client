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
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import { useEffect } from "react"; //a hook that GIVES  "side-effects"

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import "../../components/css/component.css"


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

function TreasurerDashboard() {




  ///FUNCTIONS FOR TIME IN AND TIME OUT BUTTON

  function timeIn() {

    //GENERATE THE CURRENT DATE AND TIME FOR TIME IN
    const DateandTimeSplit = new Date().toLocaleString().split(",");
    const DateandTimeIn = new Date().toLocaleString();

    const date = DateandTimeSplit[0]

    Axios.post("https://orgserver.herokuapp.com/timeIn", {



      email: localStorage.getItem("Email"),
      fullname: localStorage.getItem("fullname"),
      position: localStorage.getItem("position"),

      timeIn: DateandTimeIn,
      timeOut: null,
      date: date


    })
      .then((res) => {
        alert("Time in successfully!")
        window.location.reload()

        // HERE WE WILL FETCH THE ERROR MESSAGE FROM BACK END AND STORE IT IN AN ARRAY!
      })
      .catch((err) => {


        alert(err.response.data.message)
        window.location.reload()

      })

  }

  function timeOut() {
    //GENERATE THE CURRENT DATE AND TIME FOR TIME IN
    const DateandTime = new Date().toLocaleString().split(",");

    const date = DateandTime[0]
    const DateandTimeOut = new Date().toLocaleString();

    //  const timeOut = DateandTime[1]

    Axios.put("https://orgserver.herokuapp.com/timeOut", {


      email: localStorage.getItem("Email"),
      timeOut: DateandTimeOut,
      date: date



    })
      .then((res) => {
        alert("Time Out successfully!")
        window.location.reload()

        // HERE WE WILL FETCH THE ERROR MESSAGE FROM BACK END AND STORE IT IN AN ARRAY!
      })
      .catch((err) => {


        alert(err.response.data.message)
        window.location.reload()



      })




  }




  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  /////FETCHING THE OFFICIAL ATTENDANCE DATA SPECIFIC
  
  const [AttendanceList, setAttendanceList] = useState([]);
  const [allAttendanceList, setallAttendanceList] = useState([]);

  const isLoaded = [true];
  useEffect(() => {
 

     if (isLoaded) {
      window.location.reload();

      Axios.post("https://orgserver.herokuapp.com/Attendance", 

      { headers: { "x-access-token":localStorage.getItem('secretary') },email:localStorage.getItem("Email")}
      
      )
    
      
      .then((response) => {
        setAttendanceList(response.data);

      })
      .catch((error) => {
        console.error(error)
      })
    }else{
      alert("GAdsgsdgd")
    }
  }, isLoaded);







  


   ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
  
   let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
   if(localStorage.getItem('treasurer')==null){
    history.push("/")
   }


   const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();

  }

  ///ATTENDANCE TABLE


  let columns = [
   
    {
      field: "timeIn",
      headerName: "Time In",
      width: 200,
      headerAlign: "center",
      headerClassName: 'headColor'

    },
    {
      field: "timeOut",
      headerName: "Time Out",
      width: 200,
      headerAlign: "center",
      headerClassName: 'headColor'

    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      width: 180,
      headerAlign: "center",
      headerClassName: 'headColor'

    },
    {
      field: "date",
      headerName: "Date",
      width: 175,
      headerAlign: "center",
      headerClassName: 'headColor'

    }

  
   
  ];


 

  return (

    <div className={classes.root}>
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
              style={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"white" }}>Home</span>

            </Link>

            <br></br>

            <Link to={`/treasurerOrganizational`} style={{ fontSize: "40px" }}> <i
              className="bi bi-diagram-3-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Announcement</span>
            </Link>

            <br></br>
            <Link to={`/treasurerTravel`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-cursor-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Travel Log</span>
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

        <div style={{ float: "right" }}>
          <button
          style={{marginLeft:"-15%"}}
            type="button"
            className="btn btn-outline-success btn-rounded mr-2"
            data-mdb-ripple-color="dark"
            onClick={timeIn}

          >
            Time In
  </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-rounded "
            data-mdb-ripple-color="dark"
            onClick={timeOut}
          >
            Time Out
  </button>
  <i className="bi bi-box-arrow-right " style={{cursor: "pointer",float:"right", fontSize:"2.5em" }} onClick={logout}></i>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        



 {/* TABLE RENDERED */}
 <center>
      <div style={{ height: 400, width: '60%' }}>

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
export default TreasurerDashboard;
