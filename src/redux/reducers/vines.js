import $ from 'jquery';

export const LOAD_VINES = 'LOAD_VINES';
export const LOAD_GLOSSARY = 'LOAD_GLOSSARY';

const initialState = {
  vines: [],
  glossary: []
}

export default (state = initialState, action) => {
  let _state = JSON.parse(JSON.stringify(state));

  switch(action.type) {
    case LOAD_VINES:
      _state.vines = action.vines;
    return _state;
    case LOAD_GLOSSARY:
      _state.glossary = action.glossary;
    return _state;
    default: return _state;
  }
}

export const loadVines = () => {
  return dispatch => {
    $.ajax({
      type: 'post',
      url: 'http://localhost/vinesdb/vines.php',
      dataType: 'json',
      success: (res) => {
        const vines = JSON.parse(res.data);
        dispatch({
          type: LOAD_VINES,
          vines
        });
      }
    });
  }
}

export const searchVines = (keyword, flags) => {
  return dispatch => {
    $.ajax({
      type: 'post',
      url: 'http://localhost/vinesdb/search.php',
      data: {
        search: keyword,
        ...flags
      },
      dataType: 'json',
      success: (res) => {
        const vines = JSON.parse(res.data);
        dispatch({
          type: LOAD_VINES,
          vines
        });
      }
    });
  }
}

export const loadGlossary = () => {
  return dispatch => {
    $.ajax({
      type: 'post',
      url: 'http://localhost/vinesdb/glossary.php',
      dataType: 'json',
      success: (res) => {
        const glossary = JSON.parse(res.data);
        dispatch({
          type: LOAD_GLOSSARY,
          glossary
        });
      }
    });
  }
}