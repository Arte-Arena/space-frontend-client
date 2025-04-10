import React, { useEffect, useCallback } from "react";
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
import {
  Player,
  Gender,
  SIZES_BY_GENDER,
  LIMITED_SIZES,
  PackageType,
  PACKAGE_FEATURES,
} from "./types";

interface PlayerFormRowProps {
  player: Player;
  index: number;
  packageType: PackageType;
  onPlayerUpdate: (updatedPlayer: Player) => void;
}

const PlayerFormRow: React.FC<PlayerFormRowProps> = ({
  player,
  index,
  packageType,
  onPlayerUpdate,
}) => {
  const packageFeatures = PACKAGE_FEATURES[packageType];

  const determineIfComplete = useCallback((): boolean => {
    if (!player.gender || !player.shirt_size) return false;

    if (
      !packageFeatures.canHaveDifferentSizes &&
      player.shirt_size !== player.shorts_size
    ) {
      return false;
    }

    if (packageFeatures.canHaveDifferentSizes && !player.shorts_size)
      return false;

    if (packageFeatures.hasPlayerName && !player.name) return false;

    if (packageFeatures.hasPlayerNumber && !player.number) return false;

    return true;
  }, [
    player.gender,
    player.shirt_size,
    player.shorts_size,
    player.name,
    player.number,
    packageFeatures,
  ]);

  useEffect(() => {
    if (packageType === "Start" && player.gender === "infantil") {
      onPlayerUpdate({
        ...player,
        gender: "masculino",
        shirt_size: "",
        shorts_size: "",
      });
    }
  }, [packageType, player.gender, onPlayerUpdate]);

  useEffect(() => {
    const isComplete = determineIfComplete();

    if (isComplete !== player.ready) {
      onPlayerUpdate({
        ...player,
        ready: isComplete,
      });
    }
  }, [
    player.name,
    player.gender,
    player.shirt_size,
    player.shorts_size,
    player.number,
    player.ready,
    determineIfComplete,
    onPlayerUpdate,
  ]);

  const handleGenderChange = (e: SelectChangeEvent) => {
    const newGender = e.target.value as Gender;
    const updatedPlayer = {
      ...player,
      gender: newGender,
      shirt_size: "",
      shorts_size: "",
    };
    onPlayerUpdate(updatedPlayer);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer = {
      ...player,
      name: e.target.value,
    };
    onPlayerUpdate(updatedPlayer);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer = {
      ...player,
      number: e.target.value,
    };
    onPlayerUpdate(updatedPlayer);
  };

  const handleJerseySizeChange = (e: SelectChangeEvent) => {
    const newSize = e.target.value;
    let updatedPlayer = { ...player, shirt_size: newSize };

    if (!packageFeatures.canHaveDifferentSizes) {
      updatedPlayer.shorts_size = newSize;
    }

    onPlayerUpdate(updatedPlayer);
  };

  const handleShortsSizeChange = (e: SelectChangeEvent) => {
    const updatedPlayer = {
      ...player,
      shorts_size: e.target.value,
    };

    onPlayerUpdate(updatedPlayer);
  };

  const getAvailableSizes = (type: "jersey" | "shorts") => {
    if (packageType === "Start") {
      if (player.gender === "masculino" || player.gender === "feminino") {
        return LIMITED_SIZES[player.gender as Gender];
      }
      return LIMITED_SIZES["masculino"];
    }

    if (packageFeatures.availableSizes === "limited") {
      return LIMITED_SIZES[player.gender as Gender];
    }
    return SIZES_BY_GENDER[player.gender as Gender][type];
  };

  return (
    <Grid container spacing={2} alignItems="center" mb={2}>
      {packageFeatures.hasPlayerNumber ? (
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
      ) : (
        <Grid item xs={12} md={1}>
          <Typography variant="body2" color="textSecondary">
            {index + 1}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={3}>
        <FormControl fullWidth size="small">
          <InputLabel id={`gender-label-${index}`}>Gênero</InputLabel>
          <Select
            labelId={`gender-label-${index}`}
            value={player.gender}
            label="Gênero"
            onChange={handleGenderChange}
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="feminino">Feminino</MenuItem>
            {packageType !== "Start" && (
              <MenuItem value="infantil">Infantil</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>

      {packageFeatures.hasPlayerName ? (
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
      ) : (
        <Grid item xs={12} md={4}>
          <Typography variant="body2" color="textSecondary">
            Jogador {index + 1}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={packageFeatures.canHaveDifferentSizes ? 2 : 4}>
        <FormControl fullWidth size="small" required>
          <InputLabel id={`jersey-size-label-${index}`}>
            {packageFeatures.canHaveDifferentSizes
              ? "Tamanho da camisa"
              : "Tamanho do uniforme"}
          </InputLabel>
          <Select
            labelId={`jersey-size-label-${index}`}
            value={player.shirt_size}
            label={
              packageFeatures.canHaveDifferentSizes
                ? "Tamanho da camisa"
                : "Tamanho do uniforme"
            }
            onChange={handleJerseySizeChange}
            MenuProps={{ disableScrollLock: true }}
          >
            {getAvailableSizes("jersey").map((size) => (
              <MenuItem key={`jersey-${size}`} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {packageFeatures.canHaveDifferentSizes && (
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
              MenuProps={{ disableScrollLock: true }}
            >
              {getAvailableSizes("shorts").map((size) => (
                <MenuItem key={`shorts-${size}`} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default PlayerFormRow;
