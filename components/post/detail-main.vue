<template>
  <div class="left">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bear">
      <el-breadcrumb-item>旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标题 -->
    <div class="title">{{post.title}}</div>
    <!-- 发布时间 -->
    <div class="creatTime">
      <span>攻略：{{post.created_at|time}} 阅读：6783</span>
    </div>
    <!-- 文章内容 -->
    <div class="content" v-html="post.content"></div>
    <!-- 点赞 -->
    <el-row type="flex" class="like" justify="center">
      <div class="like-item">
        <i class="el-icon-edit-outline"></i>
        <p>评论({{post.comments.length}})</p>
      </div>
      <div class="like-item" @click="collectDetail">
        <i class="el-icon-star-off"></i>
        <p>收藏</p>
      </div>
      <div class="like-item">
        <i class="el-icon-share"></i>
        <p>分享</p>
      </div>
      <div class="like-item" @click="giveFive">
        <i class="iconfont iconding"></i>
        <p>点赞({{post.like|like}})</p>
      </div>
    </el-row>
 
  </div>
</template>

<script>
import { time } from "@/middleware/filter";
export default {
  data() {
    return {
      // 文章
      post: {
        comments: []
      },
    
      commentsList: [],
    
      token: "",
      id:''
    };
  },
  filters: {
    // 转换时间
    time,
    like(value) {
   
      if (value === null) {
        return 0;
      } else {
        return value;
      }
    }
  },
  methods: {
   
    init() {
      // 获取文章详情
      this.$axios({
        url: "/posts",
        params: { id: this.id}
      }).then(res => {
        this.post = res.data.data[0];
      });
    },
 
    // 点赞
    giveFive() {
      this.$axios({
        url: "/posts/like",
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        params: { id: this.id }
      }).then(res => {
        if (res.request.status === 200) {
          this.$message.success("点赞成功");
        }
      });
    },
    // 收藏文章
    collectDetail() {
      this.$axios({
        url: "/posts/star",
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        params: { id: this.id }
      }).then(res => {
        if (res.request.status === 200) {
          this.$message.success("收藏成功");
        }
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;

    this.init();
    setTimeout(() => {
      this.token = this.$store.state.user.userInfo.token;
    }, 10);
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.left {
  width: 700px;
  // 面包屑导航
  .bear {
    // margin: 20px 0;
  }
  // 标题
  .title {
    font-size: 32px;
    font-weight: 600;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .creatTime {
    width: 100%;
    text-align: right;
    padding: 20px;
    color: #999;
    box-sizing: border-box;
  }
  .content {
    /deep/ img {
      max-width: 700px;
      padding: 10px 0;
    }
    /deep/ p {
      margin: 5px 0;
    }
  }
  // 点赞
  .like {
    align-items: center;
    padding: 50px 0 30px;
    .like-item {
      text-align: center;
      padding: 0 20px;
      cursor: pointer;

      i {
        width: 44px;
        height: 44px;
        display: block;
        font-size: 36px;
        color: orange;
        &:hover {
          font-size: 40px;
        }
      }
      p {
        font-size: 14px;
      }
    }
  }

}
</style>