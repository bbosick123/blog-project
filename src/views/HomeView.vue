<script setup>
import { ref, computed } from 'vue'
import { usePostStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

// [1] 방금 만든 검색창 부품(SearchBar) 가져오기!
import SearchBar from '@/components/SearchBar.vue'

const store = usePostStore()
const router = useRouter()

const searchQuery = ref('')

// computed 로직은 그대로 유지 (데이터는 사장님이 관리하니까!)
const filteredPosts = computed(() => {
  const sorted = [...store.posts].sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  if (!searchQuery.value) {
    return sorted
  }

  return sorted.filter((post) => {
    const keyword = searchQuery.value.toLowerCase()
    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()
    return title.includes(keyword) || content.includes(keyword)
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

    <SearchBar v-model="searchQuery" />

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
/* [3] CSS 대청소!
  검색창 관련 스타일(.search-container, .search-input)은 
  SearchBar.vue로 이사 갔으니까 여기선 싹 지웠어. 훨씬 깔끔하지?
*/

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

/* .no-result 스타일은 리스트랑 관련 있으니 남겨둠 */
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
