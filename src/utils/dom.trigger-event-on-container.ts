import type React from "react";
import type { RefObject } from "react";

/**
 * card-like DOM structures would normally have either an anchor or a button as
 * clicks anywhere on the root element should trigger the cards action.
 * However, this is NOT semantically valid HTML.
 *
 * Instead the anchor or button should reside within the card, only including a
 * label that specifies the action of the card.
 *
 * However, we still want to be able to click the entire card to perform the
 * action. This helper assists with this ensuring that the relevant trigger is
 * triggered when clicking the supplied ref.
 */
export function triggerEventOnContainerClick(
  evt: React.MouseEvent,
  triggerRef: RefObject<HTMLElement>,
) {
  // propagate click events to the primary anchor tag, so that the user
  // is allowed to click anywhere on the card to open a result by default
  const newEvt = new MouseEvent(evt.nativeEvent.type, evt.nativeEvent);
  newEvt.preventDefault();

  triggerRef.current?.dispatchEvent(newEvt);
}
