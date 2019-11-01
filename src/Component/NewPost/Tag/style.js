import styled from '@emotion/styled';

import { Colors, boxShadow } from '../../../Theme';

const {
  primary, blue, grey, snow, secondary, pencil
} = Colors.colors;

const ChipContainer = styled.div`
  position: relative;
  input{
    z-index: 1000,
    background: transparent;
    outline:0

  }
`;
const ChipsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  color: ${blue};
`;
const PostWrapperContainer = styled.div`
  // position: relative;
`;
const UserListWrapper = styled.div`
  position: relative;
  margin-left: -53px;
  span {
    color: ${blue};
    &::after {
      content: ',';
    }
  }
  span:last-of-type {
    &::after {
      content: '';
    }
  }
`;

const UserList = styled.span`
  display: block;
  margin: 5px 12px;
  padding: 0;
`;
// const UserList = styled.ul`
//   border: 1px solid ${grey};
//   ${boxShadow()};
//   background: ${snow};
//   position: absolute;
//   overflow-y: scroll;
//   height: ${props => (props.height ? `${props.height}px` : '130px')};
//   list-style-type: none;
//   padding: 0;
//   margin: 0;
//   z-index: 2;
//   left: 0;
//   min-width: 150px;
//   li {
//     padding: 4px 10px;
//     &:hover {
//       cursor: pointer;
//       background-image: linear-gradient(to right, ${primary}, ${secondary});
//       color: ${snow};
//     }
//   }
//   overflow-y: auto;
//   overflow-x: hidden;
//
//   &::-webkit-scrollbar {
//     width: 0.25em;
//   }
//   &::-webkit-scrollbar-track {
//     -webkit-box-shadow: inset 0 0 6px ${pencil};
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: ${secondary};
//     outline: 1px solid ${secondary};
//   }
// `;

export {
  ChipContainer,
  ChipsWrapper,
  PostWrapperContainer,
  UserListWrapper,
  UserList
};
