import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReservationSuccessModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/reservations");
    onClose(); // Call the onClose function to close the modal
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="reservation-success-dialog-title"
      aria-describedby="reservation-success-dialog-description"
    >
      <DialogTitle id="reservation-success-dialog-title">
        Reservation Successful
      </DialogTitle>

      <DialogContent  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="body1">
          Your table reservation has been confirmed successfully!
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationSuccessModal;
