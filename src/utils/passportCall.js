import passport from "passport";

export const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info?.message
            ? info.message
            : "Unauthorized or not authenticated",
        });
      req.user = user;
      next();
    })(req, res, next);
  };
};
