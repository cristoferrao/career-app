import "./App.css";
import { Switch, Route } from "react-router-dom";
import JobList from "./pages/JobList.js/JobList";
import JobDetails from "./pages/JobDetails/JobDetails";
import { Nav, NavLink, NavbarBrand } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "antd";
import GetPortalLogo from './assests/images/GetPortalLogo.png'
import { Link } from "react-router-dom/cjs/react-router-dom";

function App() {

  return (
    <div className="p-2">
      <Nav>
        <Link to="/">

        <NavbarBrand className="ml-3" >
          <Image src={GetPortalLogo} preview={false } height={40}/>
        </NavbarBrand>
        </Link>
        
      </Nav>

      <Switch>
        <Route exact path="/" component={JobList} />
        <Route exact path="/JobDetails/:id" component={JobDetails} />
      </Switch>
    </div>
  );
}

export default App;
