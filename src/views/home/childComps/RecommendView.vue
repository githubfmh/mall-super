<template>
  <div class='recommend'>
		<div v-for='item in recommends' class='recommend-item'>
			<a :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
  </div>
</template>

<script>

export default {
  name: 'RecommendView',
	props: {
		recommends: {
			type: Array,
			default() {
				return []
			}
		}
	}
}
</script>

<style scoped>
	.recommend {
		display: flex;
		text-align: center;
		margin-top: 10px;
		padding-bottom: 20px;
		box-shadow: 0 2px 1px rgba(100, 100, 100, 0.1);
		font-size: 14px;
	}
	
	.recommend-item {
		flex: 1;
	}
	
	.recommend-item img {
		width: 80%;
		height: 75%;
		margin-bottom: 10px;
	}
</style>
