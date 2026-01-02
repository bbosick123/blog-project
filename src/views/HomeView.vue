<script setup>
import { ref, computed } from 'vue' // 1. ref 추가 (검색어 담기용)
import { usePostStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

const store = usePostStore() // 창고 연결
const router = useRouter() // 이동 도구 연결

// [1] 검색어를 담을 바구니 (v-model 연결용)
const searchQuery = ref('')

// [2] 실시간 필터링 + 정렬 계산기 (정석 버전)
const filteredPosts = computed(() => {
  // 1. 먼저 원본을 복사해서 최신순으로 정렬
  const sorted = [...store.posts].sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  // 2. 만약 검색창이 비어있으면? 정렬된 전체 리스트 바로 내보내기
  if (!searchQuery.value) {
    return sorted
  }

  // 3. 검색어가 있으면? 필터링해서 내보내기
  return sorted.filter((post) => {
    const keyword = searchQuery.value.toLowerCase()
    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()

    // 제목에 키워드가 포함되어 있거나(||) 내용에 포함되어 있으면 합격!
    const isTitleMatch = title.includes(keyword)
    const isContentMatch = content.includes(keyword)

    return isTitleMatch || isContentMatch
  })
})

const handleDelete = (id) => {
  if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
    store.deletePost(id)
  }
}
</script>

<template>
  <main>
    <div class="header">
      <h1>용식's 블로그</h1>
      <button class="btn-write" @click="router.push({ name: 'write' })">글쓰기</button>
    </div>

    <div class="search-container">
      <input
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
        type="text"
        placeholder="검색어를 입력해주세요."
        class="search-input"
      />
    </div>

    <ul v-if="filteredPosts.length > 0">
      <li
        v-for="post in filteredPosts"
        :key="post.id"
        @click="router.push({ name: 'read', params: { id: post.id } })"
      >
        <div class="title-row">
          <span class="category">{{ post.category }}</span>
          <h3>{{ post.title }}</h3>

          <button class="btn-delete" @click.stop="handleDelete(post.id)">삭제</button>
        </div>

        <p>{{ post.content }}</p>
        <small>조회수: {{ post.views }}</small>
        <span v-if="post.views >= 10">🔥</span>
      </li>
    </ul>

    <div v-else class="no-result">
      <p>보여줄 글이 없습니다. 검색어를 확인해 보세요! 😅</p>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.btn-write {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

/* 검색창 스타일 추가 */
.search-container {
  margin-bottom: 20px;
}
.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: #42b883;
}

/* 검색 결과 없음 스타일 */
.no-result {
  text-align: center;
  padding: 50px 0;
  color: #888;
}

ul {
  list-style: none;
  padding: 0;
}
li {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}
li:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category {
  color: #666;
  font-size: 0.9em;
  background: #eee;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 10px;
}
h3 {
  margin: 0;
  display: inline-block;
}
p {
  color: #555;
}
small {
  color: #aaa;
}

.btn-delete {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: auto;
}
.btn-delete:hover {
  background-color: #cc0000;
}
</style>
