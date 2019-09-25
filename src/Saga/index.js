import { takeLatest, all } from 'redux-saga/effects';
import { TestTypes } from '../Redux/TestRedux';
import testFunction from './TestSaga';
import { LoginTypes } from '../Redux/LoginRedux';
import { PostTypes } from '../Redux/PostRedux';
import { StrikeTypes } from '../Redux/StrikeRedux';
import { PostTypeTypes } from '../Redux/PostTypeRedux';
import { PostActivityTypes } from '../Redux/PostActivityRedux';
import { CommentTypes } from '../Redux/CommentRedux';
import { BannerTypes } from '../Redux/BannerRedux';
import { GroupTypes } from '../Redux/GroupRedux';
import { ProfileTypes } from '../Redux/ProfileRedux';
import { TutorialTypes } from '../Redux/TutorialRedux';
import { SchoolTypes } from '../Redux/SchoolRedux';
import { HelperTypes } from '../Redux/HelperRedux';
import { ReportTypes } from '../Redux/ReportRedux';

import {
  onLoginRequest,
  onStudentLoginRequest,
  onBlockUser
} from './LoginSaga';
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
  onVideoPost,
  onPostDelete,
  onMasterDelete,
  onEditPost,
  onFindGifForComments
} from './PostSaga';
import onListPostTypes from './PostTypeSaga';
import {
  onGetPostActivitiesOfAUser,
  onGetPostActivitiesReactionTypes,
  onSelectReaction
} from './PostActivitySaga';
import { onSubmitComment, onCommentDelete } from './CommentSaga';
import { onGetStrikesCountOfAUser, resetStrikes } from './StrikeSaga';
import onGetAllBanners from './BannerSaga';
import onGetAllUsersOfAGroup from './GroupSaga';
import {
  onGetUserInfo,
  onGetAvatarOfTheUser,
  onSaveMyAvatar
} from './ProfileSaga';
import { onTutorialRequest, onSaveTutorialWatchersInfo } from './TutorialSaga';
import onGetAllSchools from './SchoolSaga';
import {
  onGetAllInternalHelpers,
  onSaveNeedHelp,
  onGetHelpNotificationsCount
} from './HelperSaga';
import onReportTheArticle from './ReportSaga';

export default function* root() {
  yield all([
    takeLatest(TestTypes.ON_TEST_REQUEST, testFunction),
    takeLatest(LoginTypes.ON_FORM_LOGIN_REQUEST, onLoginRequest),

    takeLatest(LoginTypes.ON_BLOCK_USER, onBlockUser),
    takeLatest(LoginTypes.ON_STUDENT_FORM_LOGIN_REQUEST, onStudentLoginRequest),
    takeLatest(LoginTypes.ON_SAVE_MY_AVATAR, onSaveMyAvatar),

    takeLatest(PostTypes.ON_LIST_POSTS, onListPosts),

    takeLatest(PostTypes.ON_FIND_POSTS, onFindPosts),
    takeLatest(PostTypes.ON_FIND_GIF, onFindGif),
    takeLatest(PostTypes.ON_FIND_GIF_FOR_COMMENTS, onFindGifForComments),
    takeLatest(PostTypes.ON_POST_SUBMIT, onPostSubmit),
    takeLatest(PostTypes.ON_POST_IMAGE, onPostImage),
    takeLatest(PostTypes.ON_POST_POLL, onPostPoll),
    takeLatest(PostTypes.ON_UPLOAD_IMAGE, onUploadImage),
    takeLatest(PostTypes.ON_VIDEO_POST, onVideoPost),
    takeLatest(PostTypes.ON_SUBMIT_TAG_POST, onSubmitTagPost),
    takeLatest(PostTypes.ON_RESPOND_TO_POLL, onRespondToPoll),
    takeLatest(PostTypes.ON_MASTER_DELETE, onMasterDelete),
    takeLatest(PostTypeTypes.ON_LIST_POST_TYPES, onListPostTypes),
    takeLatest(CommentTypes.ON_SUBMIT_COMMENT_REQUEST, onSubmitComment),
    takeLatest(
      PostActivityTypes.ON_GET_POST_ACTIVITIES_OF_A_USER,
      onGetPostActivitiesOfAUser
    ),
    takeLatest(
      PostActivityTypes.ON_GET_POST_ACTIVITIES_REACTION_TYPES,
      onGetPostActivitiesReactionTypes
    ),
    takeLatest(PostActivityTypes.ON_SELECT_REACTION, onSelectReaction),

    takeLatest(
      StrikeTypes.ON_GET_STRIKES_COUNT_OF_A_USER,
      onGetStrikesCountOfAUser
    ),
    takeLatest(StrikeTypes.RESET_STRIKES, resetStrikes),
    takeLatest(BannerTypes.ON_GET_ALL_BANNERS, onGetAllBanners),
    takeLatest(GroupTypes.ON_GET_ALL_USERS_OF_A_GROUP, onGetAllUsersOfAGroup),
    takeLatest(ProfileTypes.ON_GET_USER_INFO, onGetUserInfo),
    takeLatest(ProfileTypes.ON_GET_AVATAR_OF_THE_USER, onGetAvatarOfTheUser),
    takeLatest(PostTypes.ON_POST_DELETE, onPostDelete),
    takeLatest(PostTypes.ON_COMMENT_DELETE, onCommentDelete),
    takeLatest(PostTypes.ON_EDIT_POST, onEditPost),
    takeLatest(TutorialTypes.ON_TUTORIAL_REQUEST, onTutorialRequest),
    takeLatest(
      TutorialTypes.ON_SAVE_TUTORIAL_WATCHERS_INFO,
      onSaveTutorialWatchersInfo
    ),
    takeLatest(SchoolTypes.ON_GET_ALL_SCHOOLS, onGetAllSchools),
    takeLatest(
      HelperTypes.ON_GET_ALL_INTERNAL_HELPERS,
      onGetAllInternalHelpers
    ),
    takeLatest(HelperTypes.ON_SAVE_NEED_HELP, onSaveNeedHelp),
    takeLatest(
      HelperTypes.ON_GET_HELP_NOTIFICATIONS_COUNT,
      onGetHelpNotificationsCount
    ),
    takeLatest(ReportTypes.ON_REPORT_THE_ARTICLE, onReportTheArticle)
  ]);
}
