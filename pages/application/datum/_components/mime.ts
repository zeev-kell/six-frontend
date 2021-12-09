const Mime = require('mime/Mime')

const typeMap = require('mime/types/standard')

const mime = new Mime(typeMap)

export default mime

export function getMimeType(name: string): string {
  const list = name.split('.')
  if (!list[1]) {
    return 'unknown'
  }
  return mime.getType(list[1]) || 'unknown'
}
