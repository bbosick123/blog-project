import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
  // 1. 블로그 글 데이터 (목업 데이터)
  const posts = ref([
    {
      id: 1,
      createdAt: 1,
      title: '첫 번째 글입니다',
      content: 'Vue 3랑 Pinia 공부 중! 처음부터 하니까 이해 잘 되네.',
      views: 0,
      category: '일상',
    },
    {
      id: 2,
      createdAt: 2,
      title: '면접 준비 꿀팁',
      content: '포트폴리오는 역시 깃허브 잔디 관리가 생명이지.',
      views: 0,
      category: '취업',
    },
    {
      id: 3,
      createdAt: 3,
      title: '점심 메뉴 추천',
      content: '오늘은 뜨끈한 국밥이 땡긴다.',
      views: 0,
      category: '잡담',
    },
  ])

  // 2. 글 등록하는 함수 (Action)
  const addPost = (newPost) => {
    const now = Date.now() // 현재 시간을 한 번만 딱 찍어서 변수에 담고!

    posts.value.push({
      id: now, // ID로도 쓰고
      createdAt: now, // ⭐ 날짜 정렬용으로도 쓰고!
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      views: 0,
    })
  }

  const deletePost = (id) => {
    posts.value = posts.value.filter((p) => p.id !== id)
  }

  // src/stores/posts.js 내부

  const editPost = (id, updatedData) => {
    // 1. 수정할 글이 몇 번째 칸에 있는지 확인 (실무 필수 도구!)
    const index = posts.value.findIndex((p) => p.id === id)

    if (index !== -1) {
      // 2. 덮어쓰기 신공! 기존 데이터(...복사) 위에 새 데이터(updatedData)를 올림
      posts.value[index] = {
        ...posts.value[index], // ID, 조회수 등 기존 정보 유지
        ...updatedData, // 사용자가 수정한 제목, 내용 등만 덮어쓰기
      }
    }
  }

  // 조회수 증가 함수
  const increaseView = (id) => {
    // 1. 배달받은 id로 배열의 몇 번째 칸(index)인지 찾기
    const index = posts.value.findIndex((p) => p.id === id)

    if (index !== -1) {
      // 2. ⭐ 용식쓰가 말한 '정의하는' 단계!
      // 오른쪽 {} 안에서 +1 계산을 먼저 끝내고, 통째로 대입해서 갈아끼움
      posts.value[index] = {
        ...posts.value[index],
        views: posts.value[index].views + 1,
      }
    }
  }

  // 잊지 말고 return에 추가해줘야 밖에서 쓸 수 있어!
  return { posts, addPost, editPost, deletePost, increaseView }
})
