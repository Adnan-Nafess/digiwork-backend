const ApiError = require("../utils/ApiError");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const message = result.error.issues
          .map((issue) => issue.message)
          .join(", ");

        throw new ApiError(400, message);
      }

      req.body = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;
