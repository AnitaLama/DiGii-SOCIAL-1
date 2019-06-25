import { sizes } from './Mixins';

const Colors = {
  breakpoints: Object.values(sizes).map(size => size / 16), // convert sizes to em
  colors: {
    primary: '#F67B61',
    pink: '#F54962',
    peach: '#F78360',
    grey: '#DFDFDF',
    pen: '#373745',
    pencil: '#E2E1E1',
    placeholder: '#E9E9E9',
    snow: '#fff',
    background: '#f1f3f4'
  }
};

export default Colors;
