/**
 * 摄像头控制
 * 1. 获取摄像头
 * 2. 设置摄像头
 * 3. 释放摄像头
 */

import { getVideoControlElements, getVideoElement, globalVariables } from './constant'

const videoElement = getVideoElement('mainVideo')

const { getCamera, play, pause } = getVideoControlElements()

// 点击获取音视频
getCamera.addEventListener('click', async () => {
  try {
    // 获取媒体设备，包括视频和音频
    globalVariables.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    console.log('获取媒体设备成功:', globalVariables.stream)
  } catch (error) {
    console.error('获取媒体设备失败:', error)
  }
})

// 点击播放视频源
play.addEventListener('click', () => {
  // 每次重新播放都需要 重新获取源
  if (globalVariables.stream) {
    videoElement.srcObject = globalVariables.stream
    videoElement.play()
  }
})

// 点击停止播放视频源
pause.addEventListener('click', () => {
  if (globalVariables.stream) {
    // 获取所有轨道，并停止
    globalVariables.stream.getTracks().forEach((track) => {
      track.stop()
    })
    globalVariables.stream = null
  }
})
