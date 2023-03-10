import db from '../config/database.js'

export async function postGame(req, res) {

    const { name, image, stockTotal, pricePerDay } = req.body


    try {

        const existsGame = await db.query(`SELECT * FROM games WHERE name = $1`, [name])

        if (existsGame.rowCount > 0) return res.status(409).send('Jogo já cadastrado!')

        if (stockTotal < 0 || pricePerDay < 0) return res.sendStatus(400)

        const newGame = await db.query(
            `INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);`
            , [name, image, stockTotal, pricePerDay])

        res.status(201).send("Jogo cadastrado com sucesso!")

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getGames(req, res) {

    try {

        const games = await db.query("SELECT * FROM games")

        res.send(games.rows)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
