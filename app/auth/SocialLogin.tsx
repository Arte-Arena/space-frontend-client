"use client";

import { Button, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { logger } from "../utils/logger";

export default function SocialLogin() {
  const handleSocialLogin = (provider: string) => {
    logger.log(`Fazendo login com ${provider}`);
  };

  return (
    <Box className="flex flex-col gap-4 space-y-3">
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => handleSocialLogin("Google")}
        className="py-2.5 normal-case border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Continuar com Google
      </Button>
    </Box>
  );
}
