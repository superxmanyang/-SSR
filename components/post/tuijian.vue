<template>
  <div class="box">
    <div class="demo-input-size">
      <el-input
        placeholder="请输入想去的地方，比如：广州"
        suffix-icon="el-icon-search"
        v-model="input6"
        class="biaoqian"      
      ></el-input>
    </div>
    <p>推荐： <a href="">广州 </a> <a href="">上海</a> <a href="">北京</a></p>
     <el-tabs type="card" >
    <el-tab-pane label="推荐攻略" name="first" style="cursor: not-allowed"></el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input6: ""
    };
  }
};
</script>

<style scoped lang="less">
  .box {
    p {
      font-size: 12px;
      padding: 10px 0 20px 0;
    }
  }
</style>