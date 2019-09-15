<template>
  <div class="txt">
    <div class="shang">
      <h5>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h5>
      <div class="body">
          大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算
      </div>
     <div class="tupian">
       <img src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90" alt="">
       <img src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png" alt="">
       <img src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90" alt="">
     </div>
    </div>
    <div class="xia">
      <span class="zuo">
        <i class="el-icon-location"></i>北京市
        by
        <span class="user">地球发动机</span>
        <i class="el-icon-view"></i> 7623
       
      </span>
      <span class="you">53 赞</span>
       <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }
</script>

<style scoped lang="less">
 .shang {
   h5 {
     font-size: 19px;
     font-weight: 400;
   }
  .body {
    width: 700px;
    height: 65px;
    // white-space:nowrap;
     overflow: hidden; 
  }
  .tupian {
    width: 700px;
    
    img {
      width: 30%;
      height: 150px;
    }
  }
 }
 .xia {
   .user {
     color: #ffa500;
   }
 }
</style>