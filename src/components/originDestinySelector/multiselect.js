import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cityList } from "./citiesMockData";

//Function to filter by typing on the textinput in the component
const filterOptions = createFilterOptions({
  stringify: ({ displayname }) => displayname,
});

const Multiselect = ({
  //Name of the field in the state
  name,
  //Label showed in the component UI
  label,
  //Function to change the value asigned to the component
  //in the form, it has two arguments (newValue, name)
  //"newValue" is the new value to asign to the equivalent
  //field in the form, the field name is determined by "name" arg
  onChange,
  //Value asigned to the component in the form
  value,
  //Determines if different options can be selected or only one
  isSingle,
}) => {
  return (
    <Autocomplete
      id={name}
      multiple={!isSingle}
      sx={{
        width: "300px",
      }}
      options={cityList}
      disableCloseOnSelect
      value={value}
      onChange={(_, newVal) => onChange(newVal, name)}
      filterOptions={filterOptions}
      renderOption={(props, option, state) => (
        <Box {...props}>
          <Avatar
            alt={option.id}
            src={option.destination_images.image_jpeg}
            variant="rounded"
          />
          <Box marginLeft={2} padding={1}>
            <Typography fontWeight={700}>{option.displayname}</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {option.airportname}
            </Typography>
          </Box>
        </Box>
      )}
      getOptionLabel={(option) => option.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};

export default Multiselect;
