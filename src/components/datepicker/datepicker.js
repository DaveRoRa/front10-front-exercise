import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";

const limitDate = (day, upperLimit) => {
  if(upperLimit)return moment(day).isSameOrBefore(upperLimit, "day")
  return moment(day).isBefore(moment(), "day");
};

const DatePicker = ({ name, label, onChange, value, upperLimit }) => {
  return (
    <DesktopDatePicker
      label={label}
      inputFormat="DD/MM/YYYY"
      shouldDisableDate={(day) => limitDate(day, upperLimit)}
      value={value}
      onChange={(newVal) => onChange(newVal, name)}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default DatePicker;
