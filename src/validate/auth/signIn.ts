import { validateConstructor } from '@/utils'
import configPattern from '@/config/configPattern'
const { _regexp_password } = configPattern

const validatorAccount = validateConstructor({
  emptyError: '账户名不能为空'
})
const validatePassword = validateConstructor({
  emptyError: '密码不能为空',
  regExp: _regexp_password,
  regExpError: '密码为6-20位数字与字母组合'
})

export default {
  account: [{ required: true, trigger: 'change', validator: validatorAccount }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}
