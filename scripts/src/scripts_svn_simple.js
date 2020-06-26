const {copyDirListSync} = require('./DirOpertion');
const {sourceCommit,targetListCommit} = require('./scripts_svn');

async function superOrder(setting,currentPath) {
    const {targetList,ignoreList,commitInfo,sourcePath,delList} = setting;
    await sourceCommit(delList,commitInfo);
    copyDirListSync(sourcePath, targetList,ignoreList);
    await targetListCommit({
        source:currentPath,
        targets:targetList,
        info:commitInfo,
        delPaths:delList
    });
}

exports.superOrder = superOrder;
