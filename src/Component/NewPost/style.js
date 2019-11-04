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

const { snow, grey } = Colors.colors;

const NewPostWrapper = styled.div`
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

const NewPostContainer = styled.div`
  // display: grid;
  // grid-template-columns: auto auto;
`;

const PostTypesWrapper = styled.div`
  display: flex;
`;
const PostTypesContainer = styled.div`
  ${grid(6, '1fr')};
  width: 100%;
  text-align: center;
`;

const SinglePostTypeWrapper = styled.div`
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

const Icon = styled.div`
  img {
    height: 20.73px;
    margin-right: 4px;
  }
`;

const TextBoxWrapper = styled.div`
  display: flex;
`;
const TextBoxContainer = styled.div`
  display: grid;
  grid-template-columns: auto 86.76px;
  width: 100%;
`;

const Input = styled.div`
  width: 100%;
  margin: 0 10px;
`;

const ImageUploadWrapper = styled.div`
  margin: 10px 0;
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
`;

const BannerPostWrapper = styled.div`
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
`;

const BannerOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
const BannerOption = styled.span`
  img {
    height: 23px;
    width: 23px;
    border-radius: 8px;
  }
`;

const GifPostWrapper = styled.div`
  margin: 20px 0;
`;
const GifListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  img {
    width: 100%;
  }
`;

const FeelingPostWrapper = styled.div`
  margin: 10px 0;
`;
const FeelingPostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const FeelingPostOptionWrapper = styled.div`
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

const PollPostWrapper = styled.div``;
const PollPostQuestionWrapper = styled.div``;
const PollPostOptionWrapper = styled.div``;
const AddButton = styled.span`
  cursor: pointer;
  color: #61bbf7;
  ${fontSize(14)}
`;
const SingleOption = styled.div`
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
const ImageIcon = styled.div`
  input {
    display: none;
  }
  color: #d5d4d4;
  svg {
    font-size: 20.73px;
    height: 20.73px;
  }
`;
const CloseButton = styled.span`
  cursor: pointer;
  color: #d5d4d4;
`;
export {
  NewPostWrapper,
  NewPostContainer,
  PostTypesWrapper,
  PostTypesContainer,
  SinglePostTypeWrapper,
  Icon,
  TextBoxWrapper,
  TextBoxContainer,
  Input,
  ImageUploadWrapper,
  BannerPostWrapper,
  BannerOptionContainer,
  BannerOption,
  GifPostWrapper,
  GifListContainer,
  FeelingPostWrapper,
  FeelingPostContainer,
  FeelingPostOptionWrapper,
  PollPostWrapper,
  PollPostQuestionWrapper,
  PollPostOptionWrapper,
  AddButton,
  SingleOption,
  ImageIcon,
  CloseButton
};
