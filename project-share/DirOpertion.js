const fs = require( 'fs' );

/*
 * 复制目录、子目录，及其中的文件
 * @param source {String} 要复制的目录
 * @param target {String} 复制到目标目录
 * @param callback {Function} 报错时执行的函数
 */
function copyDir(source, target, callback=console.error) {
    fs.access(target, function(err){
        if(err){
            // 目录不存在时创建目录
            fs.mkdirSync(target);
        }
        _copy(null, source, target);
    });

    function _copy(err, source, target) {
        if(err) return callback(err);
        fs.readdir(source, function(err, paths) {
            if(err) return callback(err);
            paths.forEach(function(path) {
                const _source = ''.concat(source,'/',path);
                const _target = ''.concat(target,'/',path);
                fs.stat(_source, function(err, stat) {
                    if(err) return callback(err);
                    if(stat.isFile()) return fs.writeFileSync(_target, fs.readFileSync(_source));
                    if(stat.isDirectory()) return copyDir(_source, _target, callback);
                })
            })
        })
    }
}

/*
 * 删除指定目录或文件
 * @param path {String} 要删除的路径
 */
function delDir(path) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            const curPath = ''.concat(path,"/",file);
            if(fs.statSync(curPath).isDirectory()) {
                delDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

/*
 * 复制源目录至多个指定目录下【先删除再复制】
 * @param source {String} 源目录
 * @param targetList {Array} 指定目录数组
 * @param callback {Function} 报错时执行的函数
 */
function copyDirList(source,targetList,callback){
    if(!Array.isArray(targetList)) console.log('targetList必须是数组');
    targetList.forEach(target=>{
        delDir(target);
        copyDir(source,target,callback);
    });
    console.log(`已成功复制到所有指定目录下！`);
}

exports.copyDirList = copyDirList;
exports.copyDir = copyDir;
exports.delDir = delDir;
