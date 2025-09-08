import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxes, faHome, faLocation, faUsers, faStore, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Switch } from "wouter";
import Home from './HomeComponent';
import Departments from './departments/DepartmentsComponent';

const Navbar = () => {
    return (
    <>
        <nav className="bg-gray-400 flex justify-center space-x-4">
            <Link href="/" className="font-medium rounded-lg px-3 py-2 text-black-700 hover:text-black-700">Home <FontAwesomeIcon icon={faHome} /></Link>
            <Link href="/departments" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:text-gray-700">Departments <FontAwesomeIcon icon={faUsers} /></Link>
            <Link href="#" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:text-gray-700">Locations <FontAwesomeIcon icon={faLocation} /></Link>
            <Link href="#" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:text-gray-700">Product Categories <FontAwesomeIcon icon={faBoxes} /></Link>
            <Link href="#" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:text-gray-700">Products <FontAwesomeIcon icon={faBoxOpen} /></Link>
            <Link href="#" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:text-gray-700">Stores <FontAwesomeIcon icon={faStore} /></Link>
        </nav>        
    </>
    );
};

export default Navbar;
