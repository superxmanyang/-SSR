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
        <el-button size="small" type="primary" plain @click="handelClick">发布</el-button>
        <!-- <span>或者</span>
        <span class="caogao" @click="handelCucun">保存到草稿箱</span>-->
        <el-button size="small" type="warning" plain @click="handelCucun">保存到草稿箱</el-button>
      </div>
    </div>
    <div class="caogaoxiang">
      <p>草稿箱({{locList.length}})</p>
      <div class="caogao" v-for="(item,index) in locList" :key="index" @click="handelXunRan(index)">
        <span>
          {{item.title}}
          <i class="el-icon-edit"></i>
        </span>
        <br />
        <p>{{item.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

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
        code: "",
        // 当前时间
        time: ""
      },
      // 存储的数据
      locList: [],
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
  mounted() {
    // 获取本地的搜索的历史记录
    const create = JSON.parse(localStorage.getItem("post")) || [];
    this.locList = create;
  },
  components: {
    VueEditor
  },
  methods: {
    // 点击草稿箱渲染出来数据
    handelXunRan(index) {
      console.log(index);
      this.form.title = this.locList[index].title;
      this.form.city = this.locList[index].city;
      this.$refs.vueEditor.editor.root.innerHTML = this.locList[index].content;
      console.log(this.$refs.vueEditor.editor.root.innerHTML);
    },
    // 点击存储到草稿箱
    handelCucun() {
      // 标题
      if (!this.form.title) {
        this.$message.error("标题不能为空");
        return;
      }

      // 内容不能为空
      // this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      if (this.$refs.vueEditor.editor.root.innerHTML == "<p><br></p>") {
        this.$message.error("内容不能为空");
        return;
      }

      // 标题
      if (!this.form.city) {
        this.$message.error("游玩城市不能为空");
        return;
      }

      //   输入标题框
      let title = this.form.title;
      //   选择城市
      let city = this.form.city;
      //   文章内容
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      // 当前时间
      let time = new Date();
      this.form.time = moment(time).format(`YYYY-MM-DD`);
      console.log(title, city);
      // if(!token){
      //   thi.$route.path('/user/login')
      // }

      // 把本地存储先拿出来
      const create = JSON.parse(localStorage.getItem("post")) || [];
      create.unshift(this.form);

      this.locList = create;

      // 当存储的数据大于5就覆盖掉最后一个
      if (this.locList.length > 5) {
        this.locList.splice(4,1)
      }


      // 把搜索的条件保存到本地
      localStorage.setItem("post", JSON.stringify(create));
      // 再取一次数据
      const newCreate = JSON.parse(localStorage.getItem("post")) || [];

      this.locList = newCreate;

      console.log(this.locList)
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
    },
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
        console.log(res);
        // 解构data
        const { data } = res.data;
        // 创建一个新数组
        const newData = [];
        // 遍历data
        data.forEach(v => {
          newData.push(v);
          v.value = v.name;
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
    // 发布
    handelClick() {
      // 标题
      if (!this.form.title) {
        this.$message.error("标题不能为空");
        return;
      }

      // 内容不能为空
      // this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      if (this.$refs.vueEditor.editor.root.innerHTML == "<p><br></p>") {
        this.$message.error("内容不能为空");
        return;
      }

      // 标题
      if (!this.form.city) {
        this.$message.error("游玩城市不能为空");
        return;
      }

      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
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
          // 跳转
          this.$router.push({ path: "/post" });
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
  // background: #e8d5b5;
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
      color: #666;
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
    .ql-editor {
      background: url(http://img0.imgtn.bdimg.com/it/u=2362088077,4052528931&fm=26&gp=0.jpg)no-repeat;
      background-size: 100%;
      color: skyblue;

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
    padding: 10px;
    color: #666;
    position: absolute;
    top: 20px;
    left: 800px;
    border: 1px #999 solid;
    margin-top: 5px;
    .caogao {
      font-size: 16px;
      :nth-child(1) {
        &:hover {
          color: orange;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      span {
        color: #111;
        font-weight: 500;
      }
      p {
        font-size: 14px;
        color: #999;
      }
    }

    p {
      line-height: 20px;
      margin-bottom: 5px;
    }
  }
}
</style>