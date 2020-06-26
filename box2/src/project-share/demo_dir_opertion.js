const {copyDirListSync} = require('./scripts/DirOpertion');

const {targetList,ignoreList} = require('./Setting');
copyDirListSync('.', targetList,ignoreList);
