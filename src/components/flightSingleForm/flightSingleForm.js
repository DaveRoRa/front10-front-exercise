import { useState, useEffect } from "react";
import GridMui from "@mui/material/Grid";
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

const getGridMultiselect = (type) => {
  switch (type) {
    case "One-way":
      return { xs: 13, sm: 6, md: 4, lg: 4 };
    case "Round-trip":
      return { xs: 16, sm: 7, md: 4, lg: 4 };

    default:
      return { xs: 28, md: 14, lg: 7 };
  }
};

const getGridSwap = (type) => {
  if (type === "One-way") return { xs: 13, sm: 1 };
  return { xs: 16, sm: 2, md: 1 };
};

const getGridDate = (type) => {
  switch (type) {
    case "One-way":
      return { xs: 13, sm: 12, md: 3, lg: 3 };
    case "Round-trip":
      return { xs: 16, sm: 7, md: 3, lg: 3 };

    default:
      return { xs: 14, sm: 12, md: 13, lg: 6 };
  }
};

const getGridSearch = (type) => {
  if (type === "One-way") return { xs: 13, sm: 1 };
  return { xs: 16, sm: 2, md: 1 };
};

const getColumns = (type) => {
  switch (type) {
    case "One-way":
      return 13;
    case "Round-trip":
      return 16;
    default:
      return 28;
  }
};

const Grid = ({ children, ...res }) => (
  <GridMui display="flex" justifyContent="center" item {...res}>
    {children}
  </GridMui>
);

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
    <GridMui
      p={1}
      maxWidth="100%"
      columns={getColumns(formType)}
      container
      spacing={2}
    >
      <Grid {...getGridMultiselect(formType)}>
        <Multiselect
          value={flight.from}
          name="from"
          label="From"
          onChange={handleChange}
          isSingle={formType === "Multi-city"}
        />
      </Grid>
      {formType === "One-way" || formType === "Round-trip" ? (
        <Grid {...getGridSwap(formType)}>
          <ChangeButton onClick={changeOriginDestiny} />
        </Grid>
      ) : null}
      <Grid {...getGridMultiselect(formType)}>
        <Multiselect
          value={flight.to}
          name="to"
          label="To"
          onChange={handleChange}
          isSingle={formType === "Multi-city"}
        />
      </Grid>
      <Grid {...getGridDate(formType)}>
        <DatePicker
          value={flight.departure}
          name="departure"
          label="Departure"
          onChange={handleChange}
        />
      </Grid>
      {formType === "Round-trip" && (
        <Grid {...getGridDate(formType)}>
          <DatePicker
            value={flight.back}
            name="back"
            label="Return"
            onChange={handleChange}
            upperLimit={flight.departure}
          />
        </Grid>
      )}
      {formType === "Multi-city" && (
        <Grid {...getGridDate(formType)}>
          <SelectModality
            isFormElement
            options={economyOptions}
            name="economy"
            value={flight.economy}
            onChange={handleChange}
          />
        </Grid>
      )}
      {formType === "One-way" || formType === "Round-trip" ? (
        <Grid {...getGridSearch(formType)}>
          <SearchButton isInsideFlightForm onClick={submit} />
        </Grid>
      ) : null}
      {formType === "Multi-city" && (
        <Grid xs={28} sm={4} md={2}>
          {!hideCloseButton ? (
            <>
              <IconButton
                sx={{
                  bgcolor: "#efefef",
                  borderRadius: "10px",
                  width: "100%",
                }}
                aria-label="remove-travel"
                size="large"
                onClick={removeFlight}
              >
                <CloseIcon fontSize="inherit" htmlColor="#444444" />
              </IconButton>
            </>
          ) : (
            <div style={{ padding: "20px" }} />
          )}
        </Grid>
      )}
    </GridMui>
  );
};

export default FlightSingleForm;
