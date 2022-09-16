import "./App.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Typography from "@mui/material/Typography";
import SelectModality from "./components/selectModality/selectModality";
import TravelersMenu from "./components/travelersMenu/travelersMenu";
import BagsMenu from "./components/bagsMenu/bagsMenu";
import DialogSended from "./components/dialogSended/dialogSended";
import FlightSingleForm, {
  initialStateByFormType,
} from "./components/flightSingleForm/flightSingleForm";
import MulticityButtonUtils from "./components/multicityButtonUtils/multicityButtonUtils";

const economyOptions = [
  "Economy",
  "Premium Economy",
  "Business",
  "First",
  "Multiple",
];

const tripOptions = ["One-way", "Round-trip", "Multi-city", "Trip Builder"];

//Replace an element in an array
function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

function App() {
  //General State
  const [state, setState] = useState({
    trip: "Round-trip",
    economy: "Economy",
    bags: { "Carry-on bag": 0, "Checked bag": 0 },
    travelers: {
      Adults: 1,
      Students: 0,
      Seniors: 0,
      Youths: 0,
      Children: 0,
      "Toddlers in own seat": 0,
      "Infants on lap": 0,
    },
  });
  //Form with the flight data, its structure depends on the flight type.
  //It can be a plain object when flight type is "One-way" or "Round-trip"
  //or an object array when flight type is "Multi-city"
  const [form, setForm] = useState(initialStateByFormType[state.trip]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  //Simulates booking a trip
  const sendFlightForm = () => {
    console.log("Trip data", { ...state, flightData: form });
    setIsOpenDialog(true);
  };

  //Function to change form state when it's an array
  const changeMultipleForm = (flight, index) => {
    setForm((prev) => {
      //If a destination is added in a row and the
      //field "from" is empty on the next one, this is
      //filled with the value of the "to" field of
      //its predecessor
      if (
        !prev[index].to &&
        flight.to &&
        prev[index + 1] &&
        !prev[index + 1].from
      ) {
        const tempState = replaceAt(prev, index, flight);
        const nextFlight = {
          ...prev[index + 1],
          from: flight.to,
        };
        return replaceAt(tempState, index + 1, nextFlight);
      }
      return replaceAt(prev, index, flight);
    });
  };

  //Add a new row when flight type is "Multi-city"
  const addFlight = () => {
    setForm((prev) => [...prev, initialStateByFormType["Multi-city"]]);
  };

  //Remove the current row when flight type is "Multi-city"
  const removeFlight = (index) => {
    setForm((prev) => prev.filter((_, i) => i !== index));
  };

  //Clean all fields in all rows when flight type is "Multi-city"
  const clearAll = () => {
    setForm((prev) =>
      Array.from(
        { length: prev.length },
        () => initialStateByFormType["Multi-city"]
      )
    );
  };

  //Change the value of state
  const handleChange = (
    //New value
    newValue,
    //Name of the field to change with the new value
    field
  ) => {
    if (
      //It changes the trip property to "Multi-city" whether
      //"Multi-city" is selected on flight type or "Multiple"
      //is selected on travel class. Values of economy field
      //(travel class) and bags are undefined since they're not
      //needed when flight type is "Multi-city". It also changes
      //the flight form from an object to an array
      state.trip !== "Multi-city" &&
      ((field === "economy" && newValue === "Multiple") ||
        (field === "trip" && newValue === "Multi-city"))
    ) {
      setState((prev) => ({
        ...prev,
        trip: "Multi-city",
        economy: undefined,
        bags: undefined,
      }));
      setForm([
        initialStateByFormType["Multi-city"],
        initialStateByFormType["Multi-city"],
        initialStateByFormType["Multi-city"],
      ]);
    }
    //If flight class is changed from "Multi-city"
    //to any other it restores the form state to an
    //non array object and bags and economy field are
    //setted to their initial values
    else if (
      state.trip === "Multi-city" &&
      field === "trip" &&
      newValue !== "Multi-city"
    ) {
      setState((prev) => ({
        ...prev,
        trip: newValue,
        economy: "Economy",
        bags: { "Carry-on bag": 0, "Checked bag": 0 },
      }));
    }
    //In any other case it just change the state
    else {
      setState((prev) => ({ ...prev, [field]: newValue }));
    }
  };

  return (
    //This Provider is for DatePicker componentes
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box width="100%">
        <Typography
          textAlign="center"
          variant="h2"
          fontWeight={700}
          component="h1"
          gutterBottom
        >
          Search Hundreds of travel sites at once.
        </Typography>
        <Grid p={1} container spacing={2}>
          <Grid item xs={6} md={3}>
            <SelectModality
              options={tripOptions}
              name="trip"
              onChange={handleChange}
              value={state.trip}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TravelersMenu onChange={handleChange} value={state.travelers} />
          </Grid>
          {state.trip === "One-way" || state.trip === "Round-trip" ? (
            <>
              <Grid item xs={6} md={3}>
                <SelectModality
                  options={economyOptions}
                  name="economy"
                  value={state.economy}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <BagsMenu onChange={handleChange} value={state.bags} />
              </Grid>
            </>
          ) : null}
        </Grid>
        {/*If trip (flight type) is "Multi-city" an array of row of individual forms 
        for flights is rendered, that's why form state is changed to an array of objects.
        If trip (flight type) is not "Multi-city" just one individual form for flight
        is rendered and form state is changed to a non array object*/}
        {state.trip === "Multi-city" ? (
          <>
            {form.map((singleFlight, i) => (
              <FlightSingleForm
                key={i}
                tripType={"Multi-city"}
                onChange={(flight) => changeMultipleForm(flight, i)}
                value={singleFlight}
                submit={sendFlightForm}
                hideCloseButton={!i}
                removeFlight={() => removeFlight(i)}
              />
            ))}
          </>
        ) : (
          <FlightSingleForm
            tripType={state.trip}
            onChange={(flight) => setForm(flight)}
            value={form}
            submit={sendFlightForm}
          />
        )}
        {/* This group of buttons are not rendered unless trip (flight type) is "Multi-city",
        because in those cases the submit button is already rendered by FlightSingleForm
        and the other two buttons are just useful when there are several rows for flights */}
        {state.trip === "Multi-city" && (
          <MulticityButtonUtils
            submit={sendFlightForm}
            addRow={addFlight}
            clearAll={clearAll}
          />
        )}
      </Box>
      <DialogSended
        closeDialog={() => setIsOpenDialog(false)}
        open={isOpenDialog}
      />
    </LocalizationProvider>
  );
}

export default App;
