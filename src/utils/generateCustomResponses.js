export const generateCustomResponses = (_, res, next) => {
  res.sendSuccess = (payload) =>
    res.status(200).send({
      status: "success",
      message: "Request processed successfully.",
      payload,
    });
  res.sendCreated = (payload) =>
    res.status(201).send({
      status: "success",
      message: "A resource was created as a result of the request.",
      payload,
    });
  res.sendBadRequest = (error) =>
    res
      .status(400)
      .send({ status: "error", message: "The request is malformed.", error });
  res.sendUnauthorized = (error) =>
    res.status(401).send({
      status: "error",
      message:
        "Authentication is required, but it was not provided or is incorrect.",
      error,
    });
  res.sendForbidden = (error) =>
    res.status(403).send({
      status: "error",
      message:
        "The server understands the request but refuses to authorize it.",
      error,
    });
  res.sendNotFound = (error) =>
    res.status(404).send({
      status: "error",
      message: "The requested resource does not exist.",
      error,
    });
  res.sendServerError = (error) =>
    res
      .status(500)
      .send({ status: "error", message: "Generic server error.", error });
  next();
};
