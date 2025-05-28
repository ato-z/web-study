import { SyncHook } from './syncHook'

// 全局对象数据
export const GLOBAL_OBJECTS = {
  LOCAL_STREAM: null,
  REMOTE_STREAM: null,
  PEER_CONNECTION: null,
  HOOK: {
    LOCAL_STREAM: new SyncHook<[MediaStream]>(),
    REMOTE_STREAM: new SyncHook<any[]>(),
    PEER_CONNECTION: new SyncHook<any[]>(),
  },
} as {
  LOCAL_STREAM: MediaStream | null
  REMOTE_STREAM: MediaStream | null
  PEER_CONNECTION: RTCPeerConnection | null
  HOOK: {
    LOCAL_STREAM: SyncHook<any[]>
    REMOTE_STREAM: SyncHook<any[]>
    PEER_CONNECTION: SyncHook<any[]>
  }
}

// DOM 元素常量定义
export const DOM_ELEMENTS = {
  // 视频元素
  LOCAL_VIDEO: 'localVideo',
  REMOTE_VIDEO: 'remoteVideo',

  // 控制按钮
  START_BTN: 'startBtn',
  STOP_BTN: 'stopBtn',
  MUTE_BTN: 'muteBtn',
  VIDEO_BTN: 'videoBtn',

  // 状态指示器
  CONNECTION_STATUS: 'connectionStatus',
  NO_VIDEO_PLACEHOLDER: 'noVideoPlaceholder',
  STATUS_INFO: 'statusInfo',
} as const

// DOM 元素选择器
export const SELECTORS = {
  LOCAL_VIDEO: `#${DOM_ELEMENTS.LOCAL_VIDEO}`,
  REMOTE_VIDEO: `#${DOM_ELEMENTS.REMOTE_VIDEO}`,
  START_BTN: `#${DOM_ELEMENTS.START_BTN}`,
  STOP_BTN: `#${DOM_ELEMENTS.STOP_BTN}`,
  MUTE_BTN: `#${DOM_ELEMENTS.MUTE_BTN}`,
  VIDEO_BTN: `#${DOM_ELEMENTS.VIDEO_BTN}`,
  CONNECTION_STATUS: `#${DOM_ELEMENTS.CONNECTION_STATUS}`,
  NO_VIDEO_PLACEHOLDER: `#${DOM_ELEMENTS.NO_VIDEO_PLACEHOLDER}`,
  STATUS_INFO: `#${DOM_ELEMENTS.STATUS_INFO}`,
} as const

// 状态文本常量
export const STATUS_TEXT = {
  WAITING_CONNECTION: '等待连接',
  CONNECTING: '连接中...',
  CONNECTED: '已连接',
  DISCONNECTED: '已断开',
  ERROR: '连接错误',
  MUTED: '静音',
  UNMUTED: '取消静音',
} as const

// CSS 类名常量
export const CSS_CLASSES = {
  STATUS: {
    WAITING: 'bg-yellow-500',
    CONNECTING: 'bg-blue-500',
    CONNECTED: 'bg-green-500',
    DISCONNECTED: 'bg-gray-500',
    ERROR: 'bg-red-500',
  },
  BUTTON: {
    DISABLED: 'disabled:opacity-50 disabled:cursor-not-allowed',
    ENABLED: 'hover:bg-opacity-80',
  },
  HIDDEN: 'hidden',
  VISIBLE: 'block',
} as const

// WebRTC 配置常量
export const WEBRTC_CONFIG = {
  ICE_SERVERS: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ] as RTCIceServer[],
  MEDIA_CONSTRAINTS: {
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      frameRate: { ideal: 30 },
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  },
} as const

// 事件名称常量
export const EVENTS = {
  CLICK: 'click',
  LOAD: 'load',
  ERROR: 'error',
  RESIZE: 'resize',
  STREAM_ENDED: 'ended',
} as const

// 类型定义
export type DOMElementId = (typeof DOM_ELEMENTS)[keyof typeof DOM_ELEMENTS]
export type StatusType = keyof typeof CSS_CLASSES.STATUS
export type EventType = (typeof EVENTS)[keyof typeof EVENTS]
