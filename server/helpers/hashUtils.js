import bcrypt from 'bcrypt';










export const compareHash = async(string, hashstring) => {
  try {
    return bcrypt.compare(string, hashstring);
  } catch (error) {
    throw error;
  }
}