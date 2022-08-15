import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'

Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
     {path:'/',redirect:"/login"},
     {path:'/login',component:() => import(/* webpackChunkName:'login' */'../components/login')},
     {path:'/home',redirect:'/welcome',component:() => import(/* webpackChunkName:'Home' */'../components/Home'),children:[
     {path:'/welcome',component:()=>import(/* webpackChunkName:'Welcome' */ '../components/Welcome')},
     {path:'/users',component:()=>import(/* webpackChunkName:'users' */ '../components/user/user')},
     {path:'/rights',component:()=>import(/* webpackChunkName:'rights' */ '../components/powerRegulate/rights.vue')},
     {path:'/roles',component:()=>import(/* webpackChunkName:'roles' */ '../components/powerRegulate/roles.vue')},
     {path:'/categories',component:()=>import(/* webpackChunkName:'roles' */ '../components/categories/categories.vue')},
     {path:'/params',component:()=>import(/* webpackChunkName:'roles' */ '../components/params/params.vue')}
     ]},
  ]
})
router.beforeEach((toPage,newPage,next)=>{
  console.log(this)
  console.log(toPage)
   if(toPage.path=='/login'){
      next()
   }else if(!sessionStorage.getItem("token")){
    next()
   }else{
    next()
   }
   
})


export default router
