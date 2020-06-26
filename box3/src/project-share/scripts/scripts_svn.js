const {exec_order} = require('./Execute');

async function addAndCommit(info){
    //强制添加所有未提交的代码 ——使用svn add *会将已控制的文件也进行提交，因此会报错
    //缺陷：不能在版本上进行已删除文件的提交
    await exec_order("svn add . --force");
    await exec_order(`svn commit -m "${info}"`);
}

async function targetListCommit(source,targets,info){
    for(let i=0;i<targets.length;i++){
        const path = targets[i];
        process.chdir(path);
        await addAndCommit(info);
        process.chdir(source);
    }
}

exports.addAndCommit = addAndCommit;
exports.targetListCommit = targetListCommit;
