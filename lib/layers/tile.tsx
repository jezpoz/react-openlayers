import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TileLayer from "ol/layer/Base";

interface TileComponentProps {
  layer: TileLayer;
}

export function TileLayerComponent({ layer }: TileComponentProps) {
  const { map } = useContext(MapContext);
  const [isLayerAdded, setLayerAdded] = useState<boolean>(false);

  useEffect(() => {
    if (map && !isLayerAdded) {
      map.addLayer(layer);
      setLayerAdded(true);
    }
  }, [map, layer, isLayerAdded]);

  return null;
}
