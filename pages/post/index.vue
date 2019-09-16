<template>
  <div class="index">
    <el-row type="flex" :gutter="40" >
      <!-- 左侧 -->
      <el-col :span="7">
        <!-- 推荐城市列表 -->
        <recomcity />
      </el-col>
      <!-- 右侧 -->
      <el-col :span="17">
        <!-- 搜索栏 -->
        <search></search>
        <!-- 文章列表 -->
        <list />
        <!-- 分页 -->
       
      </el-col>
    </el-row>
  </div>
</template>

<script>
import search from "@/components/post/search";
import list from "@/components/post/list";
import recomcity from "@/components/post/recomcity";

export default {
  components: {
    search,
    list,
    recomcity,
    
    
  }
};
</script>

<style lang="less" scoped>
.index {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;

}
</style>