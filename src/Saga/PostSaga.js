import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL, GIPHY_API } from '../config';
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
    console.log('saga data', action.data);
    const { page, pageSize } = action.data;
    // const { data } = yield call(
    //   axios.post,
    //   `${DEV_URL}/post/findFeedsOfAGroup/${page}/${pageSize}`,
    //   action.data
    // );
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/post/findFeedsOfAGroup`,
      action.data
    );
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

export function* onFindGif(action) {
  try {
    // axios.defaults.headers.common =
    const { data } = yield call(
      axios,
      `http://api.giphy.com/v1/gifs/search?q=${
        action.data
      }&api_key=${GIPHY_API}`,
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
      `http://api.giphy.com/v1/gifs/search?q=${text}&api_key=${GIPHY_API}&limit=${limit}`,
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
  console.log('onPostImage action', action);
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

export function* onCommentDelete(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/onCommentDelete`,
      action.data
    );
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
