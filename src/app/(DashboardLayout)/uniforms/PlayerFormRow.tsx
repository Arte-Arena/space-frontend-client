import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Player, Gender, SIZES_BY_GENDER } from "./types";

interface PlayerFormRowProps {
  player: Player;
  index: number;
  onPlayerUpdate: (updatedPlayer: Player) => void;
}

const PlayerFormRow: React.FC<PlayerFormRowProps> = ({
  player,
  index,
  onPlayerUpdate,
}) => {
  const handleGenderChange = (e: SelectChangeEvent) => {
    const newGender = e.target.value as Gender;
    onPlayerUpdate({
      ...player,
      gender: newGender,
      jerseySize: "",
      shortsSize: "",
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPlayerUpdate({
      ...player,
      name: e.target.value,
    });
  };

  const handleJerseySizeChange = (e: SelectChangeEvent) => {
    onPlayerUpdate({
      ...player,
      jerseySize: e.target.value,
    });
  };

  const handleShortsSizeChange = (e: SelectChangeEvent) => {
    onPlayerUpdate({
      ...player,
      shortsSize: e.target.value,
    });
  };

  return (
    <Grid container spacing={2} alignItems="center" mb={2}>
      <Grid item xs={12} md={1}>
        <Typography
          variant="body2"
          fontWeight="medium"
          sx={{ textAlign: { xs: "left", md: "center" } }}
        >
          #{index + 1}
        </Typography>
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth size="small">
          <InputLabel id={`gender-label-${player.id}`}>Gênero</InputLabel>
          <Select
            labelId={`gender-label-${player.id}`}
            value={player.gender}
            label="Gênero"
            onChange={handleGenderChange}
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="feminino">Feminino</MenuItem>
            <MenuItem value="infantil">Infantil</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Nome do jogador"
          value={player.name}
          onChange={handleNameChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <FormControl fullWidth size="small">
          <InputLabel id={`jersey-size-label-${player.id}`}>
            Tamanho da camisa
          </InputLabel>
          <Select
            labelId={`jersey-size-label-${player.id}`}
            value={player.jerseySize}
            label="Tamanho da camisa"
            onChange={handleJerseySizeChange}
          >
            {SIZES_BY_GENDER[player.gender].jersey.map((size) => (
              <MenuItem key={`jersey-${size}`} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={2}>
        <FormControl fullWidth size="small">
          <InputLabel id={`shorts-size-label-${player.id}`}>
            Tamanho do calção
          </InputLabel>
          <Select
            labelId={`shorts-size-label-${player.id}`}
            value={player.shortsSize}
            label="Tamanho do calção"
            onChange={handleShortsSizeChange}
          >
            {SIZES_BY_GENDER[player.gender].shorts.map((size) => (
              <MenuItem key={`shorts-${size}`} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PlayerFormRow;
