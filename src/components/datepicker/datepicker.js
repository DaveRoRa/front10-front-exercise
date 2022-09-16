import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";

/**
 * Calculates which days can't be chosen in the Datepicker
 * component
 * @param day Day to evaluate
 * @param lowerLimit This is the lower limit from which a date
 * can be chosen, if this arg is falsy today date will be choose
 * @returns boolean
 */
const limitDate = (day, lowerLimit) => {
  if (lowerLimit) return moment(day).isSameOrBefore(lowerLimit, "day");
  return moment(day).isBefore(moment(), "day");
};

/**
 * Component to pick dates
 */
const DatePicker = ({
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
  //This is the lower limit from which a date
  //can be chosen, if this arg is falsy today date will be choose*
  upperLimit,
}) => {
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
