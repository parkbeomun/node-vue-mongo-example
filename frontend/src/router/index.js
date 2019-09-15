import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Post from '@/components/posts/Post'
import WritePost from '@/components/posts/WritePost'
import DetailPost from '@/components/posts/DetailPost'
import Todo from '@/components/todo/Todo'
import JsonPlaceHolder from '@/components/JsonPlaceHolder'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import LoginNaverCallback from '@/components/auth/LoginNaverCallback'
import Register from '@/components/auth/Register'
import Me from '@/components/Me'
Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = localStorage.getItem('access-token');
  if(isAuthenticated) return next()
  next('/login')
}

//mode: 'history' 를 설정하면 URL 의 # 이 없어진다.
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/post',
      name: 'Post',
      component: Post,
    },{
      path: '/post/write',
      name: 'WritePost',
      component: WritePost,
    },{
      path: '/post/detail/:id', /* 동적 라우팅 */
      name: 'DetailPost',
      component: DetailPost
    }
    , {
      path: '/todo',
      name: 'Todo',
      component: Todo
    },{
      path: '/sample',
      name: 'jsonplaceholder',
      component: JsonPlaceHolder
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/login/naver/callback',
      name: 'LoginNaverCallback',
      component: LoginNaverCallback
    },{
      path: '/logout',
      name: 'logout',
      component: Logout
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/me',
      name: 'Me',
      component: Me,
      beforeEnter: requireAuth() //beforeEnter 인터셉터
    }
  ]
})
