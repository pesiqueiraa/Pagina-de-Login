const User = require('../models/User.js')
class UserController {

    // POST /users -- Create a new user
    static async createUser(req, res) {
        const { nome, email, senha } = req.body;
        try {
            // Validação básica
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome, email e senha são obrigatórios'
                });
            }
            const newUser = await User.create(nome, email, senha);

            res.status(201).json({
                success: true,
                message: 'Usuário criado com sucesso',
                user: {
                    id: newUser.id,
                    nome: newUser.nome
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

    //POST /users/login -- Login de usuário
    static async loginUser(req, res) {
        const { email, senha } = req.body;
        try {
            if (!email || !senha) { 
                return res.status(400).json({
                    success: false,
                    message: 'Email e senha são obrigatórios'
                });
            }

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }
            if (user.senha !== senha) {
                return res.status(401).json({
                    success: false,
                    message: 'Senha incorreta'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Login bem-sucedido',
                user: {
                    id: user.id,
                    nome: user.nome
                }
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao fazer login'
            });
        } 
    }
}

module.exports = UserController;