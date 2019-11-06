import styled from '@emotion/styled';
import {
  grid,
  fontSize,
  flexCentering,
  Colors,
  Images,
  boxShadow,
  fontWeight,
  fontFilson
} from '../../Theme';

export const {
  snow, grey, secondary, primary
} = Colors.colors;

export const NewPostWrapper = styled.div`
  background: ${snow};
  margin: 10px 0;
  padding: 20px;
  border-radius: 40px;
  ${boxShadow()};
  min-height: 226px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NewPostContainer = styled.div`
  // display: grid;
  // grid-template-columns: auto auto;
`;

export const PostTypesWrapper = styled.div`
  display: flex;
`;
export const PostTypesContainer = styled.div`
  ${grid(6, '1fr')};
  width: 100%;
  text-align: center;
`;

export const SinglePostTypeWrapper = styled.div`
  cursor: pointer;

  span {
    color: '#5E5E5E';
    ${fontSize(12)};
    ${fontFilson()};
  }
  &.active,
  &:hover {
    span {
      ${fontWeight('500')};
      color: ${grey};
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Icon = styled.div`
  img {
    height: 20.73px;
    margin-right: 4px;
  }
`;

export const TextBoxWrapper = styled.div`
  display: flex;
`;
export const TextBoxContainer = styled.div`
  display: grid;
  grid-template-columns: auto 86.76px;
  width: 100%;
`;

export const Input = styled.div`
  width: 100%;
  margin: 0 10px;
`;

export const Username = styled.span`
  text-transform: capitalize;
  ${fontWeight('bold')}
`;
export const Feeling = styled.span`
  ${fontWeight('bold')}
`;
export const ImageUploadWrapper = styled.div`
  margin: 10px 0;
  padding: 20px;
  border: 4px dashed #d4d3d3;
  min-height: 200px;
  position: relative;
  border-radius: 20px;
  svg {
    font-size: 50px;
    color: #d4d3d3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  input {
    display: none;
  }
`;
export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  span {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`;

export const BannerPostWrapper = styled.div`
  background-image: ${props => (props.background
    ? `url(${props.background})`
    : 'linear-gradient(244deg, #f78361 0%, #f54b64 100%)')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 200px;
  border-radius: 20px;
  position: relative;
  margin: 20px 0;
  position: relative;
`;

export const BannerInput = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px;
`;
export const BannerOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;
export const BannerOption = styled.span`
  img {
    height: 23px;
    width: 23px;
    border-radius: 8px;
  }
`;

export const GifPostWrapper = styled.div`
  margin: 20px 0;
`;
export const GifListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
export const GifListItem = styled.img`
  width: 100%;
`;

export const FeelingPostWrapper = styled.div`
  margin: 10px 0;
`;
export const FeelingPostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
export const FeelingPostOptionWrapper = styled.div`
  box-shadow: 3px 3px 6px #00000029;
  border-radius: 15px;
  margin: 8px;
  text-transform: capitalize;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: #00000029;
  }
  span {
    font-size: 12px;
    line-height: 12px;
    ${fontFilson()};
    &:first-of-type {
      ${fontWeight('bold')}
    }
    &:last-of-type {
      padding-left: 6px;
    }
  }
`;

export const PollPostWrapper = styled.div``;
export const PollPostQuestionWrapper = styled.div``;
export const PollPostOptionWrapper = styled.div``;
export const AddButton = styled.span`
  cursor: pointer;
  color: #61bbf7;
  ${fontSize(14)}
`;
export const SingleOption = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 10px;
  input {
    border: 0;
    outline: none;
    margin-left: 14px;
    &::placeholder {
      font-family: Lato;
    }
    width: 100%;
  }
`;
export const ImageIcon = styled.div`
  input {
    display: none;
  }
  color: #d5d4d4;
  svg {
    font-size: 20.73px;
    height: 20.73px;
  }
`;
export const CloseButton = styled.span`
  cursor: pointer;
  color: #d5d4d4;
`;

export const TagPostWrapper = styled.div`
  position: relative;
  min-height: 50px;
  li {
    background: linear-gradient(to right, ${primary}, ${secondary});
    border-radius: 20px !important;
    // padding: 6px 10px !important;
    // margin: 10px;
    color: ${snow} !important;
  }
`;
export const TagPostContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;
export const UserDropdownListWrapper = styled.li`
  box-shadow: 3px 3px 6px #00000029;
  border-radius: 18px;
  float: left;
  max-width: 180px;
  li.ant-select-selection__choice {
    display: none;
  }
`;
export const UserDropdownListContainer = styled.ul`
  background: ${snow};
  // position: absolute;
  // top: 0;
  // right: 0;
  // z-index: 3;
`;
export const UserDropdownList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  overflow-y: scroll;
  max-height: 224px;
`;
export const UserDropdownListItem = styled.li`
  cursor: pointer;
  padding: 4px 10px;
  &:hover {
    background: #00000029;
  }
  &.chosen {
    background: ${secondary};
  }
`;
export const TaggedMembersChipWrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  &.clearfix {
    overflow: auto;
  }
  &.clearfix::after {
    content: '';
    clear: both;
    display: table;
  }
`;
export const TaggedMembersChip = styled.li`
  float: left;
  background: linear-gradient(to right, ${primary}, ${secondary});
  border-radius: 14px;
  padding: 6px 10px;
  margin: 10px;
  color: ${snow};
`;
