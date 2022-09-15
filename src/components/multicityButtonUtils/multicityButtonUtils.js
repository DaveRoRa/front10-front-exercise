import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import SearchButton from "../searchButton/searchButton";

const MulticityButtonUtils = ({ submit, addRow, clearAll }) => {
  return (
    <Box display="flex" alignContent="center" flexDirection="row">
      <Box display="flex" alignContent="center" mr={5}>
        <Button
          sx={{ color: "black" }}
          size="large"
          onClick={addRow}
          startIcon={<AddIcon />}
        >
          Add another flight
        </Button>
        <Button size="large" sx={{ color: "black" }} onClick={clearAll}>
          Clear all
        </Button>
      </Box>
      <SearchButton onClick={submit} />
    </Box>
  );
};

export default MulticityButtonUtils;
