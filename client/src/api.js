const checkLogin = async (email, password) => {
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
};

const getUsers = async (limit, skip) => {
  const response = await fetch(`/users?limit=${limit}&skip=${skip}`).then(
    (res) => {
      return res.json();
    }
  );
  return response;
};

module.exports.checkLogin = checkLogin;
module.exports.getUsers = getUsers;
