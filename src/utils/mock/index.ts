import Mock, { type MockjsRequestOptions } from 'mockjs'
import { ApiCommon } from '@/apis';
import { regexp } from '@/utils';

// 设置请求延迟时间
Mock.setup({
  timeout: '500-1500'
})

// 获取用户列表接口
const userMock = {
  'user_id|+1': 10000,
  'user_name': '@first',
  'nickname': '@cname',
  'department|1': ['测试部门', '研发部门', '设计部门', '职能部门', '后勤部门'],
  'phone': regexp.PHONE,
  'email': '@email',
  'status|1': [0, 1],
  'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")'
}
Mock.mock('/api/user/get-user-list', 'post', {
  code: 0,
  success: true,
  message: null,
  'data|1-30': [userMock]
});

// 新增用户接口
Mock.mock(
  '/api/user/add',
  'post',
  {
    code: 0,
    success: true,
    message: null,
    data: null
  }
)
// 编辑用户接口
Mock.mock(
  '/api/user/edit',
  'post',
  {
    code: 0,
    success: true,
    message: null,
    data: null
  }
)

// 用户登录接口
Mock.mock(ApiCommon.login, 'post', (req: MockjsRequestOptions) => {
  const { user_name, password } = JSON.parse(req.body)
  if (user_name === 'admin' && password === 'admin123') {
    return {
      code: 0,
      success: true,
      message: '登录成功',
      data: {
        // 返回 jwtToken
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsIm5hbWUiOiLnrqHnkIblkZgiLCJhdmF0YXIiOiJodHRwczovL3AyNi1wYXNzcG9ydC5ieXRlYWNjdGltZy5jb20vaW1nL3VzZXItYXZhdGFyL2JhNTAwNmNiNTI5YjkxMmM5MzQ0NWVjZmU0NDA0ZmE5fjYweDYwLmF3ZWJwIn0.FodaEdtxSAqyJbVKi3QRBbw5qyDXSzLGn5KnU_dinOw'
      }
    }
  } else {
    return {
      code: 201,
      success: false,
      message: '用户名或密码错误',
      data: null
    }
  }
})

// 消息通知接口
const noticeMock = {
  'notice_id|+1': 1,
  'content': '@cparagraph(1,3)',
  'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")'
}
Mock.mock(RegExp(`${ApiCommon.getNoticeList}.*`), 'get', {
  code: 0,
  success: true,
  message: null,
  'data|0-10': [noticeMock]
})


export default Mock