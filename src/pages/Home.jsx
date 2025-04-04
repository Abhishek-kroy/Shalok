import React, { useState, Fragment, useEffect } from 'react';
import Slider from 'react-slick';
import Shiva from '../assets/images.jpeg'
import { 
  Moon, Sun, Pen, Book, Share2, Heart, Search, User, 
  ChevronDown, Bell, TrendingUp, MessageCircle, Bookmark, 
  Home, Users, Settings, LogOut, ChevronRight, ArrowRight
} from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '../components/Navbar';

function HomePage({isDark,setIsDark}) {
  // State management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Set up theme-related effects
  useEffect(() => {
  }, []);
  
  // Theme toggle with proper persistence
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Navigation data
  const navigationItems = [
    { name: 'होम', href: '#', icon: Home },
    { name: 'कविताएं', href: '#', icon: Book },
    { name: 'लेखक', href: '#', icon: Users },
    { name: 'समुदाय', href: '#', icon: MessageCircle },
  ];

  const userNavigation = [
    { name: 'मेरी प्रोफाइल', href: '#', icon: User },
    { name: 'सेटिंग्स', href: '#', icon: Settings },
    { name: 'मेरी कविताएं', href: '#', icon: Pen },
    { name: 'लॉग आउट', href: '#', icon: LogOut },
  ];

  const categories = [
    { name: 'all', label: 'सभी' },
    { name: 'love', label: 'प्रेम' },
    { name: 'nature', label: 'प्रकृति' },
    { name: 'life', label: 'जीवन' },
    { name: 'spiritual', label: 'आध्यात्मिक' }
  ];

  // Slider settings with improved transitions
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Content data
  const featuredPoems = [
    {
      title: "मेरी कविता",
      author: "राहुल शर्मा",
      excerpt: "जीवन की राहों में, हर कदम पर मिलती हैं नई कहानियां...",
      likes: 234,
      comments: 45,
      category: 'life',
      image: 'https://picsum.photos/300/200'
    },
    {
      title: "प्रेम की पुकार",
      author: "अंजली वर्मा",
      excerpt: "तेरी याद में दिल धड़कता है, हर पल तुझे याद करता है...",
      likes: 189,
      comments: 32,
      category: 'love',
      image: 'https://picsum.photos/300/200'
    },
    {
      title: "Nature's Call",
      author: "Priya Singh",
      excerpt: "In the whispers of the wind, I hear nature's sweet melody...",
      likes: 156,
      comments: 28,
      category: 'nature',
      image: 'https://picsum.photos/300/200'
    },
    {
      title: "सपनों का संसार",
      author: "विकास गुप्ता",
      excerpt: "आसमान को छूने की चाह में, पंख लगाए उड़ता हूं...",
      likes: 145,
      comments: 19,
      category: 'spiritual',
      image: 'https://picsum.photos/300/200'
    }
  ];

  const trendsData = [
    { title: "नदी की कहानी", views: "2.3k" },
    { title: "प्रकृति का सौंदर्य", views: "1.8k" },
    { title: "नदी की कहानी", views: "1.5k" },
    { title: "जीवन का सत्य", views: "980" }
  ];

  // Toggle search on mobile
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Animated variants for components
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-orange-50'} transition-colors duration-500`}>
      {/* Enhanced Header with Material Design */}

      {/* Enhanced Hero Section with Material Design Gradient */}
      {/* Enhanced Hero Section with Light Orange/White Theme */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative overflow-hidden"
      >
        {/* Background gradient based on isDark */}
        <div 
          className="absolute inset-0" 
          style={{
            background: isDark 
              ? 'linear-gradient(to right, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))' 
              : 'linear-gradient(to right, rgb(255, 237, 213), rgb(255, 247, 237), rgb(255, 255, 255))',
            opacity: 0.0,
            zIndex: 1
          }}
        ></div>
        
        {/* Lord Shiva background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={Shiva} 
            alt="Lord Shiva Background" 
            className="w-full h-full object-cover"
            style={{
              opacity: isDark ? 1 : 1,
              filter: `blur(${isDark ? '3px' : '2px'})`,
              mixBlendMode: isDark ? 'lighten' : 'darken'
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-extrabold text-orange-600 sm:text-5xl md:text-6xl leading-tight"
          >
            <span className="block mb-2">काव्य की दुनिया में</span>
            <span className="block text-orange-700">आपका स्वागत है</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-lg mx-auto text-xl text-orange-700 font-light"
          >
            अपनी कविताएं लिखें, पढ़ें और दूसरों के साथ साझा करें
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 max-w-md mx-auto sm:flex sm:justify-center gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(251, 146, 60, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md shadow-sm"
            >
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                <Pen className="h-5 w-5 mr-2" />
                लिखना शुरू करें
              </a>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(251, 146, 60, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 sm:mt-0"
            >
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-orange-200 text-base font-medium rounded-full text-orange-700 bg-white hover:bg-orange-50 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                <Book className="h-5 w-5 mr-2" />
                कविताएं ब्राउज़ करें
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

{/* Material Design Category Filter */}
<motion.div 
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
>
  <motion.div 
    variants={staggerContainer}
    className="flex items-center justify-center flex-wrap gap-2 md:gap-4"
  >
    {categories.map((category) => (
      <motion.button
        key={category.name}
        onClick={() => setActiveCategory(category.name)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={fadeInUp}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === category.name
            ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30'
            : 'bg-orange-50/80 dark:bg-gray-800/65 text-gray-700 dark:text-gray-300 hover:bg-orange-100/80 dark:hover:bg-gray-700/80 hover:shadow-sm'
        } backdrop-blur-sm border border-orange-100 dark:border-gray-700`}
      >
        {category.label}
      </motion.button>
    ))}
  </motion.div>
</motion.div>

{/* Material Design Featured Poems Section */}
<motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12"
>
  <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-orange-500"
    >
      लोकप्रिय कविताएं
    </motion.h2>
    <motion.a 
      href="#" 
      whileHover={{ x: 5 }}
      className="text-orange-600 dark:text-orange-400 hover:underline flex items-center"
    >
      सभी देखें <ChevronRight className="h-4 w-4 ml-1" />
    </motion.a>
  </div>
  <Slider {...sliderSettings} className="poem-slider max-w-full">
    {featuredPoems
      .filter(poem => activeCategory === 'all' || poem.category === activeCategory)
      .map((poem, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.03 }}
        className="px-2"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="backdrop-blur-md bg-orange-50/90 dark:bg-gray-800/75 rounded-xl shadow-xl overflow-hidden h-96 border border-orange-100 dark:border-gray-700"
        >
          <div className="h-40 overflow-hidden relative">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src={poem.image} 
              alt={poem.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 rounded-full">
                {poem.category}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{poem.title}</h3>
            <p className="text-orange-600 dark:text-orange-400 text-sm mb-3">
              <span className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {poem.author}
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 text-sm">{poem.excerpt}</p>
            <div className="flex items-center justify-between pt-3 border-t border-orange-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">{poem.likes}</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">{poem.comments}</span>
                </motion.button>
              </div>
              <motion.a 
                href="#" 
                whileHover={{ x: 4 }}
                className="text-orange-500 hover:text-orange-600 dark:text-orange-400 text-xs font-medium flex items-center"
              >
                और पढ़ें <ChevronRight className="h-3 w-3 ml-1" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    ))}
  </Slider>
</motion.div>

      {/* Material Design Two Column Section */}
      <motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Main Features */}
    <div className="lg:col-span-2">
      <motion.h2 
        variants={fadeInUp}
        className="text-3xl font-bold text-orange-500 mb-6"
      >
        हमारे फीचर्स
      </motion.h2>
      <motion.div 
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)" }}
          className="bg-orange-50/00 backdrop-blur-md rounded-xl p-6 border  shadow-lg transition-all duration-300"
        >
          <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Pen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-orange-500 mb-2">लिखें और साझा करें</h3>
          <p className="text-gray-600 ">
            अपनी कविताएं लिखें और समुदाय के साथ साझा करें। मिलें प्रतिक्रिया और प्रशंसा।
          </p>
        </motion.div>
        
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)" }}
          className="bg-orange-50/00 backdrop-blur-md rounded-xl p-6 border border-orange-100 shadow-lg transition-all duration-300"
        >
          <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-orange-300 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-orange-500 mb-2">सहयोग और समुदाय</h3>
          <p className="text-gray-600 dark:text-gray-600">
            अन्य लेखकों के साथ संवाद करें, सहयोग करें, और एक समुदाय का हिस्सा बनें।
          </p>
        </motion.div>
        
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)" }}
          className="bg-orange-50/00 backdrop-blur-md rounded-xl p-6 border border-orange-100 shadow-lg transition-all duration-300"
        >
          <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Book className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-orange-500 mb-2">पढ़ें और सीखें</h3>
          <p className="text-gray-600 dark:text-gray-600">
            अन्य कवियों की रचनाओं से प्रेरित हों और अपनी लेखन शैली को निखारें।
          </p>
        </motion.div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div
        variants={fadeInUp}
        className="mt-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-orange-600 opacity-30 z-0">
          <svg className="absolute right-0 top-0 h-full w-1/2" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm32 64c0 17.7-14.3 32-32 32S32 81.7 32 64s14.3-32 32-32 32 14.3 32 32z"></path>
          </svg>
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">क्या आप भी एक कवि हैं?</h3>
          <p className="mb-6">
            अपनी कविताओं को दुनिया के सामने लाएं और हमारे समुदाय का हिस्सा बनें।
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-5 py-3 rounded-full bg-white text-orange-700 font-medium shadow-lg transition-all duration-300"
          >
            आज ही शुरू करें <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </motion.div>
    </div>
    
    {/* Trends Widget */}
    <motion.div 
      variants={fadeInUp}
      className="bg-orange-50/0 backdrop-blur-md rounded-xl border border-orange-100/10  shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2" />
        <h2 className="text-xl font-bold text-orange-600">ट्रेंडिंग कविताएं</h2>
      </div>
      <div className="space-y-4">
        {trendsData.map((trend, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-3 bg-orange-100/00 rounded-lg hover:bg-orange-300/40  transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center">
              <span className="text-orange-800 dark:text-orange-300 font-bold mr-3">{index + 1}</span>
              <span className="text-orange-400 ">{trend.title}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
              {/* <Eye className="h-4 w-4 mr-1" /> {trend.views} */}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-6">
        <motion.a 
          href="#"
          whileHover={{ x: 4 }}
          className="text-orange-600 dark:text-orange-400 font-bold flex items-center text-sm"
        >
          और देखें <ChevronRight className="h-4 w-4 ml-1" />
        </motion.a>
      </div>
    </motion.div>
  </div>
</motion.div>

{/* Testimonials Section */}
<motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  className="py-16 backdrop-blur-sm"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.h2 
      variants={fadeInUp}
      className="text-3xl font-bold text-center text-orange-500 mb-12"
    >
      हमारे लेखकों की प्रतिक्रिया
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <motion.div
          key={item}
          variants={fadeInUp}
          whileHover={{ y: -8 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-orange-100 dark:border-gray-700 relative"
        >
          <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-white dark:border-gray-800"
            >
              "
            </motion.div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            "काव्यालय ने मुझे अपनी कविताओं को एक बड़े समुदाय तक पहुंचाने का अवसर दिया है। मैंने अपनी लेखन शैली में भी सुधार किया है।"
          </p>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-orange-200 dark:bg-orange-700 flex items-center justify-center text-orange-700 dark:text-orange-200 font-medium">
              {item === 1 ? 'अ' : item === 2 ? 'स' : 'र'}
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {item === 1 ? 'अनिता गुप्ता' : item === 2 ? 'संजय शर्मा' : 'रोहित वर्मा'}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item === 1 ? '2 साल से सदस्य' : item === 2 ? '6 महीने से सदस्य' : '1 साल से सदस्य'}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>

{/* Newsletter Section */}
<motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  className="py-16 backdrop-blur-sm"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-xl mx-auto text-center">
      <motion.h2 
        variants={fadeInUp}
        className="text-3xl font-bold text-orange-500 mb-4"
      >
        हमारे न्यूज़लेटर से जुड़ें
      </motion.h2>
      <motion.p 
        variants={fadeInUp}
        className="text-gray-500  mb-8"
      >
        सप्ताह के सर्वश्रेष्ठ कविताएं, नए लेखकों की जानकारी और समुदाय की गतिविधियों के अपडेट प्राप्त करें।
      </motion.p>
      <motion.div 
        variants={fadeInUp}
        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="आपका ईमेल पता"
          className="flex-grow px-4 py-3 rounded-full border border-orange-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-gray-100"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors duration-300 shadow-md shadow-orange-500/30"
        >
          सदस्यता लें
        </motion.button>
      </motion.div>
    </div>
  </div>
</motion.div>

      {/* Footer */}
      {/* Footer */}
<footer className="bg-orange-900 dark:bg-gray-900 text-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <div className="flex items-center mb-4">
          <Pen className="h-8 w-8 text-orange-300" />
          <span className="ml-2 text-xl font-bold">काव्यालय</span>
        </div>
        <p className="text-orange-200 dark:text-gray-400 text-sm">
          हिंदी और अंग्रेजी कविताओं का एक ऑनलाइन समुदाय और मंच।
        </p>
        <div className="mt-4 flex space-x-3">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="bg-orange-800 dark:bg-gray-800 p-2 rounded-full"
          >
            <svg className="h-5 w-5 text-orange-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </motion.a>
          <motion.a 
            href="#"
            whileHover={{ scale: 1.2, rotate: -10 }}
            className="bg-orange-800 dark:bg-gray-800 p-2 rounded-full"
          >
            <svg className="h-5 w-5 text-orange-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm1-11.5l-5 3 5 3v-6z" />
            </svg>
          </motion.a>
          <motion.a 
            href="#"
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="bg-orange-800 dark:bg-gray-800 p-2 rounded-full"
          >
            <svg className="h-5 w-5 text-orange-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </motion.a>
        </div>
      </div>
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">नेविगेशन</h3>
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <motion.li key={index} whileHover={{ x: 4 }}>
                <a href={item.href} className="text-orange-200 dark:text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">संसाधन</h3>
          <ul className="space-y-2">
            <motion.li whileHover={{ x: 4 }}>
              <a href="#" className="text-orange-200 dark:text-gray-400 hover:text-white transition-colors duration-300">FAQ</a>
            </motion.li>
            <motion.li whileHover={{ x: 4 }}>
              <a href="#" className="text-orange-200 dark:text-gray-400 hover:text-white transition-colors duration-300">सहायता केंद्र</a>
            </motion.li>
            <motion.li whileHover={{ x: 4 }}>
              <a href="#" className="text-orange-200 dark:text-gray-400 hover:text-white transition-colors duration-300">नियम और शर्तें</a>
            </motion.li>
            <motion.li whileHover={{ x: 4 }}>
              <a href="#" className="text-orange-200 dark:text-gray-400 hover:text-white transition-colors duration-300">गोपनीयता नीति</a>
            </motion.li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">संपर्क</h3>
          <ul className="space-y-2">
            <motion.li whileHover={{ x: 4 }}>
              <a href="mailto:info@kavyalay.com" className="text-orange-200 dark:text-gray-400 hover:text-white transition-colors duration-300">info@kavyalay.com</a>
            </motion.li>
            <motion.li whileHover={{ x: 4 }}>
              <a href="tel:+91-9876543210" className="text-orange-200 dark:text-gray-400 hover:text-white transition-colors duration-300">+91-9876543210</a>
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-12 pt-8 border-t border-orange-800 dark:border-gray-800 text-center text-orange-200 dark:text-gray-400 text-sm">
      <p>© 2025 काव्यालय. सर्वाधिकार सुरक्षित.</p>
    </div>
  </div>
</footer>
    </div>
  );
}

export default HomePage;