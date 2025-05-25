/**
 * 捕获屏幕
 * 1. 获取屏幕捕获的预览视频元素
 * 2. 获取屏幕捕获的开始按钮
 * 3. 获取屏幕捕获的停止按钮
 * 4. 获取屏幕捕获的截图按钮
 */

import { getScreenCaptureElements, getVideoElement, globalVariables } from './constant'

const screenPreview = getVideoElement('screenPreview')
const { startButton, stopButton, captureButton } = getScreenCaptureElements()

/** 停止流信息 */
const stopStream = () => {
  if (globalVariables.stream) {
    globalVariables.stream.getTracks().forEach((track) => {
      track.stop()
    })
    globalVariables.stream = null
  }
}

// 点击开始捕获屏幕
startButton.addEventListener('click', async () => {
  console.log('开始捕获屏幕')
  stopStream()

  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: 'monitor',
    },
    audio: true,
  })
  globalVariables.stream = stream
  screenPreview.srcObject = stream
  screenPreview.play()
})

// 点击停止捕获屏幕
stopButton.addEventListener('click', () => {
  stopStream()
  screenPreview.srcObject = null
  screenPreview.pause()
})

// 点击截图
captureButton.addEventListener('click', () => {
  if (globalVariables.stream) {
    const canvas = document.createElement('canvas')
    canvas.width = screenPreview.videoWidth
    canvas.height = screenPreview.videoHeight
    const context = canvas.getContext('2d')
    context?.drawImage(screenPreview, 0, 0)
    const image = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = image
    a.download = 'screenshot.png'
    a.click()
  }
})
