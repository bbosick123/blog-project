<script setup>
import { usePostStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

const store = usePostStore() // 창고 연결
const router = useRouter() // 이동 도구 연결
</script>

<template>
  <main>
    <div class="header">
      <h1>용식's 블로그</h1>
      <button class="btn-write" @click="router.push({ name: 'write' })">글쓰기</button>
    </div>

    <ul>
      <li
        v-for="post in store.posts"
        :key="post.id"
        @click="router.push({ name: 'read', params: { id: post.id } })"
      >
        <div class="title-row">
          <span class="category">{{ post.category }}</span>
          <h3>{{ post.title }}</h3>

          <button class="btn-delete" @click.stop="store.deletePost(post.id)">삭제</button>
        </div>

        <p>{{ post.content }}</p>
        <small>조회수: {{ post.views }}</small>
      </li>
    </ul>
  </main>
</template>

<style scoped>
/* 기존 스타일 유지하면서, 삭제 버튼용 스타일 추가 */
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

/* 빨간색 삭제 버튼 */
.btn-delete {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: auto; /* 오른쪽 끝으로 밀기 */
}
.btn-delete:hover {
  background-color: #cc0000;
}
</style>
