import React, { Component } from 'react';
import { FaImage } from 'react-icons/fa';
import {
  PollPostWrapper,
  PollPostQuestionWrapper,
  PollPostOptionWrapper,
  AddButton,
  CloseButton,
  SingleOption,
  ImageIcon
} from './style';
import { FormInput } from '../StyledComponents';

class PollPost extends Component {
  state = {
    options: [
      {
        id: Math.random(0, 1).toFixed(3),
        text: '',
        img: ''
      },
      {
        id: Math.random(0, 1).toFixed(3),
        text: '',
        img: ''
      },
      {
        id: Math.random(0, 1).toFixed(3),
        text: '',
        img: ''
      }
    ]
  };

  showAllOptions = () => {
    const { options } = this.state;
    return options.map((item, i) => (
      <SingleOption key={`${item}+${i}`}>
        <ImageIcon
          onClick={() => {
            this.openFileSystem(`openFSInput${item.id}`);
          }}
        >
          {item.url ? (
            <img src={item.url} height={25} width={25} alt={item.name} />
          ) : (
            <FaImage />
          )}
          <input
            type="file"
            id={`openFSInput${item.id}`}
            multiple
            onChange={e => {
              this.selectImage(e, item);
            }}
          />
        </ImageIcon>

        <input
          placeholder="Add option..."
          onChange={e => {
            this.handleOptionChange(e, item);
          }}
          value={item.text}
        />

        <CloseButton
          onClick={() => {
            this.removeOption(item);
          }}
        >
          x
        </CloseButton>
      </SingleOption>
    ));
  };

  addNewOption = () => {
    const { options } = this.state;
    const optionLength = options.length;
    // MAXIMUM 20 OPTIONS ONLY
    if (optionLength < 20) {
      this.setState(prevState => ({
        options: [
          ...prevState.options,
          {
            id: Math.random(0, 100).toFixed(3),
            text: '',
            img: '',
            name: ''
          }
        ]
      }));
    }
  };

  removeOption = option => {
    // REMOVE THE PARTICULAR OPTION FROM THE LIST
    const { options } = this.state;
    const tempArr = options;
    const newArr = [];
    tempArr.forEach(item => {
      if (item.id !== option.id) {
        newArr.push(item);
      }
    });
    this.setState({ options: newArr });
  };

  render() {
    return (
      <PollPostWrapper>
        <PollPostQuestionWrapper>
          <FormInput placeholder="What do you want to ask?" />
        </PollPostQuestionWrapper>
        <PollPostOptionWrapper>
          {this.showAllOptions()}
          <AddButton onClick={this.addNewOption}>+Add option</AddButton>
        </PollPostOptionWrapper>
      </PollPostWrapper>
    );
  }
}

export default PollPost;
