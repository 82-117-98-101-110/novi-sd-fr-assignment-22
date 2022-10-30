import styled, { css } from "styled-components";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Settings } from "../../assets/icons/setting-4.svg";

function WebGLSettingsMenu({ children }) {
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
          <RoundButton
            id="mute"
            type="button"
            className="btn btn-primary btn-sm"
          >
            <Settings></Settings>
          </RoundButton>
        </div>
        <NavigationMenuContainer className={classNames({ "is-open": open })}>
          <NavigationList>{children}</NavigationList>
        </NavigationMenuContainer>
      </div>
    </>
  );
}

export default WebGLSettingsMenu;

const NavigationMenuContent = styled.div`
  opacity: 0;
  pointer-events: none;
  transform: translateY(32px);
  transition: opacity 200ms var(0.075, 0.82, 0.165, 1),
    transform 200ms var(0.075, 0.82, 0.165, 1);

  position: absolute;
  z-index: 2;
  min-width: 180px;
  //right: calc(10%);
  top: calc(-130%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 90px 5px;
  border-radius: 18px;
  background-color: white;

  .NavBarLink {
    display: flex;
    font-family: DMSans !important;
  }

  & a,
  & span {
    align-items: center;

    cursor: pointer;
    display: block;
    height: 56px;
    padding-left: 20px;
    padding-right: 20px;
    font-family: DMSans;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: black;
    text-decoration: none;
    &:last-of-type {
      border: 0;
    }
  }

  &.is-open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
`;

const NavigationMenuContainer = styled.div`
  opacity: 0;
  pointer-events: none;
  transform: translateY(32px);
  transition: opacity 200ms var(0.075, 0.82, 0.165, 1),
    transform 200ms var(0.075, 0.82, 0.165, 1);

  display: none;
  position: absolute;
  z-index: 2;
  min-width: 180px;
  //right: calc(10%);
  top: calc(-130%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 90px 5px;
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

const RoundButton = styled.button`
  ${({ theme }) => css`
    width: 56px;
    height: 56px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */
    margin: 10px;
    text-align: center;
    letter-spacing: -0.02em;

    pointer-events: all;

    font-family: ${theme.font.family};
    color: ${theme.colour.secondary.light};
    background: rgba(224, 229, 242, 0.72);
    border: 0px solid ${theme.colour.primaryDark};
    box-shadow: 0 16px 32px 0 rgb(0 0 0 / 24%);

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px;
    border-radius: 70px;
    left: calc(50% - 84px / 2);
    top: calc(50% - 34px / 2 - 27px);
    transition: 0.5s all;
    transform: scale(1);
    z-index: 1000;

    &:hover {
      background: rgba(244, 247, 254, 0.72);
      transform: scale(1.2);
      transition: 0.5s all;
      box-shadow: 0 16px 48px 0 rgb(0 0 0 / 24%);
    }

    &:focus {
    }

    &:disabled {
      background: rgba(224, 229, 242, 0.5);
    }
  `}
`;
