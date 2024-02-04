import './App.css';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import JobList from './pages/JobList.js/JobList';
import JobDetails from './pages/JobDetails/JobDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavLink,NavbarBrand } from 'react-bootstrap';


function App() {

  // document.getElementsByTagName("body")[0].style="background-color:#282828;color:white;"

  return (<div className='p-2' >
    <Nav  >
      {/* <h1>Jobs Website</h1> */}
       <NavbarBrand className='ml-3'>Career Paths</NavbarBrand>
    </Nav>
    
        <Switch>
          <Route  exact path="/" component={JobList} />
          <Route exact  path="/JobDetails" component={JobDetails} />
        </Switch>

  </div> 
    );
}

export default App;
