export const authorization = (roles) => {
  return async (req, res, next) => {
    console.log(req.user);
    if (!req.user)
      return res.status(401).json({ message: "Usted no está autorizado" });

    for (const role of roles) {
      if (req.user.role === role) return next();
    }

    return res
      .status(403)
      .json({ message: "No posee los permisos necesarios" });
  };
};
