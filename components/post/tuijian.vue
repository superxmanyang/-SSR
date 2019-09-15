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
    <div class="jian">
      <span>推荐攻略</span>
      <el-button type="primary" icon="el-icon-edit" class="you">写游记</el-button>
    </div>
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
    .jian {
      display: flex;
      justify-content:space-between;
      border-bottom: 1px solid #ddd;
       padding-bottom: 10px;
      span {
        font-size: 18px;
        color: #ffa500;
      }
    }
  }
</style>