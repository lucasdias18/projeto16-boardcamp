import dayjs from 'dayjs'
import db from '../config/database.js'


export async function postRental(req, res) {

    const { customerId, gameId, daysRented } = req.body

    try {

    const existsUser = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId])

    if (existsUser.rowCount === 0) return res.status(400).send('Usuário não encontrado!')

    const existsGame = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId])

    if (existsGame.rowCount === 0) return res.status(400).send('Jogo não encontrado!')

    if (daysRented <= 0) return res.status(400).send('Dias de aluguel deve ser positivo')

    const price = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1`, [gameId])

    const rentDate = dayjs().format("DD/MM/YYYY")

    const returnDate = null
    const delayFee = null

    const originalPrice = price.rows[0].pricePerDay*daysRented

    const quantityGame = existsGame.rows[0].stockTotal - 1

    if (quantityGame <= 0) {
        const stockGame = await db.query(
            `UPDATE games
             SET "stockTotal" = $1
             WHERE id = $2;`, [0, gameId]
        )
        return res.status(400).send('Jogo não está mais disponível')
    }

    const stockGame = await db.query(
        `UPDATE games
         SET "stockTotal" = $1
         WHERE id = $2;`, [quantityGame, gameId]
    )


        const newRental = await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`
            , [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        res.status(201).send("Aluguel cadastrado com sucesso!")

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getRentals(req, res) {

    try {

        const rentals = await db.query(`SELECT * FROM rentals`)

        res.send(rentals.rows)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export async function finishRental(req, res) {

    const { id } = req.params

    try {

        const rental = await db.query("SELECT * FROM rentals WHERE id = $1", [id])

        if (rental.rowCount === 0) return res.status(400).send('Aluguel não encontrado. Verifique se o Id está correto.')

        if (rental.rows[0].returnDate !== null) return res.status(409).send('Aluguel já foi concluído!')

        const price = rental.rows[0].originalPrice/rental.rows[0].daysRented

        const day = dayjs().format("DD/MM/YYYY")

        const dayRental = Date.parse(rental.rows[0].rentDate)

        const dayReturn = Date.now()

        const multa = parseInt((dayReturn - dayRental)/86400000)

        const game = await db.query(`SELECT * FROM games WHERE id = $1`, [rental.rows[0].gameId])

        const quantityGame = game.rows[0].stockTotal


        if (multa > 0) {
            const delayFee = price*multa

            const finishRental = await db.query(`UPDATE rentals
                        SET "returnDate"=$1, "delayFee"=$2
                        WHERE id = $3;`, [day, delayFee, id])
            
            const newStockGame = quantityGame + 1

            const stockGame = await db.query(
                `UPDATE games
                 SET "stockTotal" = $1
                 WHERE id = $2;`, [newStockGame, rental.rows[0].gameId]
            )

            return res.send(rental.rows)
        }
        
        const finishRental = await db.query(
            `UPDATE rentals
            SET "returnDate"=$1
            WHERE id = $2;`, [day, id])

        const newStockGame = quantityGame + 1

        const stockGame = await db.query(
            `UPDATE games
            SET "stockTotal" = $1
            WHERE id = $2;`, [newStockGame, rental.rows[0].gameId])

        res.send(rental.rows)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteRental(req, res) {

    const { id } = req.params

    try {

        const existRental = await db.query("SELECT * FROM rentals WHERE id = $1", [id])

        if(existRental.rowCount === 0) res.status(404).send('aluguel não existe')

        const finishRental = await db.query(`SELECT returnDate FROM rentals WHERE id = $1`, [id])

        if (finishRental.rowCount === 0) res.sendStatus(400)

        const rental = await db.query(`DELETE rentals WHERE id = $1`, [id])

        res.send('Deletado com sucesso!')

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}