import styled from '@emotion/styled';
import { flexCentering, Colors, fontSize } from '../../../Theme';

const { pen } = Colors.colors;

const HeaderMainContainer = styled.div`
  position: sticky;
  top: 0;
  // border-bottom 1px solid rgba(0,0,0,0.15);
  z-index: 10;
  background: white;
  // box-shadow:0px 2px 10px 0px rgba(0,0,0,0.15)
`;

const HeaderWrapper = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
`;

const UserInfoWrapper = styled.div`
  ${flexCentering};
  justify-content: flex-end;
  padding: 0 10px;
  border-radius: 6px;
`;

const Name = styled.span`
  color: ${pen};
  margin-left: 20px;
  ${fontSize(22)};
  text-transform: capitalize;
`;

const DiGiiIcon = styled.img`
  height: 20.91px;
  margin-left: 6px;
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
`;

export {
  HeaderMainContainer,
  HeaderWrapper,
  UserInfoWrapper,
  Name,
  DiGiiIcon,
  AvatarWrapper
};
