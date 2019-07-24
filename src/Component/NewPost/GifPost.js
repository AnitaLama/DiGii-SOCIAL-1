import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FormTextArea, Button } from '../StyledComponents';
import { FilterKeyWords, PostWrapper } from './index';
import PostActions from '../../Redux/PostRedux';
import { Colors } from '../../Theme';

const { primary } = Colors.colors;
const GifInputForm = styled.div`
  display: flex;
`;
const Input = styled.div`
  input {
    border: 0;
    outline: 0;
  }
`;
const GifImage = styled.img`
  height: 70px;
  width: 70px;
`;
const CloseButton = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: ${primary};
  cursor: pointer;
  margin-top: -14px;
  margin-right: -8px;
`;
class GifContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeId: props.postTypeId,
      searchText: '',
      showPostButton: false,
      selectedGif: props.selectedGif,
      caption: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedGif } = this.state;
    if (
      this.props.selectedGif !== nextProps.selectedGif
      && selectedGif !== nextProps.selectedGif
    ) {
      this.setState({ selectedGif: nextProps.selectedGif });
    }
  }

  handleInputChange = event => {
    const { value } = event.target;

    this.setState({ searchText: value });
    const hasFilteredWords = FilterKeyWords(value);
    console.log('filtered word', hasFilteredWords);

    this.setState({ showPostButton: !hasFilteredWords });
  };

  showButton = () => {
    this.setState({
      showPostButton: true
    });
  };

  findGif = () => {
    const { searchText } = this.state;
    const { onFindGif } = this.props;
    onFindGif(searchText);
  };

  submitPost = () => {
    const { postTypeId, selectedGif, caption } = this.state;
    const { user, onPostSubmit, resetPostType } = this.props;
    const { isStudent, id } = user.user;

    const data = {
      p_pt_id: postTypeId,
      p_body: selectedGif.images.downsized_medium.url,
      p_isStudent: isStudent,
      p_actor_id: id,
      p_text: caption
    };
    onPostSubmit(data);
    resetPostType();
    // this.setState({ selectedGif: null });
  };

  removeGif = () => {
    this.setState({ selectedGif: null });
  };

  handleCaptionText = e => {
    this.setState({ caption: e.target.value });
  };

  render() {
    const { selectedGif } = this.state;

    if (!selectedGif) {
      return (
        <PostWrapper>
          <Input>
            <input
              onFocus={this.showButton}
              onChange={this.handleInputChange}
              placeholder="Type in ..."
            />
          </Input>
          <div>
            <Button className="rounded small short" onClick={this.findGif}>
              Find
            </Button>
          </div>
        </PostWrapper>
      );
    }
    // SHOW SELECTED GIF IN THE POST BOX
    return (
      <PostWrapper>
        <GifInputForm>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <GifImage src={selectedGif.images.downsized_medium.url} />
            <CloseButton onClick={this.removeGif}>
              <FaTimes />
            </CloseButton>
          </div>
          <FormTextArea
            placeholder="Write something..."
            onChange={this.handleCaptionText}
          />
        </GifInputForm>
        <div>
          <Button className="rounded small" onClick={this.submitPost}>
            Post
          </Button>
        </div>
      </PostWrapper>
    );
  }
}

GifContainer.propTypes = {
  postTypeId: PropTypes.string,
  user: PropTypes.object,
  onFindGif: PropTypes.func,
  onPostSubmit: PropTypes.func,
  resetPostType: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onFindGif: value => dispatch(PostActions.onFindGif(value)),
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifContainer);
