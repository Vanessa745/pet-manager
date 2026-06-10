import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

const Header = ({ title, subtitle, action }: HeaderProps) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        mb: 4
      }}
      spacing={2}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800 }} color="#111827">
          {title}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      </Box>

      {action}
    </Stack>
  );
};

export default Header;