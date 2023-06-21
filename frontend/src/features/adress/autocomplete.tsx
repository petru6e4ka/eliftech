import React, { FC, useCallback, ChangeEventHandler } from "react";
import {
  Stack,
  TextField,
  IconButton,
  TravelExploreOutlined,
  UIAutocomplete,
} from "../../components/atoms";
import usePlacesAutocomplete from "use-places-autocomplete";

export const Autocomplete: FC<Props> = ({
  value = "",
  onChange,
  onLocateClick,
}) => {
  const {
    ready,
    value: adress,
    suggestions: { status, data },
    setValue: setAdress,
  } = usePlacesAutocomplete();

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setAdress(e.target.value);
    },
    [setAdress]
  );

  const onChangeHandler = useCallback(
    (_: React.SyntheticEvent<Element, Event>, value: string | null) => {
      if (value) {
        setAdress(value, false);
        onChange(value);
      }
    },
    [onChange, setAdress]
  );

  return (
    <Stack direction="row" alignItems="center" sx={{ width: 300 }}>
      <UIAutocomplete
        disablePortal
        id="combo-box-demo"
        options={
          status === "OK" ? data.map(({ description }) => description) : []
        }
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Adress"
            value={adress}
            onChange={onInputChange}
            required
            sx={{ flex: 1 }}
            disabled={!ready}
          />
        )}
        value={value || adress}
        onChange={onChangeHandler}
        isOptionEqualToValue={() => true}
      />
      <IconButton
        color="primary"
        sx={{ p: 1, m: 1 }}
        aria-label="directions"
        onClick={onLocateClick}
      >
        <TravelExploreOutlined />
      </IconButton>
    </Stack>
  );
};

interface Props {
  value?: string;
  onChange: (value: string) => void;
  onLocateClick: () => void;
}

export default Autocomplete;
