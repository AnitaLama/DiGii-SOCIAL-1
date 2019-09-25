import styled from '@emotion/styled';
import { flexCentering, Colors, fontSize } from '../../../Theme';

const {
  blue, primary, secondary, pencil
} = Colors.colors;
const TabsWrapper = styled.div`
  ${flexCentering('column')};
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 200px;
`;
const Tab = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 12px;
  padding: 10px 6px;
  border: 4px solid ${pencil};
  &.active {
    border: 4px solid ${blue};
  }
`;
const Box = styled.div`
  background-image: linear-gradient(to right, ${pencil}, ${pencil});
  height: 12px;
  border-radius: 6px;
  &.active {
    background-image: linear-gradient(to right, ${primary}, ${secondary});
  }
`;
const TabName = styled.div`
  text-align: center;
  ${fontSize(8)};
  &.active {
    color: ${blue};
  }
`;

export {
  TabsWrapper, Tab, Box, TabName
};
