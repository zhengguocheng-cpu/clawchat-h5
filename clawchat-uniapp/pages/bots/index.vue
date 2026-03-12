<template>
  <view class="bots-container">
    <view class="search-bar">
      <input 
        class="search-input" 
        type="text" 
        placeholder="搜索机器人..."
      />
    </view>
    
    <view class="category-list">
      <view 
        v-for="(cat, index) in categories" 
        :key="index" 
        class="category-item"
        :class="{ active: activeCategory === cat.key }"
        @click="activeCategory = cat.key"
      >
        <text class="category-icon">{{ cat.icon }}</text>
        <text class="category-name">{{ cat.label }}</text>
      </view>
    </view>
    
    <view class="bots-list">
      <view v-for="(bot, index) in bots" :key="index" class="bot-item">
        <view class="bot-avatar">{{ bot.avatar }}</view>
        <view class="bot-info">
          <view class="bot-name">
            <text>{{ bot.name }}</text>
            <text v-if="bot.isOfficial" class="official-tag">官方</text>
          </view>
          <text class="bot-desc">{{ bot.description }}</text>
          <view class="bot-tags">
            <text v-for="(tag, i) in bot.tags" :key="i" class="tag">{{ tag }}</text>
          </view>
        </view>
        <button class="start-btn" @click="startChat(bot.id)">开始聊天</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeCategory: 'all',
      categories: [
        { key: 'all', label: '全部', icon: '🤖' },
        { key: 'chat', label: '聊天', icon: '💬' },
        { key: 'writing', label: '写作', icon: '✍️' },
        { key: 'coding', label: '编程', icon: '💻' }
      ],
      bots: [
        {
          id: 'bot_001',
          name: 'AI小爪',
          avatar: '🤖',
          description: 'ClawChat 官方 AI 助手',
          isOfficial: true,
          tags: ['官方', '全能', '热门']
        },
        {
          id: 'bot_002',
          name: '写作大师',
          avatar: '✍️',
          description: '专业写作助手',
          isOfficial: true,
          tags: ['写作', '创意']
        }
      ]
    }
  },
  methods: {
    startChat(botId) {
      uni.showToast({
        title: '开始聊天: ' + botId,
        icon: 'success'
      })
    }
  }
}
</script>

<style>
.bots-container {
  padding: 24rpx;
}

.search-bar {
  background: white;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.search-input {
  width: 100%;
  height: 72rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 16rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24rpx;
}

.category-item {
  padding: 12rpx 24rpx;
  margin: 8rpx;
  background: #f5f5f5;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
}

.category-item.active {
  background: #1890ff;
  color: white;
}

.category-icon {
  margin-right: 8rpx;
}

.category-name {
  font-size: 28rpx;
}

.bots-list {
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
}

.bot-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #e0e0e0;
}

.bot-avatar {
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

.bot-info {
  flex: 1;
}

.bot-name {
  display: flex;
  align-items: center;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.official-tag {
  background: #1890ff;
  color: white;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  margin-left: 12rpx;
}

.bot-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 12rpx;
}

.bot-tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background: #f0f0f0;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  margin-right: 8rpx;
}

.start-btn {
  width: 160rpx;
  height: 64rpx;
  background: #1890ff;
  color: white;
  border-radius: 12rpx;
  font-size: 28rpx;
  margin-left: 16rpx;
}
</style>
