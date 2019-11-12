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

export const { snow, pencil, secondary } = Colors.colors;

export const ReactionContainer = styled.div`
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

export const ReactionNumberStyle = styled.div`
  font-size: 13px;
  font-family: sans-serif;
  font-weight: bold;
`;
export const DisplayReactionWrapper = styled.div`
  position: relative;
`;
export const DisplayReaction = styled.div`
  display: flex;
  div:first-of-type {
    display: flex;
  }
`;

export const ReactorsList = styled.div`
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

export const PostWrapper = styled.div`
  background: ${snow};
  margin: 28px 0;
  padding: 24px;
  border-radius: 40px;
  ${boxShadow()};
  ${grid(2, '1fr')};
  max-width: 100%;
  @media (max-width: 768px) {
    ${grid(1, '1fr')};
    padding-left: 0;
  }
`;
export const ActualPostWrapper = styled.div`
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CommentContainer = styled.div`
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
export const ReactionsContainer = styled.div`
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
export const ReactionType = styled.span``;
export const ActualPost = styled.div`
  padding: 10px 0;
  .captions {
    padding-bottom: 10px;
    word-break: break-word;
  }
`;

export const PostContent = styled.div`
  color: ${Colors.colors.light};
  ${fontSize(14)};
  line-height: 17px;
`;
export const ImageWrapper = styled.div`
  // text-align: center;
`;
export const ImageContainer = styled.img`
  width: 100%;
  max-width: 250px;
`;
export const BannerContainer = styled.div`
  background: ${props => `url('${props.background}')`};
  position: relative;
  width: 100%;
  height: 135px;
`;
export const BannerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0;
  color: ${snow};
  background: transparent;
  transform: translate(-50%, -50%);
  word-wrap: break-word;
  text-align: center;
`;

export const PollWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    display: flex;
    svg {
      border: 0;
      margin-right: 4px;
    }
    color: ${Colors.colors.pencil};
    ${fontSize(12)};
  }
  svg {
    color: white;
    border: 1px solid #707070;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    font-size: 8px;
  }
  img {
    height: 22px;
    width: 22px;
    border-radius: 22px;
    margin-right: 10px;
  }
`;
export const PostText = styled.div`
  word-break: break-word;
  word-wrap: break-word;
`;
