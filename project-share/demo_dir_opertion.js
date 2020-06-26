const {copyDirListSync} = require('../scripts/src/DirOpertion');

const {targetList,ignoreList} = require('./Setting');
copyDirListSync('.', targetList,ignoreList);
