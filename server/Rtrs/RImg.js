import express from 'express'
let R = express.Router()
import { 
    m_img_upld, m_video_upld, m_img_delet, m_video_delet
} from '../CTRL/CTRLImg.js'

//      MEDIA
R.post('/image-upload', m_img_upld)
R.post('/image-delete', m_img_delet)
R.post('/video-upload', m_video_upld)
R.post('/video-delete', m_video_delet)



export {
    R
}
