import { Box, Button, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  onAction
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        px: 2
      }}
    >
      <Box sx={{ color: "#0f766e", mb: 2 }}>{icon}</Box>

      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 520 }}>
        {description}
      </Typography>

      {actionText && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            mt: 3,
            bgcolor: "#0f766e",
            "&:hover": {
              bgcolor: "#115e59"
            }
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;