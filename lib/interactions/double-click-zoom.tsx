import { useEffect, useContext, useState } from "react";
import Interaction from "ol/interaction/DoubleClickZoom";
import { Listener } from "ol/events";

import { MapContext } from "../context/MapContext";

type DoubleClickZoomProps = {
  duration?: number;
  delta?: number;
  events?: DoubleClickZoomEvents;
};

type DoubleClickZoomEvents = {
  change?: Listener;
  "change:active"?: Listener;
  error?: Listener;
  propertychange?: Listener;
};

export function DoubleClickZoom({
  duration,
  delta,
  events,
}: DoubleClickZoomProps) {
  const [interaction] = useState<Interaction>(
    new Interaction({ duration, delta })
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
