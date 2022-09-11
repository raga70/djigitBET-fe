//import { hot } from 'react-hot-loader/root';
import './App.css';
import ResponsiveAppBar from "./components/elements/navbar/Appbar";

import SlotsPage from "./components/Pages/Player/SlotsPage";
import {BrowserRouter as Router, Route, Routes as Switch} from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import AdminAppBar from "./components/elements/navbar/AdminAppbar";
import UsersPage from "./components/Pages/Admin/UsersPage";
import Signup from "./components/settings/register";
import Login from "./components/settings/Login";
function App() {
  return (

    <Router>
    <div className="App">
        <ResponsiveAppBar/>
        <Switch>

            
            <Route exact path="/"  element={<HomePage/>}/>
            <Route exact path="/users"  element={<UsersPage/>}></Route>
            <Route exact path="/slots"  element={<SlotsPage/>}/>
            <Route exact path="/register" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            
        </Switch>
      
        
    </div>
    </Router>
  
  );
}

export default App;
