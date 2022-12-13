import PG from 'pg'


const pool = new PG.Pool({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT

})

const query = async (q_text, params) => {


    const res = await pool.query(q_text, params)
    return res

}

export {

    query

}
