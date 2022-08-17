const os = require('os');
const path = require('path');
const fs = require('fs');
/**
 * 1. 사용자가 원하는 폴더의 이름을 받아온다
 * 2. 그 폴더안에 video, captured, duplicated 폴더를 만든다
 * 3. 폴더 안에 있는 파일을 다 돌면서 해당하는 mp4|movm png|aae, IMG_1234 (IMG_E1234)
 */

console.log(process.argv);
const folder = process.argv[1];
// const workingDir = path.join(os.homedir(),'Pictures',folder);
// console.log(workingDir);
const upperPath = path.resolve(folder,'../' );
console.log(folder);
console.log(upperPath);



if(!fs.existsSync(upperPath)) {
    console.error('Please Enter Folder name in Pictures');
    return;
}

const videoDir = path.join(upperPath,'video');
const capturedDir = path.join(upperPath,'captured');
const duplicatedDir = path.join(upperPath,'duplicated');

console.log(videoDir);
console.log(capturedDir);
console.log(duplicatedDir);