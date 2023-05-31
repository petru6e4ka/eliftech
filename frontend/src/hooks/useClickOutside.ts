import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

type Handler = (event: AnyEvent) => void;

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
): void => {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const element = ref?.current;

      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler]);
};
