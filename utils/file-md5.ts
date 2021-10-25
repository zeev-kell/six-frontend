import SparkMD5 from 'spark-md5'

export function getFileMd5(file: File) {
  const CHUNK_SIZE = 1024 * 1024 * 5 // 切片的大小
  const blobSlice = File.prototype.slice || (File.prototype as any).mozSlice || (File.prototype as any).webkitSlice
  const chunks = Math.ceil(file.size / CHUNK_SIZE) // 切片个数
  return new Promise((resolve, reject) => {
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.onload = function (e: any) {
      spark.append(e.target?.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        // 完成文件的解析
        resolve(spark.end())
      }
    }
    fileReader.onerror = reject
    function loadNext() {
      const start = currentChunk * CHUNK_SIZE
      const end = Math.min(file.size, start + CHUNK_SIZE)
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }
    loadNext() // 第一遍执行 chunk = 0
  })
}
