import React, { Component } from 'react';
import {
  FeelingPostWrapper,
  FeelingPostContainer,
  FeelingPostOptionWrapper
} from './style';
import { FeelingsList } from '../Functions';

class FeelingsPost extends Component {
  render() {
    const { handleFeelingPostChange } = this.props;
    return (
      <FeelingPostWrapper>
        <FeelingPostContainer>
          {FeelingsList.map(feeling => (
            <FeelingPostOptionWrapper
              key={feeling.name}
              onClick={() => {
                handleFeelingPostChange(feeling);
              }}
            >
              <span>{feeling.name}</span>
              <span>{feeling.emoji}</span>
            </FeelingPostOptionWrapper>
          ))}
        </FeelingPostContainer>
      </FeelingPostWrapper>
    );
  }
}

export default FeelingsPost;
