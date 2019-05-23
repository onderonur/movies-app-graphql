// OK
import React, { useState, useEffect } from "react";
import { Divider, Drawer, Toolbar } from "@material-ui/core";
import styled, { css } from "styled-components";
import { breakpoints } from "styled/media";
import DetectMobile from "components/DetectMobile";
import DrawerToggler from "./DrawerToggler";
import DrawerContent from "./DrawerContent";
import { withRouter } from "react-router-dom";
import { withDetectMobile } from "hoc/withDetectMobile";

export const drawerWidth = 240;

export const drawerSlideTransition = css`
  transition: all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;

const StyledNav = styled.nav`
  ${drawerSlideTransition};
  @media (min-width: ${breakpoints.md}px) {
    width: ${props => (props.drawerOpen ? drawerWidth : 0)}px;
  }
`;

const StyledDrawer = styled(Drawer)`
  .drawerPaper {
    width: ${drawerWidth}px;
    background-color: ${props => props.theme.palette.background.paper};
  }
`;

const AppDrawer = ({ children, isMobile, location }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <StyledNav drawerOpen={open}>
      <DetectMobile>
        {({ isMobile }) => (
          <StyledDrawer
            variant={isMobile ? "temporary" : "persistent"}
            anchor="left"
            open={open}
            onClose={isMobile ? toggleDrawer : undefined}
            classes={{
              paper: "drawerPaper"
            }}
          >
            <Toolbar>
              <DrawerToggler toggleDrawer={toggleDrawer} />
            </Toolbar>
            <Divider />
            <DrawerContent />
          </StyledDrawer>
        )}
      </DetectMobile>
      {children({ toggleDrawer })}
    </StyledNav>
  );
};

export default withRouter(withDetectMobile(AppDrawer));
