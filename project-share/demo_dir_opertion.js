const {copyDirListSync} = require('./scripts/DirOpertion');

const {targetList,ignoreList,commitInfo} = require('./Setting');
copyDirListSync('.', targetList,ignoreList);
