import React, { useState, Fragment, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import {
  Home, Search, Bell, Moon, Sun, ChevronDown,
  User, Settings, LogOut, Book, FilePen
} from 'lucide-react';

const Navbar = ({ setIsDark, isDark }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    // const newTheme = !isDark;
    setIsDark(!isDark);
    // document.documentElement.classList.toggle('dark', newTheme);
    // localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navigationItems = [
    { name: 'होम', href: '/', icon: Home },
    { name: 'कविताएं', href: '/kavita', icon: Book },
    { name: 'लेखक', href: '/texteditor', icon: FilePen },
  ];

  const userNavigation = [
    { name: 'मेरी प्रोफाइल', href: '/myProfile', icon: User },
    { name: 'सेटिंग्स', href: '#', icon: Settings },
    { name: 'लॉग आउट', href: '#', icon: LogOut },
  ];

  return (
    <nav className="backdrop-blur-md bg-white/70 dark:bg-gray-900/50 shadow-lg sticky top-0 z-50 border-b border-orange-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center">
                <FilePen className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <span className="ml-2 text-xl font-bold text-orange-800 dark:text-orange-100">काव्यपथ</span>
              </div>
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    <item.icon className="h-4 w-4 mr-1" />
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative w-full max-w-xs">
              {(isSearchOpen || isDesktop) && (
                <AnimatePresence>
                  <motion.div
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: isDesktop ? '16rem' : '100%', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="कविता खोजें..."
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-orange-200 dark:border-gray-700 bg-white dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-500 transition-all duration-200 shadow-sm"
                    />
                    <div className="absolute left-3 top-2.5">
                      <Search className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
              {!isDesktop && (
                <motion.button
                  onClick={toggleSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden p-2 rounded-full bg-orange-100 dark:bg-gray-800"
                >
                  <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </motion.button>
              )}
            </div>

            {/* Notifications */}
            <Menu as="div" className="relative">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Menu.Button className="p-2 rounded-full bg-orange-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 transition-colors duration-300 shadow-sm">
                  <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </Menu.Button>
              </motion.div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg backdrop-blur-lg bg-white dark:bg-gray-900/95 py-1 shadow-xl ring-1 ring-orange-200 dark:ring-gray-800 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-orange-100 dark:border-gray-800">
                    <p className="font-medium">नोटिफिकेशन</p>
                  </div>
                  <Menu.Item>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-orange-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <p className="font-medium">अंजली वर्मा ने आपकी कविता पसंद की</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">10 मिनट पहले</p>
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: isDark ? -30 : 30 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-orange-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 transition-colors duration-300 shadow-sm"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-orange-600" />
              )}
            </motion.button>

            {/* User Menu */}
            <Menu as="div" className="relative ml-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Menu.Button className="flex items-center space-x-2 bg-orange-100 dark:bg-gray-800 p-2 rounded-full hover:bg-orange-200 dark:hover:bg-gray-700 transition-colors duration-300 shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-orange-200 dark:bg-orange-900 flex items-center justify-center text-orange-700 dark:text-orange-200 font-medium">
                    गौ
                  </div>
                  <ChevronDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </Menu.Button>
              </motion.div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg backdrop-blur-lg bg-white dark:bg-gray-900/95 py-1 shadow-xl ring-1 ring-orange-200 dark:ring-gray-800 focus:outline-none">
                  <div className="px-4 py-3 border-b border-orange-100 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">राजेश कुमार</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">rajeshkumar@example.com</p>
                  </div>
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <motion.a
                          href={item.href}
                          whileHover={{ x: 4 }}
                          className={`${
                            active ? 'bg-orange-100/70 dark:bg-gray-800/80' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400`}
                        >
                          <item.icon className="h-4 w-4 mr-3 text-orange-500 dark:text-orange-400" />
                          {item.name}
                        </motion.a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;