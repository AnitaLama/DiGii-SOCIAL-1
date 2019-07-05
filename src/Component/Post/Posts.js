import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';
import PostAction from '../../Redux/PostRedux';
import SinglePost from './SinglePost';
import { SOCKET_URL } from '../../config';

// const socket = io.connect('http://localhost:4000');
class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
    this.socket = socketClient(SOCKET_URL);
  }

  componentWillMount() {
    const {
      onListPosts, onFindPosts, user, post
    } = this.props;
    const { posts } = post;
    const { isStudent, id } = user.user;
    // onListPosts();
    onFindPosts({ isStudent, actorId: id });
    this.setState({ posts });
  }

  componentDidMount() {
    const { posts } = this.state;
    this.socket.on('news', data => {
      // console.log('socket data', data);
      if (posts !== data.result) {
        this.setState({ posts: data.result });
      }
    });
  }

  componentWillUnmount() {
    this.socket = null;
  }

  render() {
    let { posts } = this.state;
    posts = posts.length > 1 ? posts.sort((a, b) => b.p_id - a.p_id) : posts;
    return (
      <div key={posts}>
        {posts.length > 0
          && posts.map((item, i) => (item.user || item.student ? (
            <SinglePost key={item + i} data={item} />
          ) : (
            <div key={item + i} />
          )))}
      </div>
    );
  }
}
Posts.propTypes = {
  onListPosts: PropTypes.func
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
