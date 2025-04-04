import React, { useState, useEffect } from 'react';
import { Search, BookOpen, User, Tag, ChevronRight, Heart, Share2, Bookmark, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample stories data structure
const sampleStories = [
  {
    id: 1,
    title: "प्रेम  fhawhvadgn की अनंत यात्रा",
    author: "अमित शर्मा",
    genre: "प्रेम",
    content: "यह कहानी दो प्रेमियों की है जो जीवन के हर मोड़ पर एक-दूसरे का साथ देते हैं। उनका प्रेम कठिनाइयों पर विजय पाता है...",
    likes: 342,
    dateAdded: "2025-03-15"
  },
  {
    id: 2,
    title: "वतन के लिए",
    author: "रेखा सिंह",
    genre: "देशभक्ति",
    content: "एक सैनिक की कहानी जो अपने देश के लिए सर्वस्व त्याग देता है। उसकी वीरता और बलिदान की गाथा...",
    likes: 218,
    dateAdded: "2025-03-24"
  },
  {
    id: 3,
    title: "बिछड़े हुए",
    author: "राहुल वर्मा",
    genre: "विरह",
    content: "दो दिलों की जुदाई की दर्दनाक कहानी। विरह की पीड़ा और प्रतीक्षा का भावपूर्ण चित्रण...",
    likes: 187,
    dateAdded: "2025-02-18"
  },
  {
    id: 4,
    title: "स्वतंत्रता की लड़ाई",
    author: "प्रिया गुप्ता",
    genre: "देशभक्ति",
    content: "स्वतंत्रता संग्राम के दौरान एक साधारण परिवार की असाधारण कहानी। देशभक्ति की भावना से ओतप्रोत...",
    likes: 291,
    dateAdded: "2025-03-02"
  },
  {
    id: 5,
    title: "मिलन की आस",
    author: "विवेक शर्मा",
    genre: "प्रेम",
    content: "एक प्रेम कहानी जो समय और दूरी की परीक्षा में खरी उतरती है। प्रेम की शक्ति का अद्भुत वर्णन...",
    likes: 156,
    dateAdded: "2025-04-01"
  },
  {
    id: 6,
    title: "रंगों का त्योहार",
    author: "निधि पटेल",
    genre: "त्योहार",
    content: "होली के त्योहार पर आधारित एक कहानी जो विविधता में एकता का संदेश देती है। रंगों की मस्ती और खुशियों की कहानी...",
    likes: 203,
    dateAdded: "2025-03-29"
  }
];

// Genre colors mapping - light theme
const genreColorsLight = {
  "प्रेम": "bg-rose-100 text-rose-800 border-rose-300",
  "देशभक्ति": "bg-blue-100 text-blue-800 border-blue-300",
  "विरह": "bg-purple-100 text-purple-800 border-purple-300",
  "त्योहार": "bg-amber-100 text-amber-800 border-amber-300",
  "default": "bg-green-100 text-green-800 border-green-300"
};

// Genre colors mapping - dark theme
const genreColorsDark = {
  "प्रेम": "bg-rose-900/40 text-rose-200 border-rose-700",
  "देशभक्ति": "bg-blue-900/40 text-blue-200 border-blue-700",
  "विरह": "bg-purple-900/40 text-purple-200 border-purple-700",
  "त्योहार": "bg-amber-900/40 text-amber-200 border-amber-700",
  "default": "bg-green-900/40 text-green-200 border-green-700"
};

// Function to initialize and save stories to localStorage
// const initializeAndSaveStories = () => {
//   const storedStories = localStorage.getItem('stories');
  
//   if (!storedStories) {
//     localStorage.setItem('stories', JSON.stringify(sampleStories));
//     return sampleStories;
//   } else {
//     return JSON.parse(storedStories);
//   }
// };

const initializeStoriesHardcoded = () => {
  localStorage.setItem('stories', JSON.stringify(sampleStories));
  return sampleStories;
};


const StoryGallery = ({ isDark, setIsDark }) => {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  
  useEffect(() => {
    // const loadedStories = initializeAndSaveStories();
    setStories(sampleStories);
  }, []);
  
  useEffect(() => {
    if (stories.length > 0) {
      localStorage.setItem('stories', JSON.stringify(stories));
    }
  }, [stories]);
  
  const handleLike = (storyId) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === storyId 
          ? { ...story, likes: story.likes + 1 } 
          : story
      )
    );
  };
  
  const handleBookmark = (storyId) => {
    alert(`Story ${storyId} bookmarked!`);
  };
  
  const handleShare = (storyId) => {
    alert(`Share functionality for story ${storyId}`);
  };
  
  const allGenres = [...new Set(stories.map(story => story.genre))];
  
  const filteredStories = stories.filter(story => {
    const matchesSearch = searchTerm === '' || 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.content.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesGenre = selectedGenre === '' || story.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });
  
  const getGenreClasses = (genre) => {
    return isDark 
      ? (genreColorsDark[genre] || genreColorsDark.default)
      : (genreColorsLight[genre] || genreColorsLight.default);
  };

  const themeClasses = {
    background: isDark ? "bg-gray-900 bg-opacity-90" : "bg-white bg-opacity-90",
    cardBg: isDark ? "bg-gray-800/50 border-gray-700/50 hover:shadow-orange-500/20" : "bg-white/40 border-white/50 hover:shadow-orange-500/30",
    textPrimary: isDark ? "text-gray-100" : "text-gray-800",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    buttonPrimary: isDark ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white" : "bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white",
    buttonSecondary: isDark ? "bg-gray-700/70 text-orange-400 hover:bg-gray-600/70" : "bg-white/70 text-orange-500 hover:bg-orange-100",
    input: isDark ? "bg-gray-800/70 border-gray-700 focus:ring-orange-500 text-white placeholder-gray-400" : "bg-white/70 border-orange-200 focus:ring-orange-500 text-gray-700",
    pillActive: isDark ? "bg-orange-600 text-white" : "bg-orange-500 text-white",
    pillInactive: isDark ? "bg-gray-800/70 text-gray-300 hover:bg-gray-700" : "bg-white/50 text-gray-700 hover:bg-orange-100",
    accent: isDark ? "from-orange-500 to-amber-500" : "from-orange-500 to-amber-400",
    noResults: isDark ? "bg-gray-800/40 border-gray-700/50" : "bg-white/40 border-white/50"
  };

  // useEffect(() => {
  //   localStorage.setItem("stories", JSON.stringify(sampleStories));
  // }
  // , []);
  useEffect(() => {
    const loadedStories = initializeStoriesHardcoded();
    setStories(loadedStories);
  }, []);
  

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1604519998986-e35c5b2b3e3f?auto=format&fit=crop&w=1920&q=80')`,
           backgroundSize: 'cover',
           backgroundAttachment: 'fixed',
           backgroundPosition: 'center'
         }}>
      <div className={`min-h-screen ${isDark ? 'bg-gray-900/80' : 'bg-white/60'} backdrop-blur-sm`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header and Theme Toggle */}
          
          <p className={`text-center text-lg mb-8 ${themeClasses.textSecondary}`} 
             style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            अपनी पसंदीदा कहानियों का आनंद लें
          </p>
          
          {/* Search and Filter Section */}
          <div className={`mb-8 backdrop-blur-md ${themeClasses.cardBg} p-6 rounded-xl shadow-lg border`}>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 ${isDark ? 'text-orange-400' : 'text-orange-500'}`} />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-3 ${themeClasses.input} backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 transition-all`}
                  placeholder="कहानी या लेखक खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                />
              </div>
              
              <div className="w-full md:w-64">
                <select
                  className={`block w-full px-4 py-3 ${themeClasses.input} backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none`}
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  <option value="">सभी विधाएँ</option>
                  {allGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Genre Pills */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedGenre === '' ? themeClasses.pillActive : themeClasses.pillInactive}`}
              onClick={() => setSelectedGenre('')}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              सभी
            </button>
            
            {allGenres.map(genre => (
              <button
                key={genre}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedGenre === genre ? themeClasses.pillActive : themeClasses.pillInactive}`}
                onClick={() => setSelectedGenre(genre)}
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                {genre}
              </button>
            ))}
          </div>
          
          {/* Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div 
                key={story.id} 
                className={`relative backdrop-blur-md ${themeClasses.cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border group`}
              >
                {/* Top gradient accent */}
                <div className={`h-2 bg-gradient-to-r ${themeClasses.accent}`}></div>
                
                <div className="p-6">
                  {/* Genre tag */}
                  <div className={`inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full border ${getGenreClasses(story.genre)}`}>
                    <div className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      {story.genre}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h2 className={`font-bold text-xl mb-2 ${themeClasses.textPrimary} group-hover:text-orange-500 transition-colors`} 
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {story.title}
                  </h2>
                  
                  {/* Author */}
                  <p className={`${themeClasses.textSecondary} text-sm mb-3 flex items-center`} 
                     style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    <User className="h-4 w-4 mr-1 inline" />
                    {story.author}
                  </p>
                  
                  {/* Content preview */}
                  <p className={`${themeClasses.textSecondary} text-base mb-6`} 
                     style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {story.content.substring(0, 100)}...
                  </p>
                  
                  {/* Action buttons */}
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/story/${story.id}`}
                      className={`${themeClasses.buttonPrimary} font-medium py-2 px-4 rounded-lg flex items-center transition-all shadow-md hover:shadow-lg`}
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      आगे पढ़ें
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                    
                    <div className="flex space-x-2">
                      <button 
                        className={`p-2 rounded-full ${themeClasses.buttonSecondary} text-rose-500`}
                        onClick={() => handleLike(story.id)}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <button 
                        className={`p-2 rounded-full ${themeClasses.buttonSecondary}`}
                        onClick={() => handleShare(story.id)}
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button 
                        className={`p-2 rounded-full ${themeClasses.buttonSecondary} text-amber-500`}
                        onClick={() => handleBookmark(story.id)}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Likes count */}
                  <div className={`absolute top-4 right-4 ${isDark ? 'bg-gray-700/80' : 'bg-white/80'} backdrop-blur-sm px-2 py-1 rounded-full text-xs ${themeClasses.textSecondary} flex items-center shadow-sm`}>
                    <Heart className="h-3 w-3 mr-1 text-rose-500 fill-rose-500" />
                    {story.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* No Results Message */}
          {filteredStories.length === 0 && (
            <div className={`text-center py-12 backdrop-blur-md ${themeClasses.noResults} rounded-xl border shadow-lg`}>
              <Search className={`h-12 w-12 mx-auto ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-4`} />
              <p className={`text-xl ${themeClasses.textSecondary} mb-2`} 
                 style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                कोई कहानी नहीं मिली।
              </p>
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'} 
                 style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                कृपया अपनी खोज बदलें या फिल्टर हटाएँ।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryGallery;