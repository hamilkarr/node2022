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
// console.log(folder);
console.log(upperPath);



if(!folder || !fs.existsSync(upperPath)) {
    console.error('Please Enter Folder name in Pictures');
    return;
}

const videoDir = path.join(upperPath,'video');
const capturedDir = path.join(upperPath,'captured');
const duplicatedDir = path.join(upperPath,'duplicated');

// console.log(videoDir);
// console.log(capturedDir);
// console.log(duplicatedDir);

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);  // && 조건문 다시 복습 필요
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);  // && 조건문 다시 복습 필요
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);  // && 조건문 다시 복습 필요

// const array = fs.readdir(upperPath,{encoding: "utf-8",withFileTypes:false}, (error) => console.error(error));
// console.log(array);
// return;

fs.promises.readdir(upperPath).then(processFiles).catch(console.error);

function processFiles(files) {
    files.forEach((file) => {
        if(isVideoFile(file)) {
            move(file, videoDir);
        } else if(isCapturedFile(file)) {
            move(file, capturedDir);
        } else if(isDuplicatedFile(files, file)) {
            move(file, duplicatedDir);
        }
    });
};

function isVideoFile(file) {
    const regExp = /(mp4|mov)$/gm;
    const match = file.match(regExp); // return array // == regExp.test(file) return boolean    
    // const test = regExp.test(file);
    // console.log(match);
    // console.log(test);
    return !!match;
}
function isCapturedFile(file) {
    const regExp = /(png|aae)$/gm;
    const match  = regExp.test(file);
    return match;
}
function isDuplicatedFile(files, file) {
    if(!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
        return false;
    }
    const edited = `IMG_E${file.split('_')[1]}`; // IMG_E1234, IMG_1234, IMG_2345
    const found = files.find(f => f.includes(edited));
    return !!found;
}

function move(file, targetDir) {
    const oldPath = path.join(upperPath, file);
    const newPath = path.join(targetDir, file);
    fs.promises
        .rename(oldPath, newPath)
        .catch(console.error);        
}