import React, { Component } from 'react';
import styled from '@emotion/styled';
import {
  FiGift, FiSend, FiCreditCard, FiPlus
} from 'react-icons/fi';
import { Badge } from 'antd';
import { grid } from '../../Theme';

const FeatureWrapper = styled.div`
  padding: 10px 0;
  ${grid(4, '1fr')};
`;
const Feature = styled.div`
  text-align: center;
  cursor: pointer;
  i {
    padding-right: 6px;
    font-size: 22px;
  }
  span {
    padding-right: 4px;
  }
`;
class Features extends Component {
  render() {
    return (
      <FeatureWrapper>
        <Feature>
          <Badge count={5}>
            <i>
              <FiCreditCard />
            </i>
            <span>Send DiGii-T's</span>
          </Badge>
        </Feature>
        <Feature>
          <Badge count={5}>
            <i>
              <FiPlus />
            </i>
            <span>Add DiGii-T's</span>
          </Badge>
        </Feature>
        <Feature>
          <Badge count={125}>
            <i>
              <FiGift />
            </i>
            <span>See Gifts</span>
            {' '}
          </Badge>
        </Feature>
        <Feature>
          <Badge count={5}>
            <i>
              <FiSend />
            </i>
            <span>Notifications</span>
          </Badge>
        </Feature>
      </FeatureWrapper>
    );
  }
}

export default Features;
