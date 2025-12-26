<script setup>
import { usePostStore } from '@/stores/posts'

const store = usePostStore()
</script>

<template>
  <main>
    <div class="header">
      <h1>용식's 블로그</h1>
      <button class="btn-write" @click="$router.push({ name: 'write' })">글쓰기</button>
    </div>

    <ul>
      <li v-for="post in store.posts" :key="post.id" @click="$router.push(`/post/${post.id}`)">
        <span class="category">{{ post.category }}</span>
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <small>조회수: {{ post.views }}</small>
      </li>
    </ul>
  </main>
</template>

<style scoped>
/* 👇 헤더와 글쓰기 버튼 스타일 추가 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.btn-write {
  background-color: #333;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.btn-write:hover {
  background-color: #555;
}

/* 아래는 기존 스타일 유지 */
ul {
  padding: 0;
}
li {
  list-style: none;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
li:hover {
  background-color: #f9f9f9;
}
.category {
  background: #eee;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
</style>
