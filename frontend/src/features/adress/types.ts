export interface IPos {
  lat: number;
  lng: number;
}

export interface IMap {
  panTo: (pos: IPos) => void;
  setZoom: (zoom: number) => void;
}
