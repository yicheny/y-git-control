const default_ignore_list = ['./y-project-share']

function preDisposeSetting(Setting){
    if(!Array.isArray(Setting.ignoreList)) Setting.ignoreList = [];
    Setting.ignoreList = default_ignore_list.concat(Setting.ignoreList)
}

exports.preDisposeSetting = preDisposeSetting;
