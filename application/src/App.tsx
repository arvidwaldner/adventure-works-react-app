import './App.css'
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "wouter";
import Home from './HomeComponent';
import Departments from './departments/DepartmentsComponent';
import Locations from './locations/LocationsComponent';
import NavbarMenu from './NavbarMenuComponent';

function App() {
  
  return (
    <>
        <div className="min-h-full">
          <NavbarMenu />              
          <div className='container mx-auto px-4 pt-10'>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/departments" component={Departments} />
              <Route path="/locations" component={Locations} />
            </Switch>
          </div>
          <ToastContainer />
        </div>      
    </>
  )
}

export default App