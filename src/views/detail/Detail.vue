<template>
  <div id='detail'>
		
		<detail-nav-bar class='detail-nav'></detail-nav-bar>
		
		<scroll class='content' ref='scroll'>
			
			<detail-swiper :top-images='topImages'></detail-swiper>
			
			<detail-base-info :goods='goods'></detail-base-info>
			
			<detail-shop-info :shop='shop'></detail-shop-info>
		
			<detail-goods-info :detailInfo='detailInfo' @imgLoad='imgLoad'></detail-goods-info>
			
			<detail-param-info :param-info='paramInfo'></detail-param-info>
			
			<detail-comment-info :comment-info='commentInfo'></detail-comment-info>
			
			<goods-list :goods='recommends'></goods-list>
			
		</scroll>
		
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail'
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin'
export default {
  name: 'Detail',
	components: {
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommentInfo,
		Scroll,
		GoodsList
	},
	mixins: [itemListenerMixin],
	data() {
		return {
			iid: null,
			topImages: [],
			goods: {},
			shop: {},
			detailInfo: {},
			paramInfo: {},
			commentInfo: {},
			recommends: []
		}
	},
	created() {
		// 1.保存传入的iid
		this.iid = this.$route.params.iid
		
		// 2. 根据iid请求详情数据
		getDetail(this.iid).then(res => {
			// console.log(res)
			// 1. 获取数据
			const data = res.result;
			
			// 2. 取出轮播图的数据
			this.topImages = data.itemInfo.topImages
			
			// 3. 创建商品的对象
			this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
			
			// 4. 创建店铺信息的对象
			this.shop = new Shop(data.shopInfo)
			
			// 5.取出详情的信息
			this.detailInfo = data.detailInfo
			
			// 6.取出参数的信息
			this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
			
			// 7.取出评论的信息
			if(data.rate.cRate !== 0) {
				this.commentInfo = data.rate.list[0]
			}
			
		})
	
		// 3.请求他推荐数据
		getRecommend().then(res => {
			console.log(res)
			this.recommends = res.data.list
		})
		
	},
	// mounted() {
	// 	const refresh = debounce(this.$refs.scroll.refresh, 50)
		
	// 	this.itemImgListener = () => {
	// 		refresh()
	// 	}
		
	// 	this.$bus.$on('itemImgLoad', this.itemImgListener)
	// },
	destroyed() {
		this.$bus.$off('itemImgLoad', this.itemImgListener)
	},
	methods: {
		imgLoad() {
			this.$refs.scroll.refresh()
		}
	}
	
}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	
	.content {
		height: calc(100% - 44px);
	}
	
	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
</style>
