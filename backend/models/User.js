// User Model

const db = require('../config/database');

class User {

    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    static async create(nome, email, senha) {
        try {

            const result = await db.query('INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *', [nome, email, senha]);
            const user = result.rows[0];
            return new User(user.id, user.nome, user.email, user.senha);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }   
    }

    static async findAllUsers() {
        try {
            const result = await db.query('SELECT * FROM users ORDER BY id');
            const users = result.rows.map(user => new User(row.id, row.name, row.senha));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return new User(user.id, user.nome, user.email, user.senha);
            }
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return result.rows.length > 0;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }  
    }



}


module.exports = User;