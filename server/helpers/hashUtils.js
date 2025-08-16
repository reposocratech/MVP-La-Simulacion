import bcrypt from "bcrypt"

//La funcion que hasheara la contraseña
export const hashPassword = async(password) => {
    try {
    const jumpRounds = 10 ;
    return await bcrypt.hash(password, jumpRounds)
    } catch (error) {
        
    }
}