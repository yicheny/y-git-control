const {exec} = require('child_process');
const iconv = require('iconv-lite/lib/index');

function exec_order(order, info, callback =()=>{}) {
    let LOG_INFO = '';
    const timeId = printInfo(info);

    return exec_promise(order).then((stdout, stderr) => {
        console.log('stdout', stdout);
        LOG_INFO += `stdout:${stdout}\n`;
        callback(stdout, stderr);
    }).catch(err => {
        console.log('err', err);
        LOG_INFO += `err:${err}\n`;
    }).finally(()=>{
        clearInterval(timeId);
    });

    function exec_promise(order) {
        return new Promise((resolve, reject) => {
            exec(order, (err, stdout, stderr) => {
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

    // function iconvDecode(info) {
    //     const encoding  = 'cp936';
    //     const binaryEncoding  = 'binary';
    //     return iconv.decode(Buffer.from(info,binaryEncoding), encoding);
    // }
}

exports.exec_order = exec_order;
