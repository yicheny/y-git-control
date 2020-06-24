const {copyDirList} = require('./DirOpertion');
const {exec_order} = require('./Execute');

const targetList = [
    '../box1/src/project-share',
    '../box2/src/project-share',
    '../box3/src/project-share',
];

const ignoreList = [
    './node_modules'
];

const commitCount = 2;

const commitInfo = `测试脚本 第${commitCount}次提交！`;

exec_order(commitInfo);

// console.log(__dirname);

copyDirList('.', targetList,ignoreList);
