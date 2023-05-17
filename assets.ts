import fs from "fs"
import path from "path"

const tinymceFolder = path.resolve('./node_modules/tinymce/')
const publicTinymceFolder = path.resolve(`./public/assets/libs/tinymce/`)
console.log(`Started to directory ${tinymceFolder} to ${publicTinymceFolder}`)
fs.cp(tinymceFolder, publicTinymceFolder, { recursive: true }, (err) => {
    if (err) console.error("Copying error", err)
    console.log(`Directory ${tinymceFolder} copied to ${publicTinymceFolder}`)
})