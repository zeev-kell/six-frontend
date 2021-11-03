export default class Chunk {
  static STATUS = {
    PENDING: 'pending',
    UPLOADING: 'uploading',
    READING: 'reading',
    SUCCESS: 'success',
    ERROR: 'error',
    COMPLETE: 'complete',
    PROGRESS: 'progress',
    RETRY: 'retry',
  }
}
