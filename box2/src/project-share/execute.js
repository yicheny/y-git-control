const {exec} = require('child_process');
const iconv = require('iconv-lite');

function exec_order(order, info, fn =()=>{}) {
    const timeId = printInfo(info);

    return exec_promise(order).then((stdout, stderr) => {
        console.log('stdout', iconvDecode(stdout));
        LOG_INFO += `stdout:${iconvDecode(stdout)}\n`;
        // console.log('stderr', stderr);
        // LOG_INFO += `stderr:${stderr}\n`;
        fn(stdout, stderr);
        clearInterval(timeId);
    }).catch(err => {
        console.log('err', err);
        LOG_INFO += `err:${err}\n`;
        clearInterval(timeId);
    });

    function exec_promise(order) {
        return new Promise((resolve, reject) => {
            exec(order, {encoding: 'binary'}, (err, stdout, stderr) => {
                if (err) return reject(err);
                return resolve(stdout, stderr);
            });
        })
    }

    function printInfo(info) {
        let i = 1;
        return setInterval(() => {
            console.log(info, i++);
        }, 1000);
    }

    function iconvDecode(str = '') {
        const encoding          = 'cp936';
        const binaryEncoding    = 'binary';
        return iconv.decode(Buffer.from(str, binaryEncoding), encoding);
    }
}

exports.exec_order = exec_order;
