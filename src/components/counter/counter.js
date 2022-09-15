import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ControlButton = ({ isMinus, disabled, handleClick }) => {
  const Control = isMinus ? RemoveIcon : AddIcon;
  return (
    <IconButton
      aria-label="search"
      color="primary"
      sx={{
        borderRadius: "5px",
        borderColor: disabled ? "#f4f4f4" : "#c1c1c1",
        borderStyle: "solid",
        borderWidth: "3px",
        width: "9px",
        height: "9px",
      }}
      disabled={disabled}
      onClick={handleClick}
    >
      <Control fontSize="inherit" />
    </IconButton>
  );
};

const Counter = ({ name, subText, value, onChange, maxDisabled }) => {
  return (
    <Grid width={500} padding={2} container>
      <Grid item xs={8}>
        <Typography display="inline" variant="body1" gutterBottom>
          {name}
        </Typography>
        <Typography
          ml={1}
          display="inline"
          color="GrayText"
          variant="caption"
          gutterBottom
        >
          {subText}
        </Typography>
      </Grid>
      <Grid item display="flex" justifyContent="center" xs={4}>
        <ControlButton
          handleClick={() => onChange(name)}
          isMinus
          disabled={!value}
        />
        <Typography display="inline" variant="body1" fontWeight={700} mx={1.5}>
          {value}
        </Typography>
        <ControlButton
          handleClick={() => onChange(name, true)}
          disabled={maxDisabled === value}
        />
      </Grid>
    </Grid>
  );
};

export default Counter;
