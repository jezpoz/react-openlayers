# React Openlayers

> :warning: **This is still work in progress**: Very limited functionality!

Repo heavily inspired by [react-openlayers](https://github.com/allenhwkim/react-openlayers) made by [Allen Kim](https://github.com/allenhwkim)

## Usage

```jsx
import { Map, Layers } from "react-overlays";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";

export default function App() {
  const view = new View({ center: [0, 0], zoom: 2 });
  const layer = new TileLayer({
    source: new OSM(),
  });

  return (
    <Map view={view} width={"100%"} height={"600px"}>
      <Layers.Tile layer={layer} />
    </Map>
  );
}
```

## Wanna test it out?

Feel free to clone the repository, if there is any issues, feel free to report them [here](https://github.com/jezpoz/react-openlayers/issues/new)

```bash
git clone https://github.com/jezpoz/react-openlayers
cd react-openlayers
npm i
npm run dev
```
