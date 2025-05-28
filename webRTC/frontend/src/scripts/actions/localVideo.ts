/**
 * 1. 获取本地视频元素
 * 2. 创建媒体流
 * 3. 将媒体流设置为本地视频元素的源
 * 4. 监听媒体流状态
 */

import { GLOBAL_OBJECTS } from '../utils/constants'
import { DOMUtils } from '../utils/dom-utils'

// 本地视频元素
const localVideo = DOMUtils.getLocalVideo()

const setLocalStreamToVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    // 设置到本地视频流
    GLOBAL_OBJECTS.LOCAL_STREAM = stream
    // 设置到本地视频元素
    localVideo.srcObject = stream

    // 触发本地视频流加载完毕
    GLOBAL_OBJECTS.HOOK.LOCAL_STREAM.notify(stream)
  } catch (err) {
    console.log('获取本地媒体流失败', err)
  }
}

setLocalStreamToVideo()
