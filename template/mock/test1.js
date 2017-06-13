/**
 * mock detault
 * request 
 */
var API = require('../src/service/API.js');
module.exports = {
    api: 'POST ' + API.TEST1,
    response:{
        ok:{
            "code": 1,
            "message": "成功",
            'data': {
            	test:22
            }
        }
    }
}


