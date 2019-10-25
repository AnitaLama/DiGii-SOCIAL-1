import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';
// import InfiniteScroll from 'react-infinite-scroll-component';
import debounce from 'lodash.debounce';
import PostAction from '../../../Redux/PostRedux';
import SinglePost from '../SinglePost';
import { SOCKET_URL } from '../../../utils/config';
import { ErrorAlertMessage } from '../../StyledComponents';
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
    // const {
    //   onFindPosts,
    //   user,
    //   post,
    //   onGetPostActivitiesReactionTypes
    // } = this.props;
    // const { posts } = post;
    // const { isStudent, id } = user.user;
    window.onscroll = debounce(() => {
      const {
        loadUsers,
        state: { error, isLoading, hasMore }
      } = this;

      if (error || isLoading || !hasMore) return;
      // console.log(
      //   'LOADING>>>>> INNERHEIGHT',
      //   window.innerHeight,
      //   document.documentElement.scrollTop,
      //   document.documentElement.offsetHeight
      // );
      console.log(
        'LOADING>>>>> INNERHEIGHT',
        window.innerHeight,
        document.documentElement.scrollTop,
        document.body.offsetHeight,
        this.postContainer.clientHeight,
        document.body.scrollHeight
      );
      const boxHeight = this.postContainer.clientHeight || document.body.scrollHeight;
      const { scrollHeight } = document.body;
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= boxHeight + 120
      ) {
        console.log('LOADING>>>reached bottom');
        this.loadMorePosts();
        // onFindPosts({ isStudent, actorId: id });
        // loadUsers();
      }
    }, 100);
  }

  loadMorePosts = () => {
    console.log('LOAD MORE POSTS');
    const { page } = this.state;
    const { user, onFindPosts } = this.props;
    const { isStudent, id } = user.user;

    this.setState({ page: page + 1 });
    onFindPosts({ isStudent, actorId: id, page: page + 1 });
  };

  componentWillMount() {
    const {
      onFindPosts,
      user,
      post,
      onGetPostActivitiesReactionTypes
    } = this.props;
    const { posts } = post;
    const { isStudent, id } = user.user;
    onGetPostActivitiesReactionTypes();
    onFindPosts({ isStudent, actorId: id });
    this.setState({ posts });
  }

  componentDidMount() {
    const { user } = this.props;
    const { posts } = this.state;
    const { groupId } = user.user;

    this.socket.on('posts', data => {
      const { result, group } = data;
      if (groupId.includes(group)) {
        const checkIfPostExists = this.state.posts.find(
          item => item.postId === result[0].postId
        );
        if (!checkIfPostExists) {
          const newPostArray = this.state.posts;
          newPostArray.push(result[0]);
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

    let { posts } = this.state;
    posts = posts.length > 1 ? posts.sort((a, b) => b.postId - a.postId) : posts;
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
              return <SinglePost key={item + i} data={item} />;
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
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onListPosts: () => dispatch(PostAction.onListPosts()),
  onFindPosts: value => dispatch(PostAction.onFindPosts(value)),
  onGetPostActivitiesReactionTypes: value => dispatch(PostActivityAction.onGetPostActivitiesReactionTypes(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
