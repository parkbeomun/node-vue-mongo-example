import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Post from '@/components/posts/Post'
import WritePost from '@/components/posts/WritePost'
import Todo from '@/components/todo/Todo'
import JsonPlaceHolder from '@/components/JsonPlaceHolder'

Vue.use(Router)

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
      path: '/todo',
      name: 'Todo',
      component: Todo
    },{
      path: '/sample',
      name: 'jsonplaceholder',
      component: JsonPlaceHolder
    }
  ]
})
