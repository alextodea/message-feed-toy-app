// Client Routes

export const FEED = "/";
export const PROFILE = "/profile";
export const LOG_IN = "/log-in";
export const LOG_OUT = "/log-out";
export const REGISTER = "/register";

// Server routes

export const POST_LOG_IN = "http://localhost:4000/users/login";
export const POST_REGISTER = "http://localhost:4000/users/register";
export const GET_THREADS = "http://localhost:4000/threads/";
export const GET_SINGLE_USER = "http://localhost:4000/users/get-single-user";
export const POST_THREAD = "http://localhost:4000/threads/add";
export const POST_COMMENT = "http://localhost:4000/comments/add";