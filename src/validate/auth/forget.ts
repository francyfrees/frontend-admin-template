import { validateConstructor } from '@/utils'
import configPattern from '@/config/configPattern'
const { _regexp_cell_phone, _regexp_password } = configPattern

const validatorPhone = validateConstructor({
  emptyError: '请输入手机号',
  regExp: _regexp_cell_phone,
  regExpError: '请输入正确的手机号'
})
const validateCode = validateConstructor({
  emptyError: '验证码不能为空',
  min: 6,
  max: 6,
  scopedError: '请输入6位验证码'
})
const validatePassword = validateConstructor({
  emptyError: '密码不能为空',
  regExp: _regexp_password,
  regExpError: '密码为6-20位数字与字母组合'
})
const validateRePassword = validateConstructor({
  emptyError: '确认密码不能为空'
})

export default {
  phone: [{ required: true, trigger: 'change', validator: validatorPhone }],
  code: [{ required: true, trigger: 'blur', validator: validateCode }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  rePassword: [
    { required: true, trigger: 'blur', validator: validateRePassword }
  ]
}
