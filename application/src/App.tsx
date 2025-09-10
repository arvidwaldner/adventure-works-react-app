import './App.css'
import { ToastContainer, toast } from "react-toastify";
import { Link, Route, Switch } from "wouter";
import Home from './HomeComponent';
import Departments from './departments/DepartmentsComponent';
import NavigationBar from './NavigationBarComponent';
import Locations from './locations/LocationsComponent';

function App() {
  
  return (
    <>               
          <NavigationBar />
          <div className='container mx-auto px-4 pt-10'>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/departments" component={Departments} />
              <Route path="/locations" component={Locations} />
            </Switch>
          </div>
          <ToastContainer />      
    </>
  )
}

export default App