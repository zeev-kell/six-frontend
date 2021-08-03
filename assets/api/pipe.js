// 增加处理异常的 message 提示
import Element from 'element-ui'

class Pipe {
  constructor({ $$axios }) {
    this.$$axios = $$axios
  }

  update(resourceId, data) {
    delete data._isLoaded
    delete data.versions
    return this.$$axios.$put('/v2/pipe/' + resourceId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }
}

export const Module = Pipe
