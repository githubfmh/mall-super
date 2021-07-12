<template>
  <div id='home'>
		<nav-bar class='home-nav'>
			<div slot='center'>购物车</div>
		</nav-bar>
		
		<tab-control ref='tabControl1' :titles='["流行", "新款", "精选"]' @TabControlClick='TabClick' class='tab-control' v-show='isTabFixed'></tab-control>
		
		<scroll class='content' ref='scroll' :probe-type='3' @scroll='contentScroll' :pull-up-load='true' @pullingUp='loadMore'>
			<home-swiper :banners='banners' @swiperImgaeLoad='swiperImgaeLoad'></home-swiper>
			
			<recommend-view :recommends='recommends'></recommend-view>
			
			<feature-view></feature-view>
			
			<tab-control ref='tabControl2' :titles='["流行", "新款", "精选"]' @TabControlClick='TabClick'></tab-control>
			
			<goods-list :goods='showGoods'></goods-list>
		</scroll>
	
		<back-top @click.native='backTop' v-show='isShowBackTop'></back-top>
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

import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

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
	mixins: [itemListenerMixin],
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
			isShowBackTop: false,
			tabOffsetTop: 0,
			isTabFixed: false,
			saveY: 0
		}
	},
	destroyed() {
		console.log('销毁')
	},
	activated() {
		this.$refs.scroll.scrollTo(0, this.saveY, 0)
		this.$refs.scroll.refresh()
	},
	deactivated() {
		// 1.保存Y值
		this.saveY = this.$refs.scroll.getScrollY()
		
		// 2.取消全局事件的监听
		this.$bus.$off('itemImgLoad', this.itemImagListener)
	},
	created() {
		// 1. 请求多个数据
		this.getHomeMultidata()
		
		// 2. 请求商品数据
		this.getHomeGoods('pop')
		this.getHomeGoods('new')
		this.getHomeGoods('sell')
		
	},
	// mounted() {
	// 	// 1.图片加载完成的事件监听
	// 	const refresh = debounce(this.$refs.scroll.refresh, 50)
		
	// 	//对监听的事件进行保存
	// 	this.itemImagListener = () => {
	// 		refresh()
	// 	}
	// 	this.$bus.$on('itemImageLoad', itemImagListener)
		
	// 	// 2.获取tabControl的offsetTop
	// 	// 所有的组件都有一个属性$el, 用于获取组件中的元素
	// 	// console.log(this.$refs.tabControl.$el.offsetTop)
	// },
	methods: {
		TabClick: function(index) {
			switch(index) {
				case 0: 
					this.currentType = 'pop'
				case 1:
					this.currentType = 'new'
					break;
				case 2:
					this.currentType = 'sell'
					break;
			}
			// 保持一致
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
		},
		backTop: function() {
			this.$refs.scroll.scrollTo(0, 0, 500)
		},
		contentScroll: function(position) {
			// console.log(position)
			// 1.判断BackTop是否显示
			this.isShowBackTop = (-position.y) > 1000
			
			// 2.决定tabControl是否吸顶(position: fixed)
			this.isTabFixed = (-position.y) > this.tabOffsetTop
		},
		loadMore: function() {
			this.getHomeGoods(this.currentType)
		},
		swiperImgaeLoad: function() {
			this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
			// console.log(this.tabOffsetTop)
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
	},
	computed: {
		showGoods() {
			return this.goods[this.currentType].list
		}
	}
}
</script>

<style scoped>
	#home {
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	
	.home-nav {
		/* 在使用浏览器原生滚动时, 为了让导航不跟随滚动*/
		/* position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9; */
		
		background-color: var(--color-tint);
		color: #fff;
	}
	
	.content {
		overflow: hidden;
		
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	
	.tab-control {
		position: relative;
		z-index: 9;
	}
	
</style>
