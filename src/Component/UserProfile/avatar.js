import React, { Component } from 'react';
import Avatar, { Piece } from 'avataaars';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { Colors, flexCentering } from '../../Theme';
import { Button } from '../StyledComponents';
import LoginActions from '../../Redux/LoginRedux';

const AvatarWrapper = styled.div`
  text-align: center;
`;

const AvatarCustomizationWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  button {
    width: 100%;
  }
  div {
    margin: auto;
  }
`;
const AvatarSelectionWrapper = styled.div``;
const AvatarStyleParameterWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  grid-column-gap: 40px;
  div {
    display: flex;
    width: 800px;
  }
  .slider {
    margin: auto;
  }
  .ButtonsList {
    @media (min-width: 1080px) {
      display: flex;
      flex-direction: column;
      width: 100px;
      button {
        width: 100% !important;
      }
    }
    flex-wrap: wrap;
    justify-content: space-around;
    button {
      width: 150px;
      margin: 10px;
    }
  }
  .slick-slide {
    padding-left: 50px;
  }
  .slick-arrow.slick-prev,
  .slick-arrow.slick-next {
    &::before {
      color: ${Colors.colors.blue};
    }
  }
  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      width: 700px;
      margin: 10px 0;
    }
  }
`;
const GraphicsDiv = styled.div`
  margin: 40px 0;
  border-radius: 20px;
  padding: 10px 0;
  border: 1px solid ${Colors.colors.blue};
  svg {
    g {
      g {
        transform: translate(0, 40px) scale(1.5);
      }
    }
  }
`;
const ColorPallette = styled.div`
  ${flexCentering('column')};
  margin: auto !important;
  div {
    height: 20px !important;
    width: 20px !important;
    border-radius: 100%;
    background: ${props => `${props.color}`};
  }
`;
const ColorPalletteWrapper = styled.div`
  margin: 20px 0 !important;
  padding: 20px 0 !important;
  display: grid !important;
  grid-template-columns: repeat(5, auto);
  grid-row-gap: 10px;
  div {
    width: 80px;
    cursor: pointer;
  }
  border: 1px solid ${Colors.colors.blue};
  border-radius: 20px;
`;
const eyes = [
  'Close',
  'Cry',
  'Default',
  'Dizzy',
  'EyeRoll',
  'Happy',
  'Hearts',
  'Side',
  'Squint',
  'Surprised',
  'Wink',
  'WinkWacky'
];

const eyebrows = [
  'Angry',
  'AngryNatural',
  'Default',
  'DefaultNatural',
  'FlatNatural',
  'RaisedExcited',
  'RaisedExcitedNatural',
  'SadConcerned',
  'SadConcernedNatural',
  'UnibrowNatural'
];

const mouths = [
  'Concerned',
  'Default',
  'Disbelief',
  'Eating',
  'Grimace',
  'Sad',
  'ScreamOpen',
  'Serious',
  'Smile',
  'Tongue',
  'Twinkle',
  'Vomit'
];

const accessories = [
  'Blank',
  'Kurt',
  'Prescription01',
  'Prescription02',
  'Round',
  'Sunglasses',
  'Wayfarers'
];

const tops = [
  'NoHair',
  'Eyepatch',
  'Hat',
  'Hijab',
  'Turban',
  'WinterHat1',
  'WinterHat2',
  'WinterHat3',
  'WinterHat4',
  'LongHairBigHair',
  'LongHairBob',
  'LongHairBun',
  'LongHairCurly',
  'LongHairCurvy',
  'LongHairDreads',
  'LongHairFrida',
  'LongHairFro',
  'LongHairFroBand',
  'LongHairNotTooLong',
  'LongHairShavedSides',
  'LongHairMiaWallace',
  'LongHairStraight',
  'LongHairStraight2',
  'LongHairStraightStrand',
  'ShortHairDreads01',
  'ShortHairDreads02'
];
const hairColors = [
  { name: 'Auburn', value: '#A55729' },
  { name: 'Black', value: '#000000' },
  { name: 'Blonde', value: '#B58143' },
  { name: 'BlondeGolden', value: '#EDB98A' },
  { name: 'Brown', value: '#724133' },
  { name: 'BrownDark', value: '#4A312C' },
  { name: 'PastelPink', value: '#F29697' },
  { name: 'Platinum', value: '#5E4834' },
  { name: 'Red', value: '#CA4420' },
  { name: 'SilverGray', value: '#E8E1E1' }
];
const facialHairs = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMajestic',
  'MoustacheFancy',
  'MoustacheMagnum'
];

const clothes = [
  'BlazerShirt',
  'BlazerSweater',
  'CollarSweater',
  'GraphicShirt',
  'Hoodie',
  'Overall',
  'ShirtCrewNeck',
  'ShirtScoopNeck',
  'ShirtVNeck'
];

const clotheColors = [
  { name: 'Black', value: '#262E33' },
  { name: 'Blue01', value: '#65C9FF' },
  { name: 'Blue02', value: '#5199E4' },
  { name: 'Blue03', value: '#25557C' },
  { name: 'Gray01', value: '#E6E6E6' },
  { name: 'Gray02', value: '#929598' },
  { name: 'Heather', value: '#3C4F5C' },
  { name: 'PastelBlue', value: '#B1E2FF' },
  { name: 'PastelGreen', value: '#A7FFC4' },
  { name: 'PastelOrange', value: '#FFDEB5' },
  { name: 'PastelRed', value: '#FFAFB9' },
  { name: 'PastelYellow', value: '#FFFFB1' },
  { name: 'Pink', value: '#FF488E' },
  { name: 'Red', value: '#FF5C5C' },
  { name: 'White', value: '#FFFFFF' }
];
const facialHairColors = [
  { name: 'Auburn', value: '#A55729' },
  { name: 'Black', value: '#000000' },
  { name: 'Blonde', value: '#B58143' },
  { name: 'BlondeGolden', value: '#EDB98A' },
  { name: 'Brown', value: '#724133' },
  { name: 'BrownDark', value: '#4A312C' },
  { name: 'PastelPink', value: '#F29697' },
  { name: 'Platinum', value: '#5E4834' },
  { name: 'Red', value: '#CA4420' }
];
const graphics = [
  'Bat',
  'Cumbia',
  'Deer',
  'Diamond',
  'Hola',
  'Pizza',
  'Resist',
  'Selena',
  'Bear',
  'SkullOutline',
  'Skull'
];
const skinColors = [
  { name: 'Tanned', value: '#A55729' },
  { name: 'Yellow', value: '#000000' },
  { name: 'Pale', value: '#B58143' },
  { name: 'Light', value: '#EDB98A' },
  { name: 'Brown', value: '#724133' },
  { name: 'BrownDark', value: '#4A312C' },
  { name: 'Black', value: '#F29697' }
];
const PieceWrapper = styled.div`
  width: 100px;
  cursor: pointer;
`;
const PieceWrapperContainer = styled.div`
  display: flex;
  span {
    margin-left: 25px;
  }
`;
const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1
};
class UserAvatar extends Component {
  state = {
    avatarStyle: 'Circle',
    topType: 'LongHairMiaWallace',
    accessoriesType: 'Prescription02',
    hairColor: 'BrownDark',
    facialHairType: 'Blank',
    facialHairColor: 'Black',
    clotheType: 'Hoodie',
    clotheColor: 'PastelBlue',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Light',
    graphicType: 'Bat',
    pieceName: 'top',
    pieceArray: tops
  };

  componentWillMount() {
    const { user } = this.props;
    const { avatar } = user;
    console.log('cwm ', avatar);
    if (avatar) {
      const {
        a_accessories,
        a_clothes,
        a_eyebrow,
        a_eyes,
        a_facial_hair_color,
        a_facialhair_moustache,
        a_haircolor,
        a_graphic_type,
        a_clothes_color,
        a_mouth,
        a_skin,
        a_style,
        a_top
      } = avatar;
      this.setState({
        avatarStyle: 'Circle',
        topType: a_top,
        accessoriesType: a_accessories,
        hairColor: a_haircolor,
        facialHairType: a_facialhair_moustache,
        facialHairColor: a_facial_hair_color,
        clotheType: a_clothes,
        clotheColor: a_clothes_color,
        eyeType: a_eyes,
        eyebrowType: a_eyebrow,
        mouthType: a_mouth,
        skinColor: a_skin,
        graphicType: a_graphic_type
      });
    }
  }

  getAvatarOptions = () => {
    const { pieceName, pieceArray } = this.state;
    switch (pieceName) {
      case 'mouth':
        return (
          <Slider {...settings} className="slider">
            {pieceArray.map((item, i) => (
              <div key={`${item}${i}`}>
                <PieceWrapper
                  onClick={() => {
                    this.setState({ mouthType: item });
                  }}
                >
                  {' '}
                  <Piece
                    pieceType={pieceName}
                    pieceSize="100"
                    mouthType={item}
                  />
                </PieceWrapper>
                {item}
              </div>
            ))}
          </Slider>
        );
      case 'eyes':
        return (
          <Slider {...settings} className="slider">
            {pieceArray.map((item, i) => (
              <div key={`${item}${i}`}>
                <PieceWrapper
                  onClick={() => {
                    this.setState({ eyeType: item });
                  }}
                >
                  {' '}
                  <Piece pieceType={pieceName} pieceSize="100" eyeType={item} />
                </PieceWrapper>
                {item}
              </div>
            ))}
          </Slider>
        );
      case 'clothe':
        return (
          <div style={{ display: 'grid' }}>
            <Slider {...settings} className="slider">
              {pieceArray.map((item, i) => (
                <PieceWrapperContainer key={`${item}${i}`}>
                  <PieceWrapper
                    onClick={() => {
                      this.setState({ clotheType: item });
                    }}
                  >
                    {' '}
                    <Piece
                      pieceType={pieceName}
                      pieceSize="100"
                      clotheType={item}
                    />
                  </PieceWrapper>
                  {item}
                </PieceWrapperContainer>
              ))}
            </Slider>
            {this.state.clotheType === 'GraphicShirt' && (
              <GraphicsDiv>
                <Slider {...settings} className="slider">
                  {graphics.map((item, i) => (
                    <PieceWrapper
                      key={`${item}${i}`}
                      onClick={() => {
                        this.setState({ graphicType: item });
                      }}
                    >
                      <Piece
                        pieceType="graphics"
                        pieceSize="100"
                        graphicType={item}
                        style={{
                          background: `${Colors.colors.blue}`
                        }}
                      />
                    </PieceWrapper>
                  ))}
                </Slider>
              </GraphicsDiv>
            )}

            <ColorPalletteWrapper>
              {clotheColors.map((item, i) => (
                <ColorPallette
                  key={`${i}${item}`}
                  onClick={() => {
                    this.setState({ clotheColor: item.name });
                  }}
                  color={item.value}
                >
                  <div />
                  <span>
                    {' '}
                    {item.name}
                  </span>
                </ColorPallette>
              ))}
            </ColorPalletteWrapper>
          </div>
        );
      case 'top':
        return (
          <div style={{ display: 'grid' }}>
            <Slider {...settings} className="slider">
              {pieceArray.map((item, i) => (
                <PieceWrapperContainer key={`${item}${i}`}>
                  <PieceWrapper
                    onClick={() => {
                      this.setState({ topType: item });
                    }}
                  >
                    {' '}
                    <Piece
                      pieceType={pieceName}
                      pieceSize="100"
                      topType={item}
                    />
                  </PieceWrapper>
                  {item}
                </PieceWrapperContainer>
              ))}
            </Slider>
            <ColorPalletteWrapper>
              {hairColors.map((item, i) => (
                <ColorPallette
                  key={`${item}${i}`}
                  onClick={() => {
                    this.setState({ hairColor: item.name });
                  }}
                  color={item.value}
                >
                  <div />
                  <span>
                    {' '}
                    {item.name}
                  </span>
                </ColorPallette>
              ))}
            </ColorPalletteWrapper>
          </div>
        );
      case 'eyebrows':
        return (
          <Slider {...settings} className="slider">
            {pieceArray.map((item, i) => (
              <div key={`${item}${i}`}>
                <PieceWrapper
                  onClick={() => {
                    this.setState({ eyebrowType: item });
                  }}
                >
                  {' '}
                  <Piece
                    pieceType={pieceName}
                    pieceSize="100"
                    eyebrowType={item}
                  />
                </PieceWrapper>
                {item}
              </div>
            ))}
          </Slider>
        );
      case 'accessories':
        return (
          <Slider {...settings} className="slider">
            {pieceArray.map((item, i) => (
              <div key={`${item}${i}`}>
                <PieceWrapper
                  onClick={() => {
                    this.setState({ accessoriesType: item });
                  }}
                >
                  {' '}
                  <Piece
                    pieceType={pieceName}
                    pieceSize="100"
                    accessoriesType={item}
                  />
                </PieceWrapper>
                {item}
              </div>
            ))}
          </Slider>
        );
      case 'facialHair':
        return (
          <div style={{ display: 'grid' }}>
            <Slider {...settings} className="slider">
              {pieceArray.map((item, i) => (
                <PieceWrapperContainer key={`${item}${i}`}>
                  <PieceWrapper
                    onClick={() => {
                      this.setState({ facialHairType: item });
                    }}
                  >
                    {' '}
                    <Piece
                      pieceType={pieceName}
                      pieceSize="100"
                      facialHairType={item}
                    />
                  </PieceWrapper>
                  {item}
                </PieceWrapperContainer>
              ))}
            </Slider>
            <ColorPalletteWrapper>
              {facialHairColors.map((item, i) => (
                <ColorPallette
                  key={`${item}${i}`}
                  onClick={() => {
                    this.setState({ facialHairColor: item.name });
                  }}
                  color={item.value}
                >
                  <div />
                  <span>
                    {' '}
                    {item.name}
                  </span>
                </ColorPallette>
              ))}
            </ColorPalletteWrapper>
          </div>
        );
      case 'skin':
        return (
          <div style={{ display: 'grid' }}>
            <Slider {...settings} className="slider">
              {pieceArray.map((item, i) => (
                <PieceWrapperContainer key={`${item}${i}`}>
                  <PieceWrapper
                    onClick={() => {
                      this.setState({ skinColor: item.name });
                    }}
                  >
                    <Piece
                      pieceType="skin"
                      pieceSize="100"
                      skinColor={item.name}
                    />
                  </PieceWrapper>
                  <span>
                    {' '}
                    {item.name}
                  </span>
                </PieceWrapperContainer>
              ))}
            </Slider>
          </div>
        );
    }
  };

  saveMyAvatar = () => {
    const { user, onSaveMyAvatar } = this.props;
    const { isStudent, id, avatar } = user;
    const {
      accessoriesType,
      avatarStyle,
      clotheColor,
      clotheType,
      eyeType,
      eyebrowType,
      facialHairColor,
      facialHairType,
      graphicType,
      hairColor,
      mouthType,
      skinColor,
      topType
    } = this.state;
    const data = {
      a_id: avatar ? avatar.a_id : null,
      a_style: 'Circle',
      a_top: topType,
      a_accessories: accessoriesType,
      a_haircolor: hairColor,
      a_facialhair_moustache: facialHairType,
      a_facial_hair_color: facialHairColor,
      a_clothes: clotheType,
      a_eyes: eyeType,
      a_eyebrow: eyebrowType,
      a_mouth: mouthType,
      a_skin: skinColor,
      a_graphic_type: graphicType,
      userId: id,
      isStudent
    };

    onSaveMyAvatar(data);
  };

  render() {
    const {
      avatarStyle,
      topType,
      accessoriesType,
      hairColor,
      facialHairType,
      clotheType,
      clotheColor,
      eyeType,
      eyebrowType,
      mouthType,
      skinColor,
      facialHairColor,
      graphicType
    } = this.state;
    return (
      <div>
        <AvatarWrapper>
          {' '}
          <Avatar
            style={{ width: '300px', height: '300px' }}
            avatarStyle={avatarStyle}
            topType={topType}
            accessoriesType={accessoriesType}
            hairColor={hairColor}
            facialHairType={facialHairType}
            clotheType={clotheType}
            clotheColor={clotheColor}
            eyeType={eyeType}
            eyebrowType={eyebrowType}
            mouthType={mouthType}
            skinColor={skinColor}
            facialHairColor={facialHairColor}
            graphicType={graphicType}
          />
        </AvatarWrapper>

        <AvatarSelectionWrapper>
          <AvatarStyleParameterWrapper>
            <div className="ButtonsList">
              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'top',
                    pieceArray: tops
                  });
                }}
              >
                Hair
              </Button>
              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'mouth',
                    pieceArray: mouths
                  });
                }}
              >
                Mouth
              </Button>
              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'eyes',
                    pieceArray: eyes
                  });
                }}
              >
                Eyes
              </Button>
              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'eyebrows',
                    pieceArray: eyebrows
                  });
                }}
              >
                Eyebrows
              </Button>
              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'clothe',
                    pieceArray: clothes
                  });
                }}
              >
                Clothes
              </Button>

              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'facialHair',
                    pieceArray: facialHairs
                  });
                }}
              >
                FacialHair
              </Button>
              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'accessories',
                    pieceArray: accessories
                  });
                }}
              >
                Accessories
              </Button>
              <Button
                className="rounded"
                onClick={() => {
                  this.setState({
                    pieceName: 'skin',
                    pieceArray: skinColors
                  });
                }}
              >
                Skin Tone
              </Button>
            </div>
            <div>{this.getAvatarOptions()}</div>
          </AvatarStyleParameterWrapper>
        </AvatarSelectionWrapper>
        <Button onClick={this.saveMyAvatar}>Save My Avatar</Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user
});
const mapDispatchToProps = dispatch => ({
  onSaveMyAvatar: value => dispatch(LoginActions.onSaveMyAvatar(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAvatar);
