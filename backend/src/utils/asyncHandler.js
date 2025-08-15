const asyncHandler = (handlerFunction) => {
  return (res, res, next) => {
    Promise.resolve(handlerFunction(res, res, next)).catch((err) => {
      next(err);
    });
  };
};

export {asyncHandler}
