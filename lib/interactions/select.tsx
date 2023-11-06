import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import Select, { FilterFunction, SelectEvent } from "ol/interaction/Select";
import { Condition } from "ol/events/condition";
import Layer from "ol/layer/Layer";
import { StyleLike } from "ol/style/Style";
import Collection from "ol/Collection";
import Feature from "ol/Feature";
import BaseEvent from "ol/events/Event";
import { ObjectEvent } from "ol/Object";

interface SelectProps {
  addCondition?: Condition;
  condition?: Condition;
  layers?: Layer[];
  style?: StyleLike;
  removeCondition?: Condition;
  toggleCondition?: Condition;
  multi?: boolean;
  features?: Collection<Feature>;
  filter?: FilterFunction;
  hitTolerance?: number;
  events?: SelectEvents;
}

interface SelectEvents {
  change?: (event: BaseEvent) => void;
  "change:active"?: (event: ObjectEvent) => void;
  error?: (event: BaseEvent) => void;
  propertyChange?: (event: ObjectEvent) => void;
  select?: (event: SelectEvent) => void;
}

export function SelectComponent({
  addCondition,
  condition,
  layers,
  style,
  removeCondition,
  toggleCondition,
  multi,
  features,
  filter,
  hitTolerance,
  events,
}: SelectProps) {
  const [select] = useState<Select>(
    new Select({
      addCondition,
      condition,
      layers,
      style,
      removeCondition,
      toggleCondition,
      multi,
      features,
      filter,
      hitTolerance,
    })
  );
  const map = useContext(MapContext);

  useEffect(() => {
    if (map && !map.getInteractions().getArray().includes(select)) {
      map.addInteraction(select);
    }

    if (events) {
      for (const [event, handler] of Object.entries(events)) {
        if (!select.getListeners(event)) {
          select.addEventListener(event, handler);
        }
      }
    }

    return () => {
      map?.removeInteraction(select);
    };
  }, [map, select, events]);
  return null;
}
