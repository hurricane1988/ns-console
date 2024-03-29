// 导入router的路由模式
import {createRouter, createWebHistory} from 'vue-router'
// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入layout
import Layout from '@/layout/Layout'

// 路由规则
const routes = [
    {
        path: "/home",
        component: Layout,
        icon: "odometer",
        children: [
            {
                path: '/home',
                name: '集群概览',
                icon: 'odometer',
                meta: {title: "集群概览", requireAuth: true},
                component: () => import('@/views/home/Home.vue')
            }
        ]
    },
    // 工作负载路由
    {
        path: "/workload",
        name: "工作负载",
        component: Layout,
        icon: "menu",
        meta: {
            title: "工作负载",
            requireAuth: true
        },
        children: [
            {
                path: "/workload/deployment",
                name: "部署",
                icon: "el-icon-s-data",
                meta: {title: "部署", requireAuth: true},
                component: () => import('@/views/deployment/Deployment.vue')
            },
            {
                path: "/workload/pod",
                name: "容器组",
                icon: "el-icon-document-add",
                meta: {title: "容器", requireAuth: true},
                component: () => import('@/views/pod/Pod.vue')
            }
        ]
    },
    // 404路由
    {
        path: '/404',
        meta: {title: "页面不存在", requireAuth: true},
        component: () => import('@/views/common/404')
    },
    // 403路由
    {
        path: '/403',
        meta: {title: "无权访问页面", requireAuth: true},
        component: () => import('@/views/common/403')
    },
    // 未匹配的路由均跳转至404页面
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    },
]

// 创建路由实例
const router = createRouter({
    // hash模式: createWebHashHistory
    // history模式: createWebHistory
    history: createWebHistory(),
    routes
})

// 进度条配置
// 设置进度条递增
NProgress.inc(0.8)
// 动画效果、动画速度、进度环是否显示
// easing 动画字符串
// speed 动画速度
// showSpinner 进度环显示隐藏
NProgress.configure({easing: "ease", speed: 600, showSpinner: false})

// 路由守卫，路由拦截
// 页面，只有登录了之后才有权限查看某些页面。。。说白了就是路由拦截。
// to 要去到某个页面的属性
// from 从哪个页面来的属性
// next 处理路由跳转及放行
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 设置头部
    if(to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "nativeSphere"
    }
    // 放行
    next()
})

// 关闭进度条
router.afterEach(() => {
    NProgress.done()
})

// 抛出路由实例，在main.js中引入
export default router