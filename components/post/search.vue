<template>
  <!-- 推荐文章列表 -->
  <div class="strategy">
    <div class="top">
      <el-input placeholder="请输入想去的地方，比如'广州'" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="recomCityList">
        推荐：
        <span>广州</span>
        <span>上海</span>
        <span>北京</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>

<style lang="less" scoped>
.strategy {
  .top {
    .el-input {
      border: 3px solid orange;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
     margin-top: 20px;
     width: 700px;
      // box-sizing: border-box;
    }
    // 推荐城市
    .recomCityList {
      font-size: 12px;
      margin: 10px 0;
      color: #666;
    }
  }
}
/deep/ .el-input-group__append {
  border: none;
  background-color: #fff;
  font-size: 25px;
  color: orange;
  i {
    font-weight: 900;
  }
}
/deep/ .el-input__inner {
  border: none;
  height: 36px;
  line-height: 36px;
  // font-size: 50px;
}
</style>