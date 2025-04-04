import React, { useState } from 'react';
import { 
  Avatar, 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  Grid,
  Chip,
  Card,
  CardContent,
  IconButton,
  Container,
  useMediaQuery,
  CssBaseline
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './UserProfile.css'
// Custom styled components with enhanced light orange theme
const ProfileContainer = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 0,
  width: '100vw', // Full viewport width
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #FFF3E0, #FFF8E1)',
  overflowX: 'hidden', // Prevent horizontal scrolling
  position: 'absolute', // Take it out of normal flow
  left: 0,
  top: 0,
}));

const ProfileHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)',
  borderRadius: '0 0 30px 30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 20px rgba(255, 167, 38, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  margin: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: theme.spacing(4),
  }
}));

const UserInfo = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  }
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: theme.spacing(3),
  padding: theme.spacing(2, 0),
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1, 3),
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: 'translateY(-2px)',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#E65100',
  fontWeight: 'bold',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  position: 'relative',
  paddingLeft: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '70%',
    backgroundColor: '#FFA726',
    borderRadius: '4px',
  }
}));

const StyledTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderBottom: '1px solid rgba(255, 167, 38, 0.2)',
  padding: theme.spacing(0, 1, 1, 1),
  width: '100%',
}));

const TabButton = styled(Box)(({ theme, active }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: active ? '#FFFFFF' : '#795548',
  backgroundColor: active ? '#FF9800' : 'transparent',
  boxShadow: active ? '0 2px 8px rgba(255, 152, 0, 0.3)' : 'none',
  '&:hover': {
    backgroundColor: active ? '#FB8C00' : 'rgba(255, 167, 38, 0.1)',
  }
}));

const PoemCard = styled(Card)(({ theme }) => ({
  height: '100%', // Make all cards the same height
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 167, 38, 0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(255, 167, 38, 0.15)',
  }
}));

const PoemCardContent = styled(CardContent)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  flex: 1, // Allow content to expand
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  }
}));

const PoemTitle = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  color: '#E65100',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -2,
    width: '40%',
    height: '2px',
    backgroundColor: '#FFB74D',
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  }
}));

const ActionButton = styled(Box)(({ theme }) => ({
  borderRadius: '20px',
  fontWeight: 'bold',
  padding: theme.spacing(1, 3),
  backgroundColor: '#FFA726',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(255, 167, 38, 0.2)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#FB8C00',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(255, 167, 38, 0.3)',
  }
}));

const PoemListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 167, 38, 0.1)',
  }
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

// Sample user data
const userData = {
  name: "राजेश शर्मा",
  image: "/api/placeholder/150/150", // Placeholder image
  followers: 523,
  published: 48,
  about: "मैं पिछले 10 वर्षों से कविता लिख रहा हूँ। प्रकृति, प्रेम और जीवन के विभिन्न पहलुओं पर लिखना पसंद करता हूँ। कई राष्ट्रीय काव्य गोष्ठियों में भाग लिया है और कई पुरस्कार जीते हैं।",
  topPoems: [
    {
      title: "बारिश की बूँदें",
      preview: "बारिश की बूँदें छत पर गिरती हैं, मेरे मन में यादें जगाती हैं। वह पल जब हम साथ थे, बारिश में भीगते थे, जीवन का हर पल जीते थे...",
      likes: 234,
      tags: ["प्रकृति", "यादें"]
    },
    {
      title: "सूरज की किरण",
      preview: "सूरज की किरण खिड़की से झांकती, नई उम्मीदों का संदेश लाती। अँधेरे को चीरकर आती, नई सुबह का आगाज़ करती...",
      likes: 189,
      tags: ["प्रकृति", "सकारात्मकता"]
    },
    {
      title: "जीवन का सफर",
      preview: "जीवन का सफर है अनजाना, हर मोड़ पर कुछ नया सिखाता। कभी हँसाता है तो कभी रुलाता है, पर हमेशा आगे बढ़ने को प्रेरित करता है...",
      likes: 156,
      tags: ["जीवन", "अनुभव"]
    }
  ],
  allPoems: [
    "बारिश की बूँदें", "सूरज की किरण", "जीवन का सफर", "मेरा देश", 
    "प्यार का इज़हार", "माँ का आँचल", "दोस्ती का रिश्ता", "नदी का किनारा", 
    "चाँदनी रात", "पहली मुलाक़ात", "वक़्त का पहिया", "सपनों की उड़ान"
  ]
};

const UserProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  // Set a fixed height and width for poem cards to ensure consistency
  const poemCardHeight = "350px";

  return (
    <React.Fragment>
      <CssBaseline />
      <ProfileContainer>
        <ProfileHeader elevation={0}>
          <StyledContainer maxWidth="lg">
            <UserInfoContainer>
              <Avatar
                src={userData.image}
                alt={userData.name}
                sx={{ 
                  width: isMobile ? 100 : 120, 
                  height: isMobile ? 100 : 120, 
                  border: '4px solid white',
                  boxShadow: '0 4px 10px rgba(255, 167, 38, 0.3)',
                }}
              />
              
              <UserInfo>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  background: 'linear-gradient(to right, #E65100, #FB8C00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  fontSize: isMobile ? '1.8rem' : '2.125rem'
                }}>
                  {userData.name}
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  color: '#795548', 
                  mb: 2, 
                  maxWidth: '600px',
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}>
                  {userData.about}
                </Typography>
                
                <ActionButton sx={{ display: 'inline-flex' }}>
                  <PersonIcon fontSize="small" />
                  <span>फॉलो करें</span>
                </ActionButton>
              </UserInfo>
            </UserInfoContainer>
            
            <StatsContainer>
              <StatItem>
                <Typography variant="h5" sx={{ 
                  color: '#E65100', 
                  fontWeight: 'bold',
                  fontSize: isMobile ? '1.3rem' : '1.5rem'
                }}>
                  {userData.followers}
                </Typography>
                <Typography variant="body2" sx={{ color: '#795548' }}>फॉलोअर्स</Typography>
              </StatItem>
              
              <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255, 167, 38, 0.2)' }} />
              
              <StatItem>
                <Typography variant="h5" sx={{ 
                  color: '#E65100', 
                  fontWeight: 'bold',
                  fontSize: isMobile ? '1.3rem' : '1.5rem'
                }}>
                  {userData.published}
                </Typography>
                <Typography variant="body2" sx={{ color: '#795548' }}>प्रकाशित कविताएँ</Typography>
              </StatItem>
              
              <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255, 167, 38, 0.2)' }} />
              
              <StatItem>
                <Typography variant="h5" sx={{ 
                  color: '#E65100', 
                  fontWeight: 'bold',
                  fontSize: isMobile ? '1.3rem' : '1.5rem'
                }}>
                  12
                </Typography>
                <Typography variant="body2" sx={{ color: '#795548' }}>साहित्य पुरस्कार</Typography>
              </StatItem>
            </StatsContainer>
          </StyledContainer>
        </ProfileHeader>
        
        <StyledContainer maxWidth="lg" sx={{ py: 4 }}>
          <StyledTabs>
            <TabButton 
              active={tabValue === 0} 
              onClick={() => handleTabChange(0)}
            >
              सर्वोत्तम कविताएँ
            </TabButton>
            <TabButton 
              active={tabValue === 1} 
              onClick={() => handleTabChange(1)}
            >
              सभी रचनाएँ
            </TabButton>
            <TabButton 
              active={tabValue === 2} 
              onClick={() => handleTabChange(2)}
            >
              परिचय
            </TabButton>
          </StyledTabs>
          
          {tabValue === 0 && (
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={3}>
                {userData.topPoems.map((poem, index) => (
                  <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                    <PoemCard sx={{ 
                      height: poemCardHeight,
                      width: '100%', // Make sure each card takes full width of its grid cell
                    }}>
                      <PoemCardContent>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <PoemTitle variant="h6">
                              {poem.title}
                            </PoemTitle>
                            <IconButton size="small">
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {poem.preview}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {poem.tags.map((tag, i) => (
                              <Chip 
                                key={i}
                                size="small" 
                                label={tag} 
                                sx={{ backgroundColor: 'rgba(255, 167, 38, 0.1)', color: '#E65100' }} 
                              />
                            ))}
                          </Box>
                        </Box>
                        
                        <Box>
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton size="small" sx={{ color: '#F57C00' }}>
                                <FavoriteIcon fontSize="small" />
                              </IconButton>
                              <Typography variant="body2" sx={{ ml: 0.5, color: '#F57C00', fontWeight: 'medium' }}>
                                {poem.likes}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <IconButton size="small" sx={{ color: '#757575' }}>
                                <BookmarkIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" sx={{ color: '#757575' }}>
                                <ShareIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </PoemCardContent>
                    </PoemCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Paper elevation={0} sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.7)', 
              borderRadius: 2, 
              p: 3,
              mt: 1
            }}>
              <Grid container spacing={2}>
                {userData.allPoems.map((poem, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <PoemListItem 
                      button
                      sx={{
                        cursor: 'pointer',
                        borderLeft: index < 3 ? '3px solid #FFA726' : 'none',
                        pl: index < 3 ? 2 : 3
                      }}
                    >
                      <ListItemText 
                        primary={poem} 
                        sx={{ 
                          '& .MuiTypography-root': { 
                            color: index < 3 ? '#E65100' : '#795548',
                            fontWeight: index < 3 ? 'bold' : 'normal'
                          } 
                        }}
                      />
                      <IconButton size="small" sx={{ color: '#F57C00' }}>
                        <BookmarkIcon fontSize="small" />
                      </IconButton>
                    </PoemListItem>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
          
          {tabValue === 2 && (
            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: 2, 
              backgroundColor: 'white',
              backgroundImage: 'radial-gradient(rgba(255, 167, 38, 0.1) 1px, transparent 0)',
              backgroundSize: '20px 20px',
              mt: 1
            }}>
              <Typography variant="body1" paragraph sx={{ color: '#795548', lineHeight: 1.8 }}>
                मैं पिछले 10 वर्षों से कविता लिख रहा हूँ। प्रकृति, प्रेम और जीवन के विभिन्न पहलुओं पर लिखना पसंद करता हूँ। कई राष्ट्रीय काव्य गोष्ठियों में भाग लिया है और कई पुरस्कार जीते हैं।
              </Typography>
              
              <Box sx={{ 
                backgroundColor: 'rgba(255, 243, 224, 0.5)', 
                p: 3, 
                borderRadius: 2,
                border: '1px dashed #FFB74D',
                mb: 3
              }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#795548' }}>
                  "कविता मेरे लिए केवल शब्द नहीं, बल्कि भावनाओं का प्रवाह है। मैं अपनी कविताओं के माध्यम से लोगों के दिलों को छूना चाहता हूँ।"
                </Typography>
              </Box>
              
              <SectionTitle variant="h6">सम्मान और पुरस्कार</SectionTitle>
              <List sx={{ 
                pl: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 2
              }}>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="राष्ट्रीय साहित्य अकादमी सम्मान (2022)" 
                    secondary="प्रकृति पर आधारित कविता संग्रह 'धरती की पुकार' के लिए"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="युवा कवि पुरस्कार (2020)" 
                    secondary="नई दिल्ली साहित्य महोत्सव द्वारा सम्मानित"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="नई दिल्ली साहित्य उत्सव में प्रथम पुरस्कार (2019)" 
                    secondary="काव्य प्रतियोगिता में प्रथम स्थान"
                  />
                </ListItem>
              </List>
              
              <SectionTitle variant="h6">संपर्क</SectionTitle>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: isMedium ? 'column' : 'row',
                gap: 4,
                backgroundColor: 'white',
                p: 3,
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
              }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ color: '#795548', mb: 1, fontWeight: 'bold' }}>
                    डिजिटल उपस्थिति
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#795548', mb: 0.5 }}>
                    Twitter: @rajesh_sharma
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#795548', mb: 0.5 }}>
                    Instagram: @kavirajeshsharma
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#795548' }}>
                    YouTube: काव्य यात्रा
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ color: '#795548', mb: 1, fontWeight: 'bold' }}>
                    संपर्क विवरण
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#795548', mb: 0.5 }}>
                    Email: rajesh.sharma@example.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#795548', mb: 0.5 }}>
                    व्यावसायिक पूछताछ: contact@rajeshpoetry.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#795548' }}>
                    काव्य कार्यशालाएं: workshops@rajeshpoetry.com
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </StyledContainer>
      </ProfileContainer>
    </React.Fragment>
  );
};

export default UserProfile;