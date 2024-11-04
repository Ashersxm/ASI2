import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CardDisplay = ({ card }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={card.img_src} // Remplace avec le chemin de l'image de la carte
        alt={card.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
        <Typography variant="body2">Family: {card.family_name}</Typography>
        <Typography variant="body2">HP: {card.hp}</Typography>
        <Typography variant="body2">Energy: {card.energy}</Typography>
        <Typography variant="body2">Defense: {card.defense}</Typography>
        <Typography variant="body2">Attack: {card.attack}</Typography>
        <Typography variant="body2">Price: {card.price}$</Typography>
      </CardContent>
    </Card>
  );
};

export default CardDisplay;
