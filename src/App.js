//import { hot } from 'react-hot-loader/root';
import './App.css';
import SlotsPage from "./components/Pages/Player/SlotsPage";
import {BrowserRouter as Router, Route, Routes as Switch} from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import UsersManagementPage from "./components/Pages/Admin/UsersManengmentPage";
import Signup from "./components/settings/register";
import Login from "./components/settings/Login";
import NavBar from "./components/elements/navbar/NavBarMaster";
import Profile from "./components/Pages/Profile";
import DashboardPage from "./components/Pages/Admin/DashboardPage";
function App() {
  return (

        <Router>
    <div className="App">
       
       
        <NavBar/>
        <Switch>

            
            <Route exact path="/"  element={<HomePage/>}/>
            <Route exact path="/users"  element={<UsersManagementPage/>}></Route>
            <Route exact path="/slots"  element={<SlotsPage/>}/>
            <Route exact path="/register" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/dashboard" element={<DashboardPage/>}/>
            
        </Switch>
      
        
    </div>
    </Router>
  
  );
}

export default App;
