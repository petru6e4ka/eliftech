import { useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Stack } from "../../components/atoms";
import { IPos, IMap } from "./types";
import { defaultLatLng } from "./constants";

export function Map({ value, onChange, onMapLoad }: Props) {
  const onMapClick = useCallback(
    (e: any) => {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      } as IPos;
      onChange(location);
    },
    [onChange]
  );

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: 300,
        height: 320,
      }}
    >
      <GoogleMap
        zoom={10}
        center={defaultLatLng}
        mapContainerStyle={{ width: "320px", height: "320px" }}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {value && <Marker position={value} />}
      </GoogleMap>
    </Stack>
  );
}

interface Props {
  value: IPos | null;
  onChange: (value: IPos) => void;
  onMapLoad: (map: IMap) => void;
}

export default Map;
