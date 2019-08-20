import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Post from '@/components/posts/Post'
import WritePost from '@/components/posts/WritePost'
import DetailPost from '@/components/posts/DetailPost'
import Todo from '@/components/todo/Todo'
import JsonPlaceHolder from '@/components/JsonPlaceHolder'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Me from '@/components/Me'
Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false
  if(isAuthenticated) return next()
  next('/login')
}

export default new Router({
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
