<template>
  <div id='home'>
		<nav-bar class='home-nav'>
			<div slot='center'>购物车</div>
		</nav-bar>
		
		<scroll class='content' ref='scroll' :probe-type='3' @scroll='contentScroll' :pull-up-load='true' @pullingUp='loadMore'>
			<home-swiper :banners='banners'></home-swiper>
			
			<recommend-view :recommends='recommends'></recommend-view>
			
			<feature-view></feature-view>
			
			<tab-control class='tab-control' :titles='["流行", "新款", "精选"]' @TabControlClick='TabClick'></tab-control>
			
			<goods-list :goods='showGoods'></goods-list>
		</scroll>
	
		<back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
	</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from '../../components/content/backTop/BackTop.vue'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'	
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
  name: 'Home',
	components: {
		NavBar,
		Scroll,
		TabControl,
		GoodsList,
		BackTop,
		HomeSwiper,
		RecommendView,
		FeatureView
	},
	data() {
		return {
			banners: [],
			recommends: [],
			goods: {
				'pop':  {page: 0, list: []},
				'new': {page: 0, list: []},
				'sell': {page: 0, list: []},
			},
			currentType: 'pop',
			isShowBackTop: false
		}
	},
	created() {
		// 1. 请求多个数据
		this.getHomeMultidata()
		
		// 2. 请求商品数据
		this.getHomeGoods('pop')
		this.getHomeGoods('new')
		this.getHomeGoods('sell')
	},
	computed: {
		showGoods() {
			return this.goods[this.currentType].list
		}
	},
	methods: {
		TabClick: function(index) {
			switch(index) {
				case 0:
					this.currentType = 'pop'
					break;
				case 1:
					this.currentType = 'new'
					break;
				case 2:
					this.currentType = 'sell'
					break;
			}
		},
		backClick: function() {
			this.$refs.scroll.scrollTop(0, 0, 500)
		},
		contentScroll: function(position) {
			// console.log(position)
			this.isShowBackTop = (-position.y) > 1000
		},
		loadMore: function() {
			console.log('上拉加载更多')
			this.getHomeGoods(this.currentType)
		},
		// 网络请求相操作
		getHomeMultidata: function() {
			getHomeMultidata().then(res => {
				// console.log(res)
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			})
		},
		getHomeGoods: function(type) {
			const page = this.goods[type].page + 1;
			getHomeGoods(type, page).then(res => {
				// console.log(res)
				this.goods[type].list.push(...res.data.list)
				this.goods[type].page += 1
				
				this.$refs.scroll.finishPullUp()
			})
		}
	}
}
</script>

<style scoped>
	#home {
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}
	
	.home-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9;
		background-color: var(--color-tint);
		color: #fff;
	}
	
	.tab-control {
		position: sticky;
		top: 44px;
		z-index: 9;
	}
	
	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
