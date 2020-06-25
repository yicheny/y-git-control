const {copyDirList} = require('./DirOpertion');
const {exec_order} = require('./Execute');

const targetList = [
    '../box1/src/project-share',
    '../box2/src/project-share',
    '../box3/src/project-share',
];

const ignoreList = [
    './node_modules'
];

const commitCount = 0;
const commitInfo = `测试脚本 提交target目录 第${commitCount}次提交！`;

// copyDirList('.', targetList,ignoreList);
sourceCommit(commitInfo);
// targetCommit(targetList[0],commitInfo);

async function sourceCommit(info) {
    await exec_order(`git commit -am "${info}"`);
}

// async function targetCommit(path,info){
//     process.chdir(path);
//     await exec_order(`git commit -am "${info}"`);
//     process.chdir(__dirname);
// }
