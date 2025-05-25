/**
 * 获取当前的媒体流信息进行回放
 * 1. 获取当前的媒体流信息
 * 2. 回放媒体流信息
 * 3. 停止回放媒体流信息
 * 4. 释放媒体流信息
 */

import { getVideoControlElements, getVideoElement, globalVariables } from './constant'

// video控件
const replayVideoElement = getVideoElement('replayVideo')

/** 录制功能  */
const { startRecord, stopRecord, replayRecord } = getVideoControlElements()

// 开始录制
startRecord.addEventListener('click', () => {
  if (globalVariables.stream) {
    globalVariables.mediaRecorder = new MediaRecorder(globalVariables.stream)
    console.log('录制源', globalVariables.stream)

    globalVariables.mediaRecorder.addEventListener('dataavailable', (event) => {
      console.log('chunk数据', event.data)
      globalVariables.chunks.push(event.data)
    })

    // 开始录制，每1秒触发一次dataavailable事件
    globalVariables.chunks = []
    globalVariables.mediaRecorder.start(1000)
  }
})

// 停止录制
stopRecord.addEventListener('click', () => {
  if (globalVariables.mediaRecorder) {
    globalVariables.mediaRecorder.stop()
  }
})

// 回放录制
replayRecord.addEventListener('click', () => {
  console.log('回放录制', globalVariables.mediaRecorder)
  console.log('chunks', globalVariables.chunks)

  // 回放录制
  if (globalVariables.mediaRecorder) {
    const blob = new Blob(globalVariables.chunks)
    const url = URL.createObjectURL(blob)
    console.log('url', url)
    replayVideoElement.src = url
    replayVideoElement.play()
  }
})
