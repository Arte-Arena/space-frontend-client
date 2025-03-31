import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Alert,
  Snackbar,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { UniformWithSketches, Sketch } from "./types";
import SketchForm from "./SketchForm";
import { uniformService } from "./uniformService";

interface UniformSketchesFormProps {
  uniform: UniformWithSketches;
  onSave?: (savedUniform: UniformWithSketches) => void;
}

const UniformSketchesForm: React.FC<UniformSketchesFormProps> = ({
  uniform,
  onSave,
}) => {
  const [sketches, setSketches] = useState<Sketch[]>(uniform.sketches);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleSketchUpdate = (updatedSketch: Sketch) => {
    const updatedSketches = sketches.map((sketch) =>
      sketch.id === updatedSketch.id ? updatedSketch : sketch,
    );
    setSketches(updatedSketches);
  };

  const handleOpenConfirmDialog = () => {
    let hasError = false;
    let errorMsg = "";

    for (const sketch of sketches) {
      for (const player of sketch.players) {
        if (!player.name || !player.jerseySize || !player.shortsSize) {
          hasError = true;
          errorMsg = `Preencha todos os campos para o jogador ${player.id} no esboço ${sketch.id}`;
          break;
        }
      }
      if (hasError) break;
    }

    if (hasError) {
      setErrorMessage(errorMsg);
      setShowError(true);
      return;
    }

    setConfirmDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    setConfirmDialogOpen(false);
    setSaving(true);

    try {
      const updatedUniform = await uniformService.updateUniformSketches(
        uniform.id,
        sketches,
      );
      setShowSuccess(true);

      if (onSave) {
        onSave(updatedUniform);
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      setErrorMessage("Ocorreu um erro ao salvar os dados. Tente novamente.");
      setShowError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Formulário de Uniformes - Orçamento {uniform.budgetNumber}
      </Typography>

      <Box mb={4}>
        <Typography variant="body1" paragraph>
          Preencha os dados dos jogadores para cada esboço. Os esboços e o
          número de jogadores são definidos pelo sistema e não podem ser
          alterados.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Campos obrigatórios: nome do jogador, tamanho da camisa e tamanho do
          calção.
        </Typography>
      </Box>

      <Stack spacing={3} mb={4}>
        {sketches.map((sketch) => (
          <SketchForm
            key={sketch.id}
            sketch={sketch}
            onSketchUpdate={handleSketchUpdate}
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
          disabled={saving}
        >
          {saving ? <CircularProgress size={24} /> : "Salvar alterações"}
        </Button>
      </Box>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirmar tamanhos dos uniformes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, confirme que você escolheu corretamente todos os tamanhos
            de camisas e calções para os jogadores. Após a confirmação, os
            uniformes serão enviados para produção com esses tamanhos.
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

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
        >
          Dados salvos com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          variant="filled"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UniformSketchesForm;
