import React, { useState, useCallback, useMemo, useRef, FC } from "react";
import { userAdressSchema } from "../../utils/validations";
import { Autocomplete } from "./autocomplete";
import { Map } from "./map";
import { EMPTY_FUNC } from "../../utils/always";

export const Adress: FC<Props> = ({ value = "", onChange = EMPTY_FUNC }) => {
  const _userAdress: string = useMemo(() => value, [value]);

  //const [adress, setAdress] = useState(_userAdress);
  const [adressError, setAdressError] = useState("");

  const onAdressChange = useCallback(
    async (adress: string) => {
      await userAdressSchema
        .validate(adress)
        .then(() => {
          setAdressError("");
          onChange(adress);
        })
        .catch((error) => setAdressError(error));
    },
    [onChange]
  );

  const mapRef = useRef<IMap | null>(null);

  const onMapLoad = useCallback((map: IMap) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }: IPos) => {
    const myMap = mapRef.current;

    if (myMap) {
      myMap.panTo({ lat, lng });
      myMap.setZoom(14);
    }
  }, []);

  const onLocateClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      //TODO: SET rearranged to string value
    }, console.log);
  }, [panTo]);

  return (
    <>
      <Autocomplete
        value={_userAdress}
        adressError={adressError}
        onChange={onAdressChange}
        onLocateClick={onLocateClick}
      />
      <Map value={_userAdress} onChange={onChange} onMapLoad={onMapLoad} />
    </>
  );
};

export interface IPos {
  lat: number;
  lng: number;
}

export interface IMap {
  panTo: (pos: IPos) => void;
  setZoom: (zoom: number) => void;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default Adress;

// import React from 'react';
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from '@react-google-maps/api';
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from 'use-places-autocomplete';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from '@reach/combobox';

// import '@reach/combobox/styles.css';
// import MapStyle from './mapStyles';
// import Electronics from './Electronics_Drop_Off_NYC';

// /// /////////////////////////////////////////////////////////////
// const libraries = ['places'];
// const options = {
//   styles: MapStyle,
//   disableDefaultUI: true,
//   zoomControl: true,
// };
// const center = {
//   lat: 40.7703,
//   lng: -73.9883,
// };

// // Search function with input and list result
// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 40.7703, lng: () => -73.9883 },
//       radius: 50 * 1000,
//     },
//   });

//   // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       // eslint-disable-next-line no-console
//       console.log('😱 Error: ', error);
//     }
//   };

//   return (
//     <div className="search">
//       <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location here!"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === 'OK' &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }

// export default function MyMaps() {

//   const [, setMarkers] = useState([]);
//   const [selected, setSelected] = useState(null);

//   // This hook is not going to be used
//   // This hook creates a marker whenever the user clicks and add info to the infobox.
//   const onMapClick = useCallback(() => {
//     setMarkers((current) => [...current]);
//   }, []);

//   const mapRef = useRef();
//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);
//   // Hook to move the maps depending on user input location and zoom to that location
//   const panTo = React.useCallback(({ lat, lng }) => {
//     mapRef.current.panTo({ lat, lng });
//     mapRef.current.setZoom(14);
//   }, []);

//   return (
//     <div className=" justify-center object-center">
//       <Locate panTo={panTo} />
//       <Search panTo={panTo} />

//       <GoogleMap
//         id="map"
//         className="mapContainerStyle ml-10 justify-center content-center"
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={center}
//         options={options}
//         onClick={onMapClick}
//         onLoad={onMapLoad}
//       >
//         {Electronics.features.map((dropOff) => (
//           <Marker
//             key={dropOff.properties.zipcode}
//             position={{
//               lat: dropOff.geometry.coordinates[1],
//               lng: dropOff.geometry.coordinates[0],
//             }}
//             onClick={() => {
//               setSelected(dropOff);
//             }}
//             icon={{
//               url: `/recycling.png`,
//               origin: new window.google.maps.Point(0, 0),
//               anchor: new window.google.maps.Point(15, 15),
//               scaledSize: new window.google.maps.Size(30, 30),
//             }}
//           />
//         ))}

//         {selected ? (
//           <InfoWindow
//             position={{
//               lat: selected.geometry.coordinates[1],
//               lng: selected.geometry.coordinates[0],
//             }}
//             onCloseClick={() => {
//               setSelected(null);
//             }}
//           >
//             <div>
//               <h2>
//                 <span role="img" aria-label="Recycling">
//                   ♻️
//                 </span>{' '}
//                 {selected.properties.dropoff_sitename}{' '}
//                 <span role="img" aria-label="Recycling">
//                   ♻️
//                 </span>
//               </h2>
//               <p> Address: {selected.properties.address} </p>
//               <p> </p>
//             </div>
//           </InfoWindow>
//         ) : null}
//       </GoogleMap>
//     </div>
//   );
// }
