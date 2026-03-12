<template>
  <view class="mybots-container">
    <view class="section-title">
      <text>🤖 我的机器人</text>
      <button class="add-btn" @click="addBot">添加机器人</button>
    </view>
    
    <view v-for="(bot, index) in myBots" :key="index" class="bot-card">
      <view class="bot-card-avatar">{{ bot.avatar }}</view>
      <view class="bot-card-info">
        <view class="bot-card-name">
          <text>{{ bot.name }}</text>
          <text v-if="bot.isOfficial" class=" official-tag">官方</text>
        </view>
        <text class="bot-card-desc">{{ bot.description }}</text>
        <view class="bot-card-stats">
          <text class="stat-item">消息: {{ bot.messageCount }}</text>
          <text class="stat-item">上次使用: {{ bot.lastUsed }}</text>
        </view>
      </view>
      <button class="start-btn" @click="startChat(bot.id)">开始聊天</button>
      <button class="unbind-btn" @click="unbindBot(bot.id)">解绑</button>
    </view>
    
    <view v-if="myBots.length === 0" class="empty-state">
      <text class="empty-icon">🤖</text>
      <text class="empty-text">还没有添加机器人</text>
      <button class="empty-btn" @click="addBot">去添加</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      myBots: [
        {
          id: 'bot_001',
          name: 'AI小爪',
          avatar: '🤖',
          description: 'ClawChat 官方 AI 助手',
          isOfficial: true,
          messageCount: 1256,
          lastUsed: '2024-03-11 10:30'
        },
        {
          id: 'bot_002',
          name: '写作大师',
          avatar: '✍️',
          description: '专业写作助手',
          isOfficial: true,
          messageCount: 89,
          lastUsed: '2024-03-10 18:45'
        }
      ]
    }
  },
  methods: {
    addBot() {
      uni.navigateTo({
        url: '/pages/bots/index'
      })
    },
    startChat(botId) {
      uni.showToast({
        title: '开始聊天: ' + botId,
        icon: 'success'
      })
    },
    unbindBot(botId) {
      uni.showModal({
        title: '提示',
        content: '确定要解绑这个机器人吗？',
        success: (res) => {
          if (res.confirm) {
            this.myBots = this.myBots.filter(bot => bot.id !== botId)
            uni.showToast({
              title: '已解绑',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}
</script>

<style>
.mybots-container {
  padding: 24rpx;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
  background: white;
  padding: 24rpx;
  border-radius: 16rpx;
}

.add-btn {
  background: #1890ff;
  color: white;
  border-radius: 8rpx;
  padding: 8rpx 24rpx;
}

.bot-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 24rpx;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.bot-card-avatar {
  width: 80rpx;
  height: 80rpx;
  background: #f0f0f0;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  margin-right: 24rpx;
}

.bot-card-info {
  flex: 1;
}

.bot-card-name {
  display: flex;
  align-items: center;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.bot-card-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 12rpx;
}

.bot-card-stats {
  display: flex;
  flex-wrap: wrap;
  font-size: 24rpx;
  color: #999;
  gap: 16rpx;
}

.start-btn {
  width: 140rpx;
  height: 60rpx;
  background: #1890ff;
  color: white;
  border-radius: 12rpx;
  margin-left: 16rpx;
}

.unbind-btn {
  width: 100rpx;
  height: 60rpx;
  background: #ff4d4f;
  color: white;
  border-radius: 12rpx;
  margin-left: 12rpx;
}

.empty-state {
  text-align: center;
  padding: 80rpx 0;
}

.empty-icon {
  font-size: 80rpx;
  color: #d9d9d9;
  display: block;
  margin-bottom: 24rpx;
}

.empty-text {
  display: block;
  font-size: 32rpx;
  color: #999;
  margin-bottom: 32rpx;
}

.empty-btn {
  background: #1890ff;
  color: white;
  padding: 16rpx 48rpx;
  border-radius: 24rpx;
}
</style>
