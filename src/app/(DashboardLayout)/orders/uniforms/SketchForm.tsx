import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
import { Sketch, Player } from "./types";
import PlayerFormRow from "./PlayerFormRow";

interface SketchFormProps {
  sketch: Sketch;
  onSketchUpdate: (updatedSketch: Sketch) => void;
}

const SketchForm: React.FC<SketchFormProps> = ({ sketch, onSketchUpdate }) => {
  const handlePlayerUpdate = (updatedPlayer: Player) => {
    const updatedPlayers = sketch.players.map((player, index) =>
      index === updatedPlayer._index ? updatedPlayer : player,
    );

    onSketchUpdate({
      ...sketch,
      players: updatedPlayers,
    });
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<IconChevronDown />}
        sx={{ backgroundColor: "action.hover" }}
      >
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
          <Typography variant="h6">
            Esboço {sketch.id} - {sketch.player_count} Jogadores
          </Typography>
          <Chip
            label={sketch.package_type}
            color="primary"
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">
            Preencha as informações de cada jogador para este esboço.
          </Typography>
        </Box>

        <Box mt={3}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            mb={2}
            sx={{ fontWeight: "bold" }}
          >
            <Grid item xs={12} md={1}>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ textAlign: { xs: "left", md: "center" } }}
              >
                Número
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" fontWeight="bold">
                Gênero
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" fontWeight="bold">
                Nome do jogador
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" fontWeight="bold">
                Camisa
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" fontWeight="bold">
                Calção
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 1, mb: 3 }} />

          {sketch.players.map((player, index) => (
            <PlayerFormRow
              key={`player-${sketch.id}-${index}`}
              player={{ ...player, _index: index }}
              index={index}
              onPlayerUpdate={handlePlayerUpdate}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SketchForm;
