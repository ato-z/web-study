/**
 * 设置设备列表
 * 1. 清空原有选项
 * 2. 枚举当前所有的设备
 * 3. 将设备列表设置到选项中
 * 4. 监听设备变化
 * 5. 在浏览器加载完成后，获取设备列表
 */
import { getDeviceSelectionElements, getVideoElement, globalVariables } from './constant'

/** 获取输入设备列表 */
const { videoInput, audioInput, audioOutput } = getDeviceSelectionElements()

/** 获取设备输入选项 */
const getDeviceInputOptions = () => {
  const video = videoInput.value === 'default' ? true : { deviceId: videoInput.value }
  const audio = audioInput.value === 'default' ? true : { deviceId: audioInput.value }
  return {
    video,
    audio,
  }
}

/** 重置流信息 */
const resetStream = async () => {
  // 先停止原有的流信息
  if (globalVariables.stream) {
    globalVariables.stream.getTracks().forEach((track) => {
      track.stop()
    })
    globalVariables.stream = null
  }

  const options = getDeviceInputOptions()
  const stream = await navigator.mediaDevices.getUserMedia(options)
  globalVariables.stream = stream

  console.log('请重新点击播放按钮')
}

/**
 * 设置设备列表
 * 1. 清空原有选项
 * 2. 枚举当前所有的设备
 * 3. 将设备列表设置到选项中
 */
const setDeviceList = async () => {
  // 清空原有选项
  videoInput.innerHTML = ''
  audioInput.innerHTML = ''
  audioOutput.innerHTML = ''

  // 枚举当前所有的设备
  const devices = await navigator.mediaDevices.enumerateDevices()

  devices.forEach((device) => {
    const option = document.createElement('option')
    option.textContent = device.label
    option.value = device.deviceId
    option.defaultSelected = device.deviceId === 'default'

    // 因为默认设备是禁用的，所以需要手动设置为选中状态
    if (device.deviceId === 'default') {
      option.disabled = true
      option.selected = true
    }

    if (device.kind === 'videoinput') {
      videoInput.appendChild(option)
    }
    if (device.kind === 'audioinput') {
      audioInput.appendChild(option)
    }
    if (device.kind === 'audiooutput') {
      audioOutput.appendChild(option)
    }
  })
}

// 在浏览器加载完成后，获取设备列表
requestAnimationFrame(setDeviceList)
// 监听设备变化
navigator.mediaDevices.addEventListener('devicechange', setDeviceList)

// 监听视频输入变化
videoInput.addEventListener('change', resetStream)
// 监听音频输入变化
audioInput.addEventListener('change', resetStream)

// 监听音频输出变化
audioOutput.addEventListener('change', async (event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  if (value === 'default') {
    return
  }

  // 修改音频输出
  const videoElement = getVideoElement('mainVideo')
  videoElement.setSinkId(value)
})
