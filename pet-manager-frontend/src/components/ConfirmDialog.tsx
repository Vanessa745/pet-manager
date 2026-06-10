import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = "Confirmar",
  loading = false,
  onCancel,
  onConfirm
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={loading ? undefined : onCancel} fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">{message}</Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Procesando..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;