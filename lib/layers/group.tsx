import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { Group } from "ol/Layer";
import { Extent } from "ol/extent";
import BaseLayer from "ol/layer/Base";
import { Collection } from "ol";
import { ListenerFunction } from "ol/events";

import { LayerGroupContext } from "../context/LayerGroupContext";
import { MapContext } from "../context/MapContext";

type LayerGroupProps = {
  opacity?: number;
  visible?: boolean;
  extent?: Extent;
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  minZoom?: number;
  maxZoom?: number;
  layers?: BaseLayer[] | Collection<BaseLayer>;
  events?: LayerGroupEvents;
};

type LayerGroupEvents = {
  change?: ListenerFunction; //  Generic change event. Triggered when the revision counter is increased.
  "change:extent"?: ListenerFunction;
  "change:layers"?: ListenerFunction;
  "change:maxResolution"?: ListenerFunction;
  "change:maxZoom"?: ListenerFunction;
  "change:minResolution"?: ListenerFunction;
  "change:minZoom"?: ListenerFunction;
  "change:opacity"?: ListenerFunction;
  "change:visible"?: ListenerFunction;
  "change:zIndex"?: ListenerFunction;
  error?: ListenerFunction; // Generic error event. Triggered when an error occurs.
  propertychange?: ListenerFunction; //  Triggered when a property is changed.
};

export function GroupLayer({
  opacity,
  visible,
  extent,
  zIndex,
  minResolution,
  maxResolution,
  minZoom,
  maxZoom,
  layers,
  events,
  children,
}: PropsWithChildren<LayerGroupProps>) {
  const map = useContext(MapContext);
  const [layerGroup] = useState<Group>(
    new Group({
      opacity,
      visible,
      extent,
      zIndex,
      minResolution,
      maxResolution,
      minZoom,
      maxZoom,
      layers,
    })
  );

  useEffect(() => {
    if (map) {
      map.setLayerGroup(layerGroup);
    }

    if (events) {
      for (const [event, handler] of Object.entries(events)) {
        layerGroup.addEventListener(event, handler);
      }
    }
  }, [map, layerGroup, events]);

  return (
    <LayerGroupContext.Provider value={layerGroup}>
      {children}
    </LayerGroupContext.Provider>
  );
}
