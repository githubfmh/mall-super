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
			defalut: false
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
			// console.log(position)
			this.$emit('scroll', position)
		})
		
		this.scroll.on('pullingUp', () => {
			// console.log('OK完毕')
			this.$emit('pullingUp')
		})
	},
	methods: {
		scrollTop: function(x, y, time=1000) {
			this.scroll.scrollTo(x, y, time)
		},
		finishPullUp: function() {
			this.scroll.finishPullUp()
		}
	}
}
</script>

<style scoped>
	
</style>
