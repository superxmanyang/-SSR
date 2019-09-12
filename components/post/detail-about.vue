<template>
  <div class="about">
    <div class="title">相关攻略</div>
    <div class="list" v-for="(item,index) in list " :key="index">
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <el-row type="flex" justify="space-between" class="list-item">
          <img :src="item.images[0]" />
          <div class="text">
            <p>{{item.title}}</p>
            <div class="down">
              <span>{{item.updated_at|time}}</span>
              <i>阅读{{item.account}}</i>
            </div>
          </div>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { time } from "@/middleware/filter";
export default {
  data() {
    return {
      // 推荐列表
      list: []
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.$axios({
      url: "/posts/recommend",
      params: { id }
    }).then(res => {
      // console.log(123, res);
      if (res.request.status === 200) {
        this.list = res.data.data;
      }
    });
  },
  filters: {
    time
  },
 
};
</script>
<style lang="less" scoped>
.about {
  width: 280px;
  .title {
    font-size: 18px;
    width: 100%;
    border-bottom: 1px solid #999;
    padding-bottom: 10px;
  }
  .list {
    .list-item {
      padding: 20px 0;
      cursor: pointer;
      img {
        width: 100px;
        height: 80px;
      }
      .text {
        width: 170px;
        height: 80px;
        position: relative;

        p {
          font-size: 16px;
          height: 40px;
          overflow: hidden;
          &:hover {
          }
        }
        .down {
          font-size: 12px;
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
}
</style>