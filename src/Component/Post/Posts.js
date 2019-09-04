import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';
// import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../../Redux/PostRedux';
import SinglePost from './SinglePost';
import { SOCKET_URL } from '../../config';
import { ErrorAlertMessage } from '../StyledComponents';

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
    // //console.log('socket data user', user, this.socket);

    this.socket.on('posts', data => {
      // console.log('data socket', data, groupId);
      if (posts !== data.result && groupId.includes(data.group)) {
        this.setState({ posts: data.result });
      }
    });
  }

  componentWillReceiveProps(nextProp) {
    const { post } = this.props;
    const { posts } = post;
    if (
      posts !== nextProp.post.posts
      && this.state.posts !== nextProp.post.posts
    ) {
      this.setState({ posts: nextProp.post.posts });
    }
  }

  componentWillUnmount() {
    this.socket = null;
  }

  render() {
    const { post } = this.props;

    let { posts } = this.state;
    posts = posts.length > 1 ? posts.sort((a, b) => b.postId - a.postId) : posts;
    return (
      <div key={posts}>
        {post.error && <ErrorAlertMessage error={post.error} />}
        {posts.length > 0
          && posts.map((item, i) => {
            // //console.log(item.postIsStudent && item.student);
            // //console.log(!item.postIsStudent, item.user);
            // {
            //   //console.log(
            //     item.postId,
            //     (item.postIsStudent && item.student)
            //       || (!item.postIsStudent && item.user)
            //   );
            // }
            if (item.postIsDeleted || item.postIsBad) {
              return <div key={item + i} />;
            }
            if (
              (item.postIsStudent && item.student)
              || (!item.postIsStudent && item.user)
            ) {
              return <SinglePost key={item + i} data={item} />;
            }

            // return (!item.isStudent && item.user)
            //   || (item.isStudent && item.student) ? (
            //     <SinglePost key={item + i} data={item} />
            //   ) : (
            //     <div key={item + i} />
            //   );
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
