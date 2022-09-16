import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//Equivalent to a conventional selector
const SelectModality = ({
  //List of options to select from
  options,
  //Indicates if the component is within the form or not
  isFormElement, //Function to change the value asigned to the component
  //in the form, it has two arguments (newValue, name)
  //"newValue" is the new value to asign to the equivalent
  //field in the form, the field name is determined by "name" arg
  onChange,
  //Value asigned to the component in the form
  value,
  //Name of the field in the state
  name,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const Arrow = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelection = (val) => {
    //This is an unique exception that doesn't change a value
    //it just redirects to an url, the original site acted that way
    if (val === "Trip Builder")
      window.open("https://www.youraddress.com", "_blank");
    else {
      onChange(val, name);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "black",
          width: "200px",
          height: "100%",
          border: isFormElement && "2px solid lightgray",
        }}
        endIcon={<Arrow fontSize="large" />}
      >
        {value}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((item) => (
          <MenuItem onClick={() => handleSelection(item)} key={item}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SelectModality;
