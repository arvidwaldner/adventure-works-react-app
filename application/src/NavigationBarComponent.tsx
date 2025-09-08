import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxes, faHome, faLocation, faUsers, faStore, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Switch } from "wouter";
import Home from './HomeComponent';
import Departments from './departments/DepartmentsComponent';

const NavigationBar = () => {
    return (
        <>       
            <nav className="sticky top-0 left-0 right-0 block w-full max-w-screen-lg px-4 py-2 mx-auto text-white bg-white shadow-md rounded-md lg:px-8 lg:py-3">
                    <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                        <Link href="/" className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
                            Adventure Works
                        </Link>
                    <div className="hidden lg:block">
                        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">    
                                <Link href="/departments" className="flex items-center">
                                    Departments  <FontAwesomeIcon icon={faUsers} />
                                </Link>
                            </li>
                            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                                <Link href="/locations" className="flex items-center">
                                    Locations  <FontAwesomeIcon icon={faLocation} />
                                </Link>
                            </li>                            
                            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                                <Link href="/product-categories" className="flex items-center">
                                    Product Categories  <FontAwesomeIcon icon={faBoxOpen} />
                                </Link>
                            </li>
                            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                                <Link href="/products" className="flex items-center">
                                    Products  <FontAwesomeIcon icon={faBoxes} />
                                </Link>
                            </li>
                            <li>
                                <Link href="/stores" className="flex items-center">
                                    Stores  <FontAwesomeIcon icon={faStore} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                <button className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                        type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </nav>
    </>);
}

export default NavigationBar;