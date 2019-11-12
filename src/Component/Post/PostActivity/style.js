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

export const PostActivityWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  &:focus {
    outline: 0;
  }
`;

export const PostActivityContainer = styled.div`
  text-align: center;
  span {
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

    &:focus {
      outline: 0;
    }
  }
  &.likeButton {
    position: relative;
  }
  &:hover {
  }
  @media (min-width: 768px) {
    ${flexCentering()}
  }
`;
export const PostReactionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 15px;
  right: -50%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 3px 3px 6px #00000045;
  border-radius: 17px;
  padding: 10px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  z-index: 5;
`;
export const ReactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    color: #ffd166;
  }
`;
export const ReactionComponent = styled.div``;
export const PostActivityIcon = styled.img`
  height: 11.01px !important;
  padding-right: 6px !important;
`;
export const ReactionCountWrapper = styled.div``;
export const ReactionCountContainer = styled.span`
  position: relative;
  &:focus {
    outline: 0;
  }
  &:hover > div {
    display: block;
  }
  cursor: pointer;
`;

export const ReactionUserListWrapper = styled.div`
  position: absolute;
  display: none;
  left: 100%;
  bottom: 0;
  background: #383746bd 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 13px;
  padding: 6px;
  color: ${Colors.colors.snow};
`;

export const ReactionUserListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  li {
    ${flexCentering()};
    justify-content: flex-start;
    svg {
      color: #ffd166;
      margin-right: 6px;
    }
  }
`;
