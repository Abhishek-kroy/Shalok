import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, TextField, Button, Typography, CircularProgress, Paper,
} from '@mui/material';
import { PenLine, Sparkles } from 'lucide-react';

const KavitaGenerator = () => {
  const [input, setInput] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePoem = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setPoem('');

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/anujgupta/hindi-poetry',
        { inputs: input },
        {
          headers: {
            // Authorization: Bearer hf_omkVurcnIbmCGlsHjpqMjIMMAVocGSeYRdg
          }
        }
      );

      if (response.data && response.data[0]?.generated_text) {
        setPoem(response.data[0].generated_text);
      } else {
        setPoem('❌ Kavita banane mein samasya aayi.');
      }
    } catch (error) {
      setPoem('⚠ API error. Network ya token check karein.');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mt: 5,
        p: 4,
        bgcolor: '#fdf6f0',
        borderRadius: '16px',
        boxShadow: 6,
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom color="secondary">
        <Sparkles size={28} style={{ marginBottom: '-6px' }} /> AI Kavita Generator
      </Typography>

      <Typography variant="body1" mb={3} color="text.secondary">
        Kuch shabd ya bhaavna likhiye, aur ham ek kavita likhenge.
      </Typography>

      <TextField
        label="Udaharan: प्यार, यादें, बारिश"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<PenLine />}
        onClick={generatePoem}
        disabled={loading}
      >
        Kavita Likho
      </Button>

      {loading && (
        <Box mt={3}>
          <CircularProgress />
          <Typography mt={1}>Kavita likhi ja rahi hai...</Typography>
        </Box>
      )}

      {poem && (
        <Paper elevation={3} sx={{ mt: 4, p: 3, whiteSpace: 'pre-wrap', fontFamily: 'serif' }}>
          <Typography variant="h6" gutterBottom color="secondary">📝 Aapki Kavita:</Typography>
          <Typography>{poem}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default KavitaGenerator;