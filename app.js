import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { RMngr } from './server/Rtrs/RMngr.js'
import FileUpload from 'express-fileupload'
import path from 'path'
const app = express()

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(FileUpload({

    limits: {filesize: 5000 * 1024 * 1024}

}))


app.listen(process.env.PORT || 8082, (error) => {
    if (!error) {
        console.log('Server run as ' + process.env.PORT || 8082)
    } else {
        console.log('app.listen error ', error)
    }

})

app.use('/api/uploads', express.static(path.join(process.cwd(), 'uploads')))
RMngr(app)
