import React, { Component } from 'react';
import styled from '@emotion/styled';
import {
  FiGift, FiSend, FiCreditCard, FiPlus
} from 'react-icons/fi';
import { Badge } from 'antd';
import PropTypes from 'prop-types';
import { grid, Colors, fontSize } from '../../Theme';

const FeatureContentWrapper = styled.div`
  ${grid(4, '1fr')};
`;
const FeatureContent = styled.div`
  text-align: center;
  cursor: pointer;
  i {
    padding-right: 6px;
    ${fontSize(22)};
    &:hover {
      font-weight: 900;
    }
  }
`;
const FeatureText = styled.span`
  padding-right: 4px;
  &:hover {
    font-weight: bold;
  }
  @media (max-width: 560px) {
    padding: 0;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;
const Feature = props => {
  const { count, icon, text } = props;
  return (
    <FeatureContent>
      <Badge count={count} style={{ backgroundColor: Colors.colors.peach }}>
        <i>{icon}</i>
        <FeatureText>{text}</FeatureText>
      </Badge>
    </FeatureContent>
  );
};

class FeatureContents extends Component {
  render() {
    return (
      <FeatureContentWrapper>
        <Feature count={5} icon=<FiCreditCard /> text="Send DiGii-T's" />
        <Feature count={5} icon=<FiPlus /> text="Add DiGii-T's" />
        <Feature count={5} icon=<FiGift /> text="See Gifts" />
        <Feature count={5} icon=<FiSend /> text="Notifications" />
      </FeatureContentWrapper>
    );
  }
}

Feature.propTypes = {
  text: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.object
};

export default FeatureContents;
