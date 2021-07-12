<template>
  <div class='bottom-bar'>
		<div class='check-content'>
			<check-button :is-checked='isSelectAll' class='check-button' @click.native='checkClick'></check-button>
			<span>全选</span>
		</div>
		
		<div class='price'>
			合计: {{totalPrice}}
		</div>
		
		<div class='calclate' @click='calclate'>
			去计算({{checkLength}})
		</div>
		
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'CartBottomBar',
	components: {
		checkButton
	},
	computed: {
		...mapGetters(['cartList']),
		totalPrice() {
			return '￥' + this.cartList.filter(item => {
				return item.checked
			}).reduce((preValue, item) => {
				return preValue + item.price * item.count
			}, 0).toFixed(2)
		},
		checkLength() {
			return this.cartList.filter(item => item.checked).length
		},
		isSelectAll() {
			if(this.cartList.length === 0 ) return false
			// 使用find
			return !this.cartList.find(item => !item.checked)
			
			// 使用filter
			// return !(this.cartList.filter(item => !item.checked).length)
			
			// 普通遍历
			// let isChecked = false;
			// for(let item of this.cartList) {
			// 	if(!item.checked) {
			// 		return false
			// 	}
			// }
			// return true
		}
	},
	methods: {
		// 全选
		checkClick() {
			if(this.isSelectAll) { //全部选中
				this.cartList.forEach(item => item.checked = false)
			} else {  //部分或者全部不选中
				this.cartList.forEach(item => item.checked = true)
			}
		},
		calclate() {
			if(!this.isSelectAll) {
				this.$toast.show('请选择购买的商品', 2000)
			}
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
