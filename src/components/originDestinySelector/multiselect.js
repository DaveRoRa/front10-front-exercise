import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const filterOptions = createFilterOptions({
  stringify: ({ displayname }) => displayname,
});

const Multiselect = ({ name, label, onChange, value, isSingle }) => {
  return (
    <Autocomplete
      id={name}
      multiple={!isSingle}
      sx={{
        minWidth: "300px",
      }}
      options={cityList}
      disableCloseOnSelect
      value={value}
      onChange={(e, newVal) => onChange(newVal, name)}
      filterOptions={filterOptions}
      renderOption={(props, option, state) => (
        <Box {...props}>
          <Avatar
            alt={option.id}
            src={option.destination_images.image_jpeg}
            variant="rounded"
          />
          <Box marginLeft={2} padding={1}>
            <Typography fontWeight={700}>{option.displayname}</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {option.airportname}
            </Typography>
          </Box>
        </Box>
      )}
      getOptionLabel={(option) => option.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};

export default (Multiselect);
const cityList = [
  {
    id: "DFW",
    displayname: "Todos los aeropuertos, Dallas, Texas, Estados Unidos, (DFW)",
    loctype: "ap",
    cid: 253,
    rid: 161,
    ctid: 16406,
    lat: 32.89595,
    lng: -97.0372,
    cc: "US",
    country: "Estados Unidos",
    rc: "TX",
    cityname: "Dallas, Texas, Estados Unidos",
    timezone: "America/Chicago",
    utc: "-05:00",
    airportname: "Todos los aeropuertos",
    ap: "DFW",
    apicode: "DFWa",
    cityonly: "Dallas",
    destination_images: {
      image_jpeg:
        "https://content.r9cdn.net/rimg/dimg/46/26/6d65bf8d-city-16406-16422b4e573.jpg?width=128&height=128&xhint=1562&yhint=1126&outputtype=JPEG&crop=true",
      image_webp:
        "https://content.r9cdn.net/rimg/dimg/46/26/6d65bf8d-city-16406-16422b4e573.jpg?width=128&height=128&xhint=1562&yhint=1126&outputtype=WEBP&crop=true",
    },
    displayType: {
      type: "airport",
      displayName: "Aeropuerto",
    },
    indexId: "metro-DFW",
    isMetroOnly: true,
    kayakId: "DFW",
    kayakType: "ap",
    locationname: "Dallas, Texas, Estados Unidos",
    name: "Todos los aeropuertos",
    placeID: "56731",
    ptid: "ADFW",
    region: "Texas",
    searchFormPrimary: "DFW",
    searchFormSecondary: "Dallas, Texas, Estados Unidos",
    secondary: "Dallas, Texas, Estados Unidos",
    shortdisplayname: "Dallas, Texas, Estados Unidos (DFW)",
    smartyDisplay:
      "Todos los aeropuertos, Dallas, Texas, Estados Unidos, (DFW)",
  },
  {
    id: "DAL",
    displayname: "Love Field, Dallas, Texas, Estados Unidos, (DAL)",
    loctype: "ap",
    cid: 253,
    rid: 161,
    ctid: 16406,
    lat: 32.84707,
    lng: -96.85195,
    cc: "US",
    country: "Estados Unidos",
    rc: "TX",
    cityname: "Dallas, Texas, Estados Unidos",
    timezone: "America/Chicago",
    utc: "-05:00",
    airportname: "Love Field",
    ap: "DAL",
    apicode: "DAL",
    cityonly: "Dallas",
    destination_images: {
      image_jpeg:
        "https://content.r9cdn.net/rimg/dimg/46/26/6d65bf8d-city-16406-16422b4e573.jpg?width=128&height=128&xhint=1562&yhint=1126&outputtype=JPEG&crop=true",
      image_webp:
        "https://content.r9cdn.net/rimg/dimg/46/26/6d65bf8d-city-16406-16422b4e573.jpg?width=128&height=128&xhint=1562&yhint=1126&outputtype=WEBP&crop=true",
    },
    displayType: {
      type: "airport",
      displayName: "Aeropuerto",
    },
    entityKey: "place:Dallas_Love_Field",
    indexId: "175147",
    isMetroOnly: false,
    kayakId: "DAL",
    kayakType: "ap",
    locationname: "Dallas, Texas, Estados Unidos",
    name: "Love Field",
    objectID: "P177564",
    placeID: "175147",
    ptid: "ADAL",
    region: "Texas",
    searchFormPrimary: "DAL",
    searchFormSecondary: "Dallas, Texas, Estados Unidos",
    secondary: "Dallas, Texas, Estados Unidos",
    shortdisplayname: "Dallas, Texas, Estados Unidos (DAL)",
    smartyDisplay: "Love Field, Dallas, Texas, Estados Unidos, (DAL)",
    sub: true,
  },
  {
    id: "DXB",
    displayname: "Todos los aeropuertos, Dubái, Emiratos Árabes Unidos, (DXB)",
    loctype: "ap",
    cid: 251,
    rid: 3626,
    ctid: 6080,
    lat: 25.25278,
    lng: 55.36444,
    cc: "AE",
    country: "Emiratos Árabes Unidos",
    rc: "DU",
    cityname: "Dubái, Emiratos Árabes Unidos",
    timezone: "Asia/Dubai",
    utc: "+04:00",
    airportname: "Todos los aeropuertos",
    ap: "DXB",
    apicode: "DXBa",
    cityonly: "Dubái",
    destination_images: {
      image_jpeg:
        "https://content.r9cdn.net/rimg/dimg/9b/f7/7ab79f27-city-6080-158d0e1464c.jpg?width=128&height=128&xhint=1904&yhint=1457&outputtype=JPEG&crop=true",
      image_webp:
        "https://content.r9cdn.net/rimg/dimg/9b/f7/7ab79f27-city-6080-158d0e1464c.jpg?width=128&height=128&xhint=1904&yhint=1457&outputtype=WEBP&crop=true",
    },
    displayType: {
      type: "airport",
      displayName: "Aeropuerto",
    },
    indexId: "metro-DXB",
    isMetroOnly: true,
    kayakId: "DXB",
    kayakType: "ap",
    locationname: "Dubái, Emiratos Árabes Unidos",
    name: "Todos los aeropuertos",
    placeID: "1929",
    ptid: "ADXB",
    region: "Emirato de Dubai",
    searchFormPrimary: "DXB",
    searchFormSecondary: "Dubái, Emiratos Árabes Unidos",
    secondary: "Dubái, Emiratos Árabes Unidos",
    shortdisplayname: "Dubái, Emiratos Árabes Unidos (DXB)",
    smartyDisplay:
      "Todos los aeropuertos, Dubái, Emiratos Árabes Unidos, (DXB)",
  },
  {
    id: "DOH",
    displayname: "Hamad, Doha, Catar, (DOH)",
    loctype: "ap",
    cid: 199,
    rid: 2468,
    ctid: 15839,
    lat: 25.262206715744725,
    lng: 51.61398349243166,
    cc: "QA",
    country: "Catar",
    rc: "DA",
    cityname: "Doha, Catar",
    timezone: "Asia/Qatar",
    utc: "+03:00",
    airportname: "Hamad",
    ap: "DOH",
    apicode: "DOH",
    box_maxX: 51.6848796358746,
    box_maxY: 25.310640583063826,
    box_minX: 51.55201373011288,
    box_minY: 25.195129903257996,
    cityonly: "Doha",
    destination_images: {
      image_jpeg:
        "https://content.r9cdn.net/rimg/dimg/39/04/93991e36-city-15839-162c0ae404f.jpg?width=128&height=128&xhint=1996&yhint=1496&outputtype=JPEG&crop=true",
      image_webp:
        "https://content.r9cdn.net/rimg/dimg/39/04/93991e36-city-15839-162c0ae404f.jpg?width=128&height=128&xhint=1996&yhint=1496&outputtype=WEBP&crop=true",
    },
    displayType: {
      type: "airport",
      displayName: "Aeropuerto",
    },
    entityKey: "place:Hamad_International_Airport",
    indexId: "177800",
    isMetroOnly: false,
    kayakId: "DOH",
    kayakType: "ap",
    locationname: "Doha, Catar",
    name: "Hamad",
    objectID: "P530824",
    placeID: "177800",
    ptid: "ADOH",
    region: "Municipio de Doha",
    searchFormPrimary: "DOH",
    searchFormSecondary: "Doha, Catar",
    secondary: "Doha, Catar",
    shortdisplayname: "Doha, Catar (DOH)",
    smartyDisplay: "Hamad, Doha, Catar, (DOH)",
  },
  {
    id: "DUB",
    displayname: "Dublín, Dublín, Irlanda, (DUB)",
    loctype: "ap",
    cid: 116,
    rid: 1203,
    ctid: 7362,
    lat: 53.42664913574879,
    lng: -6.250510603027351,
    cc: "IE",
    country: "Irlanda",
    rc: "L",
    cityname: "Dublín, Irlanda",
    timezone: "Europe/Dublin",
    utc: "+01:00",
    airportname: "Dublín",
    ap: "DUB",
    apicode: "DUB",
    box_maxX: -6.154723559926203,
    box_maxY: 53.470409228947005,
    box_minX: -6.334624682973078,
    box_minY: 53.37056497631595,
    cityonly: "Dublín",
    destination_images: {
      image_jpeg:
        "https://content.r9cdn.net/rimg/dimg/43/32/a04a5913-city-7362-168ed972483.jpg?width=128&height=128&xhint=2389&yhint=1571&outputtype=JPEG&crop=true",
      image_webp:
        "https://content.r9cdn.net/rimg/dimg/43/32/a04a5913-city-7362-168ed972483.jpg?width=128&height=128&xhint=2389&yhint=1571&outputtype=WEBP&crop=true",
    },
    displayType: {
      type: "airport",
      displayName: "Aeropuerto",
    },
    entityKey: "place:Dublin_Airport",
    indexId: "176834",
    isMetroOnly: false,
    kayakId: "DUB",
    kayakType: "ap",
    locationname: "Dublín, Irlanda",
    name: "Dublín",
    objectID: "P167518",
    placeID: "176834",
    ptid: "ADUB",
    region: "Condado de Dublín",
    searchFormPrimary: "DUB",
    searchFormSecondary: "Dublín, Irlanda",
    secondary: "Dublín, Irlanda",
    shortdisplayname: "Dublín, Irlanda (DUB)",
    smartyDisplay: "Dublín, Dublín, Irlanda, (DUB)",
  },
  {
    id: "DEN",
    displayname: "Denver, Denver, Colorado, Estados Unidos, (DEN)",
    loctype: "ap",
    cid: 253,
    rid: 123,
    ctid: 12493,
    lat: 39.858909999999995,
    lng: -104.67326,
    cc: "US",
    country: "Estados Unidos",
    rc: "CO",
    cityname: "Denver, Colorado, Estados Unidos",
    timezone: "America/Denver",
    utc: "-06:00",
    airportname: "Denver",
    ap: "DEN",
    apicode: "DEN",
    box_maxX: -104.46038662440895,
    box_maxY: 39.98982501547065,
    box_minX: -104.8970931673777,
    box_minY: 39.74845593718901,
    cityonly: "Denver",
    destination_images: {
      image_jpeg:
        "https://content.r9cdn.net/rimg/simg/2048/12493.jpg?width=128&height=128&xhint=1094&yhint=864&outputtype=JPEG&crop=true",
      image_webp:
        "https://content.r9cdn.net/rimg/simg/2048/12493.jpg?width=128&height=128&xhint=1094&yhint=864&outputtype=WEBP&crop=true",
    },
    displayType: {
      type: "airport",
      displayName: "Aeropuerto",
    },
    entityKey: "place:Denver_International_Airport",
    indexId: "175778",
    isMetroOnly: false,
    kayakId: "DEN",
    kayakType: "ap",
    locationname: "Denver, Colorado, Estados Unidos",
    name: "Denver",
    objectID: "P202212",
    placeID: "175778",
    ptid: "ADEN",
    region: "Colorado",
    searchFormPrimary: "DEN",
    searchFormSecondary: "Denver, Colorado, Estados Unidos",
    secondary: "Denver, Colorado, Estados Unidos",
    shortdisplayname: "Denver, Colorado, Estados Unidos (DEN)",
    smartyDisplay: "Denver, Denver, Colorado, Estados Unidos, (DEN)",
  },
];
