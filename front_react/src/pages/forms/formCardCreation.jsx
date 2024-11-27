import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import Header from '../Header';
import { generateProperty, generateImage } from '../../app/generationSlice';
import { saveCard, resetCardSaved, clearSuccess } from '@/app/cardSlice';

const CardGenerator = () => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [descriptionPrompt, setDescriptionPrompt] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const {
    property,
    image,
    loadingImage,
    loadingProperty,
    error,
  } = useSelector((state) => state.generation);
  const { success, isCardSaved, loading: saveLoading } = useSelector((state) => state.cards);

  useEffect(() => {
    if (!user) {
      router.push('/forms/loginUser');
    }
  }, [user, router]);

  const handleGenerate = () => {
    if (termsAgreed) {
      dispatch(resetCardSaved()); // Reset saved state for a new generation
      dispatch(generateProperty(descriptionPrompt));
      dispatch(generateImage(imagePrompt));
    } else {
      alert('You must agree to the terms and conditions.');
    }
  };

  const handleSave = () => {
    if (property && image && user) {
      const cardData = {
        name: 'Generated Card',
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
        userId: user?.id,
      };
      dispatch(saveCard(cardData));
      setShowSaveSuccess(true); // Show the success message
    }
  };

  useEffect(() => {
    if (showSaveSuccess && success) {
      const timer = setTimeout(() => {
        setShowSaveSuccess(false); // Hide success message after 3 seconds
        dispatch(clearSuccess()); // Clear success message from Redux
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [showSaveSuccess, success, dispatch]);

  const canSave = property && image && !loadingImage && !loadingProperty; // Vérification avant activation du bouton "Save"

  if (!user) {
    return <p>Redirecting to login...</p>;
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

          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={loadingImage || loadingProperty}
            sx={{ marginRight: 2 }}
          >
            {(loadingImage || loadingProperty) ? 'Generating...' : 'Generate'}
          </Button>

          {property && image && (
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              disabled={!canSave || isCardSaved || saveLoading} // Bloque tant que les deux n'ont pas chargé
            >
              {saveLoading ? 'Saving...' : isCardSaved ? 'Saved' : 'Save'}
            </Button>
          )}

          {error && (
            <Typography color="error" align="center" sx={{ marginTop: 2 }}>
              {typeof error === 'object' ? error.message || JSON.stringify(error) : error}
            </Typography>
          )}

          {showSaveSuccess && success && (
            <Alert severity="success" sx={{ marginTop: 2 }}>
              {success}
            </Alert>
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
