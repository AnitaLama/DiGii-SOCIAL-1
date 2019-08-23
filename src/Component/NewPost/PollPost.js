import React, { Component } from 'react';
import { FaImage } from 'react-icons/fa';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PostWrapper } from './index';
import { Button } from '../StyledComponents';
import { flexCentering, fontSize } from '../../Theme';
import PostActions from '../../Redux/PostRedux';

const SingleOption = styled.div`
  ${flexCentering()};
  padding: 2px 0;
  input {
    border: 0;
    outline: none;
    margin-left: 6px;
    &::placeholder {
      font-family: Lato;
    }
  }
`;
const ImageIcon = styled.div`
  input {
    display: none;
  }
  color: #d5d4d4;
  svg {
    height: 20.73px;
  }
`;
const QuestionWrapper = styled.div`
  input {
    border: 0;
    outline: 0;
    &:focus {
      border: 0;
    }
  }
`;
const PollOptionsWrapper = styled.div`
  padding: 10px 15px;
`;
const CloseButton = styled.span`
  cursor: pointer;
  color: #d5d4d4;
`;
const AddButton = styled.span`
  cursor: pointer;
  color: #61bbf7;
  ${fontSize(14)}
`;
class PollPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      postTypeId: props.postTypeId,
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
  }

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

  handleQuestionChange = e => {
    const { value } = e.target;
    this.setState({ question: value });
  };

  onPostPoll = () => {
    const { question, options, postTypeId } = this.state;
    const { onPostPoll, user, resetPostType } = this.props;
    const { isStudent, id } = user.user;
    const newArr = [];
    options.map(item => {
      if (item.text || item.url) {
        newArr.push(item);
      }
      return true;
    });
    // FOR OPTIONS WITH IMAGES
    newArr.map(item => {
      const formData = new FormData();
      if (item.img) {
        formData.append('file', item.img);
        formData.append('name', item.name);
        this.props.onUploadImage(formData);
      }
      return true;
    });
    // POST THE POLL
    onPostPoll({
      question,
      options: newArr,
      isStudent,
      id,
      type: postTypeId
    });
    resetPostType();
  };

  render() {
    const { username } = this.state;
    return (
      <div>
        <PostWrapper style={{ minHeight: 0 }}>
          <QuestionWrapper>
            <input
              placeholder={`What do you want to ask, ${username}?`}
              onChange={this.handleQuestionChange}
            />
          </QuestionWrapper>
          <div>
            <Button className="small rounded" onClick={this.onPostPoll}>
              Post
            </Button>
          </div>
        </PostWrapper>
        <PollOptionsWrapper>
          {/* -----------------SHOW OPTION FIELDS BY DEFAULT 3 FIELDS-----------------*/}
          {this.showAllOptions()}
          <AddButton onClick={this.addNewOption}>+Add option</AddButton>
        </PollOptionsWrapper>
      </div>
    );
  }
}

PollPost.propTypes = {
  username: PropTypes.string,
  postTypeId: PropTypes.number
};
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onPostPoll: value => dispatch(PostActions.onPostPoll(value)),
  onUploadImage: value => dispatch(PostActions.onUploadImage(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollPost);
