import { ref, watch } from 'vue' // ⭐ watch(감시자) 추가!
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
  // [1] 불러오기: 금고에 데이터가 있으면 가져오고, 없으면 목업 데이터를 쓴다!
  const savedPosts = localStorage.getItem('my-blog-posts')

  // JSON.parse로 포장을 뜯어서 가져와. 없으면 원래 있던 목업 데이터들로 시작!
  const posts = ref(
    savedPosts
      ? JSON.parse(savedPosts)
      : [
          {
            id: 1,
            createdAt: 1,
            title: '첫 번째 글입니다',
            content: 'Vue 3 공부 중!',
            views: 0,
            category: '일상',
          },
          {
            id: 2,
            createdAt: 2,
            title: '면접 준비 꿀팁',
            content: '깃허브 잔디 관리!',
            views: 0,
            category: '취업',
          },
          {
            id: 3,
            createdAt: 3,
            title: '점심 메뉴 추천',
            content: '국밥 최고!',
            views: 0,
            category: '잡담',
          },
        ],
  )

  // [2] 저장하기 (감시자): posts 데이터가 바뀔 때마다 자동으로 금고에 저장해!
  watch(
    posts,
    (newPosts) => {
      // 로컬스토리지에는 '문자'만 저장 가능해서 JSON.stringify로 변환(포장)해야 해
      localStorage.setItem('my-blog-posts', JSON.stringify(newPosts))
    },
    { deep: true },
  ) // deep: true는 배열 안의 내용물(조회수, 제목 등)까지 꼼꼼히 감시하라는 뜻!

  // --- 아래 함수들은 그대로 유지 ---
  const addPost = (newPost) => {
    const now = Date.now()
    posts.value.push({
      id: now,
      createdAt: now,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      views: 0,
    })
  }

  const deletePost = (id) => {
    posts.value = posts.value.filter((p) => p.id !== id)
  }

  const editPost = (id, updatedData) => {
    const index = posts.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...updatedData }
    }
  }

  const increaseView = (id) => {
    const index = posts.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], views: posts.value[index].views + 1 }
    }
  }

  return { posts, addPost, editPost, deletePost, increaseView }
})
