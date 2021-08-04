// 增加处理异常的 message 提示
import Element from 'element-ui'

class Pipe {
  constructor({ $$axios }) {
    this.$$axios = $$axios
  }

  update(pipeId, data) {
    delete data._isLoaded
    delete data.versions
    return this.$$axios.$put('/v2/pipe/' + pipeId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }

  get(pipeId) {
    return this.$$axios.$get('/v2/pipe/' + pipeId)
  }
}

export const Module = Pipe
