<script setup>
// 1. 부모(HomeView)가 v-model로 보낸 값을 받을 변수 이름은 무조건 'modelValue'야!
defineProps(['modelValue'])

// 2. 값이 바뀌면 부모한테 "업데이트해줘!"라고 신호 보낼 준비
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="search-container">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="검색어를 입력해주세요."
      class="search-input"
    />
  </div>
</template>

<style scoped>
/* HomeView.vue에 있던 검색창 관련 스타일만 여기로 이사 왔어! */
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
</style>
