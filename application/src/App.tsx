import './App.css'
import Navbar from './NavbarComponent'
import { ToastContainer, toast } from "react-toastify";
import { Link, Route, Switch } from "wouter";
import Home from './HomeComponent';
import Departments from './departments/DepartmentsComponent';

function App() {
  
  return (
    <>
        <Navbar />
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/departments" component={Departments} />
            <Route path="#" />
            <Route path="#" />
            <Route path="#" />
            <Route path="#" />
        </Switch>
        <ToastContainer />      
    </>
  )
}

export default App