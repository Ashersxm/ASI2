import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const CardDisplay = ({ card, action, type }) => {
  const handleClick = () => {
    // Appel de l'action passée en prop pour vendre la carte
    if (action) {
      action(card.id);  // On passe l'ID de la carte pour la vente
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:8080${card.imgUrl.replace('/static', '')}`}
        alt={card.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
        <Typography variant="body2">Family: {card.family}</Typography>
        <Typography variant="body2">Affinity: {card.affinity}</Typography>
        <Typography variant="body2">HP: {card.hp}</Typography>
        <Typography variant="body2">Energy: {card.energy}</Typography>
        <Typography variant="body2">Defense: {card.defence}</Typography>
        <Typography variant="body2">Attack: {card.attack}</Typography>
        <Typography variant="body2">Price: {card.price}$</Typography>

        {/* Button to sell the card */}
        {action && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleClick}
            sx={{ mt: 2 }}
          >
           {type == "buy" ? "Acheter": "Vendre" } 
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardDisplay;
