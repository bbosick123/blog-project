<script setup>
import { ref, computed } from 'vue'
import { usePostStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

// 컴포넌트 2개 다 가져오기
import SearchBar from '@/components/SearchBar.vue'
import PostList from '@/components/PostList.vue' // 추가됨!

const store = usePostStore()
const router = useRouter()
const searchQuery = ref('')

// Computed (데이터 필터링) 로직은 부모가 그대로 유지!
const filteredPosts = computed(() => {
  const sorted = [...store.posts].sort((a, b) => b.createdAt - a.createdAt)
  if (!searchQuery.value) return sorted
  return sorted.filter((post) => {
    const keyword = searchQuery.value.toLowerCase()
    return (
      post.title.toLowerCase().includes(keyword) || post.content.toLowerCase().includes(keyword)
    )
  })
})

// 삭제 로직 (자식이 'delete' 외치면 실행됨)
const handleDelete = (id) => {
  if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
    store.deletePost(id)
  }
}

// [추가] 상세페이지 이동 로직 (자식이 'goRead' 외치면 실행됨)
const goDetail = (id) => {
  router.push({ name: 'read', params: { id } })
}
</script>

<template>
  <main>
    <div class="header">
      <h1>용식's 블로그</h1>
      <button class="btn-write" @click="router.push({ name: 'write' })">글쓰기</button>
    </div>

    <SearchBar v-model="searchQuery" />

    <PostList
      v-if="filteredPosts.length > 0"
      :posts="filteredPosts"
      @delete="handleDelete"
      @goRead="goDetail"
    />

    <div v-else class="no-result">
      <p>보여줄 글이 없습니다. 검색어를 확인해 보세요! 😅</p>
    </div>
  </main>
</template>

<style scoped>
/* 리스트 스타일은 PostList로 이사 갔으니 싹 지움! */
/* 헤더랑 no-result만 남음 -> 완전 깔끔 */
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
.no-result {
  text-align: center;
  padding: 50px 0;
  color: #888;
}
</style>
