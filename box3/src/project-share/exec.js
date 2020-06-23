const {copyDirList} = require('./DirOpertion');

const targetList = [
    '../box1/src/project-share',
    '../box2/src/project-share',
    '../box3/src/project-share',
];
copyDirList('./', targetList );
