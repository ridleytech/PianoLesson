const getQuestions = () => {
  return (dispatch) => {
    fetch('http://')
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        dispatch({type: 'GOT_QUESTION', payload: data});
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getProgressData = () => (dispatch, getState) => {
  console.log('get progress');
  fetch('http://localhost:8888/ridleytech/PianoLessons/get-progress.php')
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(`data: ${data}`);
      dispatch({type: 'PROGRESS_INFO', payload: data});
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveProgress = (level1) => (dispatch, getState) => {
  console.log('saveProgress');

  //return;

  let level = getState().currentLevel;
  let mode = getState().currentMode;
  let userid = getState().userid;

  fetch('http://', {
    method: 'POST',
    body: JSON.stringify({
      level: level,
      mode: mode,
      userid: userid,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dispatch({type: 'PROGRESS_SAVED', payload: data});
    })
    .catch((error) => {
      console.log(error);
    });
};

export const loginUser = (username, password) => (dispatch, getState) => {
  //console.log(`username: ${username} password: ${password}`);

  fetch(
    'https://pianolessonwithwarren.com/wp-json/ars/VerifyUser/?key=pk_017ddc497ab0d005eea8e2e2744f05f9e77a0ac4',
    {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dispatch({
        type: 'AUTH_DATA',
        payload: data,
        user: {username: username, password: password},
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({type: 'LOGIN_ERROR', payload: error});
    });
};

//   "input_1":"name field",
// "input_2":"email@gmail.com",
// "input_2_2":"email@gmail.com",
// "input_4":"this is subject",
// "input_3":"this is message",
// "input_6":0

export const sendSupportMessage = (name, email, subject, message) => (
  dispatch,
  getState,
) => {
  console.log(
    `name: ${name} message: ${message} email: ${email} subject: ${subject}`,
  );

  //return;

  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Basic Y2tfMTNlZWZjYzZkOWMyYTA3ZDE0ODYyYmRhZTZlZDAwYmY1NjU3NDA1ODpjc183ZDg3NDY4ZWEwNzY1ZGJhYjgwNDM2ZjRkYjUzZGU2ZDMyNDIwNDdm',
  );
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'wfwaf-authcookie-2927716f484e692d82f2f18aaed23c0a=3744%7Cadministrator%7C432b306082b3c7da03e6bd5e831bc9d3cc02bfd52fee14e921bca101cc490312',
  );

  var raw = JSON.stringify({
    input_1: name,
    input_2: email,
    input_2_2: email,
    input_4: subject,
    input_3: message,
    input_6: 0,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'https://pianolessonwithwarren.com/wp-json/gf/v2/forms/2/submissions',
    requestOptions,
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({type: 'SUPPORT_DATA', payload: data});
    })
    .catch((error) => {
      console.log(error);

      dispatch({type: 'SUPPORT_ERROR', payload: error});
    });
};
