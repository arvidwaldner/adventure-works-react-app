import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxes, faHome, faLocation, faUsers, faStore, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "wouter";
import { Disclosure } from '@headlessui/react'

const navigation = [
  { name: 'Home', href: '/.', current: true, icon: faHome },
  { name: 'Departments', href: '/departments', current: false, icon: faUsers },
  { name: 'Locations', href: '/locations', current: false, icon: faLocation },
  { name: 'Product Categories', href: '/product-categories', current: false, icon: faBoxes },
  { name: 'Products', href: '/products', current: false, icon: faBoxOpen },
  { name: 'Stores', href: '/stores', current: false, icon: faStore }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const NavbarMenu = () => {
    return (
        <>
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )
                        }
                      >
                        {item.name}
                        {item.icon && <FontAwesomeIcon icon={item.icon} className="ml-2" />}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>             
             
            </div>
          </div>          
        </Disclosure>
        </>
    );
};

export default NavbarMenu;