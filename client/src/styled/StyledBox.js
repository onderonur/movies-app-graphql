// OK
import styled, { css } from "styled-components";
import media from "styled/media";

const StyledBox = styled.div`
  ${({ styled }) => {
    return styled
      ? css`
          position: ${styled.position};
          display: ${styled.display};
          height: ${styled.height};
          width: ${styled.width};
          max-width: ${styled.maxWidth};
          max-height: ${styled.maxHeight};
          padding: ${styled.padding};
          padding-top: ${styled.paddingTop};
          padding-right: ${styled.paddingRight};
          padding-bottom: ${styled.paddingBottom};
          padding-left: ${styled.paddingLeft};
          margin: ${styled.margin};
          margin-top: ${styled.marginTop};
          margin-right: ${styled.marginRight};
          margin-bottom: ${styled.marginBottom};
          margin-left: ${styled.marginLeft};
          text-align: ${styled.textAlign};
          flex-grow: ${styled.flexGrow};
          flex: ${styled.flex};
          align-items: ${styled.alignItems};
          justify-content: ${styled.justifyContent};
          top: ${styled.top};
          right: ${styled.right};
          bottom: ${styled.bottom};
          left: ${styled.left};

          ${styled.sm
            ? media.sm`
                display: ${styled.sm.display};
              `
            : ""};
        `
      : "";
  }}
`;

export default StyledBox;
