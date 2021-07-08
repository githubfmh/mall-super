import {debounce} from './utils.js'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null
		}
	},
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh, 50)
		
		this.itemImgListener = () => {
			refresh()
		}
		
		this.$bus.$on('itemImgLoad', this.itemImgListener)
	}
}

// 返回顶部
export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backTop() {
			this.$refs.scroll.scrollTo(0, 0, 500)
		},
		listenShowBackTop(position) {
			this.isShowBackTop = (-position.y) > 1000
		}
	}
}