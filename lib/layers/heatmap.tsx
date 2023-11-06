import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import { LayerGroupContext } from "../context/LayerGroupContext";
import HeatMapLayer from "ol/layer/Heatmap";
import { Extent } from "ol/extent";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import Point from "ol/geom/Point";
import BaseEvent from "ol/events/Event";
import { ObjectEvent } from "ol/Object";
import RenderEvent from "ol/render/Event";

interface HeatMapLayerProps {
  className?: string;
  opacity?: number;
  visible?: boolean;
  extent?: Extent;
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  minZoom?: number;
  maxZoom?: number;
  gradient?: string[];
  radius?: number;
  blur?: number;
  weight?: string | ((arg0: Feature<Geometry>) => number) | undefined;
  source?: VectorSource<Point>;
  properties?: {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [key: string]: any;
  }[];
  events?: HeatMapLayerEvents;
}

interface HeatMapLayerEvents {
  change?: (event: BaseEvent) => void; // - Generic change event. Triggered when the revision counter is increased.
  "change:blur"?: (event: ObjectEvent) => void;
  "change:extent"?: (event: ObjectEvent) => void;
  "change:gradient"?: (event: ObjectEvent) => void;
  "change:maxResolution"?: (event: ObjectEvent) => void;
  "change:maxZoom"?: (event: ObjectEvent) => void;
  "change:minResolution"?: (event: ObjectEvent) => void;
  "change:minZoom"?: (event: ObjectEvent) => void;
  "change:opacity"?: (event: ObjectEvent) => void;
  "change:radius"?: (event: ObjectEvent) => void;
  "change:source"?: (event: ObjectEvent) => void;
  "change:visible"?: (event: ObjectEvent) => void;
  "change:zIndex"?: (event: ObjectEvent) => void;
  error?: (event: BaseEvent) => void; //  Generic error event. Triggered when an error occurs.
  postcompose?: (event: RenderEvent) => void; // Triggered after layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
  postrender?: (event: RenderEvent) => void; // Triggered after a layer is rendered.
  precompose?: (event: RenderEvent) => void; // Triggered before layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
  prerender?: (event: RenderEvent) => void; // Triggered before a layer is rendered.
  propertychange?: (event: ObjectEvent) => void; // Triggered when a property is changed.
  rendercomplete?: (event: RenderEvent) => void; // Triggered when rendering is complete, i.e. all sources and tiles have finished loading for the current viewport, and all tiles are faded in. The event object will not have a context set.
  sourceready?: (event: BaseEvent) => void;
}

export function HeatMapLayerComponent({
  className,
  opacity,
  visible,
  extent,
  zIndex,
  minResolution,
  maxResolution,
  minZoom,
  maxZoom,
  gradient,
  radius,
  blur,
  weight,
  source,
  properties,
  events,
}: HeatMapLayerProps) {
  const [layer] = useState(
    new HeatMapLayer({
      className,
      opacity,
      visible,
      extent,
      zIndex,
      minResolution,
      maxResolution,
      minZoom,
      maxZoom,
      gradient,
      radius,
      blur,
      weight,
      source,
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
      for (const [event, handler] of Object.entries(events)) {
        layer.addEventListener(event, handler);
      }
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
