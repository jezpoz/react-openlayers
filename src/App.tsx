import { Map, Layers } from "../";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";

export default function App() {
  const view = new View({ center: [0, 0], zoom: 2 });
  const layer = new TileLayer({
    source: new OSM(),
  });

  return (
    <Map view={view} width={"100%"} height={"100vh"}>
      <Layers.Tile layer={layer} />
    </Map>
  );
}
