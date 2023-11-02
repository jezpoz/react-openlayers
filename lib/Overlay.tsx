import { ObjectEvent } from "ol/Object";
import Overlay, { PanIntoViewOptions, Positioning } from "ol/Overlay";
import { Coordinate } from "ol/coordinate";
import BaseEvent from "ol/events/Event";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { MapContext } from "./context/MapContext";

interface OverlayProps extends PropsWithChildren {
  id?: number | string;
  element?: HTMLElement;
  offset?: number[];
  position?: Coordinate;
  positioning?: Positioning;
  stopEvent?: boolean;
  insertFirst?: boolean;
  autoPan?: PanIntoViewOptions | boolean;
  className?: string;
  events?: OverlayEvents;
}

interface OverlayEvents {
  change: (event: BaseEvent) => void;
  "change:element": (event: ObjectEvent) => void;
  "change:map": (event: ObjectEvent) => void;
  "change:offset": (event: ObjectEvent) => void;
  "change:position": (event: ObjectEvent) => void;
  "change:positioning": (event: ObjectEvent) => void;
  error: (event: BaseEvent) => void;
  propertychange: (event: ObjectEvent) => void;
}

export function OverlayComponent({
  id,
  element,
  offset,
  position,
  positioning,
  stopEvent,
  insertFirst,
  autoPan,
  className,
  events,
  children,
}: OverlayProps) {
  const { map } = useContext(MapContext);
  const [overlay] = useState(
    new Overlay({
      id,
      element,
      offset,
      position,
      positioning,
      stopEvent,
      insertFirst,
      autoPan,
      className,
    })
  );

  useEffect(() => {
    if (map) {
      map.addOverlay(overlay);
    }

    if (events) {
      Object.entries(events).forEach(([event, handler]) => {
        overlay.addChangeListener(event, handler);
      });
    }

    return () => {
      if (events) {
        Object.entries(events).forEach(([event, handler]) => {
          overlay.removeChangeListener(event, handler);
        });
      }
      map?.removeOverlay(overlay);
    };
  }, [map, overlay, events]);

  return <div>{children}</div>;
}
