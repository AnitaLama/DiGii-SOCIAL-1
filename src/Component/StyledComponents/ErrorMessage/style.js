import styled from '@emotion/styled';

import { Colors, fontWeight, boxShadow } from '../../../Theme';

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(52, 52, 52, 0.2);
  height: 100%;
  width: 100%;
`;

const ErrorStyles = styled.div`
  padding: 1.2rem;
  ${boxShadow()}
  background: white;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid ${Colors.colors.primary};
  p {
    margin: 0;
    ${fontWeight(100)}
  }
  strong {
    margin-right: 1rem;
  }
  width: ${props => `${props.width}%` || '100%'};
  margin: auto;
`;

export { ErrorWrapper, ErrorStyles };
