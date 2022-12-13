import { R as RImg } from './RImg.js'

function RMngr(app) {

    app.use('/api/media', RImg)
    app.use('/*', (req, res)=>{
        res.status(404).send('404')
    })

}

export {
    RMngr
}

