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
import { GroupTypes } from "../Redux/GroupRedux";
import { UserTypes } from "../Redux/UserRedux";
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
  onUploadImage,
  onRespondToPoll,
  onSubmitTagPost,
  onVideoPost
} from "./PostSaga";
import onListPostTypes from "./PostTypeSaga";
import onGetPostActivitiesOfAUser from "./PostActivitySaga";
import onSubmitComment from "./CommentSaga";
import onGetStrikesCountOfAUser from "./StrikeSaga";
import onGetAllBanners from "./BannerSaga";
import onGetAllUsersOfAGroup from "./GroupSaga";
import onGetUserInfo from "./UserSaga";

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
    takeLatest(PostTypes.ON_UPLOAD_IMAGE, onUploadImage),
    takeLatest(PostTypes.ON_SUBMIT_TAG_POST, onSubmitTagPost),
    takeLatest(PostTypes.ON_RESPOND_TO_POLL, onRespondToPoll),
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
    takeLatest(BannerTypes.ON_GET_ALL_BANNERS, onGetAllBanners),
    takeLatest(GroupTypes.ON_GET_ALL_USERS_OF_A_GROUP, onGetAllUsersOfAGroup),
    takeLatest(UserTypes.ON_GET_USER_INFO, onGetUserInfo)
  ]);
}
