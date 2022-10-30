import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as Contacts } from "../../assets/icons/contacts.svg";
import { ReactComponent as Content } from "../../assets/icons/content.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Settings } from "../../assets/icons/settings.svg";
import { ReactComponent as Spaces } from "../../assets/icons/spaces.svg";
import { useState } from "react";
import NavigationSettingsMenu from "./NavigationSettingsMenu";

function NavigationBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavigationMenuWrapper>
        <Bar>
          <NavUnlisted>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/spaces"
            >
              <li>
                <ItemWrapper>
                  <div>
                    <Spaces></Spaces>
                  </div>
                  <div>{"Spaces"}</div>
                  <div className="underline"></div>
                </ItemWrapper>
              </li>
            </NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/contacts"
            >
              <li>
                {" "}
                <ItemWrapper>
                  <div>
                    <Contacts></Contacts>
                  </div>
                  <div>{"Contacts"}</div>
                  <div className="underline"></div>
                </ItemWrapper>
              </li>
            </NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/content"
            >
              <li>
                {" "}
                <ItemWrapper>
                  <div>
                    <Content></Content>
                  </div>
                  <div>{"Content"}</div>
                  <div className="underline"></div>
                </ItemWrapper>
              </li>
            </NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/profile"
            >
              <li>
                {" "}
                <ItemWrapper>
                  <div>
                    <Profile></Profile>
                  </div>
                  <div>{"Profile"}</div>
                  <div className="underline"></div>
                </ItemWrapper>
              </li>
            </NavLink>
            <div onClick={() => setOpen(!open)}>
              <li>
                <ItemWrapper>
                  <div>
                    <NavigationSettingsMenu>
                      <Settings></Settings>
                      <div>{"Settings"}</div>
                      <div className="underline"></div>
                    </NavigationSettingsMenu>
                  </div>
                </ItemWrapper>
              </li>
            </div>
          </NavUnlisted>
        </Bar>
      </NavigationMenuWrapper>
    </>
  );
}

export default NavigationBar;

const NavigationMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  bottom: 20px;
  width: 100%;
  position: fixed;
`;

const ItemWrapper = styled.div`
  margin: 20px;
  @media only screen and (max-width: 500px) {
    margin: 10px;
  }
`;

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  background: rgba(255, 255, 255, 0.95);
  /* Shadows/Sharp Shadow/Sharp Shadow - Style 9 */
  //min-width: 647px;
  height: 100px;
  box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.25);
  border-radius: 103.5px;
`;

const NavUnlisted = styled.ul`
  ${({ theme }) => css`
    display: flex;
    padding-inline-start: 0px;
    justify-content: center;
    align-items: center;

    margin-left: 20px;
    margin-right: 20px;
    flex-direction: row;

    @media only screen and (max-width: 800px) {
      margin-left: 10px;
      margin-right: 10px;
    }

    a {
      text-decoration: none;
    }

    li {
      position: relative;
      list-style: none;
      color: var(--color-secondary-primary-darkGrey-500);
      font-family: ${theme.font.family};
      font-size: var(--font-size-20);
      font-weight: ${theme.font.weight.medium500};
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.38px;
      cursor: pointer;
      transition: color 0.5s;
      @media only screen and (max-width: 800px) {
        font-size: var(--font-size-10);
      }
    }

    li:hover {
      color: var(--color-secondary-primary-black);

      .underline {
        background-color: var(--color-primary-purpleBlue-500);
        width: 100%;
      }
    }
  }

  .underline {
    height: 3px;
    background-color: transparent;
    width: 0%;
    transition: width 0.2s, background-color 0.5s;
    margin: 0 auto;
  }

  .active {
    li {
      color: var(--color-secondary-primary-black);
    }

    .underline {
      width: 100%;
      background-color: var(--color-secondary-primary-black);
    }
  `}
`;
