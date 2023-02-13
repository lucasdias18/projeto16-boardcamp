import dayjs from 'dayjs'
import db from '../config/database.js'

export async function postRental(req, res) {

    const { customerId, gameId, daysRented } = req.body

    // {
    //     id: 1,
    //     customerId: 1,
    //     gameId: 1,
    //     rentDate: '2021-06-20',    // data em que o aluguel foi feito
    //     daysRented: 3,             // por quantos dias o cliente agendou o aluguel
    //     returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
    //     originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
    //     delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
    //   }


    try {

    //     const receita = await db.query(`
    // SELECT receitas.*, categorias.nome AS nome_categoria FROM receitas
    // JOIN categorias
    // ON receitas.id_categoria = categorias.id
    // WHERE receitas.id = $1;
    // `, [id])

    const price = await db.query(`SELECT pricePerDay FROM games WHERE id = $1`, [gameId])
    // console.log(price)

    const originalPrice = price*daysRented

        const newRental = await db.query(
            `INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`
            , [customerId, gameId, '13/02/2023', daysRented, null, originalPrice, null])

        res.status(201).send("Aluguel cadastrado com sucesso!")

    }
    catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getRentals(req, res) {

    try {

        const rentals = await db.query("SELECT * FROM rentals")

        res.send(rentals.rows)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export async function finishRental(req, res) {

    const { id } = req.params

    try {

        // const users = await db.query(`UPDATE customers
        //                 SET (name, phone, cpf, birthday)
        //                 WHERE id = $1;`, [id])
        // console.log(existsUser)

        const rental = await db.query("SELECT * FROM rentals WHERE id = $1", [id])

        const price = rental.rows.price/rental.rows.daysRented

        const day = dayjs().format("DD/MM/YYYY")

        const multa = rental.rows.rentDate - day

        if (multa > rental.rows.daysRented) {

            delayFee = price*multa

            const finishRental = await db.query(`UPDATE rentals
                        SET returnDate=$1, delayFee=$2
                        WHERE id = $3;`, [day, delayFee, id])
            
            res.send(reantal.rows)
        }
        
        const finishRental = await db.query(`UPDATE rentals
                        SET returnDate=$1
                        WHERE id = $1;`, [day, id])

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