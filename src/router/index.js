import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Item from  '@/components/Item.vue'


Vue.use(VueRouter)


  const routes = [
    {
      path: '/',
      name: 'component',
      component: HelloWorld
    },
    { 
      path: '/item/:id',
      name: 'item',
      component: Item,
      props: true,
      beforeEnter:(to, from, next)=>{
     
        next()
    }
  }
  ]
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  export default router
