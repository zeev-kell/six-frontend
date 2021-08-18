/**
 * Created by zeev on 2017/11/15 0015.
 */
export function S4(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function uuid(): string {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}
