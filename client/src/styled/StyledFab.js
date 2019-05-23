// OK
import Fab from "@material-ui/core/Fab";
import styled, { css } from "styled-components";

const StyledFab = styled(Fab)`
  && {
    ${props =>
      props.styled
        ? css`
            position: ${props.styled.position};
            top: ${props => props.styled.top};
            right: ${props => props.styled.right};
            bottom: ${props => props.styled.bottom};
            left: ${props => props.styled.left};
            z-index: ${props => props.styled.zIndex};
            float: ${props => props.styled.float};
          `
        : ""}
  }
`;

export default StyledFab;
