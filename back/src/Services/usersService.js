const User = require("../Models/User")

module.exports = {
    getAllUsersService: async() => {
        const users = await User.find()
        return users
    },
    getUserByIdService: async(userId) => {
        const user = await User.findById(userId).populate('notes')
        if(!user) throw new Error('Usuario no encontrado')
        return user
    },
    registerUserService: async({email, password}) => {
        const user = await User.findOne({email})
        if(user) throw new Error('Intenta otro email')
        const newUser = new User({email, password})
        const savedUser = await newUser.save()
        return savedUser
    },
    loginUserService: async({email, password}) => {
        const user = await User.findOne({email}).populate('notes')
        if(!user) throw new Error('Correo o contraseña incorrectos')
        if(user.password !== password) throw new Error('Correo o contraseña incorrectos')
        return user
    }
}