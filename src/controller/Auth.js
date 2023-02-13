import db from '../config/database.js'

export async function signUp(req, res) {

    const { name, phone, cpf, birthday } = req.body

    try {

        const existsUser = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])

        if (existsUser.rowCount > 0) return res.status(409).send('Usuário já cadastrado!')

        const newClient = await db.query(
            `INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4);`
            , [name, phone, cpf, birthday])

        res.status(201).send("Usuário cadastrado com sucesso!")

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getCustomers(req, res) {

    const { id } = req.params

    try {
        if (!id) {
            const users = await db.query("SELECT * FROM customers")
            res.send(users.rows)
        }
        const users = await db.query("SELECT * FROM customers WHERE id = $1", [id])

        if (users.rowCount === 0) res.sendStatus(404)

        res.send(users.rows)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export async function putCustomers(req, res) {

    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    try {
        
        const existsUser = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])

        if (existsUser.rowCount > 0) return res.status(409).send('Usuário já cadastrado!')

        const users = await db.query(`UPDATE customers
                        SET name=$1, phone=$2, cpf=$3, birthday=$4
                        WHERE id = $5;`, [name, phone, cpf, birthday, id])


        res.send(users.rows)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}