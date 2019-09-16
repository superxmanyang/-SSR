<template>
  <div class="list">
    <el-row type="flex" class="top" justify="space-between">
      <div class="left">推荐攻略</div>
      <nuxt-link to="/post/create">
        <el-button type="primary" icon="el-icon-edit">写游记</el-button>
      </nuxt-link>
    </el-row>
    <div class="composition">
      <div
        class="inlist"
        v-for="(item,index) in compositions"
        :key="index"
        :class="{less:item.images.length<3}"
        :data="item"
      >
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <!-- 标题 -->
          <div class="title" :class="{less:item.images.length<3}">{{item.title}}</div>
          <!-- 摘要 -->
          <div class="summary" v-html="item.summary" :class="{less:item.images.length<3}"></div>
          <!-- 图片 -->
          <el-row type="flex" class="photo" :class="{few:item.images.length<3}">
            <div class="photo-list" v-for="(item,index) in item.images" :key="index">
              <img :src="item" alt />
            </div>
          </el-row>
        </nuxt-link>
        <el-row
          type="flex"
          class="read"
          justify="space-between"
          :class="{less:item.images.length<3}"
        >
          <div class="read-left">
            <i class="el-icon-location-outline"></i>
            {{item.cityName}}
            <span class="by">by</span>
            <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt />
            <span class="nickname">{{item.account.nickname}}</span>
            <i class="el-icon-view"></i>
            {{item.watch}}
          </div>
          <div class="read-right">
            {{item.like}}
            <span>赞</span>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "",
      compositions: []
    };
  },
  mounted() {
    // 获取文章列表
    this.$axios({
      url: "/posts"
      // params:{city:this.cityName}
    }).then(res => {
      console.log(res);
      this.compositions = res.data.data;
      console.log(this.composition);
    });
  },
  methods: {},
  watch:{
  '$store.state.post.data'(n,o){
    console.log(123,n)
    this.compositions=n
  }
}
};

</script>
<style lang="less" scoped>
.list {
  width: 800px;
  .top {
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    width: 800px;
    .left {
      color: orange;
      font-size: 18px;
      position: relative;
    }
  }
  // 列表
  .composition {
    .inlist {
      position: relative;
      border-bottom: 1px solid #ddd;
      padding: 20px 0;
      .title {
        font-size: 18px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        &:hover {
          color: orange;
        }
      }
      .summary {
        height: 58px;
        overflow: hidden;
        margin: 20px 0;
        color: #666;
        font-size: 14px;
        cursor: pointer;
      }
      .photo {
        width: 100%;
        overflow: hidden;
        cursor: pointer;
        .photo-list {
          margin-right: 20px;
          img {
            width: 220px;
            height: 150px;
          }
        }
      }
      // 图片少于3的时候
      .few {
        position: absolute;
        left: 0;
        top: 20px;
        width: 220px;
        height: 150px;
        overflow: hidden;
      }
      .less {
        // width: 70%;
        padding-left: 33%;
      }
      // 文章周边信息
      .read {
        margin-top: 10px;
        .read-left {
          font-size: 12px;
          color: #999;
          img {
            width: 16px;
            height: 16px;
            vertical-align: middle;
          }
          .by {
            margin: 0 5px;
          }
          .nickname {
            color: orange;
            margin: 0 5px;
            cursor: pointer;
          }
        }
        .read-right {
          color: orange;
          font-size: 16px;
          span {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>