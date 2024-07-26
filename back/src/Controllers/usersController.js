const { getAllUsersService, getUserByIdService, registerUserService, loginUserService } = require("../Services/usersService")

module.exports = {
    getAllUsers: async(req, res) => {
        try {
            const users = await getAllUsersService()
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getUserById: async(req, res) => {
        try {
            const userId = req.params.id
            if(!userId) throw new Error('No hay userId en params')
                const user = await getUserByIdService(userId)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    registerUser: async(req, res) => {
        try {
            const {email, password, confirmPassword} = req.body
            if(!email || !password || !confirmPassword) throw new Error('Informacion incompleta')
            if(password !== confirmPassword) throw new Error('Ambas contraseñas deben ser iguales')
            const user = await registerUserService({email, password})
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    loginUser: async(req, res) => {
        try {
            const {email, password} = req.body
            if(!email || !password) throw new Error('Informacion incompleta')
            const user = await loginUserService({email, password})
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}