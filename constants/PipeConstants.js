import BaseConstants from '@/constants/BaseConstants'
import CreateEnum from '@/constants/create-enum'

class PipeConstants extends BaseConstants {
  transition = {
    0: '工具',
    1: '流程',
  }

  Constants = CreateEnum({
    TYPE_TOOL: '0',
    TYPE_APP: '1',
  })
}
const pipeConstants = new PipeConstants()
export default pipeConstants
