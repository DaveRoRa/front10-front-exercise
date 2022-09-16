import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Counter from "../counter/counter";

//Component to Select the number of bags per passenger on each flight.
//It doesn't renders when the flight type is "Multi-city"
export default function BagsMenu({
  //Function to change the value asigned to the component
  //in the form, it has two arguments (newValue, name)
  //"newValue" is the new value to asign to the equivalent
  //field in the form, the field name must be "bags"
  onChange,
  //Value asigned to the component in the form
  value,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const Arrow = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (name, isPlus) => {
    const numToAdd = isPlus ? 1 : -1;
    const nextState = { ...value, [name]: value[name] + numToAdd };
    onChange(nextState, "bags");
  };

  return (
    <div>
      <Button
        id="bags-button"
        aria-controls={open ? "bags-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black", width: "200px" }}
        endIcon={<Arrow fontSize="large" />}
      >
        {`${value["Carry-on bag"] + value["Checked bag"]} bag(s)`}
      </Button>
      <Menu
        id="bags-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "bags-button",
        }}
      >
        <Counter
          name={"Carry-on bag"}
          value={value["Carry-on bag"]}
          onChange={handleChange}
          maxDisabled={1}
        />
        <Counter
          name={"Checked bag"}
          value={value["Checked bag"]}
          onChange={handleChange}
          maxDisabled={2}
        />
        <Typography p={2} variant="body2" gutterBottom>
          Baggage per passenger
        </Typography>
      </Menu>
    </div>
  );
}
