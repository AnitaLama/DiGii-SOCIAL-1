import styled from '@emotion/styled';

const AvatarWrapper = styled.div`
  text-align: center;
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
const backgroundTypes = ['Circle', 'Transparent'];
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

export {
  AvatarWrapper,
  AvatarSelectionWrapper,
  AvatarStyleParameterWrapper,
  GraphicsDiv,
  ColorPallette,
  ColorPalletteWrapper,
  eyes,
  eyebrows,
  mouths,
  accessories,
  tops,
  hairColors,
  facialHairs,
  clothes,
  clotheColors,
  facialHairColors,
  graphics,
  skinColors,
  backgroundTypes,
  PieceWrapper,
  PieceWrapperContainer,
  settings
};
