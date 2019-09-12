<template>
  <div class="create">
    <div class="contont">
      <!-- 标题 -->
      <div class="title">发表新攻略</div>
      <!-- 介绍 -->
      <div class="title-xq">分享你的个人游记，让更多人看到哦！</div>
      <!-- 输入标题框 -->
      <el-input class="inputContainer" v-model="form.title" placeholder="请输入标题"></el-input>
      <!-- 富文本框 -->
      <VueEditor class="edidor" v-model="form.content" :config="config" ref="vueEditor" />
      <!-- 选择游玩城市 -->
      <el-form>
        <el-form-item label="选择城市" class="youwan">
          <el-autocomplete
            class="xzcs"
            :fetch-suggestions="queryDepartSearch"
            placeholder="请搜索游玩城市"
            @select="handleDestSelect"
            v-model="form.city"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <!-- 发布按钮 -->
      <div class="fabu">
        <el-button size="small" type="primary" @click="handelClick">发布</el-button>
        <span>或者</span>
        <span class="caogao">保存到草稿箱</span>
      </div>
    </div>
    <div class="caogaoxiang">
      <span>草稿箱(0)</span>
    </div>
  </div>
</template>

<script>
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  data() {
    return {
      form: {
        //   输入标题框
        title: "",
        //   选择城市
        city: "",
        //   文章内容
        content: "",
        // 城市编号
        code: ""
      },
      //   上传图片的名称
      name: "",
      //   上传图片的地址
      url: "",
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          //   上传之前触发
          uploadBefore(file) {
            console.log(file);
            return true;
          },
          //   上传中触发
          uploadProgress(res) {},
          //   上传成功触发
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          //   上传失败触发
          uploadError() {},
          //   是否展示上传进度条
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // 不输入就没有下拉框
      if (!value) {
        cb([]);
        return;
      }

      this.$axios({
        url: "/airs/city",
        params: { name: this.form.city }
      }).then(res => {
        // 解构data
        const { data } = res.data;
        // 创建一个新数组
        const newData = [];
        // 遍历data
        data.forEach(v => {
          newData.push(v);
          v.value = v.name.replace("市", "");
        });
        console.log(newData);
        // 默认选中第一个
        if (newData.length > 0) {
          this.form.city = newData[0].value;
          this.form.code = newData[0].sort;
        }
        // 回调
        cb(newData);
      });
    },
    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    handelClick() {
      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInof.token}`
        },
        data: {
          content: this.$refs.vueEditor.editor.root.innerHTML,
          title: this.form.title,
          city: this.form.city
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success(res.data.message);
          //   清空富文本框
          this.$refs.vueEditor.editor.root.innerHTML = "";
          this.form = {
            //   输入标题框
            title: "",
            //   选择城市
            city: "",
            //   文章内容
            content: "",
            // 城市编号
            code: ""
          };
        }
      });
    }
  }
};
</script>

<style scope lang="less">
.create {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  position: relative;
  .contont {
    width: 750px;
    height: 705px;
    .title {
      font-size: 22px;
      font-weight: 400px;
      margin-bottom: 10px;
    }
    .title-xq {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .inputContainer {
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      //   margin-bottom: 20px;
    }
    .edidor {
      margin-top: 20px;
      height: 400px;
    }
    .youwan {
      margin-top: 70px;
      .xzcs {
        width: 150px;
      }
    }
    .fabu span {
      font-size: 14px;
      &:nth-child(2) {
        padding-left: 10px;
      }
    }
    .caogao {
      color: orange;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .caogaoxiang {
    width: 150px;
    height: 50px;
    color: #666;
    position: absolute;
    top: 20px;
    left: 800px;
    border: 1px #999 solid;
    margin-top: 5px;
    span {
      padding: 10px;
      line-height: 40px;
    }
  }
}
</style>