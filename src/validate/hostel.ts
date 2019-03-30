import { validateConstructor } from '@/utils'
import configPattern from '@/config/configPattern'
const { _regexp_cell_phone, _regexp_hostel_name } = configPattern

const validateName = validateConstructor({
  emptyError: '请输入民宿名称',
  regExp: _regexp_hostel_name,
  regExpError: '长度在2到30个汉字'
})
const validatePhone = validateConstructor({
  emptyError: '联系方式不能为空',
  regExp: _regexp_cell_phone,
  regExpError: '请输入正确联系方式'
})
const validateRegion = validateConstructor({
  emptyError: '地址不能为空'
})
const validateLogo = validateConstructor({
  emptyError: '民宿logo不能为空'
})
const validateImages = validateConstructor({
  emptyError: '请上传民宿图片'
})
export const rules = {
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validateName
    }
  ],
  phone: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePhone
    }
  ],
  region: [
    {
      required: true,
      trigger: 'change',
      validator: validateRegion
    }
  ],
  logo: [
    {
      required: true,
      trigger: 'change',
      validator: validateLogo
    }
  ],
  images: [
    {
      required: true,
      trigger: 'change',
      validator: validateImages
    }
  ]
}
