<script setup>
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/posts'

// 1. 도구들 준비
const route = useRoute() // 주소 정보(ID) 확인용 🗺️
const router = useRouter() // 페이지 이동용 🚕
const store = usePostStore() // 데이터 창고 🏬

// 2. 핵심 로직: 주소창의 id(문자)를 가져와서 숫자(Number)로 변환!
// (이거 안 하면 못 찾음!)
const postId = Number(route.params.id)

// 3. 창고에서 내 ID랑 똑같은 글 찾아내기
const post = store.posts.find((p) => p.id === postId)

// 목록으로 돌아가기 함수
const goBack = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="read-container">
    <div v-if="post">
      <div class="post-header">
        <span class="category">{{ post.category }}</span>
        <h1>{{ post.title }}</h1>
        <div class="meta-info">
          <small>조회수: {{ post.views }}</small>
          <small>글번호: {{ post.id }}</small>
        </div>
      </div>

      <hr />

      <div class="post-content">
        {{ post.content }}
      </div>

      <div class="btn-area">
        <button class="btn-list" @click="goBack">목록으로</button>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>어라? 글이 없는데요? 😢</h2>
      <p>삭제되었거나 주소가 잘못되었습니다.</p>
      <button class="btn-list" @click="goBack">홈으로 가기</button>
    </div>
  </div>
</template>

<style scoped>
.read-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background: #fff;
}

.post-header {
  margin-bottom: 20px;
}

.category {
  display: inline-block;
  background: #42b883;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 10px;
}

h1 {
  font-size: 28px;
  margin: 10px 0;
  color: #333;
}

.meta-info {
  display: flex;
  gap: 15px;
  color: #999;
  font-size: 14px;
}

hr {
  border: 0;
  height: 1px;
  background: #eee;
  margin: 30px 0;
}

.post-content {
  min-height: 200px;
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  white-space: pre-wrap; /* 엔터 친 거 줄바꿈 적용 */
}

.btn-area {
  margin-top: 40px;
  text-align: center;
}

.btn-list {
  background-color: #555;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-list:hover {
  background-color: #333;
}

.not-found {
  text-align: center;
  padding: 50px 0;
  color: #666;
}
</style>
