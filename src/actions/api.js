export const getFilteredItems = (dispatch, filter) => {
  fetch(`/getFilteredItems/${filter}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: 'SET_FILTERED_TABLE_TIMERS',
        data
      })
    });
};

export const getItemsForStats = (filter, dispatch) => {
  fetch(`/getItemsForStats/${filter}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: 'SET_FILTERED_STATS_ITEMS',
        data,
        filter
      })
    });
};

export const setTimer = (time, text, date, dispatch) => {
  let data = {
    time,
    text,
    date
  };
  fetch('/setTimer', {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: 'ADD_TABLE_TIMER',
        data
      });
    });
};