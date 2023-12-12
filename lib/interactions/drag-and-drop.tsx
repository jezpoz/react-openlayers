import { useEffect, useContext, useState } from "react";
import Interaction from "ol/interaction/DragAndDrop";
import { Listener } from "ol/events";
import FeatureFormat from "ol/format/Feature";
import VectorSource from "ol/source/Vector";
import { ProjectionLike } from "ol/proj";

import { MapContext } from "../context/MapContext";

type DoubleClickZoomProps = {
  formatConstructors?: FeatureFormat[];
  source?: VectorSource;
  projection?: ProjectionLike;
  target?: HTMLElement;
  events?: DoubleClickZoomEvents;
};

type DoubleClickZoomEvents = {
  addFeatures?: Listener;
  change?: Listener;
  "change:active"?: Listener;
  error?: Listener;
  propertychange?: Listener;
};

export function DragAndDrop({
  formatConstructors,
  source,
  projection,
  target,
  events,
}: DoubleClickZoomProps) {
  const [interaction] = useState<Interaction>(
    new Interaction({ formatConstructors, source, projection, target })
  );

  const map = useContext(MapContext);

  useEffect(() => {
    if (map && !map.getInteractions().getArray().includes(interaction)) {
      map.addInteraction(interaction);
    }

    if (events) {
      for (const [event, handler] of Object.entries(events)) {
        interaction.addEventListener(event, handler);
      }
    }

    return () => {
      map?.removeInteraction(interaction);
    };
  }, [map, interaction, events]);

  return null;
}
