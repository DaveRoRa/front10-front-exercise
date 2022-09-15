import { useState } from "react";
import Box from "@mui/material/Box";
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

function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

function App() {
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
  const [form, setForm] = useState(initialStateByFormType[state.trip]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const sendFlightForm = () => {
    setIsOpenDialog(true);
  };

  const changeMultipleForm = (flight, index) => {
    setForm((prev) => {
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

  const addFlight = () => {
    setForm((prev) => [...prev, initialStateByFormType["Multi-city"]]);
  };

  const removeFlight = (index) => {
    setForm((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setForm((prev) =>
      Array.from(
        { length: prev.length },
        () => initialStateByFormType["Multi-city"]
      )
    );
  };

  const handleChange = (newValue, field) => {
    if (
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
    } else if (
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
    } else {
      setState((prev) => ({ ...prev, [field]: newValue }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box width="100%">
        <Typography variant="h2" fontWeight={700} component="h1" gutterBottom>
          Search Hundreds of travel sites at once.
        </Typography>
        <Box display="flex" flexDirection="row">
          <SelectModality
            options={tripOptions}
            name="trip"
            onChange={handleChange}
            value={state.trip}
          />
          <TravelersMenu onChange={handleChange} value={state.travelers} />
          {state.trip === "One-way" || state.trip === "Round-trip" ? (
            <>
              <SelectModality
                options={economyOptions}
                name="economy"
                value={state.economy}
                onChange={handleChange}
              />
              <BagsMenu onChange={handleChange} value={state.bags} />
            </>
          ) : null}
        </Box>
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
