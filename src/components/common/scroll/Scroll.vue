<template>
  <div class='wrapper' ref='wrapper'>
		<div class='content'>
			<slot></slot>
		</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
	props: {
		probeType: {
			type: Number,
			defalut: 0
		},
		pullUpLoad: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			scroll: null
		}
	},
	mounted() {
		this.scroll = new BScroll(this.$refs.wrapper, {
			probeType: this.probeType,
			pullUpLoad: this.pullUpLoad,
			click: true,
			observeDOM: true
		})
		
		this.scroll.on('scroll', (position) => {
			this.$emit('scroll', position)
		})
		
		if(this.pullUpLoad) {
			this.scroll.on('pullingUp', () => {
				this.$emit('pullingUp')
			})
		}
	},
	methods: {
		scrollTo: function(x, y, time=1000) {
			this.scroll && this.scroll.scrollTo(x, y, time)
		},
		finishPullUp: function() {
			this.scroll && this.scroll.finishPullUp()
		},
		refresh() {
			this.scroll && this.scroll.refresh()
		},
		getScrollY() {
			return this.scroll ? this.scroll.y : 0
		}
	}
}
</script>

<style scoped>
	
</style>
