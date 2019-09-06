import styled from '@emotion/styled';
import { Colors, listArrowTop, fontSize } from '../../../Theme';

const { pen, secondary, snow } = Colors.colors;

const SettingsSubList = styled.ul`
  ${listArrowTop()}
`;
const SettingsListElement = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    display: block;
    background: ${pen};
    color: ${snow};
  }
`;
const SettingsWrapper = styled.div`
  position: relative;
  svg {
    ${fontSize(25)};
    color: ${secondary};
    &:hover {
      cursor: pointer;
    }
  }
`;

export { SettingsSubList, SettingsListElement, SettingsWrapper };
