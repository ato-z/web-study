// 全局的变量信息 - 用于存储和管理应用程序状态
export const globalVariables = {
  // 通过媒体设备获取到流信息，可能包括音频和视频
  stream: null as MediaStream | null,
  // 用于捕获到流，可用于录制视频
  mediaRecorder: null as MediaRecorder | null,
  // 用于存储录制的数据(包含屏幕信息)
  chunks: [] as BlobPart[],
}

// Video Display Elements - 视频显示相关的DOM元素ID
export const VIDEO_ELEMENTS = {
  mainVideo: 'video', // 主视频预览元素
  replayVideo: 'replayVideo', // 录制回放视频元素
  screenPreview: 'screenPreview', // 屏幕捕获预览视频元素
} as const

// Video Control Elements - 视频控制按钮的DOM元素ID
export const VIDEO_CONTROL_BUTTONS = {
  getCamera: 'getCamera', // 获取相机按钮
  play: 'play', // 播放按钮
  pause: 'pause', // 暂停按钮
  startRecord: 'startRecord', // 开始录制按钮
  stopRecord: 'stopRecord', // 停止录制按钮
  replayRecord: 'replayRecord', // 回放录制按钮
} as const

// Device Selection Elements - 设备选择下拉框的DOM元素ID
export const DEVICE_SELECTION_ELEMENTS = {
  audioInput: 'audioInput', // 音频输入设备选择
  audioOutput: 'audioOutput', // 音频输出设备选择
  videoInput: 'videoInput', // 视频输入设备选择
} as const

// Video Size Control Elements - 视频尺寸控制相关的DOM元素ID
export const VIDEO_SIZE_ELEMENTS = {
  width: 'videoWidth', // 视频宽度输入框
  height: 'videoHeight', // 视频高度输入框
  toggleSize: 'toggleSize', // 切换视频尺寸按钮
} as const

// Screen Capture Constants - 屏幕捕获相关的DOM元素ID和配置
export const SCREEN_CAPTURE = {
  PREVIEW: 'screenPreview', // 屏幕预览视频元素
  START_BUTTON: 'startScreenCapture', // 开始捕获屏幕按钮
  STOP_BUTTON: 'stopScreenCapture', // 停止捕获屏幕按钮
  CAPTURE_BUTTON: 'captureScreen', // 截图按钮
  AUDIO_CHECKBOX: 'captureAudio', // 是否捕获系统音频的复选框
  CURSOR_CHECKBOX: 'captureCursor', // 是否显示鼠标指针的复选框
} as const

// All Elements Combined - 合并所有DOM元素ID的常量
export const ALL_ELEMENTS = {
  ...VIDEO_ELEMENTS,
  ...VIDEO_CONTROL_BUTTONS,
  ...DEVICE_SELECTION_ELEMENTS,
  ...VIDEO_SIZE_ELEMENTS,
} as const

// DOM Element Getters - 获取视频相关DOM元素的工具函数
export const getVideoElement = (key: keyof typeof VIDEO_ELEMENTS) =>
  document.getElementById(VIDEO_ELEMENTS[key])! as HTMLVideoElement

// 获取视频控制按钮元素的工具函数
export const getVideoControlElements = () => ({
  getCamera: document.getElementById(VIDEO_CONTROL_BUTTONS.getCamera)! as HTMLButtonElement,
  play: document.getElementById(VIDEO_CONTROL_BUTTONS.play)! as HTMLButtonElement,
  pause: document.getElementById(VIDEO_CONTROL_BUTTONS.pause)! as HTMLButtonElement,
  startRecord: document.getElementById(VIDEO_CONTROL_BUTTONS.startRecord)! as HTMLButtonElement,
  stopRecord: document.getElementById(VIDEO_CONTROL_BUTTONS.stopRecord)! as HTMLButtonElement,
  replayRecord: document.getElementById(VIDEO_CONTROL_BUTTONS.replayRecord)! as HTMLButtonElement,
})

// 获取设备选择下拉框元素的工具函数
export const getDeviceSelectionElements = () => ({
  audioInput: document.getElementById(DEVICE_SELECTION_ELEMENTS.audioInput)! as HTMLSelectElement,
  audioOutput: document.getElementById(DEVICE_SELECTION_ELEMENTS.audioOutput)! as HTMLSelectElement,
  videoInput: document.getElementById(DEVICE_SELECTION_ELEMENTS.videoInput)! as HTMLSelectElement,
})

// 获取视频尺寸控制元素的工具函数
export const getVideoSizeElements = () => ({
  width: document.getElementById(VIDEO_SIZE_ELEMENTS.width)! as HTMLInputElement,
  height: document.getElementById(VIDEO_SIZE_ELEMENTS.height)! as HTMLInputElement,
  toggleSize: document.getElementById(VIDEO_SIZE_ELEMENTS.toggleSize)! as HTMLButtonElement,
})

// 获取屏幕捕获元素的工具函数
export const getScreenCaptureElements = () => ({
  preview: document.getElementById(SCREEN_CAPTURE.PREVIEW)! as HTMLVideoElement,
  startButton: document.getElementById(SCREEN_CAPTURE.START_BUTTON)! as HTMLButtonElement,
  stopButton: document.getElementById(SCREEN_CAPTURE.STOP_BUTTON)! as HTMLButtonElement,
  captureButton: document.getElementById(SCREEN_CAPTURE.CAPTURE_BUTTON)! as HTMLButtonElement,
})
