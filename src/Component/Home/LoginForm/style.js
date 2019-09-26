import styled from '@emotion/styled';
import {
  Colors, fontWeight, fontFilson, fontSize
} from '../../../Theme';

const FormWrapper = styled.div`
  margin: auto 40px;
  width: 80%;
`;
const FormTitle = styled.h1`
  ${fontFilson};
  ${fontWeight('bold')};
  ${fontSize(32)};
`;
const HelpBlock = styled.div`
  margin-top: 10px;
  h6 {
    color: ${Colors.colors.pen};
  }
`;
const ClickableSpan = styled.h6`
  cursor: pointer;
  span {
    color: ${Colors.colors.secondary} !important;
    &:hover {
      ${fontWeight('900')}
    }
  }
`;

export {
  FormWrapper, FormTitle, HelpBlock, ClickableSpan
};
