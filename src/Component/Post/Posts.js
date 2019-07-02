import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostAction from '../../Redux/PostRedux';
import SinglePost from './SinglePost';

class Posts extends Component {
  componentWillMount() {
    const { onListPosts } = this.props;
    onListPosts();
  }

  render() {
    const { post } = this.props;
    const { posts } = post;
    posts.sort((a, b) => b.p_id - a.p_id);
    return (
      <div>
        {posts.length > 0
          && posts.map((item, i) => <SinglePost key={item + i} data={item} />)}
      </div>
    );
  }
}
Posts.propTypes = {
  onListPosts: PropTypes.func,
  post: PropTypes.object
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  onListPosts: () => dispatch(PostAction.onListPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
