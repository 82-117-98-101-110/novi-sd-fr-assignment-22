import styled from "styled-components";
import classNames from "classnames";
import LogOut from "../../feature/account/ModalLogOut";
import PairDevice from "../../feature/auth/ModalPairDevice";
import React, { useEffect, useRef, useState } from "react";
import ButtonSmallText from "../button/ButtonSmallText";

function NavigationSettingsMenu({ children }) {
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
        <div onClick={() => handleMenuState()}> {children}</div>
        <NavigationMenuContainer className={classNames({ "is-open": open })}>
          <NavigationList>
            <NavigationItem>
              <PairDevice />
            </NavigationItem>
            <NavigationItem>
              <LogOut />
            </NavigationItem>
          </NavigationList>
        </NavigationMenuContainer>
      </div>
    </>
  );
}

export default NavigationSettingsMenu;

const NavigationMenuContainer = styled.div`
  display: none;
  position: absolute;
  z-index: 2;
  max-height: 75vh;
  overflow-y: auto;
  transition: 0.3s;
  opacity: 1;
  right: calc(15%);
  top: calc(-130%);
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

const NavigationList = styled.div`
  text-align: start;
  padding: 1rem;
`;

const NavigationItem = styled.ul`
  padding: 0.3rem;
  transition: 0.3s all;
  transform: scale(0.95);

  &:hover {
    transform: scale(1);
    transition: 0.3s all;
  }
`;
