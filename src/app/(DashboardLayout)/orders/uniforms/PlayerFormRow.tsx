import React, { useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
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
  useEffect(() => {
    const isComplete =
      !!player.name &&
      !!player.shirt_size &&
      !!player.shorts_size &&
      !!player.number;

    if (isComplete !== player.ready) {
      onPlayerUpdate({
        ...player,
        ready: isComplete,
      });
    }
  }, [player.name, player.shirt_size, player.shorts_size, player.number]);

  const handleGenderChange = (e: SelectChangeEvent) => {
    const newGender = e.target.value as Gender;
    onPlayerUpdate({
      ...player,
      gender: newGender,
      shirt_size: "",
      shorts_size: "",
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPlayerUpdate({
      ...player,
      name: e.target.value,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPlayerUpdate({
      ...player,
      number: e.target.value,
    });
  };

  const handleJerseySizeChange = (e: SelectChangeEvent) => {
    onPlayerUpdate({
      ...player,
      shirt_size: e.target.value,
    });
  };

  const handleShortsSizeChange = (e: SelectChangeEvent) => {
    onPlayerUpdate({
      ...player,
      shorts_size: e.target.value,
    });
  };

  return (
    <Grid container spacing={2} alignItems="center" mb={2}>
      <Grid item xs={12} md={1}>
        <TextField
          fullWidth
          size="small"
          label="Número"
          value={player.number}
          onChange={handleNumberChange}
          inputProps={{
            maxLength: 2,
          }}
          required
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth size="small">
          <InputLabel id={`gender-label-${index}`}>Gênero</InputLabel>
          <Select
            labelId={`gender-label-${index}`}
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
          required
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <FormControl fullWidth size="small" required>
          <InputLabel id={`jersey-size-label-${index}`}>
            Tamanho da camisa
          </InputLabel>
          <Select
            labelId={`jersey-size-label-${index}`}
            value={player.shirt_size}
            label="Tamanho da camisa"
            onChange={handleJerseySizeChange}
          >
            {SIZES_BY_GENDER[player.gender as Gender].jersey.map((size) => (
              <MenuItem key={`jersey-${size}`} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={2}>
        <FormControl fullWidth size="small" required>
          <InputLabel id={`shorts-size-label-${index}`}>
            Tamanho do calção
          </InputLabel>
          <Select
            labelId={`shorts-size-label-${index}`}
            value={player.shorts_size}
            label="Tamanho do calção"
            onChange={handleShortsSizeChange}
          >
            {SIZES_BY_GENDER[player.gender as Gender].shorts.map((size) => (
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
