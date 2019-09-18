import styled from '@emotion/styled';
import {
  Colors,
  fontSize,
  grid,
  boxShadow,
  Images,
  fontFilson,
  flexCentering
} from '../../../Theme';

const { snow, pencil, secondary } = Colors.colors;

const ReactionContainer = styled.div`
  display: flex;
  position: absolute;
  left: -8px;
  bottom: 18px;
  background: white;
  border: 1px solid black;
  border-radius: 20px;
  padding: 0 2px;
  div {
    padding: 2px;
  }
`;

const ReactionNumberStyle = styled.div`
  font-size: 13px;
  font-family: sans-serif;
  font-weight: bold;
`;
const DisplayReactionWrapper = styled.div`
  position: relative;
`;
const DisplayReaction = styled.div`
  display: flex;
  div:first-of-type {
    display: flex;
  }
`;

const ReactorsList = styled.div`
  display: flex;
  div:first-of-type {
    display: flex;
  }
  position: relative;
  .listOfReactors {
    position: absolute;
    bottom: 20px;
    left: 0;
    background: rgba(52, 52, 52, 0.85);
    color: white;
    list-style-type: none;
    padding: 10px;
  }
  border-radius: 10px;
`;

const PostWrapper = styled.div`
  background: ${snow};
  margin: 28px 0;
  padding: 24px;
  border-radius: 40px;
  ${boxShadow()};
  ${grid(2, '1fr')};
`;
const ActualPostWrapper = styled.div`
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding-left: 20px;
  .commentBox {
    width: 95%;
  }
  .commentSection {
    width: 100%;
    padding-right: 10px;
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
  }
`;
const ReactionsContainer = styled.div`
  display: flex;

  img {
    height: 11.01px;
    padding-right: 6px;
  }
  span {
    padding: 0 10px;
    ${fontFilson};
    ${fontSize(12)};
    ${flexCentering()};
    color: ${Colors.colors.dark};
    cursor: pointer;
    &:hover {
      color: black;
      img {
        height: 11.73px;
      }
    }
  }
`;
const ReactionType = styled.span``;
const ActualPost = styled.div`
  padding: 10px 0;
  .captions {
    padding-bottom: 10px;
    word-break: break-word;
  }
  div {
    color: ${Colors.colors.light};
    ${fontSize(14)};
    line-height: 17px;
  }
`;

export {
  ReactionContainer,
  ReactionNumberStyle,
  DisplayReactionWrapper,
  DisplayReaction,
  ReactorsList,
  PostWrapper,
  ActualPostWrapper,
  CommentContainer,
  ReactionsContainer,
  ReactionType,
  ActualPost
};
