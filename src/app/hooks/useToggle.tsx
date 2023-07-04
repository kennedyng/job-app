"use client";

import React, { useState } from "react";

type InitialToggleState = boolean | true | false;
interface ActionsType {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useToggle = (initialToggleState: InitialToggleState = false) => {
  const [open, setOpen] = useState<boolean>(initialToggleState);

  const actions: ActionsType = {
    open: () => {
      setOpen(true);
    },

    close: () => {
      setOpen(false);
    },

    toggle: () => {
      setOpen(!open);
    },
  };
  return {
    isToggled: open,
    actions,
  } as const;
};

export default useToggle;
