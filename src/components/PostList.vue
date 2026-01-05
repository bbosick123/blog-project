<script setup>
// 1. 부모가 준 리스트 데이터 받기
// 이름은 깔끔하게 'posts'라고 짓자.
defineProps(['posts'])

// 2. 부모한테 보낼 신호 등록
// - goRead: 글 클릭했으니 이동시켜줘!
// - delete: 삭제 버튼 눌렀으니 삭제해줘!
defineEmits(['goRead', 'delete'])
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id" @click="$emit('goRead', post.id)">
      <div class="title-row">
        <span class="category">{{ post.category }}</span>
        <h3>{{ post.title }}</h3>

        <button class="btn-delete" @click.stop="$emit('delete', post.id)">삭제</button>
      </div>

      <p>{{ post.content }}</p>
      <small>조회수: {{ post.views }}</small>
      <span v-if="post.views >= 10">🔥</span>
    </li>
  </ul>
</template>

<style scoped>
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
