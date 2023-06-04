import React, { useMemo, useState, useCallback } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../constants/env";
import { Stack, CircularProgress, Typography } from "../../components/atoms";
import { IPos, IMap } from "./";

export function Map({ value, onChange, onMapLoad }: Props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const pos = useMemo(
    () => ({
      lat: 50,
      lng: 30,
    }),
    []
  );

  //TODO: reaarrange value to selected marker
  const [selectedMarker, setSelectedMarker] = useState<IPos | null>(null);

  const onMapClick = useCallback((e: any) => {
    setSelectedMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    //TODO: reaarange value to string
    //TODO: onchange call
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: 300,
        height: 320,
      }}
    >
      {!isLoaded && <CircularProgress />}
      {loadError && <Typography>Can't fetch map</Typography>}
      {isLoaded && !loadError && (
        <GoogleMap
          zoom={10}
          center={pos}
          mapContainerStyle={{ width: "320px", height: "320px" }}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {selectedMarker && <Marker position={selectedMarker} />}
        </GoogleMap>
      )}
    </Stack>
  );
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  onMapLoad: (map: IMap) => void;
}

export default Map;
