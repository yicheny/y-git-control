const {copyDirListSync} = require('./scripts/DirOpertion');
const {addAndCommit,targetListCommit} = require('./scripts/scripts_svn');

main();

async function main(){
    const {targetList,ignoreList,commitInfo,sourcePath} = require('./Setting');
    await addAndCommit(commitInfo);
    copyDirListSync(sourcePath, targetList,ignoreList);
    await targetListCommit(__dirname,targetList,commitInfo);
}
