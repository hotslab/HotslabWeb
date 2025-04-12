const fs = require("fs")
const path = require("path")


// tiny-mce
const tinymceFolder = path.resolve("./.yarn/unplugged/tinymce-npm-6.8.5-24292f4bcb/node_modules/tinymce")
const publicTinymceFolder = path.resolve(`./public/assets/libs/tinymce/`)
console.log(`Started to directory ${tinymceFolder} to ${publicTinymceFolder}`)
fs.cp(tinymceFolder, publicTinymceFolder, { recursive: true }, (err) => {
    if (err) console.error("Copying error", err)
    console.log(`Directory ${tinymceFolder} copied to ${publicTinymceFolder}`)
})