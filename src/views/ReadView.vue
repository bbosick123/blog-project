<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/posts'

// 1. 도구들 준비
const route = useRoute()
const router = useRouter()
const store = usePostStore()

// 2. 변수 선언
const postId = Number(route.params.id)
const post = store.posts.find((p) => p.id === postId)

// 3. 라이프사이클: 화면 켜지면 조회수 상승
onMounted(() => {
  if (post) {
    // 글이 존재할 때만 실행
    store.increaseView(postId)
  }
})

// --- 기능 함수들 ---

const goBack = () => {
  router.push({ name: 'home' })
}

const goToEdit = () => {
  router.push({
    name: 'edit',
    params: { id: postId },
  })
}

// ✅ 삭제 함수 추가
const handleDelete = () => {
  // 1. 사용자에게 확인 받기
  if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
    // 2. 창고(Store)에 삭제 명령 내리기
    store.deletePost(postId)

    // 3. 삭제 완료 후 홈으로 이동
    alert('삭제되었습니다.')
    router.push({ name: 'home' })
  }
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
        <button class="btn-edit" @click="goToEdit">수정하기</button>
        <button class="btn-delete" @click="handleDelete">삭제하기</button>
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
/* 기존 스타일 그대로 유지하고 삭제 버튼 스타일만 추가할게! */
.read-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
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
  white-space: pre-wrap;
}
.btn-area {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 12px;
}
.btn-list,
.btn-edit,
.btn-delete {
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-list {
  background-color: #555;
  color: white;
}
.btn-list:hover {
  background-color: #333;
}
.btn-edit {
  background-color: #42b883;
  color: white;
  font-weight: bold;
}
.btn-edit:hover {
  background-color: #3aa876;
}

/* ✅ 삭제 버튼 스타일 (빨간색) */
.btn-delete {
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
}
.btn-delete:hover {
  background-color: #c0392b;
}

.not-found {
  text-align: center;
  padding: 50px 0;
  color: #666;
}
</style>
