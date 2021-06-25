import BaseConstants from '@/constants/BaseConstants'
import CreateEnum from '@/constants/create-enum'

const items = [
  [0, 'TYPE_TOOL'],
  [1, 'TYPE_APP'],
  [2, 'TYPE_DOCKER'],
  [3, 'TYPE_WORK'],
  [4, 'TYPE_WORKFLOW'],
]

class PipeConstants extends BaseConstants {
  transition = new Map(items)

  Constants = CreateEnum(items)
}
const pipeConstants = new PipeConstants()
export default pipeConstants
