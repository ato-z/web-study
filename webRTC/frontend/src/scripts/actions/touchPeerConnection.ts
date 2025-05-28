import { GLOBAL_OBJECTS, WEBRTC_CONFIG } from '../utils/constants'

let peerConnection: RTCPeerConnection

/**
 * 创建 peer connection
 */
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection({
    iceServers: WEBRTC_CONFIG.ICE_SERVERS,
  })

  GLOBAL_OBJECTS.PEER_CONNECTION = peerConnection
  console.log('peerConnection', peerConnection)

  // 监听 ICE 候选者
  peerConnection.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
      console.log('ICE候选出现:', event.candidate)
    }
  })

  // 监听连接状态
  peerConnection.addEventListener('iceconnectionstatechange', () => {})

  // 监听本地视频流加载完毕
  GLOBAL_OBJECTS.HOOK.LOCAL_STREAM.on((stream) => {
    console.log('本地视频流加载完毕', stream)

    // 添加本地视频流到 peer connection
    stream.getTracks().forEach((track: MediaStreamTrack) => {
      peerConnection.addTrack(track, stream)
    })

    // 先添加轨道在再创建 offer，sdp 中才会包含轨道信息
    createOffer(peerConnection)
  })
}

/**
 * 创建 offer
 */
const createOffer = async (peerConnection: RTCPeerConnection) => {
  const offer = await peerConnection.createOffer()
  console.log('offer.sdp', offer.sdp)

  // 设置本地描述，这样会触发 ice 候选者
  await peerConnection.setLocalDescription(offer)
}

createPeerConnection()
