import styled from '@emotion/styled';
import {
  flex, fontSize, fontWeight, Colors
} from '../../../Theme';

const { grey, pink } = Colors.colors;
const CommentWrapper = styled.div`
  ${flex};
  padding: 8px 0;
  width: 100%;
  word-break: break-word;
`;

const CommentDiv = styled.div`
  ${flex('column')};
  position: relative;
  width: 100%;
  span:first-of-type {
    ${fontWeight('bold')};
  }
  span:not(:first-of-type) {
    ${fontSize(12)};
  }
  span.date {
    ${fontSize(10)};
  }
  span:last-of-type {
    color: ${grey};
  }
  span.name {
    text-transform: capitalize;
  }
  img {
    height: 50px;
  }
  span.emoji {
    font-family: Segoe UI Emoji;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 0;
  color: ${pink};
  cursor: pointer;
  svg {
    ${fontSize(9)};
  }
`;

export { CommentWrapper, CommentDiv, Close };
