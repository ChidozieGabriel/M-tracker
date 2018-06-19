
export const requestValidation = {
  dept: 'required|min:4',
  request: 'required|min:10|max:200',
};
export const signUpValidation = {
  name: 'required|min:4',
  email: 'email|required',
  password: 'required|min:6|max:20',
};
export const loginValidation = {
  email: 'email|required',
  password: 'required|min:6|max:20',
};
export const restriction = (response) => {
  if (response.rows.length !== 0 && (response.rows[0].status === '1' || response.rows[0].status === '3')) {
    return true;
  }
};
