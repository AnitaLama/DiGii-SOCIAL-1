import React, { Component } from 'react';
import {
  FiGift, FiSend, FiCreditCard, FiPlus
} from 'react-icons/fi';
import { Badge } from 'antd';
import PropTypes from 'prop-types';
import { Colors } from '../../../Theme';
import { FeatureContentWrapper, FeatureContent, FeatureText } from './style';

const Feature = props => {
  const { count, icon, text } = props;
  return (
    <FeatureContent>
      <Badge count={count} style={{ backgroundColor: Colors.colors.secondary }}>
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
        <Feature count={5} icon=<FiCreditCard /> text="Spend DiGii-T's" />
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
