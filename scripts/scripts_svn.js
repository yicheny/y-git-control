const {exec_order} = require('./Execute');

async function addAndCommit(info){
    //强制添加所有未提交的代码 ——使用svn add *会将已控制的文件也进行提交，因此会报错
    await exec_order("svn add . --force");
    await exec_order(`svn commit -m "${info}"`);
}

async function delFile(path){
    await exec_order(`svn del ${path}`);
}

async function commonCommit(delPaths,info){
    for(let i=0;i<delPaths.length;i++){
        await delFile(delPaths[i]);
    }
    await addAndCommit(info);
}

async function targetListCommit(ops={}){
    const {source,targets,info,delPaths} = ops;
    for(let i=0;i<targets.length;i++){
        const path = targets[i];
        process.chdir(path);
        await commonCommit(delPaths,info);
        process.chdir(source);
    }
}

exports.sourceCommit = commonCommit;
exports.targetListCommit = targetListCommit;
