<template>
  <div class="player-container">
    <div class="tab-container">
      <ul class="list">
        <li v-for="item in videoList" :class="{'active':currentInfo.id===item.id}" :key="item.id" class="item" @click="changeSource(item)">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="play-main">
      <video id="videoPlayer"  class="video-js"  />
      <!-- <p v-if="errorMessage">{{ errorMessage }}</p> -->
      <p>{{ currentInfo.desc }}</p>
      <div class="btn-contanier">
        <button @click="shareToDesktop">保存到桌面 观看更多视频</button>
      </div>
    </div>
    <div class="video-list">
      <h2 class="title">精彩推荐</h2>
      <div class="wrap">
        <ul>
          <li v-for="item in videoList" :class="{'active':currentInfo.id===item.id}" :key="item.id" @click="changeSource(item)">
            <div class="img-contain"  v-bind:style="{backgroundImage: 'url('+item.image+')' }" >
              <img src="../assets/stop_icon.png" >
            </div>
            <p>{{ item.desc }}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import Videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
import videoData from '../assets/videos.json'
export default {
  name: 'HelloWorld',
  data () {
    return {
      videoList: [], // 视频列表数据
      nowPlayVideoUrl: '',
      currentInfo: {}, // 当前视频信息
      player: null,
      errorMessage: ''// 视频错误提示信息
    }
  },
  watch: {
    // 监听视频路径是否发生改变
    nowPlayVideoUrl (newVal, old) {
      console.log(this.nowPlayVideoUrl, '改变了')
      this.switchVideo(newVal)
    }
  },
  created () {
    console.log('ssss', videoData.videos)
    this.videoList = videoData.videos || []
  },
  mounted () {
    this.nowPlayVideoUrl = videoData.videos[0].video || ''
    this.currentInfo = videoData.videos[0] || {}
    this.initVideo(this.currentInfo)
  },
  methods: {
    // video初始化
    initVideo (videoOnfo = {}) {
      // video配置项
      let options = {
        bigPlayButton: true,
        autoplay: false, // 设置自动播放
        muted: true, // 设置了它为true，才可实现自动播放,
        controls: true, // 显示播放的控件
        preload: 'auto', // 预加载
        playbackRates: [0.5, 1, 1.5, 2], // 播放速度选项
        sources: [
          {
            src: videoOnfo.video || '',
            type: 'application/x-mpegURL' // 告诉videojs,这是一个hls流
          }
        ],
        poster: videoOnfo.image || '',
        notSupportedMessage: '此视频暂无法播放，请稍后再试'
      }
      // videojs的第一个参数表示的是，文档中video的id
      this.player = Videojs('videoPlayer', options)

      this.player.on('pause', function () {
        console.log('Pause video')
      })
      this.player.on('ended', function () {
        console.log('Video end')
      })
      this.player.on('error', () => {
        console.log('0000')
        // 获取具体错误信息
        const error = this.player.error()
        console.log('error', error)
        if (error && error.code === 4) {
        // 4 是 video.js 中的一个错误代码，表示无法加载媒体资源
          this.errorMessage = '视频加载错误，请检查视频链接或网络连接'
        }
      })
    },
    // 切换视频
    changeSource (item) {
      this.currentInfo = item
      this.nowPlayVideoUrl = item.video
    },
    // 当需要切换视频时，调用此函数
    switchVideo (newVideoSrc) {
      let player = Videojs('videoPlayer')
      // 清除当前视频源
      player.currentSrc({ src: newVideoSrc })
      // 更新播放器源
      player.src({ src: newVideoSrc, type: 'application/x-mpegURL' })
      // 加载新的视频源并播放
      player.load()
      // player.play();
    //  this.initVideo(newVideoSrc);
    },
    beforeDestroy () {
      if (this.player) {
        this.player.dispose()
      }
    },
    // 分享到桌面
    shareToDesktop () {
      console.log('当前分享视频信息', window, this.currentInfo)
      if (navigator.share) {
        navigator.share({
          title: this.currentInfo.title,
          text: this.currentInfo.desc,
          url: window.location.href
        }).then(() => {
          console.log('Share was successful')
        }).catch(error => {
          console.error('Sharing failed:', error)
        })
      } else {
        // 对不支持 Web Share API 的设备进行回退处理
        alert('Your device does not support sharing.')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.player-container{
  // overflow: hidden;
  padding-top: 18px;
  h1{
    font-size: 20px;
  }
  .tab-container{
    margin: 0 0 7px 0;
    .list{
      display: flex;
      flex-wrap: wrap;
       justify-content: flex-start;   /* 左对齐 */
        margin: 0;
       padding: 0;
        .item{
          list-style-type:none;
          border-radius: 2px;
          background-color: rgba(38, 38, 38, 1);
          // padding: 8px 16px;
          width: 82px;
          text-align: center;
          line-height: 33px;
          justify-content: center;
          align-items: center;
          margin: 0 5px 5px 0;
          font-size: 12px;
          color: #fff;
          overflow: hidden;
         &:nth-of-type(4n+0){
          margin-right: 0;
         }
         &.active{
          border:1px solid blue;
          width: 80px;
          line-height: 31px;
         }
        }
    }
  }
  .play-main{
    // margin-bottom: 30px;
      #videoPlayer {
        width: 343px;
        height: 193px;
        // margin: 7px 0 50px 0;
        }
        video{
          border-radius: 8px;
          .vjs-poster{
            img{
              border-radius: 8px;
            }
          }
        }
        p{
          font-weight: 400;
          font-size: 14px;
          color: #fff;
          line-height: 20px;
          padding: 12px 0 11px 0;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-bottom: 1px solid rgba(50, 50, 50, 1);
        }
        .btn-contanier{
              display: flex;
              justify-content: center;
              margin: 30px 0;
            button{
              font-size: 16px;
              color: rgba(36, 17, 16, 1);
              line-height: 22px;
              width: 282px;
              height: 40px;
              opacity: 1;
              border-radius: 43px;
              border: none;
              background: linear-gradient(90deg, rgba(97, 254, 238, 1) 0%, rgba(1, 214, 190, 1) 100%);
            }
        }
  }
  .video-list{
    .title{
      font-size: 16px;
      font-weight: 500;
      color:#fff;
      line-height: 23px;
    }
    .wrap{
      ul{
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        li{
          list-style-type:none;
          margin-right: 7px;
          &:nth-of-type(2n){
            margin-right: 0;
          }
         &.active{
            .img-contain{
                border:1px solid blue;
               width: 166px;
               height: 93px;
            }
         }
          .img-contain{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 168px;
            height: 95px;
            border-radius: 4px 4px 0px 0px;
            // background-image: url(https://img.js.design/assets/img/657000af9ebde7f10a2294eb.png#9cf35f13508fa59f52f64b1bc7989773);
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
           img{
              width: 30px;
              height: 30px;
            }

          }
          p{
            margin: 8px 7px;
            color: #fff;
            font-size: 12px;
            width: 154px;
            line-height: 17px;
           -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;

          }
        }
      }
    }
  }

}
</style>
