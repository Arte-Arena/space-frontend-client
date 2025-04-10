import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Stack,
  Alert,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { IconDeviceFloppy } from "@tabler/icons-react";
import {
  UniformWithSketches,
  Sketch,
  SketchPlayersUpdate,
  PACKAGE_FEATURES,
} from "./types";
import SketchForm from "./SketchForm";
import { updateUniformPlayers } from "@/services/uniforms";

interface UniformSketchesFormProps {
  uniform: UniformWithSketches;
  onSave?: (savedUniform: UniformWithSketches) => void;
}

const UniformSketchesForm: React.FC<UniformSketchesFormProps> = ({
  uniform,
  onSave,
}) => {
  const [sketches, setSketches] = useState<Sketch[]>(uniform.sketches || []);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (uniform.sketches) {
      setSketches([...uniform.sketches]);
    }
  }, [uniform.sketches]);

  const handleSketchUpdate = useCallback(
    (updatedSketch: Sketch) => {
      const updatedSketches = sketches.map((sketch) =>
        sketch.id === updatedSketch.id ? { ...updatedSketch } : { ...sketch },
      );

      setSketches([...updatedSketches]);
    },
    [sketches],
  );

  const validatePlayer = (player: any, packageType: string): boolean => {
    const features =
      PACKAGE_FEATURES[packageType as keyof typeof PACKAGE_FEATURES];

    if (!player.gender || !player.shirt_size) return false;

    if (features.canHaveDifferentSizes && !player.shorts_size) return false;

    if (features.hasPlayerName && !player.name) return false;

    if (features.hasPlayerNumber && !player.number) return false;

    return true;
  };

  const handleOpenConfirmDialog = () => {
    let hasError = false;
    let errorMsg = "";

    for (const sketch of sketches) {
      if (!sketch.players || sketch.players.length !== sketch.player_count) {
        hasError = true;
        errorMsg = `Número incorreto de jogadores no esboço ${sketch.id}. Esperado: ${sketch.player_count}, Atual: ${sketch.players?.length || 0}`;
        break;
      }

      for (const player of sketch.players) {
        if (!validatePlayer(player, sketch.package_type)) {
          const features = PACKAGE_FEATURES[sketch.package_type];
          hasError = true;

          if (!player.gender || !player.shirt_size) {
            errorMsg = `Preencha os campos obrigatórios do jogador no esboço ${sketch.id}`;
          } else if (features.canHaveDifferentSizes && !player.shorts_size) {
            errorMsg = `Informe o tamanho do calção para o jogador no esboço ${sketch.id}`;
          } else if (features.hasPlayerName && !player.name) {
            errorMsg = `Informe o nome do jogador no esboço ${sketch.id}`;
          } else if (features.hasPlayerNumber && !player.number) {
            errorMsg = `Informe o número do jogador no esboço ${sketch.id}`;
          } else {
            errorMsg = `Dados incompletos para o jogador no esboço ${sketch.id}`;
          }

          break;
        }
      }
      if (hasError) break;
    }

    if (hasError) {
      setErrorMessage(errorMsg);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 6000);
      return;
    }

    setConfirmDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    setConfirmDialogOpen(false);
    setSaving(true);

    try {
      const updates: SketchPlayersUpdate[] = sketches.map((sketch) => {
        if (sketch.players.length !== sketch.player_count) {
          throw new Error(
            `Número incorreto de jogadores no esboço ${sketch.id}`,
          );
        }

        for (const player of sketch.players) {
          if (!validatePlayer(player, sketch.package_type)) {
            throw new Error(
              `Dados incompletos para jogador no esboço ${sketch.id}`,
            );
          }
        }

        const cleanPlayers = sketch.players.map((player) => {
          const { _index, ...cleanPlayer } = player;

          const features = PACKAGE_FEATURES[sketch.package_type];
          if (!features.canHaveDifferentSizes) {
            cleanPlayer.shorts_size = cleanPlayer.shirt_size;
          }

          return cleanPlayer;
        });

        return {
          sketch_id: sketch.id,
          players: cleanPlayers,
        };
      });

      const updatedUniform = await updateUniformPlayers(uniform.id, updates);

      if (updatedUniform) {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 6000);

        if (onSave) {
          onSave(updatedUniform);
        }
      } else {
        throw new Error("Falha ao atualizar o uniforme");
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      setErrorMessage("Ocorreu um erro ao salvar os dados. Tente novamente.");
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 6000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      {showSuccess && (
        <Box mb={3}>
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            variant="filled"
          >
            Dados salvos com sucesso!
          </Alert>
        </Box>
      )}

      {showError && (
        <Box mb={3}>
          <Alert
            onClose={() => setShowError(false)}
            severity="error"
            variant="filled"
          >
            {errorMessage}
          </Alert>
        </Box>
      )}

      {!uniform.editable && (
        <Box mb={3}>
          <Alert severity="info" variant="filled">
            Este uniforme não está mais disponível para edição. Os dados já
            foram confirmados e enviados para produção. Caso precise alterar
            algum dado, entre em contato com o suporte.
          </Alert>
        </Box>
      )}

      <Typography variant="h5" mb={3}>
        Formulário de Uniformes - Orçamento {uniform.budget_id}
      </Typography>

      <Box mb={4}>
        <Typography variant="body1" paragraph>
          Preencha os dados dos jogadores para cada esboço. Os esboços e o
          número de jogadores são definidos pelo sistema e não podem ser
          alterados.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Os campos exibidos e obrigatórios variam de acordo com o tipo de
          pacote.
        </Typography>
      </Box>

      <Stack spacing={3} mb={4}>
        {sketches.map((sketch) => (
          <SketchForm
            key={sketch.id}
            sketch={sketch}
            onSketchUpdate={handleSketchUpdate}
            editable={uniform.editable}
          />
        ))}
      </Stack>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={!saving && <IconDeviceFloppy />}
          onClick={handleOpenConfirmDialog}
          disabled={saving || !uniform.editable}
        >
          {saving ? <CircularProgress size={24} /> : "Salvar alterações"}
        </Button>
      </Box>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirmar dados dos uniformes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, confirme que você escolheu corretamente todos os números,
            tamanhos de camisas e calções para os jogadores. Após a confirmação,
            os uniformes serão enviados para produção com essas informações.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="inherit">
            Revisar novamente
          </Button>
          <Button
            onClick={handleConfirmSave}
            variant="contained"
            color="primary"
            autoFocus
          >
            Confirmar e salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UniformSketchesForm;
