const {copyDirListSync} = require('./scripts/DirOpertion');
const {exec_order} = require('./scripts/Execute');

// copyDirListSync('.', targetList,ignoreList);
const {targetList,ignoreList,commitInfo} = require('./Setting');

// addAndCommit(commitInfo);
copyDirListSync('.', targetList,ignoreList);

async function addAndCommit(info){
    //强制添加所有未提交的代码 ——使用svn add *会将已控制的文件也进行提交，因此会报错
    //缺陷：不能在版本上进行已删除文件的提交
    await exec_order("svn add . --force");
    await exec_order(`svn commit -m "${info}"`);
}

async function targetCommit(path,info){
    process.chdir(path);
    addAndCommit(info);
    process.chdir(__dirname);
}
