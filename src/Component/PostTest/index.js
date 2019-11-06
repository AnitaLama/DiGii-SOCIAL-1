import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostActions from '../../Redux/PostRedux.js';

const { onFindPosts } = PostActions;

class Posts extends Component {
  componentDidMount() {
    const { user, onFindPosts } = this.props;
    const { groupId } = user;
    onFindPosts({ schoolGroupId: groupId });
  }

  render() {
    const { user, posts } = this.props;
    const { groupId } = user;
    console.log('groupId', posts);

    return (
      <div>
        {posts
          && posts.map(post => (
            <div>
              post:
              {post.postText}
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  posts: state.post.posts
});
const mapDispatchToProps = dispatch => ({
  onFindPosts: value => dispatch(onFindPosts(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
