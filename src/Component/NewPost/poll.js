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
import { InputBox } from '../Functions';

class PollPost extends Component {
  //
  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     this.setState({
  //       options: this.props.options,
  //       pollQuestion: this.props.pollQuestion
  //     });
  //   }
  // }

  showAllOptions = () => {
    const { options } = this.props;
    const {
      openFileSystem,
      selectImage,
      handleOptionChange,
      removeOption
    } = this.props;
    return options.map((item, i) => (
      <SingleOption key={`${item}+${i}`}>
        <ImageIcon
          onClick={() => {
            openFileSystem(`openFSInput${item.id}`);
          }}
        >
          {item.fileName ? (
            <img src={item.fileName} height={25} width={25} alt={item.name} />
          ) : (
            <FaImage />
          )}
          <input
            type="file"
            id={`openFSInput${item.id}`}
            multiple
            onChange={e => {
              selectImage(e, item);
            }}
          />
        </ImageIcon>

        <input
          placeholder="Add option..."
          onChange={e => {
            handleOptionChange(e, item);
          }}
          value={item.text}
        />

        <CloseButton
          onClick={() => {
            removeOption(item);
          }}
        >
          x
        </CloseButton>
      </SingleOption>
    ));
  };

  render() {
    const { pollQuestion, handleQuestionChange, addNewOption } = this.props;
    console.log('poll question', this.props.pollQuestion);
    return (
      <PollPostWrapper>
        <PollPostQuestionWrapper>
          <InputBox
            placeholder="What do you want to ask?"
            value={pollQuestion || ''}
            onChange={handleQuestionChange}
          />
        </PollPostQuestionWrapper>
        <PollPostOptionWrapper>
          {this.showAllOptions()}
          <AddButton onClick={addNewOption}>+Add option</AddButton>
        </PollPostOptionWrapper>
      </PollPostWrapper>
    );
  }
}

export default PollPost;
