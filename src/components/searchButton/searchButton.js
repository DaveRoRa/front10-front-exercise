import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const SearchButton = ({
  onClick,
  //True if is being rendered inside FlightSingleForm
  isInsideFlightForm,
}) => (
  <IconButton
    aria-label="search"
    size="large"
    sx={{
      bgcolor: "rgb(255, 105, 15)",
      borderRadius: "10px",
      ":hover": { bgcolor: "#cf3218" },
      width: isInsideFlightForm && "100%",
    }}
    onClick={onClick}
  >
    <SearchIcon fontSize="inherit" htmlColor="white" />
  </IconButton>
);

export default SearchButton;
