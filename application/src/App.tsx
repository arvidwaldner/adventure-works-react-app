import './App.css'
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "wouter";
import Home from './HomeComponent';
import Departments from './departments/DepartmentsComponent';
import Locations from './locations/LocationsComponent';
import NavbarMenu from './NavbarMenuComponent';
import { Container } from 'react-bootstrap';

function App() {
  
  return (
    <>
        <NavbarMenu />              
        <Container>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/departments" component={Departments} />
            <Route path="/locations" component={Locations} />
          </Switch>
        </Container>               
      <ToastContainer />              
    </>
  )
}

export default App