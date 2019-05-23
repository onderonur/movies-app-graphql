// OK
import styled, { css } from "styled-components";
import ImageContainer from "components/ImageContainer";

const StyledImageContainer = styled(ImageContainer)`
  background-color: #333;
  background-color: ${props => props.theme.palette.background.paper};
  margin: auto;
  ${({ styled }) => {
    return styled
      ? css`
          width: ${styled.width};
          height: ${styled.height};
          padding: ${styled.padding};
        `
      : "";
  }}
  img {
    object-fit: contain;
    min-width: 100%;
    min-height: 100%;
  }
`;

export default StyledImageContainer;
