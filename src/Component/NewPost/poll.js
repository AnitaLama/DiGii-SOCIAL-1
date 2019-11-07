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
import InputBox from './inputBox.js';

class PollPost extends Component {
  state = {
    question: null,
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

  handleOptionChange = (e, option) => {
    const { options } = this.state;
    const { value } = e.target;
    const newArr = [];
    options.forEach(item => {
      if (item.id !== option.id) {
        newArr.push(item);
      } else {
        newArr.push({ ...option, text: value });
      }
    });
    this.setState({ options: newArr });
  };

  selectImage = (e, option) => {
    const { options } = this.state;
    const newArr = [];

    let fileName = e.target.files[0].name.replace(/\s/g, '-');
    // SAVE NAME ALONG WITH CURRENT TIME FOR UNIQUE NAME
    const currentDate = new Date();
    fileName = currentDate.getTime() + fileName;
    options.forEach(item => (option.id === item.id
      ? newArr.push({
        ...item,
        img: e.target.files[0],
        name: fileName,
        url: URL.createObjectURL(e.target.files[0])
      })
      : newArr.push(item)));
    this.setState({ options: newArr });
  };

  openFileSystem = id => {
    document.getElementById(id).click();
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

  handleQuestionChange = e => {
    const { value } = e.target;
    this.setState({ question: value });
  };

  render() {
    return (
      <PollPostWrapper>
        <PollPostQuestionWrapper>
          <InputBox
            placeholder="What do you want to ask?"
            value={this.state.question}
            onChange={this.handleQuestionChange}
          />
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
