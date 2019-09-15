<template>
  <div class="com">
    <!-- 添加评论 -->
    <div class="add-comments">
      <p>评论</p>
      <div style="padding:10px 0">
        <span class="reCallMan" v-if="nickName">
          回复 @{{nickName}}
          <i @click="cancel">x</i>
        </span>
      </div>
      <el-input v-model="comment.content" placeholder="请输入内容" @keydown.native.enter="subComment"></el-input>
      <el-row type="flex" justify="space-between" class="upload">
        <!-- 上传图片 -->
        <el-upload
          action="http://localhost:1337/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="successUpload"
          ref="upload"
          :headers="{Accept:'application/json, text/plain, */*'}"
          name="files"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-button type="primary" style="width:60px;height:30px;padding:0" @click="subComment">提交</el-button>
      </el-row>
    </div>
    <div class="comments">
      <div class="hide" v-if="total===0">暂无评论,赶紧抢占沙发</div>
      <div v-if="comList">
        <div class="comments-item" v-for="(item,index) in comList" :key="index">
          <el-row type="flex" justify="space-between" style="padding-bottom:10px;" class="top">
            <div class="left">
              <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
              <span>{{item.account.nickname}}</span>
              <i>{{item.created_at|time}}</i>
            </div>
            <div class="right">
              <p>{{item.level}}</p>
            </div>
          </el-row>
          <!-- 子组件 -->
          <div class="son" v-if="item.parent">
            <commentson :comments="item.parent" />
          </div>
          <div class="main" v-html="item.content"></div>
          <div class="img" v-if="item.pics.length>0">
            <img
              :src="$axios.defaults.baseURL+item.url"
              v-for="(item,index) in item.pics"
              :key="index"
            />
          </div>
          <div class="recall">
            <span @click="recall(item)">回复</span>
          </div>
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
      },
      // 上传图片显示
      dialogVisible: false,
      dialogImageUrl: "",
      // 发表评论

      comment: {
        content: "",
        post: "",
        follow: "",
        pics: []
      },
      // 回复哪个
      nickName: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 10);
  },

  methods: {
    // 提交评论
    subComment() {
      this.comment.post = this.$route.query.id;

      if (this.comment.content !== "" || this.comment.pics.lenght !== "") {
        this.$axios({
          url: "/comments",
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$store.state.user.userInfo.token}`,
            "Content-Type": "application/json"
          },
          data: this.comment
        }).then(res => {
          if (res.request.status === 200) {
            this.$message.success("发表评论成功");
            this.handleRemove();
            this.$refs.upload.clearFiles();
            this.dialogImageUrl = "";
            this.comment.pics = [];
            this.init();
            this.comment.content = "";
            this.nickName = "";
            this.comment.follow = "";
          }
        });
      } else {
        this.$message.info("内容不能为空");
      }
    },
    // 图片上传事件
    handleRemove(file, fileList) {
      console.log(file, fileList);
      file = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    successUpload(file, fileList) {
      this.comment.pics.push(file[0]);
    },
    // 分页
    handleSizeChange(val) {
      this.getcomments._limit = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.getcomments._start = val - 1;
      this.init();
    },
    init() {
      this.getcomments.post = this.$route.query.id;
      // 页面刷新把显示@隐藏
      this.$store.commit("post/newcomment", "");

      this.nickName = "";
      this.comment.follow = "";
      // 获取评论

      this.$axios({
        url: "/posts/comments",
        params: this.getcomments
      }).then(res => {
        if (res.request.status === 200) {
          this.comList = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    // 回复评论
    recall(item) {
      this.comment.follow = item.id;
      this.nickName = item.account.nickname;
      console.log("id", this.comment.follow);
    },
    // 取消回复
    cancel() {
      this.nickName = "";
      this.comment.follow = "";
    }
  },
  filters: {
    time
  },
  watch: {
    "$store.state.post.newComment"(n, o) {
      this.nickName = n.account.nickname;
      this.comment.follow = n.id;
    },
   
    $route() {
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
// 添加评论
.add-comments {
  margin-bottom: 30px;
  // 上传组件大小
  /deep/ .el-upload--picture-card,
  /deep/.el-upload-list__item {
    width: 100px;
    height: 100px;
    line-height: 98px;
  }
  // 回复提示名
  .reCallMan {
    margin-bottom: 30px;
    padding: 5px;
    border: 1px solid #e0e0e3;
    border-radius: 5px;
    height: 32px;
    line-height: 32px;
    background-color: #f4f4f5;
    color: #909399;
    font-size: 12px;

    i {
      cursor: pointer;
      line-height: 32px;
      height: 32px;
      padding: 0 5px;
      &:hover {
        background-color: #909399;
        border-radius: 50%;
        color: #fff;
      }
    }
  }
  .upload {
    margin-top: 10px;
    input {
      width: 80px;
      height: 50px;
    }
  }
}
// 评论列表
.comments {
  border: 1px solid #ddd;
  position: relative;
  .hide {
    padding: 20px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
  .comments-item {
    font-size: 12px;
    padding: 20px 20px 0;
    border-bottom: 1px dashed #ddd;
    box-sizing: border-box;

    &:last-child {
      border-bottom: 0;
    }
    .top {
      .left {
        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
        }
        i {
          color: #999;
        }
      }
    }

    .main {
      padding-top: 10px;
      padding-left: 30px;
      &:hover {
        + .recall {
          span {
            display: block;
          }
        }
      }
    }
    .img {
      img {
        width: 200px;

        padding: 0 5px;
      }
      &:nth-child(4n) {
        margin-right: 0;
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
  .son {
    padding-left: 30px;
  }
}
</style>