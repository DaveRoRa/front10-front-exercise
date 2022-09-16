import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import IconButton from "@mui/material/IconButton";

//Component to switch the values of the fields "from" and "to"
//in the flight form
const ChangeButton = ({ onClick }) => (
  <IconButton
    aria-label="search"
    size="large"
    sx={{
      bgcolor: "#f0f3f5",
      borderRadius: "10px",
      width: "100%",
      height: "100%",
      ":hover": { bgcolor: "darkGrey" },
    }}
    onClick={onClick}
  >
    <CompareArrowsIcon fontSize="inherit" htmlColor="black" />
  </IconButton>
);

export default ChangeButton;
