<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/posts'

const route = useRoute()
const router = useRouter()
const store = usePostStore()

// 1. 입력창과 연결할 반응형 변수 (초기값은 비워둠)
const title = ref('')
const content = ref('')
const category = ref('일상')

// 2. URL에서 수정할 글의 ID 가져오기
const postId = Number(route.params.id)

// 3. 페이지가 열릴 때 기존 데이터 불러오기
onMounted(() => {
  const post = store.posts.find((p) => p.id === postId)

  if (post) {
    // 찾은 데이터를 입력창 변수에 쏙 넣어줌 (복사본 생성)
    title.value = post.title
    content.value = post.content
    category.value = post.category
  } else {
    alert('해당 글을 찾을 수 없습니다.')
    router.push({ name: 'home' })
  }
})

// 수정 완료 버튼 함수
const updatePost = () => {
  if (!title.value || !content.value) {
    alert('제목과 내용을 입력해주세요.')
    return
  }

  // 스토어의 수정 함수 호출 (우리가 아까 만든 editPost)
  store.editPost(postId, {
    title: title.value,
    content: content.value,
    category: category.value,
  })

  alert('수정이 완료되었습니다.')

  // 수정 완료 후 다시 상세 페이지로 이동
  router.push({ name: 'read', params: { id: postId } })
}

// 취소 버튼 함수
const goBack = () => {
  router.back() // 이전 페이지(상세페이지)로 돌아가기
}
</script>

<template>
  <div>
    <h1>글 수정하기 🛠️</h1>

    <div class="form-wrapper">
      <div class="form-item">
        <label>카테고리</label>
        <select v-model="category">
          <option>일상</option>
          <option>취업</option>
          <option>공부</option>
          <option>잡담</option>
        </select>
      </div>

      <div class="form-item">
        <label>제목</label>
        <input type="text" v-model="title" placeholder="제목을 입력하세요" />
      </div>

      <div class="form-item">
        <label>내용</label>
        <textarea v-model="content" placeholder="내용을 입력하세요"></textarea>
      </div>

      <div class="btn-group">
        <button class="btn-cancel" @click="goBack">취소</button>
        <button class="btn-submit" @click="updatePost">수정 완료</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 용식쓰의 WriteView 디자인 그대로 유지 */
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}
input,
select,
textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}
textarea {
  height: 200px;
  resize: none;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}
button:hover {
  opacity: 0.8;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
}

.btn-submit {
  background-color: #42b883;
  color: white;
}
</style>
