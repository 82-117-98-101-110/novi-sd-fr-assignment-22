import classNames from "classnames";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import OptionsButton from "../../components/button/OptionsButton";

function DropDownContacts({ children }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    function handler(event) {
      if (!modalRef.current?.contains(event.target)) {
        closeMenu();
      }
    }

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  function handleMenuState() {
    if (open) {
      closeMenu();
    } else {
      setOpen(true);
    }
  }

  return (
    <>
      <div id="modal" ref={modalRef}>
        <div onClick={() => handleMenuState()}>
          {" "}
          <OptionsButton />
        </div>
        <NavigationMenuContainer className={classNames({ "is-open": open })}>
          <NavigationList>{children}</NavigationList>
        </NavigationMenuContainer>
      </div>
    </>
  );
}

export default DropDownContacts;

const NavigationList = styled.div`
  text-align: start;
  padding: 1rem;
`;

const NavigationMenuContainer = styled.div`
  display: none;
  position: absolute;
  z-index: 2;
  max-height: 75vh;
  overflow-y: auto;
  transition: 0.3s;
  opacity: 1;
  right: calc(15%);
  top: 100%;
  min-width: 180px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 90px 5px;
  border-radius: 18px;
  background-color: white;

  &.is-open {
    display: block;
    opacity: 1;
    pointer-events: all;
    transition: 0.3s;
  }
`;
