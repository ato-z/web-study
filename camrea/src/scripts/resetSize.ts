/**
 * 重置视频大小
 * 1. 获取视频元素
 * 2. 获取视频宽度输入框
 * 3. 获取视频高度输入框
 * 4. 获取切换视频大小按钮
 */

import { getVideoElement, getVideoSizeElements, globalVariables } from './constant'

const videoElement = getVideoElement('mainVideo')
const { width, height, toggleSize } = getVideoSizeElements()

/** 停止流信息 */
const stopStream = () => {
  if (globalVariables.stream) {
    globalVariables.stream.getTracks().forEach((track) => {
      track.stop()
    })
    globalVariables.stream = null
  }
}

// 点击切换视频大小按钮
toggleSize.addEventListener('click', async () => {
  console.log('切换视频大小')
  stopStream()

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: parseInt(width.value),
      height: parseInt(height.value),
    },
    audio: true,
  })
  globalVariables.stream = stream
  videoElement.srcObject = stream
})
