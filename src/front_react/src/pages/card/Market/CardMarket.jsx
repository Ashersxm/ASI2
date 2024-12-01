import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid } from '@mui/material';
import CardRow from './CardRow';
import CardDisplay from './CardDisplay'; // Import du composant d'affichage de la carte
import Header from '@/pages/Header';

const CardMarket = ({ type, cards }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleRowClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <Box>
      <Header type={type} /> {/* Header en haut de la page */}
      <Grid container spacing={2} sx={{ mt: 2 }}> {/* Espacement au-dessus de la grille */}
        <Grid item xs={8}> {/* Colonne pour le tableau des cartes */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Card Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Family</TableCell>
                  <TableCell>HP</TableCell>
                  <TableCell>Energy</TableCell>
                  <TableCell>Defense</TableCell>
                  <TableCell>Attack</TableCell>
                  <TableCell>{type === 'buy' ? 'Price' : 'Offer'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((card, index) => (
                  <CardRow key={index} card={card} onClick={handleRowClick} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={4}> {/* Colonne pour l'affichage de la carte sélectionnée */}
          {selectedCard && (
            <Box mt={3}>
              <CardDisplay card={selectedCard} /> {/* Affichage de la carte sélectionnée */}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardMarket;
