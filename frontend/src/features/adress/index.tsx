import React, { useCallback, useMemo, useRef, FC } from "react";
import Geocode from "react-geocode";
import { useLoadScript } from "@react-google-maps/api";
import { CircularProgress, Typography } from "../../components/atoms";
import { GOOGLE_MAPS_API_KEY } from "../../constants/env";
import { IAdress } from "../../constants/types";
import { Autocomplete } from "./autocomplete";
import { Map } from "./map";
import { EMPTY_FUNC } from "../../utils/always";
import { libraries } from "./constants";
import { IMap, IPos } from "./types";

const Adress: FC<Props> = ({ value, onChange = EMPTY_FUNC, geocode }) => {
  const _userAdress: IAdress = useMemo(() => value, [value]);

  const mapRef = useRef<IMap | null>(null);

  const onMapLoad = useCallback((map: IMap) => {
    mapRef.current = map;
  }, []);

  const onLocateClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      geocode
        ?.fromLatLng(
          String(position.coords.latitude),
          String(position.coords.longitude)
        )
        .then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            const address = response.results[0].formatted_address;

            onChange({
              description: address,
              lat,
              lng,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }, console.log);
  }, [geocode, onChange]);

  const onInputChange = useCallback(
    (val: string) => {
      geocode?.fromAddress(val).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const address = response.results[0].formatted_address;

          onChange({
            description: address,
            lat,
            lng,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    [geocode, onChange]
  );

  const onMarkerChange = useCallback(
    (val: IPos) => {
      geocode?.fromLatLng(String(val.lat), String(val.lng)).then(
        (response) => {
          const address = response.results[0].formatted_address;
          const { lat, lng } = response.results[0].geometry.location;

          onChange({
            description: address,
            lat,
            lng,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    [geocode, onChange]
  );

  return (
    <>
      <Autocomplete
        value={_userAdress.description}
        onChange={onInputChange}
        onLocateClick={onLocateClick}
      />
      <Map
        value={
          _userAdress.lat && _userAdress.lng
            ? { lat: _userAdress.lat, lng: _userAdress.lng }
            : null
        }
        onChange={onMarkerChange}
        onMapLoad={onMapLoad}
      />
    </>
  );
};

function withMap<T extends object>(Component: FC<T>) {
  Geocode.setLanguage("en");
  Geocode.setRegion("ukraine");
  Geocode.setLocationType("ROOFTOP");
  Geocode.setApiKey(GOOGLE_MAPS_API_KEY);

  const WrappedComponent = (props: T) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      libraries,
    });

    if (loadError) {
      return <Typography>Can't fetch map</Typography>;
    }

    if (!isLoaded) {
      return <CircularProgress />;
    }

    return <Component {...props} geocode={Geocode} />;
  };

  return WrappedComponent;
}

export default withMap<Props>(Adress);
interface Props {
  value: IAdress;
  onChange: (value: IAdress) => void;
  geocode?: typeof Geocode;
}
