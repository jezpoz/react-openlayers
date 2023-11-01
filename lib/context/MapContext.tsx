import { Map } from "ol";
import { createContext } from "react";

interface MapContext {
  map: Map | undefined;
}

export const MapContext = createContext<MapContext>({
  map: undefined,
});
