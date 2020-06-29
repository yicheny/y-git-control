const fs = require( 'fs' );

function alertError(err) {
    console.error(err)
}

const LOCK_LIST_NAME = "y-project-share-lock.json";

function get_pre_commit_list(lock_list_path){
    let preCommitList;
    try{
        preCommitList = require(lock_list_path).data;
    }catch (e) {
        preCommitList = null;
        fs.writeFileSync(lock_list_path,'{"data":null}');
    }
    return preCommitList;
}

function get_lock_list(ops={}){
    const {source='.',pre_commit_list,ignoreList} = ops;
    const current_commit_list = [];
    let del_list = pre_commit_list;
    gen_list(source);

    return {
        current_commit_list,
        del_list
    }

    function gen_list(source){
        const paths = fs.readdirSync(source);
        paths.forEach((path)=>{
            const _source = ''.concat(source,'/',path);
            if(ignoreList.includes(_source)) return;
            try{
                const stat = fs.statSync(_source);
                current_commit_list.push(_source);
                if(Array.isArray(del_list)) del_list = del_list.filter(x=>x!==_source);//无论是文件还是目录
                if(stat.isDirectory()) return gen_list(_source)
            }catch (e) {
                alertError(e);
            }
        })
    }
}

function set_lock_list(ops={}) {
    const lock_list_path = ''.concat(ops.currentPath,'/',LOCK_LIST_NAME)

    const params = Object.assign(ops,{pre_commit_list:get_pre_commit_list(lock_list_path)});
    const {current_commit_list,del_list} = get_lock_list(params);
    fs.writeFileSync(lock_list_path,`{"data":${JSON.stringify(current_commit_list)}}`);

    return del_list;
}

exports.set_lock_list = set_lock_list;
