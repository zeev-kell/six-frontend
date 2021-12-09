import Mock from 'better-mock'

export function MockMark(MockList: any[]) {
  MockList.forEach(([url, fun]: any) => {
    Mock.mock(url, fun)
  })
}
