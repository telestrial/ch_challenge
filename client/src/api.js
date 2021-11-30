const checkLogin = async (email, password) => {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return res.json();
    });
    return response;
  } catch (error) {
    return { error: 'We were unable to log you in. Please try again.' };
  }
};

module.exports.checkLogin = checkLogin;
