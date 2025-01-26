import bcrypt from "bcrypt";

export const createHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const isValidPassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error("Password and hashed password are required");
  }
  return await bcrypt.compare(password, hashedPassword);
};
