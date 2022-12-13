import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import ffmpeg2 from '@ffmpeg-installer/ffmpeg'
ffmpeg.setFfmpegPath(ffmpeg2.path)


const videoUploadFFMPEG = async (video_path, to_format, size_w, pathMV) => {
    return new Promise((resolve) => {

        ffmpeg(video_path)
            .toFormat(to_format)
            .size(size_w + 'x?')
            .on('error', (e) => {
                console.log(e)
                console.log('in .on error')
                resolve(false)
            })
            .on('progress', (progress) => {
                console.log('Processing: ' + progress.targetSize + ' KB converted : ', size_w)
            })
            .on('end', (e) => {
                resolve(true)
            })
            .save(pathMV + `-${size_w}.` + to_format)

    })
}

const videUploadMV = async (video, folder_name, id) => {
    return new Promise((resolve) => {
        var pwd = process.cwd()
        if (!fs.existsSync(pwd + "/uploads/" + folder_name + "/" + id + "video/")) {

            fs.mkdirSync(pwd + "/uploads/" + folder_name + "/" + id + "video/")

        }

        var mime = 'mp4'
        const timePath = Date.now()
        const pathMV = pwd + "/uploads/" + folder_name + "/" + id + "video/" + '0' + '-' + timePath
        video.mv(pathMV + '.' + mime, async (error) => {

            if (error) {

                console.log(error)
                console.log('false')
                resolve(false)

            } else {

                resolve("/uploads/" + folder_name + "/" + id + "video/" + '0' + '-' + timePath)

                var result720 = await videoUploadFFMPEG(pathMV + '.' + mime, 'mp4', '720', pathMV)
                var result480 = await videoUploadFFMPEG(pathMV + '-720.mp4', 'mp4', '480', pathMV)
                var result360 = await videoUploadFFMPEG(pathMV + '-480.mp4', 'mp4', '360', pathMV)
                var result240 = await videoUploadFFMPEG(pathMV + '-360.mp4', 'mp4', '240', pathMV)
                var result144 = await videoUploadFFMPEG(pathMV + '-240.mp4', 'mp4', '144', pathMV)

                console.log('-720 ', result720)
                console.log('-480 ', result480)
                console.log('-360 ', result360)
                console.log('-240 ', result240)
                console.log('-144 ', result144)
            }

        })

    })
}




const DeleteFolder = (folderPath) => {
    return new Promise((resolve) => {
        var pwd = process.cwd()
        folderPath = pwd + folderPath
        console.log('fs.existsSync(folderPath)')
        console.log(fs.existsSync(folderPath))
        if (fs.existsSync(folderPath)) {
            fs.rm(folderPath, { recursive: true, force: true }, async (error) => {
                if (error) {
                    console.log('file deleted Error :' + error)
                    var r = await DeleteFolder(folderPath)
                    resolve(r)
                } else {
                    console.log('AAAAAAAAAa fs.existsSync(folderPath)')
                    console.log(fs.existsSync(folderPath))
                    if(fs.existsSync(folderPath)){
                        console.log('IKINJI GEZEGE FUNC')
                        var r = await DeleteFolder(folderPath)
                        resolve(r)
                    }else{
                        resolve(true)
                    }
                }
            })
        } else {
            console.log('Dosnt the file')
            resolve(false)
        }
    })
}


export {

    videUploadMV,
    DeleteFolder

}

