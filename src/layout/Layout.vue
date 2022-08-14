<template>
	<div class="common-layout">
		<!-- container布局-->
		<el-container style="height: 100vh;">
			<!-- 侧边导航栏,定义默认宽度 -->
			<el-aside class="aside" :width="asideWidth">
				<!-- 固钉配置区域 -->
				<el-affix class="aside-affix">
					<div class="aside-logo">
						<!-- 导入图片固定写法 -->
						<el-image class="logo-image" :src="logo"/>
						<span :class="[isCollapse ? 'is-collapse' : '']">
						<span class="log-name">QKP容器云平台</span>
						</span>
					</div>
				</el-affix>
				<!-- 菜单导航 -->
				<!-- router 定义vue-router模式，菜单栏的index跟路由规则中的path绑定 -->
				<el-menu class="aside-menu"
								 router
								 :default-active="$route.path"
								 :collapse="isCollapse"
								 background-color="#131b27"
								 text-color="#bfcbd9"
								 active-text-color="20a0ff">
					<!-- routers就是router/index.js中的routes -->
					<div v-for="menu in routers" :key="menu">
						<!-- 第一种情况，children只有1个的菜单栏 -->
						<el-menu-item class="el-menu-item" v-if="menu.children && menu.children.length === 1" :index="menu.children[0].path">
							<!-- 处理图标和菜单栏的名称 -->
							<el-icon><component :is="menu.children[0].icon" /></el-icon>
							<template #title>
								{{ menu.children[0].name }}
							</template>
						</el-menu-item>
						<!-- 第二种情况，children大于1个的菜单栏 -->
						<el-sub-item class="aside-submenu" v-if="menu.children && menu.children.length > 1" :index="menu.path">
							<!-- 处理父菜单栏 -->
							<template #title>
								<el-icon><component :is="menu.icon" /></el-icon>
								{{  menu.name }}
							</template>
							<!-- 处理子菜单栏 -->
							<el-menu-item class="aside-childitem" v-for="child in menu.children" :key="child">
								<template #title>
									{{  child.name }}
								</template>
							</el-menu-item>
						</el-sub-item>
					</div>
				</el-menu>
			</el-aside>
			<!--  -->
			<el-container>
				<el-header>Header</el-header>
				<el-main>main</el-main>
				<el-footer>footer</el-footer>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import {useRouter} from "vue-router"
export default {
	data () {
		return {
			logo: require("@/assets/k8s/logo.svg"), // 引入图片路径
			asideWidth: "220px",
			isCollapse: false,  // 是否展开
			routers: [],
		}
	},
	beforeMount() {
		this.routers = useRouter().options.routes
	}
}
</script>

<style scoped>
	/*aside属性*/
	.aside {
		/*展开和关闭的速度*/
		transition: all .5s;
		background-color: #131b27;
	}
	.aside-affix {
		z-index: 1200;
	}
	.aside-logo {
		color: white;
		height: 60px;
	}
	.logo-image {
		width: 45px;
		height: 45px;
		top: 12px;
		padding-left: 12px;
	}
	.log-name {
		font-size: 20px;
		font-weight: bold;
		padding: 10px;
	}
	.is-collapse {
		display: none;
	}
</style>

