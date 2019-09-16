<template>
  <div class="container">

    <el-row  justify="space-between">
       <!-- 顶部 -->
          <!-- 面包屑 -->
         <HotelHead/>
          
         
         <!-- 表单搜索栏 -->
         <HotelForm :data="hotelData"/>

         <!-- 酒店列表页 --> 
         <!--<HotelData 
         v-for="(item, index) in hotelData"
         :key="index" :data="item"/>-->

       <!-- 底部 -->
       </el-row>
  </div>
</template>

<script>
import HotelHead from "@/components/hotel/hotelHead.vue";
import HotelForm from "@/components/hotel/hotelForm.vue";
// import HotelData from "@/components/hotel/hotelData";
export default {
   data(){
      return{
          hotelData:[{}]
      }
  },
    components: {
          HotelHead,
          HotelForm,
          // HotelData
   },
  
      mounted(){
            this.$axios({
                url: "cities",
                // 路由的url参数
               params:{
                 name:'南京'
               }
            }).then(res => {
              // console.log(213,res.data);
            });
            // 参数形式 获取接口路径
       var url = this.$route.fullPath
       url = url.replace("hotel",'hotels')
          this.$axios({  // 使用$axios 请求后台数据
            url,  
          }).then(res => {
            console.log(1234,res);
            this.hotelData = res.data.data
            
          })
     },

     methods:{





     }
  
}
</script>

<style scoped lang="less">

.container{
        width:1000px;
        margin:20px auto;
    }
</style>