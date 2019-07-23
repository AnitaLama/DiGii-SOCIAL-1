import { takeLatest, all } from "redux-saga/effects";
import { TestTypes } from "../Redux/TestRedux";
import testFunction from "./TestSaga";
import { LoginTypes } from "../Redux/LoginRedux";
import { PostTypes } from "../Redux/PostRedux";
import { StrikeTypes } from "../Redux/StrikeRedux";
import { PostTypeTypes } from "../Redux/PostTypeRedux";
import { PostActivityTypes } from "../Redux/PostActivityRedux";
import { CommentTypes } from "../Redux/CommentRedux";
import { BannerTypes } from "../Redux/BannerRedux";
import {
  onLoginRequest,
  onStudentLoginRequest,
  onBlockUser
} from "./LoginSaga";
import {
  onListPosts,
  onFindPosts,
  onPostSubmit,
  onFindGif,
  onPostImage,
  onPostPoll,
  onVideoPost
} from "./PostSaga";
import onListPostTypes from "./PostTypeSaga";
import onGetPostActivitiesOfAUser from "./PostActivitySaga";
import onSubmitComment from "./CommentSaga";
import onGetStrikesCountOfAUser from "./StrikeSaga";
import onGetAllBanners from "./BannerSaga";

export default function* root() {
  yield all([
    takeLatest(TestTypes.ON_TEST_REQUEST, testFunction),
    takeLatest(LoginTypes.ON_FORM_LOGIN_REQUEST, onLoginRequest),
    takeLatest(LoginTypes.ON_BLOCK_USER, onBlockUser),
    takeLatest(LoginTypes.ON_STUDENT_FORM_LOGIN_REQUEST, onStudentLoginRequest),

    takeLatest(PostTypes.ON_LIST_POSTS, onListPosts),
    takeLatest(PostTypes.ON_VIDEO_POST, onVideoPost),

    takeLatest(PostTypes.ON_FIND_POSTS, onFindPosts),
    takeLatest(PostTypes.ON_FIND_GIF, onFindGif),
    takeLatest(PostTypes.ON_POST_SUBMIT, onPostSubmit),
    takeLatest(PostTypes.ON_POST_IMAGE, onPostImage),
    takeLatest(PostTypes.ON_POST_POLL, onPostPoll),
    takeLatest(PostTypeTypes.ON_LIST_POST_TYPES, onListPostTypes),
    takeLatest(CommentTypes.ON_SUBMIT_COMMENT_REQUEST, onSubmitComment),
    takeLatest(
      PostActivityTypes.ON_GET_POST_ACTIVITIES_OF_A_USER,
      onGetPostActivitiesOfAUser
    ),
    takeLatest(
      StrikeTypes.ON_GET_STRIKES_COUNT_OF_A_USER,
      onGetStrikesCountOfAUser
    ),
    takeLatest(BannerTypes.ON_GET_ALL_BANNERS, onGetAllBanners)
  ]);
  // yield all([takeLatest(LoginTypes.ON_FORM_LOGIN_REQUEST, onLoginRequest)]);
  // yield all([
  //   takeLatest(LoginTypes.ON_STUDENT_FORM_LOGIN_REQUEST, onStudentLoginRequest)
  // ]);
  // yield all([takeLatest(PostTypes.ON_LIST_POSTS, onListPosts)]);
  // yield all([takeLatest(PostTypes.ON_FIND_POSTS, onFindPosts)]);
  // yield all([takeLatest(PostTypes.ON_POST_SUBMIT, onPostSubmit)]);
  // yield all([takeLatest(PostTypeTypes.ON_LIST_POST_TYPES, onListPostTypes)]);
  // yield all([
  //   takeLatest(CommentTypes.ON_SUBMIT_COMMENT_REQUEST, onSubmitComment)
  // ]);
  // yield all([
  //   takeLatest(
  //     PostActivityTypes.ON_GET_POST_ACTIVITIES_OF_A_USER,
  //     onGetPostActivitiesOfAUser
  //   )
  // ]);
}
