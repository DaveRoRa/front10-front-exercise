import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SelectModality = ({ options, isFormElement, value, onChange, name }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const Arrow = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelection = (val) => {
    onChange(val, name);
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
