


export const customResponse = {
  ['LOGIN_SUCCESS']: {
    code: 200,
    message: "Logged in successfully !",
  },
  ['REGISTER_SUCCESS']: {
    code: 200,
    message: "Congratulations!! You have been registered successfully !",
  },
  ['INVALID_LOGIN_DETAILS']:{
    code: 403,
    message: "Invalid login details"
  },
  ['USER_NOT_FOUND']:{
    code:409,
    message: "User not found"
  },
  ['POST_CREATE_ERROR']:{code:500,message:"Post create error"},
  ['POST_CREATE_SUCCESS']:{code:500,message:"Post created successfully"},
  ['SERVER_ERROR']:{ code: 500, message: "Server error" },
  ['INVALID_USER_CRED']:{ code: 500, message: "Invalid user credentials" },
  ['LOGIN_ERROR']:{ code: 500, message: "Login error." },
  ['REGISTER_ERROR']:{ code: 500, message: "Register error." },
  ['TOKEN_REQUIRED']:{ code: 500, message: "Auth token not found." },
};
