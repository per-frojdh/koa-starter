const commonErrors = {
  PageNotFound: 'Page Not Found',
  SystemError: 'Internal Server Error',
  BadRequest: 'Bad Request',
};

const httpErrors = {
  PageNotFound: 404,
  InternalServerError: 500,
  BadRequest: 400,
};

export { commonErrors, httpErrors };
