import { Layer } from "ol/Layer";
import { createContext } from "react";

export const LayerContext = createContext<Layer | undefined>(undefined);
