import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import {
  IconX,
  IconEye,
  IconShirt,
  IconArrowRight,
  IconArrowLeft,
} from "@tabler/icons-react";

const mockArtworks = {
  Start: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTken5MrLGbTmwklgn6HBJt6SJDwNEllzCrQg&s",
    "https://marketplace.canva.com/EAE7yO7cbdQ/1/0/1600w/canva-simple-sports-football-%26-soccer-badge-logo-4FjCb3R2e0g.jpg",
  ],
  Prata: [
    "https://via.placeholder.com/600x800/9e9e9e/ffffff?text=Uniforme+Prata+Frente",
    "https://via.placeholder.com/600x800/9e9e9e/ffffff?text=Uniforme+Prata+Costas",
  ],
  Ouro: [
    "https://via.placeholder.com/600x800/ffc107/000000?text=Uniforme+Ouro+Frente",
    "https://via.placeholder.com/600x800/ffc107/000000?text=Uniforme+Ouro+Costas",
  ],
  Diamante: [
    "https://via.placeholder.com/600x800/e0f7fa/000000?text=Uniforme+Diamante+Frente",
    "https://via.placeholder.com/600x800/e0f7fa/000000?text=Uniforme+Diamante+Costas",
  ],
  Premium: [
    "https://via.placeholder.com/600x800/673ab7/ffffff?text=Uniforme+Premium+Frente",
    "https://via.placeholder.com/600x800/673ab7/ffffff?text=Uniforme+Premium+Costas",
  ],
  Profissional: [
    "https://via.placeholder.com/600x800/f44336/ffffff?text=Uniforme+Profissional+Frente",
    "https://via.placeholder.com/600x800/f44336/ffffff?text=Uniforme+Profissional+Costas",
  ],
};

const fallbackImage =
  "https://via.placeholder.com/600x800/eeeeee/999999?text=Imagem+Não+Disponível";

interface SketchArtworkPreviewProps {
  sketchId: string;
  packageType: string;
}

const SketchArtworkPreview: React.FC<SketchArtworkPreviewProps> = ({
  sketchId,
  packageType,
}) => {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const artworkImages =
    packageType in mockArtworks
      ? mockArtworks[packageType as keyof typeof mockArtworks]
      : [fallbackImage];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === artworkImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? artworkImages.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<IconEye />}
        onClick={handleOpen}
        sx={{ mt: 1 }}
      >
        Visualizar arte
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <IconShirt color="#1976d2" size={24} />
              <Typography variant="h6" ml={1}>
                Arte do Esboço {sketchId} - Pacote {packageType}
              </Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box position="relative">
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  position: "relative",
                  mb: 1,
                }}
              >
                <Box
                  component="img"
                  src={artworkImages[currentImageIndex]}
                  alt={`Esboço ${sketchId} - Imagem ${currentImageIndex + 1}`}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                    borderRadius: 1,
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = fallbackImage;
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Button
                  onClick={handlePrev}
                  disabled={artworkImages.length <= 1}
                  startIcon={<IconArrowLeft />}
                >
                  Anterior
                </Button>
                <Typography variant="body2" color="text.secondary">
                  {currentImageIndex + 1} de {artworkImages.length}
                </Typography>
                <Button
                  onClick={handleNext}
                  disabled={artworkImages.length <= 1}
                  endIcon={<IconArrowRight />}
                >
                  Próximo
                </Button>
              </Box>
            </Paper>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Esta é uma visualização da arte que será aplicada ao uniforme.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SketchArtworkPreview;
