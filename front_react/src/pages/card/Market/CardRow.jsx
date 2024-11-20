import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const CardRow = ({ card, onClick }) => {
  return (
    <TableRow hover onClick={() => onClick(card)}>
      <TableCell>{card.name}</TableCell>
      <TableCell>{card.description}</TableCell>
      <TableCell>{card.family_name}</TableCell>
      <TableCell>{card.hp}</TableCell>
      <TableCell>{card.energy}</TableCell>
      <TableCell>{card.defense}</TableCell>
      <TableCell>{card.attack}</TableCell>
      <TableCell>{`${card.price}$`}</TableCell>
    </TableRow>
  );
};

export default CardRow;
