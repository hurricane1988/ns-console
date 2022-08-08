// 导入router的路由模式
import {createRouter, createWebHistory} from 'vue-router'

// 路由规则
const routes = [
    {
        path: '/home',
        name: '概要',
        icon: 'odometer',
        meta: {title: "概要", requireAuth: true},
        component: () => import('@/views/home/Home')
    },
]

// 创建路由实例
const router = createRouter({
    // hash模式: createWebHashHistory
    // history模式: createWebHistory
    history: createWebHistory(),
    routes
})

// 抛出路由实例，在main.js中引入
export default router