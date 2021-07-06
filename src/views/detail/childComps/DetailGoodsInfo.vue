<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item, index) in detailInfo.detailImage[0].list"
                :key="index"
                :src="item"
                @load="imgLoad"
                alt="哈哈">
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    props:{
        detailInfo:{
            type: Object,
            default(){
              return {}
            }
        }
    },
    data(){
        return{
            counter: 0,
            imagesLength: 0
        }
    },
    methods:{
        imgLoad(){
            // 判断，所有的图片都加载完成了，那么进行一次回调就可以了
            if(++this.counter === this.imagesLength)
            this.$emit('imageLoad')
        }
    },
    watch:{
        detailInfo(){
            // 获取图片个数
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>

<style scoped>
.goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
}
.info-desc{

    /* border-top: 1px solid black;
    border-bottom: 1px solid black; */
    font-size: 14px;
    padding-left: 6px;
    color: black;
}
.start{

    border-bottom: 1px solid black;
    width: 30%;
}
.desc{
   margin-top: 10px;
}
.end{

    border-bottom: 1px solid black;
    width: 30%;
    margin-top: 10px;
   float: right;
   margin-right: 6px;
}
.info-key{
    font-size: 16px;
    color: black;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 20px;
    margin-left: 10px;
}
.info-list img{
    width: 100%;
    height: 100%;
}
</style>
