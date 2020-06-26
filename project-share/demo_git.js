const {copyDirListSync} = require('../scripts/src/DirOpertion');
const {exec_order} = require('../scripts/src/Execute');

// copyDirListSync('.', targetList,ignoreList);
// targetCommit(targetList[0],commitInfo);

// async function sourceCommit(info) {
//     await exec_order(`git commit -am "${info}"`);
// }

// async function targetCommit(path,info){
//     process.chdir(path);
//     await exec_order(`git commit -am "${info}"`);
//     process.chdir(__dirname);
// }
