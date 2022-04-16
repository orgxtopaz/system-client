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
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
import "../../components/css/component.css"

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.


import { useEffect } from "react"; //a hook that GIVES  "side-effects"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    color: "gray"
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

function Announcement() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  //    ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN

  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
  if (localStorage.getItem('Official') == null) {
    history.push("/")
  }



  ///////////////////DISPLAY ALL OFFICIALS


  /////FETCHING THE OFFICIAL ATTENDANCE DATA SPECIFIC

  const [official, setOfficial] = useState([]);
  const [secretary, setSecretary] = useState([]);
  const [treasurer, setTreasurer] = useState([]);
  const [sk, setSk] = useState([]);
  const [captain, setCaptain] = useState([]);
  const isLoaded = [true];

  const allOfficial = []
  const allSecretary = []
  const allTreasurer = []
  const allSk = []
  const allCaptain = []
  useEffect(() => {


    if (isLoaded) {
      window.location.reload();

      Axios.post("https://orgserver.herokuapp.com/displayOfficial",

        {
          headers: { "x-access-token": localStorage.getItem('Official') }, email: localStorage.getItem("Email")


        }

      )


        .then((response) => {



          for (let ctr = 0; ctr < response.data.length; ctr++) {
            if (response.data[ctr].position == "official") {
              allOfficial.push(response.data[ctr])

            }
            else if (response.data[ctr].position == "secretary") {
              allSecretary.push(response.data[ctr])

            }
            else if (response.data[ctr].position == "treasurer") {
              allTreasurer.push(response.data[ctr])

            }
            else if (response.data[ctr].position == "sk") {
              allSk.push(response.data[ctr])

            }
            else if (response.data[ctr].position == "captain") {
              allCaptain.push(response.data[ctr])

            }



          }

          console.log(response.data)
          setOfficial(allOfficial)
          setSecretary(allSecretary)
          setTreasurer(allTreasurer)
          setSk(allSk)
          setCaptain(allCaptain)
          //  setCaptain(allCaptain[0].fullname)

          //  alert(captain)




        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert("GAdsgsdgd")
    }
  }, isLoaded);
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
          
          <Typography variant="h6" noWrap style={{paddingLeft:"300px",color:"black"}} >
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
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px", color:"black" }}>Home</span>

            </Link>

            <br></br>

            <Link to={`/Organizational`} style={{ fontSize: "40px" }}> <i
              className="bi bi-diagram-3-fill"
              style={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px", color:"white" }}>Officials</span>
            </Link>

            <br></br>
            <Link to={`/Travel`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-cursor-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px", color:"black" }}>Travel Log</span>
            </Link>

         
           
       
      </div>
      
        </List>
        
        <Divider />
      
        </Drawer>
      <main className={classes.content}>
        <div className="content">
          <br></br>
          <center>
            <h1>Nalhub Madapaking  Chart</h1>

          </center>
          <figure className="org-chart cf">
            <ul className="administration">
              <li>
                <ul className="director">
                  <li>
                    {captain.map((val) =>
                      <a href="#" className="a" data-toggle="modal"
                        data-target="#captain">
                         <i className="bi bi-person-circle" style={{ fontSize: "3em" }}></i>
                        <span style={{ fontSize: "2em" }}>{val.fullname}</span>

                        <br></br>
                        <span>Brgy.Captain</span>
                        <br></br>


                        <div
                          className="modal fade"
                          id="captain"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          data-backdrop="false"
                        >
                          <br></br>
                          <br></br>
                          <br></br>
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header bg-success">
                                <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:"33.33%"}} >
                                {val.fullname}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                                <div className="modal-body"style={{float:"left"}} >
                                <img src={val.image} alt="Avatar" style={{width:"150px",borderRadius:"50%"}}></img>

                                <br></br>
                                <br></br>

                                <h6> 📞 Contact Number : {val.contactNumber}</h6>
                                <h6>📧 Email Address : {val.email}</h6>
                                <h6>📌Position : {val.position}</h6>

                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
      </button>

                              </div>
                            </div>
                          </div>
                        </div>

                      </a>
                    )}










                    <ul className="subdirector">
                      {secretary.map((val) =>
                        <li>
                          <a href="#" className="a" data-toggle="modal"
                            data-target={`#` + val.fullname.replace(/ /g, "")}>



                            <div
                              className="modal fade"
                              id={val.fullname.replace(/ /g, "")}
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                              data-backdrop="false"
                              style={{marginLeft:"16%"}}
                            >
                              <br></br>
                              <br></br>
                              <br></br>
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header bg-success">
                                    <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:"40.33%"}}>
                                      {val.fullname}
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                  <img src={val.image} alt="Avatar" style={{width:"150px",borderRadius:"50%"}}></img>

                                <br></br>
                                <br></br>
                                  <h6> 📞 Contact Number : {val.contactNumber}</h6>
                                <h6>📧 Email Address : {val.email}</h6>
                                <h6>📌Position : {val.position}</h6>

                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
      </button>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <i className="bi bi-person-fill" style={{ fontSize: "2.5em" }}></i>


                            <span style={{ fontSize: "2em" }}>{val.fullname}</span>

                            <br></br>

                            <span>Secretary</span>
                          </a>


                        </li>



                      )}



                    </ul>







                    <ul className="departments cf">
                      {treasurer.map((val) =>





                        <li>
                          <a href="#" className="a" data-toggle="modal"
                            data-target={`#` + val.fullname.replace(/ /g, "")}>


                            <div
                              className="modal fade"
                              id={val.fullname.replace(/ /g, "")}
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                              data-backdrop="false"
                            >
                              <br></br>
                              <br></br>
                              <br></br>
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header bg-success">
                                    <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:"40.33%"}}>
                                      {val.fullname}
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                  <img src={val.image} alt="Avatar" style={{width:"150px",borderRadius:"50%"}}></img>

                                <br></br>
                                <br></br>
                                  <h6> 📞 Contact Number : {val.contactNumber}</h6>
                                <h6>📧 Email Address : {val.email}</h6>
                                <h6>📌Position : {val.position}</h6>

                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
      </button>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <i className="bi bi-person-fill" style={{ fontSize: "2.5em" }}></i>

                            <span style={{ fontSize: "2em" }}>{val.fullname}</span>

                            <br></br>

                            <span>Treasurer</span>

                          </a>





                        </li>






                      )}



























                      <li className="department dep-a">


                      </li>







                      <li className="department dep-d">
                        <a href="#" className="a">
                          <span style={{ fontSize: "1.5em" ,marginTop:"-0.7em" }} >SK MEMBERS</span>
                        </a>
                        <ul className="sections">

                          {sk.map((val) =>


                            <li className="section" style={{ width:"85%" }}>
                              <a href="#" className="a" data-toggle="modal"
                                data-target={`#` + val.fullname.replace(/ /g, "")}>

                                 <i className="bi bi-person-fill" style={{ fontSize: "2.3em" }}></i>

                                <span style={{ fontSize: "1.5em" }}>{val.fullname}</span>
                              </a>


                              <>

                                {/* Modal */}
                                <div
                                  className="modal fade"
                                  id={val.fullname.replace(/ /g, "")}
                                  tabIndex={-1}
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header bg-success">
                                        <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:"40.33%"}}>
                                          {val.fullname}
                                        </h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                      <center>
                                      <img src={val.image} alt="Avatar" style={{width:"150px",borderRadius:"50%"}}></img>

                                <br></br>
                                <br></br>
                                      <h6> 📞 Contact Number : {val.contactNumber}</h6>
                                <h6>📧 Email Address : {val.email}</h6>
                                <h6>📌Position : {val.position}</h6>
                                </center>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-dismiss="modal"
                                        >
                                          Close
          </button>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>


                            </li>




                          )}






                        </ul>
                      </li>




















                      <li className="department dep-c">

                      </li>
                      <li className="department dep-d">
                        <a href="#" className="a">
                          <span style={{ fontSize: "1.5em" ,marginTop:"-0.7em" }} >OFFICIALS</span>
                        </a>
                        <ul className="sections">

                          {official.map((val) =>


                            <li className="section" style={{ width:"85%" }}>
                              <a href="#" className="a" data-toggle="modal"
                                data-target={`#` + val.fullname.replace(/ /g, "")}>
                                  <i className="bi bi-person-fill" style={{ fontSize: "2.3em" }}></i>
                     
                                <span style={{ fontSize: "1.5em" }}>{val.fullname}</span>
                              </a>


                              <>

                                {/* Modal */}
                                <div
                                  className="modal fade"
                                  id={val.fullname.replace(/ /g, "")}
                                  tabIndex={-1}
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header bg-success">
                                        <h5 className="modal-title" id="exampleModalLabel" style={{marginLeft:"40.33%"}}>
                                          {val.fullname}
                                        </h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <center>
                                        <br></br>
                                        <img src={val.image} alt="Avatar" style={{width:"150px",borderRadius:"50%"}}></img>

                                <br></br>
                                <br></br>
                                      <div className="modal-body">
                                      <h6> 📞 Contact Number : {val.contactNumber}</h6>
                                <h6>📧 Email Address : {val.email}</h6>
                                <h6>📌Position : {val.position}</h6>
                               
                                      </div>
                                      </center>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-dismiss="modal"
                                        >
                                          Close
          </button>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>


                            </li>




                          )}






                        </ul>
                      </li>












                      <li className="department dep-e">


                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </figure>
        </div>

      </main>
    </div>

  );
}
export default Announcement;
