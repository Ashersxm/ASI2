import React from 'react';
import { TableRow, TableCell ,CardMedia} from '@mui/material';

const CardRow = ({ card, onClick }) => {
  return (
    <TableRow hover onClick={() => onClick(card)}>
      <CardMedia
        component="img"
        sx={{ width: 50, height: 50, objectFit: 'cover' }} // "cover" pour garder les proportions de l'image
        image={`http://localhost:8080${card.smallImgUrl.replace('/static', '')}`}
        alt={card.name}
      />
      <TableCell>{card.name}</TableCell>
      <TableCell>{card.description}</TableCell>
      <TableCell>{card.family}</TableCell>
      <TableCell>{card.affinity}</TableCell>
      <TableCell>{card.hp}</TableCell>
      <TableCell>{card.energy}</TableCell>
      <TableCell>{card.defence}</TableCell>
      <TableCell>{card.attack}</TableCell>
      <TableCell>{`${card.price}$`}</TableCell>
    </TableRow>
  );
};

export default CardRow;
