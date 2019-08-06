import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';
import PostAction from '../../Redux/PostRedux';
import SinglePost from './SinglePost';
import EditSinglePost from './EditSinglePost';
import { SOCKET_URL } from '../../config';
import { ErrorAlertMessage } from '../StyledComponents';

import styled from '@emotion/styled';

import { Colors, Images } from '../../Theme';

const { snow } = Colors.colors;

// const socket = io.connect('http://localhost:4000');

const ModalContainer = styled.div`
  position: fixed;

  height: 100%;
  width: 100%;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalBox = styled.div`
  width: 50%;
  min-width: 50%;
  min-height: 200px;
  margin: auto;

  vertical-align: center;
  border-radius: 40px;
  padding: 20px;
  .close {
    cursor: pointer;
    margin-top: -10px;
    color: red;
    text-align: right;
  }
`;

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],

      modalpopupid: 0,
      modalpopup: false
    };
    this.socket = socketClient(SOCKET_URL);
  }

  componentWillMount() {
    const { onFindPosts, user, post } = this.props;
    const { posts } = post;
    const { isStudent, id } = user.user;

    onFindPosts({ isStudent, actorId: id });
    this.setState({ posts });
  }

  componentDidMount() {
    const { user } = this.props;
    const { posts } = this.state;
    const { groupId } = user.user;
    // console.log('socket data user', user, this.socket);

    this.socket.on('posts', data => {
      console.log('emitted', data.result);
      if (posts !== data.result && groupId.includes(data.group)) {
        this.setState({ posts: data.result });
      }
    });
    this.socket.on('strikes', data => {
      console.log('strikes posts', data);
    });
  }

  componentWillReceiveProps(nextProp) {
    const { post } = this.props;
    const { posts } = post;
    if (
      posts !== nextProp.post.posts &&
      this.state.posts !== nextProp.post.posts
    ) {
      this.setState({ posts: nextProp.post.posts });
    }
  }

  componentWillUnmount() {
    this.socket = null;
  }

  modalpopup = values => {
    console.log('modal popup values', values);

    this.setState(
      {
        modalpopup: !this.state.modalpopup,
        modalpopupid: values
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    const { post } = this.props;
    let { posts } = this.state;

    console.log('post>>>>', posts);
    posts = posts.length > 1 ? posts.sort((a, b) => b.p_id - a.p_id) : posts;
    return (
      <div key={posts}>
        {post.error && <ErrorAlertMessage error={post.error} />}
        {posts.length > 0 &&
          posts.map((item, i) =>
            item.user || item.student ? (
              <SinglePost
                key={item + i}
                data={item}
                modalpopup={this.modalpopup}
              />
            ) : (
              <div key={item + i} />
            )
          )}

        {this.state.modalpopup &&
          posts.map(post => {
            console.log(post);
            return post.p_id === this.state.modalpopupid ? (
              <ModalContainer>
                <ModalBox
                  style={{
                    marginTop: '200px'
                  }}
                >
                  <EditSinglePost data={post} />
                </ModalBox>
              </ModalContainer>
            ) : null;
          })}
      </div>
    );
  }
}
Posts.propTypes = {
  onFindPosts: PropTypes.func,
  user: PropTypes.object,
  post: PropTypes.object
};

const mapStateToProps = state => ({
  post: state.post,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onListPosts: () => dispatch(PostAction.onListPosts()),
  onFindPosts: value => dispatch(PostAction.onFindPosts(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
