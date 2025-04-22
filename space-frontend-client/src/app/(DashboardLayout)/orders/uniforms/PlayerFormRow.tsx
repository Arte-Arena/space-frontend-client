import React, { useEffect, useCallback } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  Box,
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
  disabled?: boolean;
}

const PlayerFormRow: React.FC<PlayerFormRowProps> = ({
  player,
  index,
  packageType,
  onPlayerUpdate,
  disabled = false,
}) => {
  const packageFeatures = PACKAGE_FEATURES[packageType];

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
    <Box
      sx={{
        mb: 2,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Grid container spacing={2}>
        {(packageFeatures.hasPlayerNumber || packageFeatures.hasPlayerName) && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {packageFeatures.hasPlayerNumber && (
                <Grid item xs={4} sm={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Número"
                    value={player.number}
                    onChange={handleNumberChange}
                    inputProps={{
                      maxLength: 2,
                    }}
                    disabled={disabled}
                  />
                </Grid>
              )}

              {packageFeatures.hasPlayerName && (
                <Grid
                  item
                  xs={packageFeatures.hasPlayerNumber ? 8 : 12}
                  sm={packageFeatures.hasPlayerNumber ? 10 : 12}
                >
                  <TextField
                    fullWidth
                    size="small"
                    label="Nome"
                    value={player.name}
                    onChange={handleNameChange}
                    disabled={disabled}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id={`gender-label-${index}`}>Gênero</InputLabel>
                <Select
                  labelId={`gender-label-${index}`}
                  value={player.gender}
                  label="Gênero"
                  onChange={handleGenderChange}
                  MenuProps={{ disableScrollLock: true }}
                  disabled={disabled}
                  required
                >
                  <MenuItem value="masculino">Masculino</MenuItem>
                  <MenuItem value="feminino">Feminino</MenuItem>
                  {packageType !== "Start" && (
                    <MenuItem value="infantil">Infantil</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sm={packageFeatures.canHaveDifferentSizes ? 4 : 8}
            >
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
                  disabled={disabled}
                  required
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
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`shorts-size-label-${index}`}>
                    Tamanho do calção
                  </InputLabel>
                  <Select
                    labelId={`shorts-size-label-${index}`}
                    value={player.shorts_size}
                    label="Tamanho do calção"
                    onChange={handleShortsSizeChange}
                    MenuProps={{ disableScrollLock: true }}
                    disabled={disabled}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerFormRow;
