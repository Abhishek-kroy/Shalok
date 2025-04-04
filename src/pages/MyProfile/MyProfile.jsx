import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Paper, Avatar, Typography, Grid, Card, CardContent, 
  Chip, Divider, Button, TextField, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, InputLabel, Switch, FormControlLabel } from '@mui/material';
import { Book, Heart, User, Edit2, X, Camera, Moon, Sun, BookOpen, Bookmark, TrendingUp } from 'lucide-react';

// Enhanced theme with refined white, orange, and black color palette
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#FF6B00', // Vibrant orange as main color
      light: mode === 'light' ? '#FF8C38' : '#E55D00',
      dark: mode === 'light' ? '#E55D00' : '#CC5200',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: mode === 'light' ? '#000000' : '#FFFFFF',
      light: mode === 'light' ? '#333333' : '#F5F5F5',
      dark: mode === 'light' ? '#000000' : '#EEEEEE',
    },
    background: {
      default: mode === 'light' ? '#FFF9F2' : '#121212', // Soft orange tint for light mode
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#FFFFFF',
      secondary: mode === 'light' ? '#666666' : '#BBBBBB',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Noto Sans", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0 6px 16px rgba(0, 0, 0, 0.05)' 
            : '0 6px 16px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 107, 0, 0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          minHeight: '100vh',
          width: '100vw',
          overflow: 'auto',
          transition: 'background-color 0.3s ease',
        },
        html: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: mode === 'light' ? '#f1f1f1' : '#2d2d2d',
        },
        '::-webkit-scrollbar-thumb': {
          background: mode === 'light' ? '#FF8C38' : '#E55D00',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: mode === 'light' ? '#E55D00' : '#CC5200',
        }
      }
    }
  }
});

// Mock data - replace with real data later
const initialProfileData = {
  name: "राजेश कुमार",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150",
  about: "मैं एक कवि हूं जो हिंदी साहित्य से प्यार करता है। मेरी कविताएं जीवन के विभिन्न पहलुओं को दर्शाती हैं।",
  followedPoets: [
    { name: "सूर्यकांत त्रिपाठी निराला", followers: 1200 },
    { name: "महादेवी वर्मा", followers: 980 },
    { name: "हरिवंश राय बच्चन", followers: 1500 }
  ],
  topPoems: [
    { title: "प्रेम की पुकार", likes: 456, date: "15 जनवरी 2024" },
    { title: "वसंत का आगमन", likes: 398, date: "2 फरवरी 2024" },
    { title: "जीवन का सफर", likes: 367, date: "20 जनवरी 2024" },
    { title: "मेरी कविता, मेरी कहानी", likes: 289, date: "25 जनवरी 2024" }
  ],
  allPoems: [
    { title: "प्रेम की पुकार", likes: 456, date: "15 जनवरी 2024" },
    { title: "वसंत का आगमन", likes: 398, date: "2 फरवरी 2024" },
    { title: "जीवन का सफर", likes: 367, date: "20 जनवरी 2024" },
    { title: "मेरी कविता, मेरी कहानी", likes: 289, date: "25 जनवरी 2024" },
    { title: "आसमान की ऊंचाई", likes: 145, date: "5 फरवरी 2024" },
    { title: "धरती की पुकार", likes: 132, date: "10 फरवरी 2024" }
  ]
};

const ProfileHeader = ({ data, onEdit, darkMode, onToggleDarkMode,isDark,setIsDark }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: data.name,
    about: data.about,
    avatar: data.avatar,
  });
  const [imageUrl, setImageUrl] = useState(data.avatar);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const handleImageEdit = () => {
    setIsImageEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageSave = () => {
    if (imagePreview) {
      setEditData({
        ...editData,
        avatar: imagePreview
      });
      setImageUrl(imagePreview);
      onEdit({
        ...editData,
        avatar: imagePreview
      });
    }
    setIsImageEditing(false);
  };

  const handleImageCancel = () => {
    setImagePreview(null);
    setIsImageEditing(false);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        mb: 4, 
        position: 'relative', 
        borderTop: '4px solid', 
        borderColor: 'primary.main',
        overflow: 'visible',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{ position: 'absolute', right: 16, top: 16, display: 'flex', gap: 1, alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={onToggleDarkMode}
              icon={<Sun size={20} />}
              checkedIcon={<Moon size={20} />}
              color="primary"
            />
          }
          label={darkMode ? "डार्क मोड" : "लाइट मोड"}
        />
        <IconButton 
          onClick={() => setIsEditing(true)}
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { 
              bgcolor: 'primary.dark',
              transform: 'scale(1.05)',
              transition: 'all 0.2s'
            }
          }}
        >
          <Edit2 size={20} />
        </IconButton>
      </Box>
      
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={3} sx={{ textAlign: 'center', position: 'relative' }}>
          <Box sx={{ 
            position: 'relative', 
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -8,
              left: -8,
              right: -8,
              bottom: -8,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #FF6B00, #FF8C38)',
              opacity: 0.2,
              zIndex: -1
            }
          }}>
            <Avatar
              src={imageUrl}
              sx={{ 
                width: 160, 
                height: 160, 
                margin: 'auto',
                border: '4px solid',
                borderColor: 'primary.main',
                boxShadow: '0 4px 20px rgba(255, 107, 0, 0.2)'
              }}
            />
            <IconButton 
              onClick={handleImageEdit}
              sx={{ 
                position: 'absolute', 
                right: -10, 
                bottom: -10,
                bgcolor: 'primary.main',
                color: 'white',
                width: 42,
                height: 42,
                '&:hover': { 
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)',
                  transition: 'all 0.2s' 
                }
              }}
            >
              <Camera size={20} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '40%',
                height: '4px',
                bottom: -4,
                left: 0,
                backgroundColor: 'primary.main'
              }
            }}
          >
            {data.name}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ 
              mb: 3,
              lineHeight: 1.7,
              fontSize: '1.05rem'
            }}
          >
            {data.about}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Chip 
              icon={<BookOpen size={18} />} 
              label="कुल कविताएँ: 15" 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                px: 1,
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }} 
            />
            <Chip 
              icon={<Heart size={18} />} 
              label="कुल लाइक्स: 1.2K" 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                px: 1,
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }} 
            />
            <Chip 
              icon={<User size={18} />} 
              label="फॉलोअर्स: 450" 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                px: 1,
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }} 
            />
          </Box>
        </Grid>
      </Grid>

      {/* Profile Edit Dialog */}
      <Dialog 
        open={isEditing} 
        onClose={() => setIsEditing(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 2.5,
            fontWeight: 600,
            fontSize: '1.2rem'
          }}
        >
          प्रोफ़ाइल संपादित करें
          <IconButton
            sx={{ 
              position: 'absolute', 
              right: 8, 
              top: 8, 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onClick={() => setIsEditing(false)}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 3, px: 3 }}>
          <TextField
            fullWidth
            label="नाम"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            sx={{ 
              mb: 3, 
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                },
              }
            }}
          />
          <TextField
            fullWidth
            label="परिचय"
            multiline
            rows={4}
            value={editData.about}
            onChange={(e) => setEditData({ ...editData, about: e.target.value })}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                },
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setIsEditing(false)} 
            variant="outlined" 
            color="primary"
            sx={{ 
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2
              }
            }}
          >
            रद्द करें
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            sx={{ 
              boxShadow: '0 4px 10px rgba(255, 107, 0, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 14px rgba(255, 107, 0, 0.4)',
              }
            }}
          >
            सहेजें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Edit Dialog */}
      <Dialog 
        open={isImageEditing} 
        onClose={handleImageCancel} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            py: 2.5,
            fontWeight: 600,
            fontSize: '1.2rem'
          }}
        >
          प्रोफ़ाइल चित्र बदलें
          <IconButton
            sx={{ 
              position: 'absolute', 
              right: 8, 
              top: 8, 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onClick={handleImageCancel}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 3, textAlign: 'center', px: 3 }}>
          <Box 
            sx={{ 
              mb: 4, 
              mt: 2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -12,
                left: -12,
                right: -12,
                bottom: -12,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #FF6B00, #FF8C38)',
                opacity: 0.15,
                zIndex: -1
              }
            }}
          >
            <Avatar
              src={imagePreview || imageUrl}
              sx={{ 
                width: 220, 
                height: 220, 
                margin: 'auto',
                border: '4px solid',
                borderColor: 'primary.main',
                boxShadow: '0 8px 25px rgba(255, 107, 0, 0.25)'
              }}
            />
          </Box>
          
          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <InputLabel 
              htmlFor="image-upload" 
              sx={{ 
                mb: 1.5,
                fontWeight: 500,
                color: 'text.primary'
              }}
            >
              नया प्रोफ़ाइल चित्र अपलोड करें
            </InputLabel>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'primary.light',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'background.default'
                }
              }}
            >
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                style={{ 
                  display: 'none'
                }}
              />
              <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <Camera size={36} style={{ color: '#FF6B00', margin: '10px auto' }} />
                <Typography color="primary.main" sx={{ fontWeight: 500 }}>
                  चित्र चुनें या यहां ड्रॉप करें
                </Typography>
              </label>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleImageCancel} 
            variant="outlined" 
            color="primary"
            sx={{ 
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2
              }
            }}
          >
            रद्द करें
          </Button>
          <Button 
            onClick={handleImageSave} 
            variant="contained" 
            color="primary" 
            disabled={!imagePreview}
            sx={{ 
              boxShadow: '0 4px 10px rgba(255, 107, 0, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 14px rgba(255, 107, 0, 0.4)',
              }
            }}
          >
            सहेजें
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

const FollowedPoets = ({ poets }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 3, 
      borderTop: '4px solid', 
      borderColor: 'primary.main',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <Typography 
      variant="h6" 
      gutterBottom 
      color="primary.main"
      sx={{ 
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2
      }}
    >
      <Bookmark size={20} />
      फॉलो किए गए कवि
    </Typography>
    <Divider sx={{ mb: 3 }} />
    <Box sx={{ flexGrow: 1 }}>
      {poets.map((poet, index) => (
        <Paper
          key={index} 
          elevation={1}
          sx={{ 
            mb: 2, 
            p: 2, 
            borderRadius: 2,
            transition: 'all 0.3s ease',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': { 
              bgcolor: 'primary.light', 
              transform: 'translateY(-4px)', 
              boxShadow: '0 6px 15px rgba(255, 107, 0, 0.15)',
              borderColor: 'primary.light',
              '& .poet-name': {
                color: 'white'
              },
              '& .poet-followers': {
                color: 'rgba(255, 255, 255, 0.8)'
              }
            } 
          }}
        >
          <Typography 
            variant="subtitle1" 
            className="poet-name"
            sx={{ 
              fontWeight: 600,
              transition: 'color 0.3s ease'
            }}
          >
            {poet.name}
          </Typography>
          <Typography 
            variant="body2" 
            className="poet-followers"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.secondary',
              transition: 'color 0.3s ease'
            }}
          >
            <User size={14} /> {poet.followers} फॉलोअर्स
          </Typography>
        </Paper>
      ))}
    </Box>
    <Button 
      variant="outlined" 
      color="primary" 
      sx={{ 
        mt: 2, 
        alignSelf: 'center',
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s'
        }
      }}
    >
      और कवि देखें
    </Button>
  </Paper>
);

const TopPoems = ({ poems }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 3, 
      mb: 4, 
      borderTop: '4px solid', 
      borderColor: 'primary.main' 
    }}
  >
    <Typography 
      variant="h6" 
      gutterBottom 
      color="primary.main"
      sx={{ 
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2
      }}
    >
      <TrendingUp size={20} />
      सर्वाधिक लोकप्रिय कविताएँ
    </Typography>
    <Divider sx={{ mb: 3 }} />
    <Grid container spacing={3}>
      {poems.map((poem, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #FF6B00, #FF8C38)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(circle at 80% 10%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              },
              '&:hover': { 
                transform: 'translateY(-8px)', 
                boxShadow: '0 12px 25px rgba(255, 107, 0, 0.3)',
              } 
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  pb: 1,
                  borderBottom: '2px solid rgba(255,255,255,0.3)'
                }}
              >
                {poem.title}
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 2
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <Heart size={16} style={{ fill: 'white' }} /> {poem.likes}
                </Typography>
                <Typography 
                  variant="caption" 
                  display="block" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    fontWeight: 500,
                    background: 'rgba(255,255,255,0.2)',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  {poem.date}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

const AllPoems = ({ poems }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 3, 
      borderTop: '4px solid', 
      borderColor: 'primary.main' 
    }}
  >
    <Typography 
      variant="h6" 
      gutterBottom 
      color="primary.main"
      sx={{ 
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2
      }}
    >
      <Book size={20} />
      सभी कविताएँ
    </Typography>
    <Divider sx={{ mb: 3 }} />
    {poems.map((poem, index) => (
      <Paper
        key={index} 
        elevation={1}
        sx={{ 
          mb: 2, 
          p: 2.5,
          borderRadius: 2,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          transition: 'all 0.3s ease',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': { 
            bgcolor: 'background.default', 
            transform: 'translateX(8px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main',
            pl: 2,
          }
        }}
      >
        <Box>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontWeight: 600,
              mb: 0.5
            }}
          >
            {poem.title}
          </Typography>
          <Typography 
            variant="caption" 
            display="block" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
              background: theme => theme.palette.mode === 'light' ? 'rgba(255,107,0,0.1)' : 'rgba(255,107,0,0.2)',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              display: 'inline-block'
            }}
          >
            {poem.date}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            bgcolor: theme => theme.palette.mode === 'light' ? 'rgba(255,107,0,0.1)' : 'rgba(255,107,0,0.2)',
            px: 2,
            py: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Heart size={18} style={{ color: '#FF6B00', fill: '#FF6B00' }} /> 
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 700
            }}
          >
            {poem.likes}
          </Typography>
        </Box>
      </Paper>
    ))}
    {poems.map((poem, index) => (
      <Paper
        key={index} 
        elevation={1}
        sx={{ 
          mb: 2, 
          p: 2.5,
          borderRadius: 2,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          transition: 'all 0.3s ease',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': { 
            bgcolor: 'background.default', 
            transform: 'translateX(8px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main',
            pl: 2,
          }
        }}
      >
        <Box>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontWeight: 600,
              mb: 0.5
            }}
          >
            {poem.title}
          </Typography>
          <Typography 
            variant="caption" 
            display="block" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
              background: theme => theme.palette.mode === 'light' ? 'rgba(255,107,0,0.1)' : 'rgba(255,107,0,0.2)',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              display: 'inline-block'
            }}
          >
            {poem.date}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            bgcolor: theme => theme.palette.mode === 'light' ? 'rgba(255,107,0,0.1)' : 'rgba(255,107,0,0.2)',
            px: 2,
            py: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Heart size={18} style={{ color: '#FF6B00', fill: '#FF6B00' }} /> 
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 700
            }}
          >
            {poem.likes}
          </Typography>
        </Box>
      </Paper>
    ))}
    <Button 
      variant="contained" 
      color="primary" 
      sx={{ 
        mt: 3,
        width: '100%',
        py: 1.5,
        boxShadow: '0 4px 10px rgba(255, 107, 0, 0.3)',
        '&:hover': {
          boxShadow: '0 6px 14px rgba(255, 107, 0, 0.4)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      और कविताएँ लिखें
    </Button>
  </Paper>
);

// Main MyProfile Component
const MyProfile = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [darkMode, setDarkMode] = useState(false);
  const theme = React.useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  const handleProfileEdit = (newData) => {
    setProfileData({
      ...profileData,
      ...newData,
    });
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    setIsDark(!isDark)
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        transition: 'background-color 0.3s ease'
      }}>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <ProfileHeader 
            data={profileData} 
            onEdit={handleProfileEdit} 
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
          
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <FollowedPoets poets={profileData.followedPoets} />
            </Grid>
            <Grid item xs={12} md={8}>
              <TopPoems poems={profileData.topPoems} />
            </Grid>
          </Grid>
          
          <AllPoems poems={profileData.allPoems} />
          
          <Box sx={{ 
            textAlign: 'center', 
            mt: 6, 
            pb: 3, 
            color: 'text.secondary',
            fontSize: '0.9rem'
          }}>
            <Typography variant="body2">
              © 2024 हिंदीकविता.कॉम - सभी अधिकार सुरक्षित।
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MyProfile;