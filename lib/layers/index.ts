import { HeatMapLayerComponent } from "./heatmap";
import { ImageLayerComponent } from "./image";
import { TileLayerComponent } from "./tile";
import { VectorLayerComponent } from "./vector";
import { VectorTileLayerComponent } from "./vector-tile";

const Layers = {
  HeatMap: HeatMapLayerComponent,
  Image: ImageLayerComponent,
  Tile: TileLayerComponent,
  Vector: VectorLayerComponent,
  VectorTile: VectorTileLayerComponent,
};

export { Layers };
