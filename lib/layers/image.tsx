import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import ImageLayer from "ol/layer/Image";
import { Extent } from "ol/extent";
import ImageSource from "ol/source/Image";
import BaseEvent from "ol/events/Event";
import { ObjectEvent } from "ol/Object";
import RenderEvent from "ol/render/Event";

interface ImageLayerProps {
  className?: string;
  opacity?: number;
  visible?: boolean;
  extent?: Extent;
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  minZoom?: number;
  maxZoom?: number;
  source?: ImageSource;
  properties?: {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [key: string]: any;
  }[];
  events?: ImageLayerEvents;
}

interface ImageLayerEvents {
  change?: (event: BaseEvent) => void; // - Generic change event. Triggered when the revision counter is increased.
  "change:extent"?: (event: ObjectEvent) => void;
  "change:maxResolution"?: (event: ObjectEvent) => void;
  "change:maxZoom"?: (event: ObjectEvent) => void;
  "change:minResolution"?: (event: ObjectEvent) => void;
  "change:minZoom"?: (event: ObjectEvent) => void;
  "change:opacity"?: (event: ObjectEvent) => void;
  "change:source"?: (event: ObjectEvent) => void;
  "change:visible"?: (event: ObjectEvent) => void;
  "change:zIndex"?: (event: ObjectEvent) => void;
  error?: (event: BaseEvent) => void; //  Generic error event. Triggered when an error occurs.
  postrender?: (event: RenderEvent) => void; // Triggered after a layer is rendered.
  prerender?: (event: RenderEvent) => void; // Triggered before a layer is rendered.
  propertychange?: (event: ObjectEvent) => void; // Triggered when a property is changed.
  sourceready?: (event: BaseEvent) => void;
}

export function ImageLayerComponent({
  className,
  opacity,
  visible,
  extent,
  zIndex,
  minResolution,
  maxResolution,
  minZoom,
  maxZoom,
  source,
  properties,
  events,
}: ImageLayerProps) {
  const [layer] = useState(
    new ImageLayer({
      className,
      opacity,
      visible,
      extent,
      zIndex,
      minResolution,
      maxResolution,
      minZoom,
      maxZoom,
      source,
      properties,
    })
  );
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (map && !map.getAllLayers().includes(layer)) {
      map.addLayer(layer);
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
      map?.removeLayer(layer);
    };
  }, [map, layer, events]);

  return null;
}
