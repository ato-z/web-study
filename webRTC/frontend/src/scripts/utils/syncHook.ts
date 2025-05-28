/**
 * 同步观察者模式
 */
type SyncHookCallBack<T extends Array<unknown>> = (...args: T) => void
export class SyncHook<A extends Array<unknown>> {
  private queue: Array<SyncHookCallBack<A>> = []

  /**
   * 添加监听事件
   * @param cb
   */
  on(cb: SyncHookCallBack<A>) {
    this.queue.push(cb)
  }

  /**
   * 取消事件监听
   * @param cb
   */
  off(cb: SyncHookCallBack<A>) {
    const index = this.queue.findIndex((c) => c === cb)
    if (index !== -1) {
      this.queue.splice(index, 1)
    }
  }

  /**
   * 只执行一次
   * @param cb
   */
  one(cb: SyncHookCallBack<A>) {
    const newCb = (...args: A) => {
      cb(...args)
      this.off(newCb)
    }
    this.on(newCb)
  }

  /**
   * 触发事件广播
   * @param args
   */
  notify(...args: A) {
    this.queue.forEach((cb) => {
      try {
        cb(...args)
      } catch {}
    })
  }

  /** 清空 */
  clear() {
    this.queue = []
  }
}
