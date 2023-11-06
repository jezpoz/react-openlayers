import { Group } from "ol/Layer";
import { createContext } from "react";

export const LayerGroupContext = createContext<Group | undefined>(undefined);
