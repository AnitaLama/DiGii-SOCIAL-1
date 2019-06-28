import { sizes } from './Mixins';

const Colors = {
  breakpoints: Object.values(sizes).map(size => size / 16), // convert sizes to em
  // colors: {
  //   primary: '#F67B61',
  //   primary: '#F54962',
  //   secondary: '#F78360',
  //   grey: '#9D9D9D',
  //   pen: '#373745',
  //   pencil: '#E2E1E1',
  //   placeholder: '#E9E9E9',
  //   snow: '#fff',
  //   background: '#f1f3f4'
  // },
  colors: {
    primary: '#9A4BF5',
    secondary: '#61BBF7',
    blue: '#7E81F6',
    grey: '#9D9D9D',
    pink: '#F54962',
    ink: '#373745',
    pen: '#676674',
    pencil: '#E2E1E1',
    placeholder: '#E9E9E9',
    snow: '#fff',
    background: '#f1f3f4'
  }
};

export default Colors;
