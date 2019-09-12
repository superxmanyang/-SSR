<template>

<div>
    <el-form ref="form"  label-width="80px" size="medium" :inline= "true" >
        <el-form-item  label-width="80px" >
            <!-- 输入框 -->
        
        <el-input v-model="input" placeholder="请输入内容"></el-input>
       </el-form-item>
        <!-- 时间选择器 -->
         
         <el-form-item >
     <el-date-picker
      v-model="value9"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      default-value="2010-10-01">
      </el-date-picker>
      </el-form-item>
 


   <!-- 自定义选择器  -->
   <el-form-item >
   <el-select  placeholder="请选择">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
  </el-form-item>


 <!-- 按钮 -->
   <el-form-item >
  <el-button type="primary">主要按钮</el-button>
  </el-form-item>
  </el-form>


   <!-- 地图蓝 -->
   <el-row>
     <el-col :span="12"> asdasd
      </el-col>


       <el-col :span="12" >
          <Map />
      </el-col>

   </el-row>
      

      <!-- 选取信息栏 -->
      <el-row class="choose" type="flex">
        <el-col class="el-col8" span="8">
          <el-slider v-model="value2"></el-slider>
        </el-col>
        <el-col class="el-col6" span="6">8899777</el-col>
        <el-col  class="el-col6" span="6">8899777</el-col>
        <el-col  class="el-col6" span="6">8899777</el-col>
        <el-col  class="el-col6" span="6">8899777</el-col>
      </el-row>
  
      
  </div>

 
  
  
  



    
  



</template>

<script>
import Map from "@/pages/hotel/map";
  export default {
    data() {
     return{
          // 选择框
          input: '',

          // 时间选择器
           value8: '',
           value9: '',

          // 自定义选择器
           options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],


         //Slider 滑块
         value2: 100,
     }
    },



  // 组件
    components:{
        Map
    }
   
  }
</script>

<style  scoped lang="less">
.map{ 

  width: 420px;
  height: 260px;
 }

.choose>el-col{
      padding-left: 20px;
    padding-right: 20px;
}
 
 .el-col8{
   width: 33.3333%;
 }

.el-col6{
  width: 25%;
}
</style>