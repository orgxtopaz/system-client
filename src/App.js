import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route} from "react-router-dom"; //routes

import Login from "./components/login";
import Forgot from "./components/forgot";








import Update from "./components/Update";


// FOR OFFICIALS
import Organizational from "./components/userAuth/OrganizationalChart";
import Travel from "./components/userAuth/TravelPage";
import Dashboard from "./components/userAuth/Dashboard";
import viewTravelAsOfficial from "./components/userAuth/viewTravelAsOfficial";


// FOR SECRETARY
import SecretaryDashboard from "./components/secretaryAuth/Dashboard";
import ViewSpecificTotalAttendance from "./components/secretaryAuth/viewSpecificTotalAttendance";
import SecretaryOrganizational from "./components/secretaryAuth/secretaryOrganizational";
import SecretaryTravel from "./components/secretaryAuth/secretaryTravel";
import SecretaryDeleteTravel from "./components/secretaryAuth/secretarydeleteTravel";
import RequestHistory from "./components/secretaryAuth/requestHistory";



// FOR TREASURER
import TreasurerDashboard from "./components/treasurerAuth/Dashboard";
import TreasurerOrganizational from "./components/treasurerAuth/treasurerOrganizational";
import TreasurerTravel from "./components/treasurerAuth/treasurerTravel";
import TreasurerDeleteTravel from "./components/treasurerAuth/treasurerDeleteTravel";
import TreasurerRequest from "./components/treasurerAuth/treasurerRequest";
import TreasurerViewSpecificRequest from "./components/treasurerAuth/treasurerViewSpecificRequest";





///FOR SK OFFICIALS
import adminDashboard from "./components/adminAuth/Dashboard";
import adminTravel from "./components/adminAuth/adminTravel";
import adminOrganizational from "./components/adminAuth/adminOrganizational";
import createOfficial from "./components/adminAuth/createOfficial";
import Verify from "./components/adminAuth/Verified";
import DeleteOfficial from "./components/adminAuth/DeleteOfficial";
import DeleteTravel from "./components/adminAuth/DeleteTravel";
import Request from "./components/adminAuth/request";
import ViewSpecificRequest from "./components/adminAuth/viewSpecificRequest";







function App() {
  return (
    <>
      <div>
        <div className="pos-f-t">
          <nav className="navbar navbar-dark bg-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

          </nav>
       <nav>

       <Router>
           
            {/* ROUTES LANG SAKALAM */}
            <Route exact path="/" component={Login} />
            <Route exact path="/forgot" component={Forgot} />

            <Route exact path="/Update/:updateId" component={Update} />



            
            {/* FOR OFFICIALS */}
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Organizational" component={Organizational} />
            <Route exact path="/Travel" component={Travel} />
            <Route exact path="/ManageTravelasOfficial/:userId" component={viewTravelAsOfficial} />

            
            {/* FOR SECRETARY*/}
            <Route exact path="/secretaryDashboard" component={SecretaryDashboard} />
            <Route exact path="/viewSpecificTotalAttendance/:userId" component={ViewSpecificTotalAttendance} />
            <Route exact path="/SecretaryOrganizational/" component={SecretaryOrganizational} />
            <Route exact path="/secretaryTravel/" component={SecretaryTravel} />
            <Route exact path="/secretarydeleteTravel/:travelId" component={SecretaryDeleteTravel} />
            <Route exact path="/requestHistory" component={RequestHistory} />



           {/* FOR TREASURER */}
           <Route exact path="/treasurerDashboard" component={TreasurerDashboard} />
           <Route exact path="/treasurerOrganizational/" component={TreasurerOrganizational} />
           <Route exact path="/treasurerTravel/" component={TreasurerTravel} />
           <Route exact path="/treasurerdeleteTravel/:travelId" component={TreasurerDeleteTravel} /> 
           <Route exact path="/treasurerRequest" component={TreasurerRequest} />
           <Route exact path="/treasurerViewSpecificRequest/:userId" component={TreasurerViewSpecificRequest} />

         
         






            {/* FOR ADMIN */}
            <Route exact path="/adminDashboard" component={adminDashboard} />
            <Route exact path="/adminOrganizational" component={adminOrganizational} />
            <Route exact path="/adminTravel" component={adminTravel} />
            <Route exact path="/createOfficial" component={createOfficial} />
            <Route exact path="/verify/:userId" component={Verify} />
            <Route exact path="/deleteOfficial/:userId" component={DeleteOfficial} />
            <Route exact path="/deleteTravel/:travelId" component={DeleteTravel} />
            <Route exact path="/request" component={Request} />
            <Route exact path="/viewSpecificRequest/:userId" component={ViewSpecificRequest} />





       
          </Router>
         </nav>
          
        </div>
      </div>
    </>
  );
}

export default App;
