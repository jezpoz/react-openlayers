import { Map, View } from "ol";
import { PropsWithChildren, useRef, useState, useEffect } from "react";
import { MapContext } from "./context/MapContext";

interface MapComponentProps extends PropsWithChildren {
  view: View;
  width: number | string;
  height: number | string;
}

export function MapComponent({
  children,
  view,
  width,
  height,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    if (!map) {
      setMap(
        new Map({
          target: mapRef.current!,
        })
      );
    }
    if (map && view) {
      map.setView(view);
    }
  }, [map, view]);

  return (
    <MapContext.Provider value={map}>
      <div ref={mapRef} style={{ width, height }}>
        {children}
      </div>
    </MapContext.Provider>
  );
}
