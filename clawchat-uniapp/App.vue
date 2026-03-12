<script>
export default {
  onLaunch: function() {
    console.log('ClawChat App Launch')
    uni.setStorageSync('clawchat_token', '')
    
    // 全局样式重置：解决移动端vh计算和盒子模型问题
    const style = document.createElement('style')
    style.textContent = `
      * {
        box-sizing: border-box !important;
      }
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    `
    document.head.appendChild(style)
  },
  onShow: function() {
    console.log('ClawChat App Show')
  },
  onHide: function() {
    console.log('ClawChat App Hide')
  }
}
</script>

<style>
/* 全局样式重置 */
* {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

page {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
}
</style>
