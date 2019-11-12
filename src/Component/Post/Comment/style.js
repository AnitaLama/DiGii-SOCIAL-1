import styled from '@emotion/styled';
import {
 flex, fontSize, fontWeight, Colors, fontFilson 
} from '../../../Theme';

export const { grey, pink } = Colors.colors;
export const CommentWrapper = styled.div`
  ${flex};
  padding: 8px 0;
  width: 100%;
  word-break: break-word;
`;

export const CommentDiv = styled.div`
  ${flex('column')};
  position: relative;
  width: 100%;
  ${fontSize(10)};
  span:first-of-type {
    ${fontWeight('bold')};
  }
  // span:not(:first-of-type) {
  //   ${fontSize(12)};
  // }

  span.date {
    ${fontSize(10)};
  }
  span:last-of-type {
    color: ${grey};
  }
  span.name {
    text-transform: capitalize;
    ${fontFilson()}
  }
  img {
    height: 50px;
  }
  span.emoji {
    font-family: Segoe UI Emoji;
  }
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 2px 2px 4px #00000012;
  border-radius: 13px;
  padding: 10px;
`;
export const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  bottom: 0;
  transform: translate(0, -50%);
  color: ${pink};
  cursor: pointer;
  svg {
    ${fontSize(9)};
  }
`;

export const CommentContent = styled.span`
  color: #777777;
`;

export const CommentReactionWrapper = styled.span`
  display: flex;
  flex
`;

export const CommentReactionContainer = styled.div`
  width: 100px;
  div.likeButton {
    justify-content: flex-start;
  }
`;
