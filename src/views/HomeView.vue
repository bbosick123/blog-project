<script setup>
import { usePostStore } from '@/stores/posts'

const store = usePostStore()
</script>

<template>
  <main>
    <h1>용식's 블로그</h1>

    <ul>
      <li v-for="post in store.posts" :key="post.id">
        <span class="category">{{ post.category }}</span>
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <small>조회수: {{ post.views }}</small>
      </li>
    </ul>
  </main>
</template>

<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
}
.category {
  background: #eee;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
</style>
