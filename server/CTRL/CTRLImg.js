import { OneImageUploadMV, DeleteImage, DeleteVideo,FileUpload,DeleteFile } from './../functions/imgUpload.js'
import { query } from './../DB/index.js'
import { videUploadMV, DeleteFolder } from './../functions/videoUpload.js'


const m_img_upld = async (req, res) => {

    try {

        var image = req.files && req.files.image ? req.files['image'] : false
        var id = parseInt(req.body.id)
        var m_type = req.body.m_type

        if ( !image.truncated && m_type == 'photo' ) {
            
            var image_path = await OneImageUploadMV(image, id, 0, '/photo');
            //DB insert or update
            res.status(200).json({ status: 200, path: image_path })
        
        } else {
        
            console.log('No Content')
            res.status(204).json({ status: 204 })
        
        }

    } catch (e) {
        console.log(e)
        res.status(500).send({ message: e.message })
    }
}


const m_video_upld = async (req, res) => {

    try {

        var video = req.files && req.files.video ? req.files['video'] : false
        var id = parseInt(req.body.id)
        var m_type = req.body.m_type

        if (!video.truncated && m_type == 'video') {

            const video_path = await videUploadMV(video, 'video', id)
            // DB insert or upload
            res.status(200).json({ status: 200, path: video_path })

        } else {

            console.log('No Content')
            res.status(204).json({ status: 204 })

        }

    } catch (e) {

        console.log(e)
        res.status(500).send({ message: e.message })

    }
}


const m_img_delet = async (req, res) => {

    try {

        console.log(req.body)
        var { m_type } = req.body
        var id = parseInt(req.body.id)

        if (id && (m_type == 'photo')) {

            /*
            //getting path after deletion from db
            q_1 = `delete from images where id='${id}' returning image_path;`
            var { rows } = await query(q_1, []) */
            
            DeleteImage(rows[0].image_path)
            res.status(200).json({ status: 200 })

        } else {

            res.status(500).json({ status: 500 })

        }

    } catch (e) {

        console.log(e)
        res.status(500).send({ message: e.message })

    }
}


const m_video_delet = async (req, res) => {

    try {

        var { m_type } = req.body
        var id = parseInt(req.body.id)

        if (id && m_type == 'video') {

            /*
            //getting path after deletion from db
            var q_1 = `delete from gallery_videos where gallery_id='${id}' returning video_path;`
            var { rows } = await query(q_1, [])
            await DeleteFolder('/uploads/video/'+id+'video/')
            res.status(200).json({ status: 200 }) */

        } else {

            res.status(500).json({ status: 500 })

        }

    } catch (e) {

        console.log(e)
        res.status(500).send({ message: e.message })

    }
}




export {

    m_img_upld,
    m_video_upld,
    m_img_delet,
    m_video_delet,

}
