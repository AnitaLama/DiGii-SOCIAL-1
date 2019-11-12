import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL, GIPHY_API } from '../utils/config';
import PostActions from '../Redux/PostRedux';

const URL = `${DEV_URL}/post`;
const defaultOptions = {
  header: {}
};
export function* onListPosts() {
  try {
    const { data } = yield call(axios.get, `${URL}`);
    if (data.success) {
      yield put(PostActions.onListPostsSuccess(data.result));
    } else {
      yield put(PostActions.onListPostsFailure(data.error));
    }
  } catch (err) {
    console.log(err);
    // yield put(PostActions.onListPostsFailure(err.toString()));
  }
}

export function* onFindPosts(action) {
  try {
    const { page, pageSize, schoolGroupId } = action.data;
    // const { data } = yield call(
    //   axios.post,
    //   `${DEV_URL}/post/findFeedsOfAGroup/${page}/${pageSize}`,
    //   action.data
    // );
    const limit = page || 1;
    const offset = pageSize || 20;
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/post/findFeedsOfAGroup/${limit}/${offset}`,
      {
        schoolGroupId
      }
    );
    // console.log('posts saga', limit, offset, data);
    if (data.success) {
      yield put(PostActions.onFindPostsSuccess(data.result));
    } else {
      yield put(PostActions.onFindPostsFailure(data.error));
    }
  } catch (err) {
    console.log(err.toString());
    // yield put(PostActions.onFindPostsFailure(err.toString()));
  }
}

export function* onPostSubmit(action) {
  try {
    const { data } = yield call(axios.post, `${URL}/addPost`, action.data);
    if (data.success) {
      yield put(PostActions.onPostSubmitSuccess(data.result));
    } else {
      yield put(PostActions.onPostSubmitFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onTextPostSubmit(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/moderation/addPost`,
      action.data
    );
    if (data.success) {
      yield put(PostActions.onTextPostSubmitSuccess(data.result));
    } else {
      yield put(PostActions.onTextPostSubmitFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
export function* onFindGif(action) {
  try {
    const limit = 9;
    console.log('search saga', action.data);
    const { data } = yield call(
      axios,
      `http://api.giphy.com/v1/gifs/search?rating=g&q=${
        action.data
      }&api_key=${GIPHY_API}&limit=${limit}`,
      {
        transformRequest: [
          (data, headers) => {
            delete headers.common.Authorization;
            return data;
          }
        ]
      }
    );

    if (data) {
      yield put(PostActions.onFindGifSuccess(data.data));
    } else {
      yield put(PostActions.onFindGifFailure('Couldn\'t find gif'));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onFindGifForComments(action) {
  try {
    const { text, limit } = action.data;
    const { data } = yield call(
      axios,
      `http://api.giphy.com/v1/gifs/search?rating=g&q=${text}&api_key=${GIPHY_API}&limit=${limit}`,
      {
        transformRequest: [
          (data, headers) => {
            delete headers.common.Authorization;
            return data;
          }
        ]
      }
    );

    if (data) {
      yield put(PostActions.onFindGifForCommentsSuccess(data.data));
    } else {
      yield put(PostActions.onFindGifForCommentsFailure('Couldn\'t find gif'));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onPostImage(action) {
  // console.log('onPostImage action', action);
  try {
    const data = yield call(axios.post, `${URL}/addImagePost`, action.data);
  } catch (err) {
    console.log(err);
  }
}

export function* onUploadImage(action) {
  try {
    const data = yield call(axios.post, `${URL}/uploadImage`, action.data);
  } catch (err) {
    console.log(err);
  }
}

export function* onPostPoll(action) {
  try {
    const data = yield call(axios.post, `${URL}/addNewPoll`, action.data);
  } catch (err) {
    console.log(err);
  }
}

export function* onVideoPost(action) {
  try {
    const data = yield call(axios.post, `${URL}/uploadVideo`, action.data);
  } catch (err) {
    console.log(err);
  }
}

export function* onRespondToPoll(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/voteForThePoll`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}

export function* onSubmitTagPost(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/addNewTagPost`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}

export function* onPostDelete(action) {
  try {
    const { data } = yield call(axios.post, `${URL}/onPostDelete`, action.data);
  } catch (err) {
    console.log(err);
  }
}

export function* onMasterDelete(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/onMasterDelete`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}

export function* onEditPost(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/updateThePost`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}

export function* reportAnArticle(action) {
  try {
    const { data } = yield call(axios.post, `${URL}/reportAnArticle`);
  } catch (err) {
    console.log(err);
  }
}

export function* onSubmitPost(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/moderation/addPost`,
      action.data
    );
    if (data.success) {
      yield put(PostActions.onPostSubmitSuccess(data.result));
    } else {
      yield put(PostActions.onPostSubmitFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
