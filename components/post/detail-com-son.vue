<template>
  <div class="comments">
    <div class="comments-item">
      <commentson v-if="comments.parent" :comments="comments.parent" />
      <el-row type="flex" justify="space-between">
        <div class="left">
          <img :src="$axios.defaults.baseURL+comments.account.defaultAvatar" alt />
          <span>{{comments.account.nickname}}</span>
          <i>{{comments.created_at|time}}</i>
        </div>
        <div class="right">{{comments.level}}</div>
      </el-row>
      <!-- 子组件 -->

      <div class="main" v-html="comments.content"></div>
      <div class="recall">
        <span @click="recall(comments)">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
import { time } from "@/middleware/filter";
export default {
  name: "commentson",
  props: {
    comments: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 回复评论
    recall(comments) {

      this.$store.commit('post/newcomment',true)
      this.$store.commit('post/setrecallInfo',comments)
      console.log(comments)
      console.log(456,this.$store.state.post.newComment)
    }
  },
  filters: {
    time
  }
};
</script>
<style lang="less" scoped>
.comments {
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  .hide {
    padding: 2px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
  .comments-item {
    font-size: 12px;
    padding: 5px 5px 20px;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: 0;
    }
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    i {
      color: #999;
    }
    .main {
      padding-top: 10px;
      &:hover {
        + .recall {
          span {
            display: block;
          }
        }
      }
    }
    .recall {
      text-align: right;
      height: 25px;
      line-height: 25px;
      &:hover {
        span {
          display: block;
        }
      }
      span {
        display: none;
        color: #66b1ff;
        cursor: pointer;
      }
    }
  }
}
</style>