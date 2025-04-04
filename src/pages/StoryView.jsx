import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, ArrowLeft, Volume2, VolumeX } from 'lucide-react';

const StoryView = ({ isDark }) => {
  const { id } = useParams();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getStories = () => {
    try {
      return JSON.parse(localStorage.getItem('stories') || '[]');
    } catch (error) {
      console.error('Error retrieving stories:', error);
      return [];
    }
  };

  const stories = getStories();
  const story = stories.find(s => s.id === Number(id));

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('hi-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return "अज्ञात तिथि";
    }
  };

  if (!story) {
    return (
      <div className={`min-h-screen ${isDark ? 'dark bg-gray-900 text-white' : 'bg-red-50 text-gray-900'} transition-colors duration-500`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-hindi mb-6">रचना नहीं मिली</h2>
            <Link to="/" className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-hindi">वापस जाएं</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const speakStory = () => {
    const synth = window.speechSynthesis;
    synth.cancel();

    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(story.content);
      utterance.lang = "hi-IN";
      utterance.rate = 0.8;
      utterance.pitch = 0.94;

      const voices = synth.getVoices();
      const hindiVoice = voices.find(voice => voice.lang === "hi-IN");
      if (hindiVoice) utterance.voice = hindiVoice;

      synth.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    } else {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900 text-white' : 'bg-red-50 text-gray-900'} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-4 max-w-3xl">
        <div className="transform transition-all duration-500 opacity-100 translate-y-0">
          <Link to="/" className="inline-flex items-center px-3 py-2 mb-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="font-hindi">वापस जाएं</span>
          </Link>

          <div className={`p-6 rounded-2xl shadow-lg ${isDark ? 'bg-gray-800/70 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white text-xl font-bold">
                {story.title.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold font-hindi">{story.author}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(story.dateAdded)}
                </p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900/20 text-orange-600 dark:text-orange-400">
                  {story.genre}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2 font-hindi bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              {story.title}
            </h1>

            <div className="my-6 font-hindi text-xl leading-relaxed whitespace-pre-line">
              {story.content}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={speakStory}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all"
              >
                {isSpeaking ? <VolumeX className="h-5 w-5 mr-2" /> : <Volume2 className="h-5 w-5 mr-2" />}
                {isSpeaking ? "बोलना रोकें" : "सुनें"}
              </button>
            </div>

            <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-6"></div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-110">
                <Heart className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">{story.likes}</span>

              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <MessageCircle className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">20</span>

              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ml-auto">
                <Share2 className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryView;