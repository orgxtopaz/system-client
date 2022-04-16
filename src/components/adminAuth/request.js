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


////////////////IMPORTS EXCEL CONVERTION

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

/////////////////////////

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
    color:"gray",
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

function Request() {

//////////////////// IMPORT TO EXCEL

const fileName ="Salary Requests Downloaded by SK"

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const fileExtension = '.xlsx';



const exportToCSV = (csvData, fileName) => {

    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], {type: fileType});

    FileSaver.saveAs(data, fileName + fileExtension);

}



/////////////////////////




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
  
  const [salaryRequest, setSalaryRequest] = useState([]);

  const isLoaded = [true];
  useEffect(() => {
 

     if (isLoaded) {
      window.location.reload();

      Axios.post("https://orgserver.herokuapp.com/displaySalaryRequest", 

      { headers: { "x-access-token":localStorage.getItem('admin') },position:localStorage.getItem("position")}
      
      )
    
      
      .then((response) => {
        setSalaryRequest(response.data);


     
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
   if(localStorage.getItem('admin')==null){
    history.push("/")
   }



  ///ATTENDANCE TABLE


  let columns = [
   
    {
      field: "from",
      headerName: "From",
      width: 170,
      headerAlign: "center",
      headerClassName: 'headColor'

    },
    {
      field: "subject",
      headerName: "Subject",
      width: 170,
      headerAlign: "center",
      headerClassName: 'headColor'

    },
    {
      field: "date",
      headerName: "Date",
      width: 210,
      headerAlign: "center",
      headerClassName: 'headColor'

    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      headerAlign: "center",
      headerClassName: 'headColor'

    }, {
      field: "actionview",
      headerName: "Manage",
      width: 142,
      headerClassName: 'headColor',
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/viewSpecificRequest/${data.row._id}`}>
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
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Home</span>

            </Link>

            <br></br>

            <Link to={`/adminOrganizational`} style={{ fontSize: "40px" }}> <i
              className="bi bi-diagram-3-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Announcement</span>
            </Link>

            <br></br>
            <Link to={`/adminTravel`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-cursor-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Travel Log</span>
            </Link>

            <br></br>
            <Link to={`/createOfficial`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-people-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"black" }}>Travel Log</span>
            </Link>
           
            <br></br>
            <Link to={`/request`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-file-earmark-text"
              style={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "15px", color:"white" }}>Data</span>
            </Link>





          </div>

        </List>

        <Divider />

      </Drawer>
      <main className={classes.content}>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button type="button" className="btn " style={{ color:"green", backgroundColor:"palegreen", marginLeft:"15%", fontSize:"13px"}}  onClick={(e) => exportToCSV(salaryRequest,fileName)}> Download Data <i class="bi bi-arrow-down-short"></i></button>
        <br></br>

        <br></br>

 {/* TABLE RENDERED */}
 <center>
      <div style={{ height: 400, width: '70%' }}>

          {/* data grid include filtering, columns. */}

          <DataGrid
            rows={salaryRequest}
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
export default Request;
