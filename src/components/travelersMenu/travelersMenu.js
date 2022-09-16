import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Counter from "../counter/counter";

const countersEx = [
  { name: "Adults", subText: "18-64" },
  { name: "Students", subText: "over 18" },
  { name: "Seniors", subText: "65+" },
  { name: "Youths", subText: "12-17" },
  { name: "Children", subText: "2-11" },
  { name: "Toddlers in own seat", subText: "under 2" },
  { name: "Infants on lap", subText: "under 2" },
];

const getTotal = (state, array) => {
  if (array) return array.reduce((prev, current) => prev + state[current], 0);
  return Object.values(state).reduce((prev, current) => prev + current, 0);
};

const possibleErrors = {
  maxTravelers: "Searches cannot have more than 16 travelers",
  maxAdults: "Searches cannot have more than 9 adults",
  maxLapInfants: "Searches cannot have more lap infants than adults",
  minTraveler: "Searches need at least 1 traveler",
  studentValidation: "Student validation required",
};

const getHasError = (nextState, nextTotal) => {
  if (nextTotal === 0) return possibleErrors.minTraveler;
  if (nextTotal > 16) return possibleErrors.maxTravelers;
  const totalAdults = getTotal(nextState, ["Adults", "Students", "Seniors"]);
  if (totalAdults > 9) return possibleErrors.maxAdults;
  if (nextState["Infants on lap"] > totalAdults)
    return possibleErrors.maxLapInfants;
  return "";
};

//Component to Select the number of passenger on each flight
export default function TravelersMenu({
  //Function to change the value asigned to the component
  //in the form, it has two arguments (newValue, name)
  //"newValue" is the new value to asign to the equivalent
  //field in the form, the field name must be "travelers"
  onChange,
  //Value asigned to the component in the form
  value,
}) {
  const [total, setTotal] = useState(getTotal(value));
  const [error, setError] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const Arrow = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (name, isPlus) => {
    const numToAdd = isPlus ? 1 : -1;
    const nextState = { ...value, [name]: value[name] + numToAdd };
    const nextTotal = getTotal(nextState);
    const hasError = getHasError(nextState, nextTotal);
    if (hasError) {
      setError(hasError);
    } else {
      setError("");
      setTotal(nextTotal);
      onChange(nextState, "travelers");
    }
  };

  return (
    <div>
      <Button
        id="travelers-button"
        aria-controls={open ? "travelers-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black", width: "200px" }}
        endIcon={<Arrow fontSize="large" />}
      >
        {`${total} passenger(s)`}
      </Button>
      <Menu
        id="travelers-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "travelers-button",
        }}
      >
        {countersEx.map((item) => (
          <Counter
            name={item.name}
            subText={item.subText}
            value={value[item.name]}
            key={item.name}
            onChange={handleChange}
          />
        ))}
        {error || value["Students"] ? (
          <>
            <Divider variant="middle" />
            <Alert severity="warning" color="error">
              {error || possibleErrors.studentValidation}
            </Alert>
          </>
        ) : null}
      </Menu>
    </div>
  );
}
