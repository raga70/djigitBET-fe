import { hot } from 'react-hot-loader/root';
import './App.css';
import MenuAppBar from "./components/Appbar";
import ResponsiveAppBar from "./components/Appbar";

function App() {
  return (
    <div className="App">

        <ResponsiveAppBar/>
        <h1>hello</h1>
    </div>
  );
}

export default hot(App);
