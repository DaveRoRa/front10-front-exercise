import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ChangeButton from "../changeButton/changeButton";
import DatePicker from "../datepicker/datepicker";
import Multiselect from "../originDestinySelector/multiselect";
import SearchButton from "../searchButton/searchButton";
import SelectModality from "../selectModality/selectModality";

const economyOptions = ["Economy", "Premium Economy", "Business", "First"];

export const initialStateByFormType = {
  "One-way": {
    from: [],
    to: [],
    departure: null,
  },
  "Round-trip": {
    from: [],
    to: [],
    departure: null,
    back: null,
  },
  "Multi-city": {
    from: null,
    to: null,
    departure: null,
    economy: "Economy",
  },
};

//This components renders one form row per flight
const FlightSingleForm = ({
  //Indicates whether the trip is "One-way", "Round-trip" or "Multi-city"
  //and renders the corresponding inputs in dependency
  tripType,
  //Function to change the value asigned to the component
  //in the general state, it has only one argument, the new
  //value of the form
  onChange,
  //Value asigned to the component in the parent's state
  value,
  //Function to submit the form, it has no arguments
  submit,
  //If true doesn't show the close button next to each flight
  //row
  hideCloseButton,
  //Function to remove one row when the tripType is "Multi-city"
  removeFlight,
}) => {
  const [flight, setFlight] = useState(value);
  const [formType, setFormType] = useState(tripType);

  useEffect(() => {
    setFlight(initialStateByFormType[tripType]);
    setFormType(tripType);
  }, [tripType]);

  useEffect(() => {
    setFlight(value);
  }, [value]);

  useEffect(() => {
    onChange(flight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flight]);

  const handleChange = (newValue, field) => {
    setFlight((prev) => ({ ...prev, [field]: newValue }));
  };

  //Swaps "from" and "to" values
  const changeOriginDestiny = () => {
    setFlight((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  return (
    <Box display="flex" p={1} gap={1} flexWrap="wrap">
      <Multiselect
        value={flight.from}
        name="from"
        label="From"
        onChange={handleChange}
        isSingle={formType === "Multi-city"}
      />
      {formType === "One-way" || formType === "Round-trip" ? (
        <ChangeButton onClick={changeOriginDestiny} />
      ) : null}
      <Multiselect
        value={flight.to}
        name="to"
        label="To"
        onChange={handleChange}
        isSingle={formType === "Multi-city"}
      />

      <DatePicker
        value={flight.departure}
        name="departure"
        label="Departure"
        onChange={handleChange}
      />
      {formType === "Round-trip" && (
        <DatePicker
          value={flight.back}
          name="back"
          label="Return"
          onChange={handleChange}
          upperLimit={flight.departure}
        />
      )}
      {formType === "Multi-city" && (
        <SelectModality
          isFormElement
          options={economyOptions}
          name="economy"
          value={flight.economy}
          onChange={handleChange}
        />
      )}
      {formType === "One-way" || formType === "Round-trip" ? (
        <SearchButton onClick={submit} />
      ) : null}
      {formType === "Multi-city" && !hideCloseButton && (
        <IconButton
          aria-label="remove-travel"
          size="large"
          onClick={removeFlight}
        >
          <CloseIcon fontSize="inherit" htmlColor="#444444" />
        </IconButton>
      )}
    </Box>
  );
};

export default FlightSingleForm;
