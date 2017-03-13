module.exports = {
  // mock开发配置
  'GET /login?$user&$password': {
    ok: {
      code: 100,
      msg: 'ok',
      data: {
        a: 1,
        b: 2
      }
    },
    fail: {
      code: 200,
      msg: 'fail'
    }
  },
  'POST /signup?$user&$password': {
    ok: {
      code: 100,
      msg: 'ok',
      data: {
        a: 1,
        b: 2
      }
    },
    fail: {
      code: 200,
      msg: 'fail'
    }
  }
}
