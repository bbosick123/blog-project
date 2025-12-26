import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
  const posts = ref([
    {
      id: 1,
      title: '첫 번째 글입니다',
      content: 'Vue 3랑 Pinia 공부 중! 처음부터 하니까 이해 잘 되네.',
      views: 0,
      category: '일상',
    },
    {
      id: 2,
      title: '면접 준비 꿀팁',
      content: '포트폴리오는 역시 깃허브 잔디 관리가 생명이지.',
      views: 0,
      category: '취업',
    },
    {
      id: 3,
      title: '점심 메뉴 추천',
      content: '오늘은 뜨끈한 국밥이 땡긴다.',
      views: 0,
      category: '잡담',
    },
  ])

  return { posts }
})
