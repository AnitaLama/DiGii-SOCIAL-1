import styled from '@emotion/styled';
import { Colors } from '../../../Theme';

export const {
  snow, primary, secondary, pencil
} = Colors.colors;

export const ClickableButton = styled.div``;
export const UserList = styled.ul`
  list-style-type: none;
  background: white;
  min-width: 150px;
  padding: 0;
  margin: 0;
  height: ${props => (props.height ? `${props.height}px` : '130px')};

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.25em;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px ${pencil};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${secondary};
    outline: 1px solid ${secondary};
  }
`;
export const UserListElement = styled.li`
  padding: 4px 10px;
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, ${primary}, ${secondary});
    color: red;
  }
`;
export const CommentBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 20px auto;
  grid-gap: 6px;
  //
  // width: 100%;
  // position: relative;
  // button:not(.findButton) {
  //   background: none;
  //   border: 0;
  //   outline: 0;
  //   width: auto;
  // }
  // .findButton {
  //   height: 45px;
  // }
  // input {
  //   padding: 10px;
  // }
  // .buttonDiv {
  //   // position: absolute;
  //   display: flex;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   vertical-align: ;
  //   color: grey;
  //   button {
  //     height: 10px;
  //     svg {
  //       height: 14px;
  //     }
  //   }
  // }
`;

export const CommentBoxContainer = styled.div`
  border-radius: 13px;
  height: 25px;
  box-shadow: 2px 2px 4px #00000040;
  display: grid;
  grid-template-columns: auto auto;
  padding: 0 10px;
`;
export const CommentBoxReactionWrapper = styled.div`
  color: #61bbf7;
  svg {
    &:not(:last-of-type) {
      padding-right: 4px;
    }
    height: 10px;
    width: 10px;
  }
  overflow: hidden;
`;
export const GifContainer = styled.div`
  max-height: 250px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  z-index: 1;
  div {
    display: flex;
  }
  input {
    margin-bottom: 0;
  }
`;
export const FeelingsDiv = styled.div`
  display: grid !important;
  grid-template-columns: repeat(3, auto);
  background: rgba(52, 52, 52, 0.7);
  border: 1px solid black;
  border-radius: 20px;
  color: ${snow};
  span {
    margin: auto;
    cursor: pointer;
  }
`;
export const FeelingsButton = styled.span``;
