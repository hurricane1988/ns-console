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
			
			<!--  -->
			<el-container>
				<el-header class="header">
					<el-row :gutter="20">
						<!-- 折叠按钮 -->
						<el-col :span="1">
							<div class="header-collapse" @click="onCollapse">
								<el-icon><component :is="isCollapse?'expand':'fold'" /></el-icon>
							</div>
						</el-col>
						
						<!-- 面包屑 -->
						<el-col :span="10">
							<div class="header-breadcrumb">
								<el-breadcrumb separator="/">
									<!-- 最外层“工作台”，写死 -->
									<el-breadcrumb-item :to="{path:'/'}">工作台</el-breadcrumb-item>
									<!-- 循环出路由规则中的父name与子name -->
									<template v-for="(matched, m) in this.$route.matched" :key="m">
										<el-breadcrumb-item v-if="matched.name != undefined">
											{{ matched.name }}
										</el-breadcrumb-item>
									</template>
								</el-breadcrumb>
								
							</div>
						</el-col>
						<!-- 用户信息 -->
						<el-col :span="13">
							<div class="header-user">
								<el-dropdown>
									<div class="header-dropdown">
										<!-- 用户头像和用户名 -->
										<el-image class="avator-image" :src="avator" />
										<span>{{ username }}</span>
									</div>
									<!-- 下拉框内容 -->
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item>修改密码</el-dropdown-item>
											<el-dropdown-item @click="logout()">退出</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</div>
						</el-col>
					</el-row>
				</el-header>
				
				<el-main class="main">
					<router-view>
					</router-view>
				</el-main>
				
				<el-footer class="footer">
					<!-- 图标 -->
					<el-icon style="width:2em;top:3px;font-size:18px"><place/></el-icon>
					<!-- 描述 -->
					<a style="font-size: 18px;color: #1f2a3a">2022 Cloud Native Computing</a>
				</el-footer>
				<el-backtop target=".main"></el-backtop>
      </el-container>
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
	computed: {
		username() {
			let username = localStorage.getItem('username')
			return username?username:'未知'
		}
	},
	methods: {
		onCollapse() {
			// 当前状态是收起的，点击后执行展开的动作
			if (this.isCollapse) {
				this.asideWidth = '220px'
				this.isCollapse = false
			} else {
				// 当前状态是展开的，点击后执行收起的动作
				this.asideWidth = '64px'
				this.isCollapse = true
			}
		},
		logout() {
			localStorage.removeItem("username")
			localStorage.removeItem("token")
			//跳转到/login目录
			this.$router.push('/login')
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
	
	/* header的css属性 */
	.header {
		z-index: 1200;
		line-height: 60px;
		font-size: 24px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}
	.header-collapse {
		cursor: pointer;
	}
	/* 面包屑 */
	.header-breadcrumb {
		padding-top: 0.9em;
	}
	/* 用户信息 */
	.avator-image {
		top: 12px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 8px;
	}
	.header-user {
		text-align: right;
	}
	.header-dropdown {
		line-height: 60px;
		cursor: pointer;
	}
	/* main属性 */
	.main {
		padding: 10px;
	}
	/* footer属性 */
	.footer {
		z-index: 1200;
		color: rgb(187, 184, 184);
		font-size: 14px;
		text-align: center;
		line-height: 60px;
	}
</style>
