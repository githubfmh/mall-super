<template>
  <div class='bottom-bar'>
		<div class='check-content'>
			<check-button :is-checked='isSelectAll' class='check-button'></check-button>
			<span>全选</span>
		</div>
		
		<div class='price'>
			合计: {{totalPrice}}
		</div>
		
		<div class='calclate'>
			去计算({{checkLength}})
		</div>
		
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name: 'CartBottomBar',
	components: {
		checkButton
	},
	computed: {
		totalPrice() {
			return '￥' + this.$store.getters.cartList.filter(item => {
				return item.checked
			}).reduce((preValue, item) => {
				return preValue + item.price * item.count
			}, 0).toFixed(2)
		},
		checkLength() {
			return this.$store.state.cartList.filter(item => item.checked).length
		},
		isSelectAll() {
			// return !(this.cartList.filter(item => !item.checked).length)
			
			return !this.cartList.find(item => !item.checked)
		}
	}
}
</script>

<style scoped>
	.bottom-bar {
		position: relative;
		display: flex;
		
		height: 40px;
		line-height: 40px;
		
		background-color: #eee;
		font-size: 14px;
	}
	
	.check-content {
		display: flex;
		align-items: center;
		flex: 1;
		width: 60px;
	}
	
	.check-button {
		width: 20px;
		height: 20px;
		line-height: 20px;
		
		margin-left: 4px;
		margin-right: 5px;
	}
	
	.price {
		margin-left: 20px;
		flex: 1;
	}
	
	.calclate {
		width: 90px;
		flex: 1;
		background-color: red;
		color: #fff;
		text-align: center;
		
	}
</style>
