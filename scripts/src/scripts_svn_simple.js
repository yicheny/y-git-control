const {copyDirListSync} = require('./DirOpertion');
const {sourceCommit,targetListCommit} = require('./scripts_svn');
const {set_lock_list} = require('./lockList');
const {preDisposeSetting} = require('./preDisposeSetting');

async function superOrder(setting,currentPath) {
    preDisposeSetting(setting);
    const {targetList,ignoreList,commitInfo,sourcePath} = setting;

    const delPaths = set_lock_list(Object.assign(setting, {currentPath}));
    await sourceCommit(delPaths,commitInfo);
    copyDirListSync(sourcePath, targetList,ignoreList);
    await targetListCommit({
        source:currentPath,
        targets:targetList,
        info:commitInfo,
        delPaths
    });
}

exports.superOrder = superOrder;
