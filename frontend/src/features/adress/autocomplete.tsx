import React, { FC, useState, useCallback, ChangeEventHandler } from "react";
import {
  Stack,
  TextField,
  IconButton,
  TravelExploreOutlined,
} from "../../components/atoms";

export const Autocomplete: FC<Props> = ({
  value = "",
  adressError,
  onChange,
  onLocateClick,
}) => {
  const [adress, setAdress] = useState(value);
  //  TODO: value here

  const onAdressChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setAdress(e.target.value);

      //TODO: Suggestions call
      //TODO: ONCHANGE CALL
    },
    []
  );
  //   [onChange]
  // );
  //TODO: suggestions call and show

  return (
    <Stack direction="row" alignItems="center" sx={{ width: 300 }}>
      <TextField
        variant="outlined"
        label="Adress"
        value={adress}
        sx={{ flex: 1 }}
        required
        onChange={onAdressChange}
        error={!!adressError}
        autoComplete="off"
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
  value: string;
  adressError: string;
  onChange: (value: string) => void;
  onLocateClick: () => void;
}

export default Autocomplete;
