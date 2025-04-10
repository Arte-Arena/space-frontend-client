import React, { useEffect, useCallback } from "react";
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
import { Sketch, Player, createEmptyPlayer, PACKAGE_FEATURES } from "./types";
import PlayerFormRow from "./PlayerFormRow";

interface SketchFormProps {
  sketch: Sketch;
  onSketchUpdate: (updatedSketch: Sketch) => void;
}

const SketchForm: React.FC<SketchFormProps> = ({ sketch, onSketchUpdate }) => {
  const generatePlayersArray = useCallback(
    (currentSketch: Sketch): Player[] => {
      if (!currentSketch.players || currentSketch.players.length === 0) {
        return Array.from({ length: currentSketch.player_count }, () =>
          createEmptyPlayer(),
        );
      }

      if (currentSketch.players.length < currentSketch.player_count) {
        const additionalPlayers = Array.from(
          { length: currentSketch.player_count - currentSketch.players.length },
          () => createEmptyPlayer(),
        );
        return [...currentSketch.players, ...additionalPlayers];
      }

      if (currentSketch.players.length > currentSketch.player_count) {
        return currentSketch.players.slice(0, currentSketch.player_count);
      }

      return currentSketch.players;
    },
    [],
  );

  useEffect(() => {
    if (!sketch.players || sketch.players.length !== sketch.player_count) {
      const updatedPlayers = generatePlayersArray(sketch);

      onSketchUpdate({
        ...sketch,
        players: updatedPlayers,
      });
    }
  }, [
    sketch.player_count,
    sketch.players,
    sketch,
    onSketchUpdate,
    generatePlayersArray,
  ]);

  const handlePlayerUpdate = useCallback(
    (updatedPlayer: Player) => {
      if (updatedPlayer._index === undefined) {
        console.error("Player update received without _index", updatedPlayer);
        return;
      }

      const updatedPlayers = sketch.players.map((player, index) => {
        if (index === updatedPlayer._index) {
          return { ...updatedPlayer };
        }
        return { ...player };
      });

      onSketchUpdate({
        ...sketch,
        players: updatedPlayers,
      });
    },
    [sketch, onSketchUpdate],
  );

  const playersToRender =
    sketch.players?.length === sketch.player_count
      ? sketch.players
      : generatePlayersArray(sketch);

  const packageFeatures = PACKAGE_FEATURES[sketch.package_type];

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
          <Typography variant="body2" color="textSecondary" mt={1}>
            {sketch.package_type === "Start" &&
              "Pacote Start: Tamanhos limitados (M, G) para adultos apenas, sem tamanhos infantis, sem nome e número individuais."}
            {sketch.package_type === "Prata" &&
              "Pacote Prata: Todos os tamanhos, sem nome individual, apenas número."}
            {sketch.package_type === "Ouro" &&
              "Pacote Ouro: Todos os tamanhos, nome e número individuais."}
            {(sketch.package_type === "Diamante" ||
              sketch.package_type === "Premium" ||
              sketch.package_type === "Profissional") &&
              "Pacote avançado: Todos os tamanhos, nome e número individuais, tamanhos de camisa e calção podem ser diferentes."}
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
                {packageFeatures.hasPlayerNumber ? "Número" : "#"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" fontWeight="bold">
                Gênero
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" fontWeight="bold">
                {packageFeatures.hasPlayerName ? "Nome do jogador" : "Jogador"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={packageFeatures.canHaveDifferentSizes ? 2 : 4}
            >
              <Typography variant="body2" fontWeight="bold">
                {packageFeatures.canHaveDifferentSizes ? "Camisa" : "Tamanho"}
              </Typography>
            </Grid>
            {packageFeatures.canHaveDifferentSizes && (
              <Grid item xs={12} md={2}>
                <Typography variant="body2" fontWeight="bold">
                  Calção
                </Typography>
              </Grid>
            )}
          </Grid>

          <Divider sx={{ mt: 1, mb: 3 }} />

          {playersToRender.map((player, index) => (
            <PlayerFormRow
              key={`player-${sketch.id}-${index}`}
              player={{ ...player, _index: index }}
              index={index}
              packageType={sketch.package_type}
              onPlayerUpdate={handlePlayerUpdate}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SketchForm;
