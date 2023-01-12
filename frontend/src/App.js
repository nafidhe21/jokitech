import Home from './Screen/MainScreen/Home';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import JasaProg from './Screen/Jasa/JasaProg';
import JasaGraph from './Screen/Jasa/JasaGraph';
import JasaVideo from './Screen/Jasa/JasaVideo';
import DetailJasa from './Screen/Jasa/DetailJasa';
import CreateJasa from './Screen/Dashboard/CreateJasa';
import Jasa from './Screen/MainScreen/Jasa';
import Project from './Screen/Dashboard/Project'
import AboutUs from './Screen/MainScreen/AboutUs';
import NavbarDash from './Component/NavbarDash';
import Posting from './Screen/Dashboard/Posting';
import CreateProject from './Screen/Dashboard/CreateProject';
import Login from './Screen/LoginRegister/Login';
import Register from './Screen/LoginRegister/Register';
import Account from './Screen/Dashboard/Account';
import DetailPenjasa from './Screen/Jasa/DetailPenjasa';
import UpdateJasa from './Screen/Dashboard/UpdateJasa';
import Footer from './Component/Footer';
import AdminUser from './Screen/DashboardAdmin/AdminUser';
import AdminJasa from './Screen/DashboardAdmin/AdminJasa';
import NavbarDashAdmin from './Component/NavbarDashAdmin';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
            <Footer />
          </Route>
          <Route exact path="/jasa">
            <Navbar />
            <Jasa />
            <Footer />
          </Route>
          <Route exact path="/aboutus">
            <Navbar />
            <AboutUs />
            <Footer />
          </Route>
          <Route path="/jasa/programtech">
            <Navbar />
            <JasaProg />
            <Footer />
          </Route>
          <Route path="/jasa/graphicdesign">
            <Navbar />
            <JasaGraph />
            <Footer />
          </Route>
          <Route path="/jasa/videoanimation">
            <Navbar />
            <JasaVideo />
            <Footer />
          </Route>
          <Route path="/jasa/:id">
            <Navbar />
            <DetailJasa />
            <Footer />
          </Route>
          <Route path="/penjasa/:id">
            <Navbar />
            <DetailPenjasa />
          </Route>
          <Route exact path="/createJasa">
            <NavbarDash />
            <CreateJasa />
          </Route>
          <Route exact path="/createProject">
            <NavbarDash />
            <CreateProject />
          </Route>
          <Route exact path="/updateJasa/:id">
            <NavbarDash />
            <UpdateJasa />
          </Route>
          <Route exact path="/project">
            <NavbarDash />
            <Project />
          </Route>
          <Route exact path="/posting">
            <NavbarDash />
            <Posting />
          </Route>
          <Route exact path="/account">
            <NavbarDash />
            <Account />
          </Route>
          <Route exact path="/login">
            <Navbar />
            <Login />
          </Route>
          <Route exact path="/register">
            <Navbar />
            <Register />
          </Route>
          <Route exact path="/adminuser">
            <NavbarDashAdmin />
            <AdminUser />
          </Route>
          <Route exact path="/adminjasa">
            <NavbarDashAdmin />
            <AdminJasa />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
