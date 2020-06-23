const fs = require( 'fs' );

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback=console.error) {
    fs.access(dist, function(err){
        if(err){
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if(err) return callback(err);
        fs.readdir(src, function(err, paths) {
            if(err) return callback(err);
            paths.forEach(function(path) {
                const _src = ''.concat(src,'/',path);
                const _dist = ''.concat(dist,'/',path);
                fs.stat(_src, function(err, stat) {
                    if(err) return callback(err);
                    if(stat.isFile()) return fs.writeFileSync(_dist, fs.readFileSync(_src));
                    if(stat.isDirectory()) return copyDir(_src, _dist, callback);
                })
            })
        })
    }
}

function copyDirList(source,targetList,callback){
    if(!Array.isArray(targetList)) console.log('targetList必须是数组');
    targetList.forEach(target=>{
        copyDir(source,target,callback);
    });
    console.log(`已成功复制到所有指定目录下！`);
}

exports.copyDirList = copyDirList;
exports.copyDir = copyDir;
