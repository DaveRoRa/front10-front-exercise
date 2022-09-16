import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

//Dialog component to simulate trip booking
const CustomizedDialogs = ({
  //Indicates if the Dialog is open = true, or
  //not open = false
  open,
  //Function to close the Dialog, it doesn't
  //have arguments
  closeDialog,
}) => {
  return (
    <div>
      <BootstrapDialog
        onClose={closeDialog}
        aria-labelledby="dialog-trip-booked"
        open={open}
      >
        <BootstrapDialogTitle id="dialog-title" onClose={closeDialog}>
          Success
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            The trip have been booked properly
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDialog}>
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default CustomizedDialogs;
