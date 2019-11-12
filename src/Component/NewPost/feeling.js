import React, { Component } from 'react';
import {
  FeelingPostWrapper,
  FeelingPostContainer,
  FeelingPostOptionWrapper
} from './style';
import { FeelingsList } from '../Functions';

class FeelingsPost extends Component {
  render() {
    const { handleFeelingPostChange, feelingPost } = this.props;
    return (
      <FeelingPostWrapper>
        <FeelingPostContainer>
          {FeelingsList.map(feeling => {
            console.log(
              'feelingPost',
              feelingPost,
              feeling.name,
              feelingPost,
              feeling.name
            );
            return (
              <FeelingPostOptionWrapper
                key={feeling.name}
                onClick={() => {
                  handleFeelingPostChange(feeling);
                }}
                className={feelingPost === feeling.name && 'selected'}
              >
                <span>{feeling.name}</span>
                <span>{feeling.emoji}</span>
              </FeelingPostOptionWrapper>
            );
          })}
        </FeelingPostContainer>
      </FeelingPostWrapper>
    );
  }
}

export default FeelingsPost;
