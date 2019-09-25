import styled from '@emotion/styled';
import { grid, fontSize, fontWeight } from '../../../Theme';

const FeatureContentWrapper = styled.div`
  ${grid(4, '1fr')};
`;
const FeatureContent = styled.div`
  text-align: center;
  cursor: pointer;
  i {
    padding-right: 6px;
    ${fontSize(22)};
  }
  &:hover {
    i {
      ${fontWeight('900')};
    }
    span {
      ${fontWeight('bold')};
    }
  }
`;

const FeatureText = styled.span`
  padding-right: 4px;
  &:hover {
  }

  @media (max-width: 480px) {
    ${fontSize(10)};
    display: none;
  }
`;

export { FeatureContentWrapper, FeatureContent, FeatureText };
