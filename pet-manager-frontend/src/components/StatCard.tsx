import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description: string;
}

const StatCard = ({ title, value, icon, description }: StatCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)"
      }}
    >
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: "space-between" }} spacing={2}>
          <Box>
            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              bgcolor: "#ccfbf1",
              color: "#0f766e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {icon}
          </Box>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;