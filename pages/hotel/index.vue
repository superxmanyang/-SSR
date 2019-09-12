<template>
  <div class="container">

    <el-row  justify="space-between">
       <!-- 顶部 -->
          <!-- 面包屑 -->
         <HotelHead/>
          
         
         <!-- 表单搜索栏 -->
         <HotelForm/>
       <!-- 底部 -->
       </el-row>
  </div>
</template>

<script>
import HotelHead from "@/components/hotel/hotelHead.vue";
import HotelForm from "@/components/hotel/hotelForm.vue";
export default {
   data(){

       return{
  
   
      
      
       }
   },
    components: {
           HotelHead,
           HotelForm
   },
  
     mounted(){
           this.$axios({
                url: "cities",
                // 路由的url参数
               params:{
                 name:'南京'
               }
            }).then(res => {
              console.log(res);
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