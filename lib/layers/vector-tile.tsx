import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import { LayerGroupContext } from "../context/LayerGroupContext";
import { Extent } from "ol/extent";
import { OrderFunction } from "ol/render";
import { StyleLike } from "ol/style/Style";
import { BackgroundColor } from "ol/layer/Base";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTile from "ol/source/VectorTile";
import BaseEvent from "ol/events/Event";
import { ObjectEvent } from "ol/Object";
import RenderEvent from "ol/render/Event";

interface VectorTileLayerProps {
  className?: string;
  opacity?: number;
  visible?: boolean;
  extent?: Extent;
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  minZoom?: number;
  maxZoom?: number;
  renderOrder?: OrderFunction;
  renderBuffer?: number;
  source?: VectorTile;
  declutter?: boolean;
  style?: StyleLike | null;
  background?: BackgroundColor;
  updateWhileAnimating?: boolean;
  updateWhileInteracting?: boolean;
  properties?: {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [key: string]: any;
  }[];
  events?: VectorTileLayerEvents;
}

interface VectorTileLayerEvents {
  change?: (event: BaseEvent) => void; // - Generic change event. Triggered when the revision counter is increased.
  "change:extent"?: (event: ObjectEvent) => void;
  "change:maxResolution"?: (event: ObjectEvent) => void;
  "change:maxZoom"?: (event: ObjectEvent) => void;
  "change:minResolution"?: (event: ObjectEvent) => void;
  "change:minZoom"?: (event: ObjectEvent) => void;
  "change:opacity"?: (event: ObjectEvent) => void;
  "change:preload"?: (event: ObjectEvent) => void;
  "change:source"?: (event: ObjectEvent) => void;
  "change:useInterimTilesOnError"?: (event: ObjectEvent) => void;
  "change:visible"?: (event: ObjectEvent) => void;
  "change:zIndex"?: (event: ObjectEvent) => void;
  error?: (event: BaseEvent) => void; //  Generic error event. Triggered when an error occurs.
  postrender?: (event: RenderEvent) => void; // Triggered after a layer is rendered.
  prerender?: (event: RenderEvent) => void; // Triggered before a layer is rendered.
  propertychange?: (event: ObjectEvent) => void; // Triggered when a property is changed.
  sourceready?: (event: BaseEvent) => void;
}

export function VectorTileLayerComponent({
  className,
  opacity,
  visible,
  extent,
  zIndex,
  minResolution,
  maxResolution,
  minZoom,
  maxZoom,
  renderOrder,
  renderBuffer,
  source,
  declutter,
  style,
  background,
  updateWhileAnimating,
  updateWhileInteracting,
  properties,
  events,
}: VectorTileLayerProps) {
  const [layer] = useState(
    new VectorTileLayer({
      className,
      opacity,
      visible,
      extent,
      zIndex,
      minResolution,
      maxResolution,
      minZoom,
      maxZoom,
      renderOrder,
      renderBuffer,
      source,
      declutter,
      style,
      background,
      updateWhileAnimating,
      updateWhileInteracting,
      properties,
    })
  );
  const map = useContext(MapContext);
  const layerGroup = useContext(LayerGroupContext);

  useEffect(() => {
    if (layerGroup) {
      const layers = layerGroup.getLayers();
      if (!layers.getArray().includes(layer)) {
        layers.push(layer);
      }
    } else {
      if (map && !map.getAllLayers().includes(layer)) {
        map.addLayer(layer);
      }
    }
    if (events) {
      Object.entries(events).forEach(([event, handler]) =>
        layer.addEventListener(event, handler)
      );
    }
    return () => {
      if (events) {
        Object.entries(events).forEach(([event, handler]) =>
          layer.removeEventListener(event, handler)
        );
      }

      if (layerGroup) {
        layerGroup.getLayers().remove(layer);
      }

      if (map) {
        map.removeLayer(layer);
      }
    };
  }, [map, layer, events, layerGroup]);

  return null;
}
