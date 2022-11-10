import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router'

import ChatMenu from './pages/ChatMenu.vue'
import JoinPage from './pages/JoinPage.vue'

import './assets/main.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/',name:'join',component:JoinPage},
        {path:'/chat/:username/:roomIdName',name:'chat',component:ChatMenu,props:true}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app');
