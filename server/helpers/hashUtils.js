import bcrypt from "bcrypt"

//La funcion que hasheara la contraseña
export const hashPassword = async(password) => {
    try {
    const jumpRounds = 10 ;
    return await bcrypt.hash(password, jumpRounds)
    } catch (error) {
      throw error;   
    }
  }
  
//La funcion que compara la contraseña del input con la de la base de datos 
export const compareHash = async(string, hashstring) => {
  try {
    return bcrypt.compare(string, hashstring);
  } catch (error) {
    throw error;
  }
}