import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Grid, Card, CardContent, CardMedia, Checkbox, FormControlLabel } from '@mui/material';
import Header from '../Header';
import { generateProperty, generateImage } from '../../app/generationSlice';
import { saveCard } from '@/app/cardSlice';

const CardGenerator = () => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [descriptionPrompt, setDescriptionPrompt] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [cardSaved, setCardSaved] = useState(false); // Nouvel état pour éviter les sauvegardes multiples

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const { property, image, loading, error } = useSelector((state) => state.generation);

  useEffect(() => {
    if (!user) {
      router.push('/forms/loginUser');
    }
  }, [user, router]);

  // Sauvegarder la carte seulement si elle n'a pas déjà été enregistrée
  useEffect(() => {
    if (property && image && !cardSaved) {
      const cardData = {
        name: 'test',
        description: property.response,
        family: 'test',
        affinity: 'test',
        imgUrl: image.url,
        smallImgUrl: image.url,
        energy: 0,
        hp: 0,
        defence: 0,
        attack: 0,
        price: 0,
        userId: user.id || 0,
      };

      dispatch(saveCard(cardData));
      setCardSaved(true); // Marquer la carte comme sauvegardée
    }
  }, [property, image, dispatch, user, cardSaved]);

  const handleGenerate = () => {
    if (termsAgreed) {
      setCardSaved(false); // Réinitialiser l'état lors d'une nouvelle génération
      dispatch(generateProperty(descriptionPrompt));
      dispatch(generateImage(imagePrompt));
    } else {
      alert('You must agree to the terms and conditions.');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Header />

      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Image Prompt"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder="Enter a prompt for image generation"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description Prompt"
            value={descriptionPrompt}
            onChange={(e) => setDescriptionPrompt(e.target.value)}
            placeholder="Enter a description prompt"
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox checked={termsAgreed} onChange={() => setTermsAgreed(!termsAgreed)} />
            }
            label="I agree to the Terms and Conditions"
          />

          <Button variant="contained" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>

          {error && (
            <Typography color="error" align="center" sx={{ marginTop: 2 }}>
              {typeof error === 'object' ? error.message || JSON.stringify(error) : error}
            </Typography>
          )}
        </Grid>
        <Grid item xs={3} />
      </Grid>

      {property && image && (
        <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
          <Grid item xs={12} md={6}>
            <Card>
              {image.url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:8080${image.url.replace('/static', '')}`}
                  alt="Generated Image"
                />
              )}

              <CardContent>
                <Typography variant="h6">Generated Property</Typography>
                <Typography variant="body2">{property.response}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CardGenerator;
