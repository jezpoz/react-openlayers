import { Map, Layers, Overlay } from "../lib/main";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { useRef } from "react";

export default function App() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const view = new View({ center: [0, 0], zoom: 2 });

  return (
    <>
      <Map view={view} width={"100%"} height={"600px"}>
        <Layers.Tile source={new OSM()} />
        <Overlay element={overlayRef.current!} />
      </Map>

      <div ref={overlayRef}>
        <h1>Overlay</h1>
      </div>
    </>
  );
}
