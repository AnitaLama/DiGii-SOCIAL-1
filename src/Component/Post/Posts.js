// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import socketClient from 'socket.io-client';
// import { notification } from 'antd';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import PostAction from '../../Redux/PostRedux';
// import SinglePost from './SinglePost';
// import { SOCKET_URL } from '../../config';
// import { Loader } from '../StyledComponents';
// import { Colors } from '../../Theme';
//
// const { blue } = Colors.colors;
//
// const LoadMore = () => (
//   <div
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center'
//     }}
//   >
//     <Loader />
//   </div>
// );
// const showErrorNotifications = message => {
//   notification.error({
//     message: 'Notification Title',
//     description: message
//   });
// };
// // const socket = io.connect('http://localhost:4000');
// class Posts extends Component {
//   constructor() {
//     super();
//     this.state = {
//       posts: [],
//       postSubset: [],
//       cursor: 0,
//       page: 1,
//       pageSize: 20
//     };
//     this.socket = socketClient(SOCKET_URL);
//   }
//
//   componentWillMount() {
//     const { onFindPosts, user, post } = this.props;
//     const { posts, page, pageSize } = post;
//     const { isStudent, id } = user.user;
//     onFindPosts({
//       isStudent,
//       actorId: id,
//       page,
//       pageSize
//     });
//     this.setState({
//       posts,
//       postSubset: posts.length > pageSize ? posts.splice(page, pageSize) : posts
//     });
//   }
//
//   componentDidMount() {
//     const { user } = this.props;
//     const { posts } = this.state;
//     const { groupId } = user.user;
//     // console.log('socket data user', user, this.socket);
//
//     this.socket.on('posts', data => {
//       const { page, pageSize } = this.state;
//       console.log(data.result === posts, data.result);
//       if (posts !== data.result && groupId.includes(data.group)) {
//         this.setState(
//           {
//             posts: data.result
//           },
//           () => {
//             this.setState({
//               postSubset:
//                 posts.length > pageSize ? posts.splice(page, pageSize) : posts
//             });
//           }
//         );
//       }
//     });
//   }
//
//   loadMore = () => {
//     console.log('loadmore', this.state.cursor);
//     // this.setState({ cursor: this.state.cursor + 1 });
//   };
//
//   componentWillReceiveProps(nextProp) {
//     const { post } = this.props;
//     const { page, pageSize } = this.state;
//     const { posts } = post;
//     if (
//       posts !== nextProp.post.posts
//       && this.state.posts !== nextProp.post.posts
//     ) {
//       console.log('>>>>>>>>>>>>', posts);
//       console.log('>>>>>>>>>>>>', nextProp.post.posts);
//       console.log('>>>>>>>>>>>>', this.state.posts);
//       this.setState({
//         posts: nextProp.post.posts
//       });
//     }
//   }
//
//   componentWillUnmount() {
//     this.socket = null;
//   }
//
//   render() {
//     const { post } = this.props;
//
//     let {
//       posts, page, pageSize, postSubset
//     } = this.state;
//     console.log('>>>>>>>>>>>>>>>postsubset', postSubset);
//     posts = posts.length > 1 ? posts.sort((a, b) => b.postId - a.postId) : posts;
//     return (
//       <div key={posts}>
//         {post.error && showErrorNotifications(post.error)}
//         {console.log('posts', posts, this.state.postSubset)}
//
//         {posts.length > 0 && (
//           <InfiniteScroll
//             dataLength={pageSize}
//             next={() => {
//               setTimeout(() => {
//                 this.setState({
//                   postSubset: this.state.postSubset.concat(
//                     this.state.posts.splice(page + 1 * pageSize, pageSize)
//                   ),
//                   page: page + 1
//                 });
//               }, 1500);
//             }}
//             hasMore
//             loader={<LoadMore />}
//             style={{
//               overflow: 'visible'
//             }}
//           >
//             {console.log('>>>>>>>>>>>>>>>>>>', postSubset.length, postSubset)}
//             {postSubset.length > 0
//               && postSubset.map((item, i) => {
//                 // console.log(item.postIsStudent && item.student);
//                 // console.log(!item.postIsStudent, item.user);
//                 // {
//                 //   console.log(
//                 //     item.postId,
//                 //     (item.postIsStudent && item.student)
//                 //       || (!item.postIsStudent && item.user)
//                 //   );
//                 // }
//                 if (item.postIsDeleted || item.postIsBad) {
//                   return <div key={item + i} />;
//                 }
//                 if (
//                   (item.postIsStudent && item.student)
//                   || (!item.postIsStudent && item.user)
//                 ) {
//                   return <SinglePost key={item + i} data={item} />;
//                 }
//                 return <div key={item + i} />;
//
//                 // return (!item.isStudent && item.user)
//                 //   || (item.isStudent && item.student) ? (
//                 //     <SinglePost key={item + i} data={item} />
//                 //   ) : (
//                 //     <div key={item + i} />
//                 //   );
//               })}
//           </InfiniteScroll>
//         )}
//       </div>
//     );
//   }
// }
// Posts.propTypes = {
//   onFindPosts: PropTypes.func,
//   user: PropTypes.object,
//   post: PropTypes.object
// };
//
// const mapStateToProps = state => ({
//   post: state.post,
//   user: state.user
// });
//
// const mapDispatchToProps = dispatch => ({
//   onListPosts: () => dispatch(PostAction.onListPosts()),
//   onFindPosts: value => dispatch(PostAction.onFindPosts(value))
// });
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Posts);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';
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
    // console.log('socket data user', user, this.socket);

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
            // console.log(item.postIsStudent && item.student);
            // console.log(!item.postIsStudent, item.user);
            // {
            //   console.log(
            //     item.postId,
            //     (item.postIsStudent && item.student)
            //       || (!item.postIsStudent && item.user)
            //   );
            // }
            if ((item.postIsDeleted, item.postIsBad)) {
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
