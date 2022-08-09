// 导入router的路由模式
import {createRouter, createWebHistory} from 'vue-router'
// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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