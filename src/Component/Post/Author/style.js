import styled from '@emotion/styled';
import {
  flex, fontSize, fontWeight, fontFilson, Colors
} from '../../../Theme';

const { snow, light, tint } = Colors.colors;

const AuthorWrapper = styled.div`
  ${flex()};
`;
const AuthorInfo = styled.div`
  margin: auto 0;
  padding: 0 10px;
`;
const Name = styled.div`
  ${fontWeight('bold')};
  ${fontFilson()};
  text-transform: capitalize;
  span {
    color: ${light};
    ${fontSize(14)};
    text-transform: none;
  }
  span.emoji {
    font-family: 'Segoe UI Emoji';
    font-family: Lato;
  }
  span.userList {
    &:last-of-type {
      &:after {
        content: ' ';
      }
    }
    &:after {
      content: ', ';
    }
  }
`;
// const Post = styled.div`
//   ${fontSize(14)};
//   color: ${grey};
// `;
const TaggedList = styled.span`
  span {
    font-family: Lato;
    color: ${light};
    ${fontSize(14)};
    text-transform: none;
    &::after {
      content: ', ';
    }
  }
  span:first-of-type {
    &::before {
      content: ' with ';
    }
  }
  span:last-of-type {
    &::after {
      content: '';
    }
  }
`;

const EditOptionsContainer = styled.div`
  text-align: right;
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 1;
  background: transparent;
`;
const EditOptionsWrapper = styled.div`
  text-align: left;
  background: ${snow};
  margin: 12px;
  div {
    margin-right: 20px;
    svg {
      margin-right: 6px;
      color: #61bbf7;
    }
    cursor: pointer;
  }
  div:first-of-type {
    margin-right: 0px;
    background: transparent;
    text-align: right;
    cursor: pointer;
    svg {
      color: ${tint};
    }
  }
  padding: 4px 4px 4px 10px;
  border-radius: 12px;
  box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.25);
`;

const PostOptionButton = styled.div``;

export {
  AuthorWrapper,
  AuthorInfo,
  Name,
  TaggedList,
  EditOptionsContainer,
  EditOptionsWrapper,
  PostOptionButton
};
