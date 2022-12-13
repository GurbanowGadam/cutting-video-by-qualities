import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
// import { now } from 'moment'
import { error } from 'console'


function DeleteFile(imagepath){
    if (fs.existsSync(imagepath)) {
        fs.unlink(imagepath, (error) => {
            if (error) {
                console.log('file deleted Error :' + error)
            } else {
                console.log(imagepath)
                console.log('FILE deleted')
            }
        })
    } else {
        console.log('Dosnt the file')
    }
}




const OneImageUploadMV = (image, id, img_nmb, folder_name) => {
    var pwd = process.cwd()

    return new Promise((resolve) => {

        if (!fs.existsSync(pwd + "/uploads/" + folder_name + "/" + id + "/")) {

            fs.mkdirSync(pwd + "/uploads/" + folder_name + "/" + id + "/")

        }

        const timePath = Date.now()
        const pathMV = pwd + "/uploads/" + folder_name + "/" + id + "/" + img_nmb + '-' + timePath
        image.mv(pathMV, (error) => {

            if (error) {

                resolve(false)

            } else {

                sharp(pathMV)
                    .resize({ width: 1000 })
                    .jpeg({ quality: 100 })
                    .withMetadata()
                    .toFile(pathMV + '-1000.jpg', (error) => {
                        sharp(pathMV)
                            .resize({ width: 700 })
                            .jpeg({ quality: 100 })
                            .withMetadata()
                            .toFile(pathMV + '-700.jpg', (error) => {
                                sharp(pathMV)
                                    .resize({ width: 300 })
                                    .jpeg({ quality: 100 })
                                    .withMetadata()
                                    .toFile(pathMV + '-300.jpg', (error) => {
                                        // ---------------------
                                        sharp(pathMV)
                                            .resize({ width: 1000 })
                                            .jpeg({ quality: 100 })
                                            .withMetadata()
                                            .toFile(pathMV + '-1000.webp', (error) => {
                                                sharp(pathMV)
                                                    .resize({ width: 700 })
                                                    .jpeg({ quality: 100 })
                                                    .withMetadata()
                                                    .toFile(pathMV + '-700.webp', (error) => {
                                                        sharp(pathMV)
                                                            .resize({ width: 300 })
                                                            .jpeg({ quality: 100 })
                                                            .withMetadata()
                                                            .toFile(pathMV + '-300.webp', (error) => {
                                                                console.log('pathMV')
                                                                console.log(pathMV)
                                                                DeleteFile(pathMV)
                                                                resolve('/uploads/' + folder_name + '/' + id + '/' + img_nmb + '-' + timePath)
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            }
        })
    })
}






const DeleteImage = (image_path) => {

    var pwd = process.cwd()
    DeleteFile(pwd + image_path + '-1000.jpg')
    DeleteFile(pwd + image_path + '-700.jpg')
    DeleteFile(pwd + image_path + '-300.jpg')
    
    DeleteFile(pwd + image_path + '-1000.webp')
    DeleteFile(pwd + image_path + '-700.webp')
    DeleteFile(pwd + image_path + '-300.webp')

    console.log(pwd + image_path + '-300.webp')
    console.log('DELETE image')
    

}


const DeleteVideo = (video_path) => {

    var pwd = process.cwd()
    DeleteFile(pwd + video_path + '.mp4')
    DeleteFile(pwd + video_path + '-144.mp4')
    DeleteFile(pwd + video_path + '-240.mp4')
    DeleteFile(pwd + video_path + '-360.mp4')
    DeleteFile(pwd + video_path + '-4100.mp4')
    DeleteFile(pwd + video_path + '-720.mp4')

    console.log(pwd + video_path + '-144.mp4')
    console.log('DELETE video')
    

}


const FileUpload = (file,folder_name)=>{
    var pwd = process.cwd()

    return new Promise((resolve) => {

        if (!fs.existsSync(pwd + "/uploads/" + folder_name)) {

            fs.mkdirSync(pwd + "/uploads/" + folder_name)

        }

        const mimetype = file.mimetype
        const timePath = Date.now()
        const pathMV = pwd + "/uploads/" + folder_name + timePath + mimetype
        const path = "/uploads/" + folder_name + timePath + mimetype

        file.mv(pathMV,(error)=>{
            if(error){
                console.log('File upload error:' + error)
                 DeleteFile(pathMV)
                resolve(false)
            }
            else{
                console.log('File upload sucsesfully')
                resolve(path)
            }
        })
        
    })

}




export {

    OneImageUploadMV,
    DeleteImage,
    DeleteVideo,
    FileUpload,
    DeleteFile

}
