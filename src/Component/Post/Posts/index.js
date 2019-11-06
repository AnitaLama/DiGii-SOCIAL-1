import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';
// import InfiniteScroll from 'react-infinite-scroll-component';
import debounce from 'lodash.debounce';
import PostAction from '../../../Redux/PostRedux';
import StrikeActions from '../../../Redux/StrikeRedux';
import SinglePost from '../SinglePost';
import { SOCKET_URL } from '../../../utils/config';
import { ErrorAlertMessage, Loader } from '../../StyledComponents';
import PostActivityAction from '../../../Redux/PostActivityRedux';

// const socket = io.connect('http://localhost:4000');
class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      error: false,
      hasMore: true,
      isLoading: false,
      page: 1
    };
    this.socket = socketClient(SOCKET_URL);

    window.onscroll = debounce(() => {
      const {
        loadUsers,
        state: { error, isLoading, hasMore }
      } = this;

      if (error || isLoading || !hasMore) return;

      if (this.postContainer) {
        const boxHeight = this.postContainer.clientHeight || document.body.scrollHeight;
        const { scrollHeight } = document.body;
        if (
          window.innerHeight + document.documentElement.scrollTop
          >= boxHeight + 120
        ) {
          this.loadMorePosts();
        }
      }
    }, 100);
  }

  loadMorePosts = () => {
    const { page } = this.state;
    const { user, onFindPosts } = this.props;
    const { isStudent, id, groupId } = user.user;
    this.setState({ page: page + 1 }, () => {
      console.log('load more posts', this.state.page);
    });
    onFindPosts({ schoolGroupId: groupId, page: page + 1 });
  };

  selectAPost = post => {
    this.setState({ selectedPost: post.postId });
  };

  componentWillMount() {
    const {
      onFindPosts,
      user,
      post,
      onGetPostActivitiesReactionTypes
    } = this.props;
    const { posts } = post;
    const { groupId } = user.user;
    const { page } = this.state;
    onGetPostActivitiesReactionTypes();
    !posts.length && onFindPosts({ schoolGroupId: groupId });
    this.setState({ posts });
  }

  componentDidMount() {
    const { user, onGetStrikesCountOfAUser } = this.props;
    const { posts } = this.state;
    const { groupId, id, isStudent } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    this.socket.on('posts', data => {
      // console.log('socket data', data);
      const { result, group } = data;
      if (groupId.includes(group)) {
        const checkIfPostExists = this.state.posts.find(
          item => item.postId === result[0].postId
        );
        if (!checkIfPostExists) {
          const newPostArray = [result[0], ...this.state.posts];
          // newPostArray.push(result[0]);
          this.setState({ posts: newPostArray });
        } else {
          const newPostArray = this.state.posts.map(item => {
            if (item.postId === result[0].postId) {
              return result[0];
            }
            return item;
          });

          this.setState({ posts: newPostArray });
        }
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
    const { posts, selectedPost } = this.state;
    // posts = posts.length > 1 ? posts.sort((a, b) => b.postId - a.postId) : posts;
    // console.log('posts', posts);
    if (!posts || posts.length === 0) {
      return (
        <div
          style={{
            textAlign: 'center'
          }}
        >
          <Loader color="red" size={20} />
        </div>
      );
    }
    return (
      <div key={posts} ref={r => (this.postContainer = r)}>
        {post.error && <ErrorAlertMessage error={post.error} />}
        {posts.length > 0
          && posts.map((item, i) => {
            if (item.postIsDeleted || item.postIsBad) {
              return <div key={item + i} />;
            }
            if (
              (item.postIsStudent && item.student)
              || (!item.postIsStudent && item.user)
            ) {
              // return (
              //   <div>
              //     post:
              //     {item.postText}
              //   </div>
              // );
              return (
                <SinglePost
                  key={item + i}
                  data={item}
                  selectAPost={this.selectAPost}
                  selectedPost={selectedPost}
                />
              );
            }
            return true;
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
  user: state.user,
  strike: state.strike
});

const mapDispatchToProps = dispatch => ({
  onListPosts: () => dispatch(PostAction.onListPosts()),
  onFindPosts: value => dispatch(PostAction.onFindPosts(value)),
  onGetPostActivitiesReactionTypes: value => dispatch(PostActivityAction.onGetPostActivitiesReactionTypes(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
