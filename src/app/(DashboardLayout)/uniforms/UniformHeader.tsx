import React from "react";
import { Typography, Box } from "@mui/material";

interface UniformHeaderProps {
  title: string;
  description: string;
}

const UniformHeader: React.FC<UniformHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <Box mb={3}>
      <Typography variant="h5" mb={2}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </Box>
  );
};

export default UniformHeader;
