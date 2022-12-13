import { query } from './index.js'
import sqlstring from 'sqlstring'
import { q_select, q_with } from './QFunc.js'

const q_upld = async(params)=>{
    
    var q_pg = q_select(['*'], 'ctgs', '', '', '')
    console.log(q_pg)
    
    try{

        q_pg = sqlstring.format(q_pg, params)
        const { rows } = await query(q_pg, [])
        console.log(rows)
        return rows

    }catch(err){

        console.log(err)
        return false

    }

}

export {

    q_upld

}
