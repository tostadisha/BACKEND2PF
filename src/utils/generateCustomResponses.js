export const generateCustomResponses = (_, res, next) => {
  res.sendSuccess = (payload, message) =>
    res.status(200).send({
      status: "success",
      message: message ? message : "La solicitud fue exitosa.",
      payload,
    });
  res.sendCreated = (payload, message) =>
    res.status(201).send({
      status: "success",
      message: message ? message : "El recursos ha sido creado.",
      payload,
    });
  res.sendBadRequest = (error) =>
    res
      .status(400)
      .send({ status: "error", message: "La solicitud es inválida", error });
  res.sendUnauthorized = (error) =>
    res.status(401).send({
      status: "error",
      message:
        "Una autenticación es requerida, pero no fue provista o es incorrecta.",
      error: error.message ? error.message : error,
    });
  res.sendForbidden = (error) =>
    res.status(403).send({
      status: "error",
      message: "La solicitud fue válida, pero el servidor rechaza responderla.",
      error: error.message ? error.message : error,
    });
  res.sendNotFound = (error) =>
    res.status(404).send({
      status: "error",
      message: "El recurso solicitado no fue encontrado.",
      error: error.message ? error.message : error,
    });
  res.sendServerError = (error) =>
    res.status(500).send({
      status: "error",
      message: "Error genérico de servidor",
      error: error.message ? error.message : error,
    });
  next();
};
