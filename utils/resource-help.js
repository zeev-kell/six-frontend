import { getTocObj } from '@/directives/marked/marked'
const BLOG_URL = process.env.RESOURCES_URL + '/blog'

export function resourceHelp(data = '') {
  const imageList = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const str = data.replace(/(!\[.*?]\()img\/(.*?)\)/gi, (matchStr, subStr, imageName) => {
    // 替换图片的地址
    const imageSrc = BLOG_URL + '/img/' + imageName
    imageList.push(imageSrc)
    return subStr + BLOG_URL + '/img/' + imageName + ')'
  })
  const [markdown, toc] = getTocObj(str)
  /**
   * @param markdown 内容
   * @param toc 标题
   * @param imageList 图片列表
   */
  return { markdown, toc, imageList }
}
