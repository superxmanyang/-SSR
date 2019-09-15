<template>
  <!-- 文章详情页 -->
  <div class="datail">
    <el-row type="flex" justify="space-between">
      <!-- 左侧 -->
      <div class="left">
        <detailmain />
        <!-- 评论列表 -->
        <comments></comments>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <about />
      </div>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import comments from "@/components/post/detail-comments";
import about from "@/components/post/detail-about";
import detailmain from "@/components/post/detail-main";
export default {
  components: {
    comments,
    about,
    detailmain
  }
};
</script>

<style lang="less" scoped>
.datail {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>