<template>
  <div id='cart'>
		<!-- 导航 -->
		<nav-bar class='nav-bar'>
			<div slot='center'>购物车({{length}})</div>
		</nav-bar>
		
		<!-- 商品的列表 -->
		<cart-list></cart-list>
		
		<!-- 底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
		
	</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar'	

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
	components: {
		NavBar,
		CartList,
		CartBottomBar
	},
	computed: {
		// 数组语法(辅助函数)
		// ...mapGetters(['cartLength', 'cartList'])
		
		// 对象语法(辅助函数)
		...mapGetters({
			length: 'cartLength',
			list: 'cartList'
		})
	}
}
</script>

<style>
	#cart {
		heigth: 100vh;
	}
	
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
	}
</style>
