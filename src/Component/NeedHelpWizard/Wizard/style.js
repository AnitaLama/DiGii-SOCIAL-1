import styled from '@emotion/styled';
import {
  Colors,
  fontSize,
  fontFilson,
  fontWeight,
  boxShadow
} from '../../../Theme';

const { black } = Colors.colors;

const WizardWrapper = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  @media (max-height: 900px) {
    margin-top: 150px;
  }
`;

const WizardContainer = styled.div`
  margin: auto;
  width: 365px;
  padding: 30px;
  text-align: center;
  div {
    padding: 10px 0;
  }
  ${boxShadow()};
  border-radius: 42px;
  position: relative;
  @media (max-width: 800px) {
    transform: translate(-35%, 0%);
  }
  // top: 200px;
`;

const WizardDescription = styled.div`
  width: 295px;
  margin: auto;
`;

const Title = styled.div`
  color: ${black};
  ${fontSize(28)};
  ${fontFilson()};
  line-height: 28px;
  ${fontWeight('bold')}
`;

const Description = styled.div`
  color: #777777;
  ${fontSize(16)};
  span {
    display: block;
    margin: 10px;
  }
`;
const InternalHelper = styled.div`
  padding: 10px;
`;

const ReasonsWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export {
  WizardWrapper,
  WizardContainer,
  WizardDescription,
  Title,
  Description,
  InternalHelper,
  ReasonsWrapper
};
