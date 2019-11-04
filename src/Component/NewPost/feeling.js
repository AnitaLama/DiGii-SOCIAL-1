import React, { Component } from 'react';
import {
  FeelingPostWrapper,
  FeelingPostContainer,
  FeelingPostOptionWrapper
} from './style';

const FeelingsList = [
  { name: 'happy', unicode: '&#128515;', emoji: '😃' },
  { name: 'excited', unicode: '&#128516;', emoji: '😄' },
  { name: 'loved', unicode: '&#128536;', emoji: '😘' },
  { name: 'sad', unicode: '&#128542;', emoji: '😞' },
  { name: 'lovely', unicode: '&#128536;', emoji: '😘' },
  { name: 'thankful', unicode: '&#128522;', emoji: '😊' },
  { name: 'blessed', unicode: '&#128519;', emoji: '😇' },
  { name: 'in love', unicode: '&#128536;', emoji: '😘' },
  { name: 'crazy', unicode: '&#128518;', emoji: '😆' }
];

class FeelingsPost extends Component {
  render() {
    return (
      <FeelingPostWrapper>
        <FeelingPostContainer>
          {FeelingsList.map(feeling => (
            <FeelingPostOptionWrapper key={feeling.name}>
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
