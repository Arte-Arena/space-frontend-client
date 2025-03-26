'use client';

import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SocialLogin() {
  const handleSocialLogin = (provider: string) => {
    console.log(`Fazendo login com ${provider}`);
  };

  return (
    <Box className="flex flex-col gap-4 space-y-3">
      <Button 
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => handleSocialLogin('Google')}
        className="py-2.5 normal-case border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Continuar com Google
      </Button>
      
      <Button 
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={() => handleSocialLogin('GitHub')}
        className="py-2.5 normal-case border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Continuar com GitHub
      </Button>
    </Box>
  );
}