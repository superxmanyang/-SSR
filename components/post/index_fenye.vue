<template>
  <div class="block">
    <!-- size-change：切换条数时候触发 -->
    <!-- current-change：选择页数时候触发 -->
    <!-- current-page: 当前页数 -->
    <!-- page-size：当前条数 -->
    <!-- total：总条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="postsData.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  }
};
</script>

<style>
</style>