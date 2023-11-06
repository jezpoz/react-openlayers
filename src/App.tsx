import { Map, Layers, Overlay, GroupLayer } from "../lib/main";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { useRef, useState } from "react";

export default function App() {
  const [activeLayerGroup, setActiveLayerGroup] = useState<number>(1);
  const [activeLayer, setActivelayer] = useState<number>(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const view = new View({ center: [0, 0], zoom: 2 });

  return (
    <>
      <button
        disabled={activeLayerGroup === 1}
        onClick={() => setActiveLayerGroup(1)}
      >
        Group 1
      </button>
      <button
        disabled={activeLayerGroup === 2}
        onClick={() => setActiveLayerGroup(2)}
      >
        Group 2
      </button>
      <button disabled={activeLayer === 1} onClick={() => setActivelayer(1)}>
        Map 1
      </button>
      <button disabled={activeLayer === 2} onClick={() => setActivelayer(2)}>
        Map 2
      </button>
      <Map view={view} width={"100%"} height={"600px"}>
        {activeLayerGroup === 1 && (
          <GroupLayer>
            {activeLayer === 1 && <Layers.Tile source={new OSM()} zIndex={0} />}
            {activeLayer === 2 && <Layers.Tile source={new OSM()} zIndex={0} />}
          </GroupLayer>
        )}

        {activeLayerGroup === 2 && (
          <GroupLayer>
            {activeLayer === 1 && <Layers.Tile source={new OSM()} zIndex={0} />}
            {activeLayer === 2 && <Layers.Tile source={new OSM()} zIndex={0} />}
          </GroupLayer>
        )}

        <Overlay element={overlayRef.current!} />
      </Map>
    </>
  );
}
