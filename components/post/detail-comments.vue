<template>
  <div class="com">
    <div class="comments">
      <div class="hide" v-if="total===0">暂无评论,赶紧抢占沙发</div>
      <div v-if="comList">
        <div class="comments-item" v-for="(item,index) in comList" :key="index">
          <el-row type="flex" justify="space-between" style="padding-bottom:10px;">
            <div class="left">
              <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
              <span>{{item.account.nickname}}</span>
              <i>{{item.created_at|time}}</i>
            </div>
            <div class="right">{{item.level}}</div>
          </el-row>
          <!-- 子组件 -->
          <div class="son" v-if="item.parent">
            <commentson :comments="item.parent" />
          </div>
          <div class="main" v-html="item.content"></div>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="getcomments._start-1"
      :page-sizes="[1, 2, 15, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin:20px 0;"
    ></el-pagination>
  </div>
</template>

<script>
import { time } from "@/middleware/filter";
import commentson from "@/components/post/detail-com-son";
export default {
  name: "comments",
  components: { commentson },
  data() {
    return {
      comList: [],
      total: 0,
      list: [],
      // 获取评论列表参数
      getcomments: {
        post: "",
        _limit: 1,
        _start: 0
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.getcomments.post = this.$route.query.id;
      this.init();
    }, 10);
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.getcomments._limit=val
      this.init()
    },
    handleCurrentChange(val) {

       this.getcomments._start=val-1
      this.init()
    },
    init() {
      // 获取评论
      this.$axios({
        url: "/posts/comments",
        params: this.getcomments
      }).then(res => {
        if (res.request.status === 200) {
          this.comList = res.data.data;
          this.total=res.data.total
        }
      });
    }
  },
  filters: {
    time
  },
 
};
</script>

<style lang="less" scoped>
// 评论列表
.comments {
  border: 1px solid #ddd;
  .hide {
    padding: 20px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
  .comments-item {
    font-size: 12px;
    padding: 20px 20px 20px;
    border-bottom: 1px dashed #ddd;
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
      padding-left: 30px;
    }
  }
  .son {
    padding-left: 30px;
  }
}
</style>