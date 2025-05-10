import React, { useRef, useEffect, useState } from "react";
// isInsideForm checks if the element is inside a form
const isInsideForm = (el) => !!el.closest("form");

// isNearTrashIcon checks if the element is near a trash icon
const isNearTrashIcon = (el) => {
  // Look for a trash icon within 2 siblings before/after or parent
  let sibling = el.previousElementSibling;
  let count = 0;
  while (sibling && count < 2) {
    if (
      sibling.matches('[aria-label="delete"], .trash-icon, [data-icon="trash"]')
    )
      return true;
    sibling = sibling.previousElementSibling;
    count++;
  }
  sibling = el.nextElementSibling;
  count = 0;
  while (sibling && count < 2) {
    if (
      sibling.matches('[aria-label="delete"], .trash-icon, [data-icon="trash"]')
    )
      return true;
    sibling = sibling.nextElementSibling;
    count++;
  }
  // Or check parent
  if (
    el.parentElement &&
    el.parentElement.querySelector(
      '[aria-label="delete"], .trash-icon, [data-icon="trash"]'
    )
  )
    return true;
  return false;
};


// isAtBottomOfCard checks if the element is at the bottom of a card
const isAtBottomOfCard = (el) => {
  const card = el.closest(".card");
  if (!card) return false;
  const children = Array.from(card.children);
  return children[children.length - 1] === el;
};



// ChameleonButton component
function ChameleonButton(props) {
  const ref = useRef();
  const [mode, setMode] = useState("default");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isInsideForm(el)) setMode("submit");
    else if (isNearTrashIcon(el)) setMode("delete");
    else if (isAtBottomOfCard(el)) setMode("next");
    else setMode("default");
  }, []);

  let label, style;
  switch (mode) {
    case "submit":
      label = "Submit";
      style = { background: "#007bff", color: "#fff" };
      break;
    case "delete":
      label = "Delete";
      style = { background: "#dc3545", color: "#fff" };
      break;
    case "next":
      label = "Next";
      style = { background: "#28a745", color: "#fff" };
      break;
    default:
      label = "Button";
      style = {};
  }

  return (
    <button ref={ref} style={style} {...props}>
      {label}
    </button>
  );
}

export default ChameleonButton;

