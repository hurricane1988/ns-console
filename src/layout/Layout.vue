<template>
  <div class="common-layout">
  <!-- container整体布局 -->
    <el-container style="height: 100vh;">
			<!--侧边栏,定义默认宽度-->
      <el-aside class="aside" width="asideWidth">
				<!-- 固钉，将平台logo和名字固钉在侧边栏最上方 -->
				<!-- z-index是显示优先级 -->
				<el-affix class="aside-affix" z-index="1200">
					<div class="aside-logo">
						<!-- logo图片 -->
						<el-image class="logo-image" src="logo" />
						<!-- 平台名，折叠后不显示 -->
						<span :class="[isCollapsed ? 'is-collapse' : '']">
							<span class="logo-name">QKP容器云平台</span>
						</span>
					</div>
				</el-affix>
	
				<!-- 菜单导航栏 -->
				<!-- router 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
				<!-- default-active 当前激活菜单的index,将菜单栏与路径做了对应关系 -->
				<!-- collapse 是否折叠 -->
				<el-menu class="aside-menu"
					router :default-active="$route.path" :collapse="isCollapsed" background-color="#131b27" text-color="#bfcbd9" active-text-color="#20a0ff">
					<!-- for循环路由规则 -->
					<div v-for="menu in routers" :key="menu">
						<!-- 处理子路由只有1个的情况，如概要、工作流 -->
						<el-menu-item class="aside-menu-item" v-if="menu.children && menu.children.length == 1" :index="menu.children[0].path">
							<!-- 引入图标的方式 -->
							<el-icon><component :is="menu.children[0].icon"/></el-icon>
							
							<template #title>
								{{menu.children[0].name}}
							</template>
						</el-menu-item>
						<!-- 处理有多个子路由的情况，如集群、工作负载、负载均衡等 -->
						<!-- 父菜单 -->
						<!-- 注意el-menu-item在折叠后，title的部分会自动消失，但el-sub-menu不会，需要自己控制 -->
						
						<el-sub-menu class="aside-submenu" v-else-if="menu.children && menu.children.length > 1" :index="menu.path">
							<template #title>
								<el-icon><component :is="menu.icon" /></el-icon>
								<span :class="[isCollapsed ? 'is-collapse' : '']">{{menu.name}}</span>
							</template>
							
							<!-- 子菜单 -->
							<el-menu-item class="aside-menu-childitem" v-for="child in menu.children" :key="child" :index="child.path">
								<template #title>
									{{child.name}}
								</template>
							</el-menu-item>
						</el-sub-menu>
					</div>
				</el-menu>
			</el-aside>
      </el-container>
	</div>
</template>

<script>
import {useRouter} from "vue-router"
export default {
	data() {
		return {
			// 导入logo图片
			logo: require("@/assets/k8s/logo.svg"),
			// 控制导航栏折叠
			isCollapsed: false,
			// 导航栏宽度
			asideWidth: '220px',
			// 路由规则
			routers: [],
		}
	},
	beforeMount() {
		// 使用useRouter().options.routes方法获取路由规则
		this.routers = useRouter().options.routes
	}
}
</script>

<style scoped>
	/* 侧边栏折叠速度，背景色 */
	.aside {
		transition: all .5s;
		background-color: #131b27;
	}
	/* 固钉，以及logo图片和平台名的属性 */
	.aside-logo {
		background-color: #131b27;
		height: 60px;
		color: white;
	}
	.logo-image {
		width: 40px;
		height: 40px;
		top: 12px;
		padding-left: 12px;
	}
	.logo-name {
		font-size: 20px;
		font-weight: bold;
		padding-right: 45px;
		padding-left: 10px;
	}
	/* 滚动条不展示 */
	.aside::-webkit-scrollbar {
		display: none;
	}
	/* 修整边框，让边框不要有溢出 */
	.aside-affix {
		border-bottom-width: 0;
	}
	.aside-menu {
		border-right-width: 0
	}
	/* 菜单栏的位置以及颜色 */
	.aside-menu-item.is-active {
		background-color: #1f2a3a ;
	}
	.aside-menu-item:hover {
		background-color: #142c4e;
	}
	.aside-menu-childitem {
		padding-left: 40px !important;
	}
	.aside-menu-childitem.is-active {
		background-color: #1f2a3a ;
		font-family: 微软雅黑;
		font-size: 20px;
	}
	.aside-menu-childitem:hover {
		background-color: #ffffff;
		border-style: none;
		border-radius: 10px;
	}
</style>
