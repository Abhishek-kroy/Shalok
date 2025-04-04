import React, { useState, useEffect, useRef } from 'react';

const HindiPoemEditor = ({ isDark = false, setIsDark }) => {
  // Main content state
  const [content, setContent] = useState('');
  const [transliteratedContent, setTransliteratedContent] = useState('');
  const [title, setTitle] = useState('');
  const [transliteratedTitle, setTransliteratedTitle] = useState('');

  // Rich text formatting states
  const [selectedText, setSelectedText] = useState({ start: 0, end: 0, text: '' });
  const [formatting, setFormatting] = useState({
    bold: [],
    italic: [],
    underline: [],
    fontSize: {},  // Map of ranges to font sizes
    alignment: 'left' // Global alignment for the entire content
  });

  // Editor state
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [selectedFont, setSelectedFont] = useState('Noto Sans Devanagari');
  const [theme, setTheme] = useState('default');

  // History for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Refs
  const textareaRef = useRef(null);
  const previewRef = useRef(null);

  // Available Hindi fonts
  const hindifonts = [
    'Noto Sans Devanagari',
    'Poppins',
    'Hind',
    'Mukta',
    'Tiro Devanagari Hindi'
  ];

  // Background themes
  const themes = {
    default: {
      bg: isDark ? 'bg-gray-800' : 'bg-white',
      previewBg: isDark ? 'bg-gray-900' : 'bg-red-50'
    },
    parchment: {
      bg: 'bg-amber-50',
      previewBg: 'bg-amber-100'
    },
    poetic: {
      bg: 'bg-indigo-50',
      previewBg: 'bg-indigo-100'
    },
    nature: {
      bg: 'bg-green-50',
      previewBg: 'bg-green-100'
    }
  };

  // Enhanced fallback transliteration function
  const hindiTransliterate = (text) => {
    // Define mapping for Hindi transliteration
    const mapping = {
      // Vowels
      'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ee': 'ई', 'u': 'उ', 'oo': 'ऊ',
      'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',

      // Consonants
      'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
      'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
      't': 'ट', 'th': 'ठ', 'd': 'ड', 'dh': 'ढ', 'n': 'न',
      'ta': 'त', 'tha': 'थ', 'da': 'द', 'dha': 'ध', 'na': 'न',
      'p': 'प', 'ph': 'फ', 'f': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
      'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
      'sh': 'श', 's': 'स', 'h': 'ह',

      // Commonly used words
      'main': 'मैं', 'mera': 'मेरा', 'meri': 'मेरी', 'aap': 'आप', 'tum': 'तुम',
      'hai': 'है', 'hain': 'हैं', 'ho': 'हो', 'kya': 'क्या', 'kyon': 'क्यों',
      'kyun': 'क्यूं', 'kaam': 'काम', 'karoge': 'करोगे', 'karegi': 'करेगी',
      'karega': 'करेगा', 'maine': 'मैंने', 'tumne': 'तुमने', 'aapne': 'आपने',
      'yeh': 'यह', 'woh': 'वह', 'acha': 'अच्छा', 'theek': 'ठीक', 'bahut': 'बहुत',
      'dhanyavad': 'धन्यवाद', 'shukriya': 'शुक्रिया', 'namaste': 'नमस्ते', 'hindi': 'हिंदी',

      // Numbers
      '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
      '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',

      // Common poetic words
      'kavita': 'कविता', 'kavi': 'कवि', 'prem': 'प्रेम', 'pyar': 'प्यार',
      'dil': 'दिल', 'ishq': 'इश्क', 'mohabbat': 'मोहब्बत', 'zindagi': 'ज़िंदगी',
      'duniya': 'दुनिया', 'khushi': 'ख़ुशी', 'dard': 'दर्द', 'gham': 'ग़म',
      'sapna': 'सपना', 'sapne': 'सपने', 'aansu': 'आंसू', 'khwaab': 'ख्वाब',
      'chand': 'चांद', 'suraj': 'सूरज', 'tara': 'तारा', 'taare': 'तारे',
      'aasman': 'आसमान', 'dharti': 'धरती', 'saagar': 'सागर', 'nadiya': 'नदिया',
      'pankh': 'पंख', 'parinda': 'परिंदा', 'azadi': 'आज़ादी', 'aatma': 'आत्मा'
    };

    // Special character handling
    const specialChars = {
      '.': '।', ',': ',', '?': '?', '!': '!', ' ': ' ',
      '\n': '\n', '\r': '\r', '\t': '\t'
    };

    // Split the input text into words
    const words = text.split(/(\s+)/);
    let result = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Check if the word is just whitespace
      if (word.trim() === '') {
        result += word;
        continue;
      }

      // Check if the entire word exists in our mapping
      if (mapping[word.toLowerCase()]) {
        result += mapping[word.toLowerCase()];
      } else {
        // Process character by character
        let j = 0;
        while (j < word.length) {
          // Try to match three characters first
          if (j < word.length - 2) {
            const threeChars = word.substr(j, 3).toLowerCase();
            if (mapping[threeChars]) {
              result += mapping[threeChars];
              j += 3;
              continue;
            }
          }

          // Try to match two characters
          if (j < word.length - 1) {
            const twoChars = word.substr(j, 2).toLowerCase();
            if (mapping[twoChars]) {
              result += mapping[twoChars];
              j += 2;
              continue;
            }
          }

          // If two-character match failed, try single character
          const oneChar = word[j].toLowerCase();
          if (mapping[oneChar]) {
            result += mapping[oneChar];
          } else if (specialChars[oneChar]) {
            result += specialChars[oneChar];
          } else {
            // If no match found, keep the original character
            result += word[j];
          }
          j++;
        }
      }
    }

    return result;
  };

  // Function to transliterate text with debouncing
  const transliterateText = async (text, setter) => {
    if (!text) {
      setter('');
      return;
    }

    // Using our custom transliteration function
    setter(hindiTransliterate(text));
  };

  // Update word and character count
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const chars = content.length;

    setWordCount(words);
    setCharCount(chars);
  }, [content]);

  // Handle transliteration with debouncing
  useEffect(() => {
    const debounceTime = 300; // 300ms delay

    const contentTimer = setTimeout(() => {
      if (content) transliterateText(content, setTransliteratedContent);
    }, debounceTime);

    const titleTimer = setTimeout(() => {
      if (title) transliterateText(title, setTransliteratedTitle);
    }, debounceTime);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(titleTimer);
    };
  }, [content, title]);

  // Autosave functionality
  useEffect(() => {
    if (!isDirty) return;

    const autosaveTimer = setTimeout(() => {
      saveAsDraft();
      setIsDirty(false);
    }, 5000); // Autosave after 5 seconds of inactivity

    return () => clearTimeout(autosaveTimer);
  }, [isDirty]);

  // Load drafts on initial render
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem('stories') || '[]');
    setDrafts(savedDrafts);
  }, []);

  // History management for undo/redo
  const addToHistory = (newContent) => {
    // If we're not at the end of the history, truncate
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);

    // Only keep the last 30 history states
    if (newHistory.length > 30) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }

    setHistory(newHistory);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setIsDirty(true);

    // Add to history if content changed significantly
    if (Math.abs(newContent.length - content.length) > 1 ||
      (newContent !== content && newContent.length % 5 === 0)) {
      addToHistory(newContent);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsDirty(true);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(history[historyIndex + 1]);
    }
  };

  const handleTextSelect = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selectedText = content.substring(start, end);

      setSelectedText({ start, end, text: selectedText });
    }
  };

  const applyFormatting = (type) => {
    let newFormatting = { ...formatting };

    if (selectedText.start !== selectedText.end) {
      const range = [selectedText.start, selectedText.end];

      switch (type) {
        case 'bold':
          // Check if range is already bold
          const boldIndex = newFormatting.bold.findIndex(
            ([start, end]) => start === range[0] && end === range[1]
          );

          if (boldIndex !== -1) {
            newFormatting.bold.splice(boldIndex, 1);
          } else {
            newFormatting.bold.push(range);
          }
          break;

        case 'italic':
          const italicIndex = newFormatting.italic.findIndex(
            ([start, end]) => start === range[0] && end === range[1]
          );

          if (italicIndex !== -1) {
            newFormatting.italic.splice(italicIndex, 1);
          } else {
            newFormatting.italic.push(range);
          }
          break;

        case 'underline':
          const underlineIndex = newFormatting.underline.findIndex(
            ([start, end]) => start === range[0] && end === range[1]
          );

          if (underlineIndex !== -1) {
            newFormatting.underline.splice(underlineIndex, 1);
          } else {
            newFormatting.underline.push(range);
          }
          break;

        default:
          break;
      }

      setFormatting(newFormatting);
    }
  };

  const changeFontSize = (size) => {
    if (selectedText.start !== selectedText.end) {
      const range = `${selectedText.start}-${selectedText.end}`;
      const newFormatting = { ...formatting };
  
      if (newFormatting.fontSize[range] === size) {
        delete newFormatting.fontSize[range];
      } else {
        newFormatting.fontSize[range] = size;
      }
  
      setFormatting(newFormatting);
    }
  };  

  const changeAlignment = (alignment) => {
    setFormatting({ ...formatting, alignment });
  };

  // Save current poem as draft
  const saveAsDraft = () => {
    const draft = {
      id: Date.now(),
      title: title,
      transliteratedTitle: transliteratedTitle,
      content: content,
      transliteratedContent: transliteratedContent,
      formatting: formatting,
      lastEdited: new Date().toISOString(),
      font: selectedFont,
      theme: theme
    };

    const updatedDrafts = [draft, ...drafts.filter(d => d.id !== draft.id)];
    setDrafts(updatedDrafts);
    localStorage.setItem('stories', JSON.stringify(updatedDrafts));

    return draft;
  };

  // Load a draft
  const loadDraft = (draft) => {
    setTitle(draft.title || '');
    setTransliteratedTitle(draft.transliteratedTitle || '');
    setContent(draft.content || '');
    setTransliteratedContent(draft.transliteratedContent || '');
    setFormatting(draft.formatting || { bold: [], italic: [], underline: [], fontSize: {}, alignment: 'left' });
    setSelectedFont(draft.font || 'Noto Sans Devanagari');
    setTheme(draft.theme || 'default');

    // Reset history
    setHistory([draft.content]);
    setHistoryIndex(0);
  };

  // Delete a draft
  const deleteDraft = (draftId) => {
    const updatedDrafts = drafts.filter(d => d.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('stories', JSON.stringify(updatedDrafts));
  };

  // Publish/Save the poem
  const handleSave = () => {
    if (!transliteratedTitle.trim() || !transliteratedContent.trim()) {
      alert('कृपया शीर्षक और कविता दर्ज करें!');
      return;
    }

    const poemData = {
      id: Date.now().toString(),
      title: transliteratedTitle,
      originalTitle: title,
      content: transliteratedContent,
      originalContent: content,
      formatting: formatting,
      font: selectedFont,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage under "stories"
    const existingStories = JSON.parse(localStorage.getItem('stories') || '[]');
    const updatedStories = [poemData, ...existingStories];
    localStorage.setItem('stories', JSON.stringify(updatedStories));

    // Call onSave if provided
    if (onSave) {
      onSave(poemData);
    } else {
      alert('आपकी कविता सफलतापूर्वक प्रकाशित हो गई है!');
      // Reset form
      setTitle('');
      setTransliteratedTitle('');
      setContent('');
      setTransliteratedContent('');
      setFormatting({ bold: [], italic: [], underline: [], fontSize: {}, alignment: 'left' });
    }
  };

  // Render formatted text in preview
  const renderFormattedPreview = () => {
    if (!transliteratedContent) {
      return <span className="text-gray-500">हिंदी में कविता यहां दिखेगी...</span>;
    }

    // Create a virtual DOM element to format the text
    const formattedText = document.createElement('div');
    formattedText.innerHTML = transliteratedContent.replace(/\n/g, '<br>');

    // Apply bold formatting
    formatting.bold.forEach(([start, end]) => {
      const selection = transliteratedContent.substring(start, end);
      formattedText.innerHTML = formattedText.innerHTML.replace(
        selection,
        `<strong>${selection}</strong>`
      );
    });

    // Apply italic formatting
    formatting.italic.forEach(([start, end]) => {
      const selection = transliteratedContent.substring(start, end);
      formattedText.innerHTML = formattedText.innerHTML.replace(
        selection,
        `<em>${selection}</em>`
      );
    });

    // Apply underline formatting
    formatting.underline.forEach(([start, end]) => {
      const selection = transliteratedContent.substring(start, end);
      formattedText.innerHTML = formattedText.innerHTML.replace(
        selection,
        `<u>${selection}</u>`
      );
    });

    // Apply font sizes
    Object.entries(formatting.fontSize).forEach(([range, size]) => {
      const [start, end] = range.split('-').map(Number);
      const selection = transliteratedContent.substring(start, end);
    
      const span = `<span style="font-size: ${size}px">${selection}</span>`;
      formattedText.innerHTML = formattedText.innerHTML.replace(selection, span);
    });
    
    return (
      <div
        className={`text-align-${formatting.alignment}`}
        dangerouslySetInnerHTML={{ __html: formattedText.innerHTML }}
      />
    );    
  };

  return (
    <div className={`p-6 ${themes[theme].bg} rounded-lg shadow-lg transition-colors duration-300`}>

      {/* Font and Theme Selection */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center">
          <label className="block text-sm font-medium mr-2">फ़ॉन्ट:</label>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className={`p-1 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          >
            {hindifonts.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
          
        <div className="flex items-center">
          <label className="block text-sm font-medium mr-2">थीम:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className={`p-1 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          >
            <option value="default">डिफ़ॉल्ट</option>
            <option value="parchment">पार्चमेंट</option>
            <option value="poetic">काव्यात्मक</option>
            <option value="nature">प्रकृति</option>
          </select>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className={`mb-4 p-2 border rounded-lg flex flex-wrap gap-2 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
        <button
          onClick={() => applyFormatting('bold')}
          className={`px-3 py-1 rounded ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="बोल्ड"
        >
          <strong>B</strong>
        </button>

        <button
          onClick={() => applyFormatting('italic')}
          className={`px-3 py-1 rounded ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="इटैलिक"
        >
          <em>I</em>
        </button>

        <button
          onClick={() => applyFormatting('underline')}
          className={`px-3 py-1 rounded ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="अंडरलाइन"
        >
          <u>U</u>
        </button>

        <div className="h-6 border-r border-gray-400 mx-1"></div>

        <select
          onChange={(e) => changeFontSize(e.target.value)}
          className={`px-2 py-1 rounded ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}
          title="फ़ॉन्ट साइज़"
        >
          <option value="">फ़ॉन्ट साइज़</option>
          <option value="12">12px</option>
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
          <option value="20">20px</option>
          <option value="24">24px</option>
          <option value="28">28px</option>
        </select>

        <div className="h-6 border-r border-gray-400 mx-1"></div>

        <button
          onClick={() => changeAlignment('left')}
          className={`px-3 py-1 rounded ${formatting.alignment === 'left' ? 'bg-blue-500 text-white' : isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="बायाँ संरेखण"
        >
          ⇹⇱
        </button>

        <button
          onClick={() => changeAlignment('center')}
          className={`px-3 py-1 rounded ${formatting.alignment === 'center' ? 'bg-blue-500 text-white' : isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="मध्य संरेखण"
        >
          ⇹
        </button>

        <button
          onClick={() => changeAlignment('right')}
          className={`px-3 py-1 rounded ${formatting.alignment === 'right' ? 'bg-blue-500 text-white' : isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="दायाँ संरेखण"
        >
          ⇱⇹
        </button>

        <div className="h-6 border-r border-gray-400 mx-1"></div>

        <button
          onClick={handleUndo}
          disabled={historyIndex <= 0}
          className={`px-3 py-1 rounded ${historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="पूर्ववत करें"
        >
          ↩
        </button>

        <button
          onClick={handleRedo}
          disabled={historyIndex >= history.length - 1}
          className={`px-3 py-1 rounded ${historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          title="पुनः करें"
        >
          ↪
        </button>

        <div className="ml-auto flex items-center">
          <span className="text-sm">
            {wordCount} शब्द | {charCount} अक्षर
          </span>
        </div>
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">कविता का शीर्षक</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Type in English (Hinglish)"
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        />
        <div className={`mt-2 p-3 min-h-8 border rounded-lg ${themes[theme].previewBg} font-hindi text-lg`} style={{ fontFamily: selectedFont }}>
          {transliteratedTitle || <span className="text-gray-500">हिंदी में शीर्षक यहां दिखेगा...</span>}
        </div>
      </div>

      {/* Content Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">कविता सामग्री</label>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onSelect={handleTextSelect}
          rows={10}
          placeholder="Type your poem in English (Hinglish)"
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        />
        <div
          ref={previewRef}
          className={`mt-2 p-4 min-h-40 border rounded-lg ${themes[theme].previewBg} font-hindi text-lg whitespace-pre-wrap`}
          style={{
            fontFamily: selectedFont,
            textAlign: formatting.alignment
          }}
        >
          {renderFormattedPreview()}
        </div>
      </div>

      {/* Drafts Section */}
      {drafts.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">अपनी ड्राफ्ट्स</h3>
          <div className={`max-h-40 overflow-y-auto p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
            {drafts.map(draft => (
              <div key={draft.id} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                <div>
                  <p className="font-medium">{draft.transliteratedTitle || '(बिना शीर्षक)'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(draft.lastEdited).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadDraft(draft)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    खोलें
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    हटाएं
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 italic">
          अंग्रेजी (हिंग्लिश) में टाइप करें और हिंदी में देखें
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveAsDraft}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            ड्राफ्ट सहेजें
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            प्रकाशित करें
          </button>
        </div>
      </div>

      {/* Custom CSS for text alignment classes */}
      <style jsx global>{`
        .text-align-left {
          text-align: left;
        }
        .text-align-center {
          text-align: center;
        }
        .text-align-right {
          text-align: right;
        }
        .font-hindi {
          font-family: ${selectedFont}, 'Noto Sans Devanagari', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default HindiPoemEditor;