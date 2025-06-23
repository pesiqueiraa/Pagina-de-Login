import User from '../models/User.js';

class UserController {

    // POST /users -- Create a new user
    static async createUser(req, res) {
        const { username, password } = req.body;
        try {
            // Validação básica
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome, email e senha são obrigatórios'
                });
            }
            const newUser = await User.create(username, password);

            res.status(201).json({
                success: true,
                message: 'Usuário criado com sucesso',
                user: {
                    id: newUser.id,
                    username: newUser.username
                }
            });

        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao criar usuário'
            });
        }

    }
}

module.exports = UserController;