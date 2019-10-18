import styled from '@emotion/styled';
import { Colors } from '../../../Theme';

const {
  snow, primary, secondary, pencil
} = Colors.colors;

const ClickableButton = styled.div``;
const UserList = styled.ul`
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
const UserListElement = styled.li`
  padding: 4px 10px;
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, ${primary}, ${secondary});
    color: red;
  }
`;
const CommentBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 20px auto;

  width: 100%;
  position: relative;
  button:not(.findButton) {
    background: none;
    border: 0;
    outline: 0;
    width: auto;
  }
  .findButton {
    height: 45px;
  }
  input {
    padding: 10px;
  }
  .buttonDiv {
    // position: absolute;
    display: flex;
    right: 0;
    top: 0;
    bottom: 0;
    vertical-align: ;
    color: grey;
    button {
      height: 10px;
      svg {
        height: 14px;
      }
    }
  }
`;
const GifContainer = styled.div`
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
const FeelingsDiv = styled.div`
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
const FeelingsButton = styled.span``;

export {
  ClickableButton,
  UserList,
  UserListElement,
  CommentBoxWrapper,
  GifContainer,
  FeelingsDiv,
  FeelingsButton
};
