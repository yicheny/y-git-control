const {set_lock_list} = require('../scripts/src/lockList');
const {preDisposeSetting} = require('../scripts/src/preDisposeSetting');

const SETTING = require('./Setting.json');
preDisposeSetting(SETTING);
set_lock_list(Object.assign(SETTING, {currentPath: __dirname}));
