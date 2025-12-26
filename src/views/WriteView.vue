<script setup>
import { ref } from 'vue'
import { usePostStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

const store = usePostStore()
const router = useRouter()

const title = ref('')
const content = ref('')
const category = ref('일상')

// 등록 완료 버튼
const submitPost = () => {
  if (!title.value || !content.value) {
    alert('제목과 내용을 입력해주세요.')
    return
  }

  store.addPost({
    title: title.value,
    content: content.value,
    category: category.value,
  })

  // ✅ 정석: 이름으로 이동 (Home으로)
  router.push({ name: 'home' })
}

// 취소(목록으로) 버튼 함수
const goBack = () => {
  // ✅ 정석: 이름으로 이동
  router.push({ name: 'home' })
}
</script>

<template>
  <div>
    <h1>글 작성하기 ✏️</h1>

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
        <button class="btn-cancel" @click="goBack">목록으로</button>
        <button class="btn-submit" @click="submitPost">등록 완료</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* 버튼들을 가로로 배치하기 위한 그룹 */
.btn-group {
  display: flex;
  gap: 10px; /* 버튼 사이 간격 */
  margin-top: 10px;
}

/* 공통 버튼 스타일 */
button {
  flex: 1; /* 반반씩 꽉 차게 */
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

/* 취소 버튼 색상 */
.btn-cancel {
  background-color: #ccc;
  color: #333;
}

/* 등록 버튼 색상 */
.btn-submit {
  background-color: #42b883;
  color: white;
}
</style>
