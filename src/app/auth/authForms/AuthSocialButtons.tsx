"use client";
import CustomSocialButton from "@/app/components/forms/theme-elements/CustomSocialButton";
import { Stack, Tooltip } from "@mui/material";
import { Avatar, Box } from "@mui/material";
import { signInType } from "@/app/(DashboardLayout)/types/auth/auth";

const AuthSocialButtons = ({ title }: signInType) => (
  <>
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <Tooltip title="Em breve disponível">
        <span>
          <CustomSocialButton disabled sx={{ opacity: 0.6 }}>
            <Avatar
              src={"/images/svgs/google-icon.svg"}
              alt={"icon1"}
              sx={{
                width: 16,
                height: 16,
                borderRadius: 0,
                mr: 1,
              }}
            />
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                whiteSpace: "nowrap",
                mr: { sm: "3px" },
              }}
            >
              {title}{" "}
            </Box>{" "}
            Google
          </CustomSocialButton>
        </span>
      </Tooltip>
      
      <Tooltip title="Em breve disponível">
        <span>
          <CustomSocialButton disabled sx={{ opacity: 0.6 }}>
            <Avatar
              src={"/images/svgs/facebook-icon.svg"}
              alt={"icon2"}
              sx={{
                width: 25,
                height: 25,
                borderRadius: 0,
                mr: 1,
              }}
            />
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                whiteSpace: "nowrap",
                mr: { sm: "3px" },
              }}
            >
              {title}{" "}
            </Box>{" "}
            Facebook
          </CustomSocialButton>
        </span>
      </Tooltip>
    </Stack>
  </>
);

export default AuthSocialButtons;
