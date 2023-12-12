import { useContext, useEffect, useState } from "react";
import Interaction from "ol/interaction/KeyboardPan";
import { Condition } from "ol/events/condition";
import { Listener } from "ol/events";
import { MapContext } from "../context/MapContext";

type KeyboardPanProps = {
  condition?: Condition;
  duration?: number;
  pixelDelta?: number;
  events?: KeyboardPanEvents;
};

type KeyboardPanEvents = {
  change: Listener;
  "change:active": Listener;
  error: Listener;
  propertychange: Listener;
};

export function KeyboardPan({
  condition,
  duration,
  pixelDelta,
  events,
}: KeyboardPanProps) {
  const map = useContext(MapContext);
  const [interaction] = useState<Interaction>(
    new Interaction({ condition, duration, pixelDelta })
  );

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
      if (events) {
        for (const [event, handler] of Object.entries(events)) {
          interaction.removeEventListener(event, handler);
        }
      }
      map?.removeInteraction(interaction);
    };
  }, [map, interaction, events]);

  return null;
}
