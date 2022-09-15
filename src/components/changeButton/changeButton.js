import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import IconButton from "@mui/material/IconButton";

const ChangeButton = ({onClick}) => (
  <IconButton
    aria-label="search"
    size="large"
    sx={{
      bgcolor: "#f0f3f5",
      borderRadius: "10px",
      ":hover": { bgcolor: "darkGrey" },
    }}
    onClick={onClick}
  >
    <CompareArrowsIcon fontSize="inherit" htmlColor="black" />
  </IconButton>
);

export default ChangeButton;
