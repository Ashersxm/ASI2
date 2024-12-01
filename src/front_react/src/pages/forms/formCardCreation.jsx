// src/pages/CardGenerator.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Card, CardContent, CardMedia, Checkbox, FormControlLabel } from '@mui/material';
import Header
 from '../Header';
const CardGenerator = () => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [descriptionPrompt, setDescriptionPrompt] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [generatedCards, setGeneratedCards] = useState([]);

  const handleGenerate = () => {
    if (termsAgreed) {
      // Logique pour générer une carte
      const newCard = {
        name: 'Card Name', // Remplace avec ta logique de génération
        img_src: 'https://via.placeholder.com/150', // Image par défaut
        description: 'This is a card description',
        hp: 100,
        energy: 50,
        attack: 25,
        defense: 30,
        family_name: 'Card Family',
      };
      setGeneratedCards([...generatedCards, newCard]);
    } else {
      alert('You must agree to the terms and conditions.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Header></Header>


      {/* Formulaire de génération */}
      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Image Prompt"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder="Image Prompt"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description Prompt"
            value={descriptionPrompt}
            onChange={(e) => setDescriptionPrompt(e.target.value)}
            placeholder="Description Prompt"
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox checked={termsAgreed} onChange={() => setTermsAgreed(!termsAgreed)} />
            }
            label="I agree to the Terms and Conditions"
          />
          <Button variant="contained" onClick={handleGenerate}>
            Generate
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>

      {/* Affichage des cartes générées */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {generatedCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={card.img_src}
                alt={card.name}
              />
              <CardContent>
                <Typography variant="h6">{card.name}</Typography>
                <Typography variant="body2">{card.description}</Typography>
                <Typography variant="body2">HP: {card.hp}</Typography>
                <Typography variant="body2">Energy: {card.energy}</Typography>
                <Typography variant="body2">Attack: {card.attack}</Typography>
                <Typography variant="body2">Defense: {card.defense}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardGenerator;
