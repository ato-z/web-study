import {
  SELECTORS,
  CSS_CLASSES,
  STATUS_TEXT,
  type StatusType,
} from './constants'

/**
 * DOM 工具类，提供便捷的DOM操作方法
 */
export class DOMUtils {
  /**
   * 根据选择器获取元素
   */
  static getElement<T extends HTMLElement>(selector: string): T | null {
    return document.querySelector<T>(selector)
  }

  /**
   * 根据选择器获取元素，如果不存在则抛出错误
   */
  static getRequiredElement<T extends HTMLElement>(selector: string): T {
    const element = this.getElement<T>(selector)
    if (!element) {
      throw new Error(`Element not found: ${selector}`)
    }
    return element
  }

  /**
   * 获取本地视频元素
   */
  static getLocalVideo(): HTMLVideoElement {
    return this.getRequiredElement<HTMLVideoElement>(SELECTORS.LOCAL_VIDEO)
  }

  /**
   * 获取远程视频元素
   */
  static getRemoteVideo(): HTMLVideoElement {
    return this.getRequiredElement<HTMLVideoElement>(SELECTORS.REMOTE_VIDEO)
  }

  /**
   * 获取开始按钮
   */
  static getStartButton(): HTMLButtonElement {
    return this.getRequiredElement<HTMLButtonElement>(SELECTORS.START_BTN)
  }

  /**
   * 获取停止按钮
   */
  static getStopButton(): HTMLButtonElement {
    return this.getRequiredElement<HTMLButtonElement>(SELECTORS.STOP_BTN)
  }

  /**
   * 获取静音按钮
   */
  static getMuteButton(): HTMLButtonElement {
    return this.getRequiredElement<HTMLButtonElement>(SELECTORS.MUTE_BTN)
  }

  /**
   * 获取视频按钮
   */
  static getVideoButton(): HTMLButtonElement {
    return this.getRequiredElement<HTMLButtonElement>(SELECTORS.VIDEO_BTN)
  }

  /**
   * 获取连接状态元素
   */
  static getConnectionStatus(): HTMLElement {
    return this.getRequiredElement<HTMLElement>(SELECTORS.CONNECTION_STATUS)
  }

  /**
   * 获取无视频占位符元素
   */
  static getNoVideoPlaceholder(): HTMLElement {
    return this.getRequiredElement<HTMLElement>(SELECTORS.NO_VIDEO_PLACEHOLDER)
  }

  /**
   * 获取状态信息元素
   */
  static getStatusInfo(): HTMLElement {
    return this.getRequiredElement<HTMLElement>(SELECTORS.STATUS_INFO)
  }

  /**
   * 更新连接状态显示
   */
  static updateConnectionStatus(status: StatusType, text?: string): void {
    const statusElement = this.getConnectionStatus()

    // 移除所有状态类
    const statusClasses = [
      CSS_CLASSES.STATUS.WAITING,
      CSS_CLASSES.STATUS.CONNECTING,
      CSS_CLASSES.STATUS.CONNECTED,
      CSS_CLASSES.STATUS.DISCONNECTED,
      CSS_CLASSES.STATUS.ERROR,
    ]

    statusClasses.forEach((className: string) => {
      statusElement.classList.remove(className)
    })

    // 添加新的状态类
    statusElement.classList.add(CSS_CLASSES.STATUS[status])

    // 更新文本
    if (text) {
      statusElement.textContent = text
    } else {
      switch (status) {
        case 'WAITING':
          statusElement.textContent = STATUS_TEXT.WAITING_CONNECTION
          break
        case 'CONNECTING':
          statusElement.textContent = STATUS_TEXT.CONNECTING
          break
        case 'CONNECTED':
          statusElement.textContent = STATUS_TEXT.CONNECTED
          break
        case 'DISCONNECTED':
          statusElement.textContent = STATUS_TEXT.DISCONNECTED
          break
        case 'ERROR':
          statusElement.textContent = STATUS_TEXT.ERROR
          break
      }
    }
  }

  /**
   * 更新状态信息
   */
  static updateStatusInfo(messages: string[]): void {
    const statusInfo = this.getStatusInfo()
    statusInfo.innerHTML = messages.map((msg) => `<p>• ${msg}</p>`).join('')
  }

  /**
   * 添加状态信息
   */
  static addStatusInfo(message: string): void {
    const statusInfo = this.getStatusInfo()
    const p = document.createElement('p')
    p.textContent = `• ${message}`
    statusInfo.appendChild(p)
  }

  /**
   * 清空状态信息
   */
  static clearStatusInfo(): void {
    const statusInfo = this.getStatusInfo()
    statusInfo.innerHTML = ''
  }

  /**
   * 切换按钮启用/禁用状态
   */
  static toggleButton(button: HTMLButtonElement, enabled: boolean): void {
    button.disabled = !enabled
  }

  /**
   * 显示/隐藏元素
   */
  static toggleElement(element: HTMLElement, visible: boolean): void {
    if (visible) {
      element.classList.remove(CSS_CLASSES.HIDDEN)
      element.classList.add(CSS_CLASSES.VISIBLE)
    } else {
      element.classList.remove(CSS_CLASSES.VISIBLE)
      element.classList.add(CSS_CLASSES.HIDDEN)
    }
  }

  /**
   * 显示无视频占位符
   */
  static showNoVideoPlaceholder(): void {
    const placeholder = this.getNoVideoPlaceholder()
    this.toggleElement(placeholder, true)
  }

  /**
   * 隐藏无视频占位符
   */
  static hideNoVideoPlaceholder(): void {
    const placeholder = this.getNoVideoPlaceholder()
    this.toggleElement(placeholder, false)
  }

  /**
   * 为元素添加事件监听器
   */
  static addEventListener<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    element.addEventListener(type, listener, options)
  }

  /**
   * 移除元素的事件监听器
   */
  static removeEventListener<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {
    element.removeEventListener(type, listener, options)
  }
}
