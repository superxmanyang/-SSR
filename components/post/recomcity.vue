<template>
  <div class="re">
    <div class="recom">
      <div
        class="recom-list"
        v-for="(item,index) in recomCity"
        :key="index"
        @mouseover="showContent(index)"
        @mouseout="hideContent"
      >
        <div class="recom-list-each" :class="{noborder:index===isShow}">
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <!-- 隐藏详情 -->
        <div class="recom-content" :class="{active:index===isShow}">
          <div class="content-list" v-for="(value,num) in item.children" :key="num">
            <span>{{num+1}}</span>
            <i>{{value.city}}</i>
            {{value.desc}}
          </div>
        </div>
      </div>

    </div>
          <!-- 推荐城市图片 -->
      <div class="recom-img">
        <div class="recom-text">推荐城市</div>
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recomCity: [],
      isShow: -1
    };
  },

  mounted() {
    // 获取推荐
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      if (res.request.status === 200) {
        this.recomCity = res.data.data;
      }
    });
  },
  methods: {
    showContent(index) {
      this.isShow = index;
    },
    hideContent() {
      this.isShow = -1;
    }
  }
};
</script>

<style lang="less" scoped>
.re {
  padding: 20px 30px 0 110px;
  .recom {
  border-right: 0;
  width: 240px;
  position: relative;
  border: 1px solid #ddd;
  // box-sizing: border-box;
  .recom-list {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;

    .recom-list-each {
      background-color: #fff;
      font-size: 14px;

      border-right: 1px solid #ddd;
      position: relative;
      padding: 0px 20px;
      // box-sizing: border-box;
      z-index: 10;

      i {
        position: absolute;
        height: 40px;
        line-height: 40px;
        right: 10px;
        top: 0;
      }
    }
    .noborder {
      border-right: 1px solid rgba(209, 49, 49, 0);
      color: orange;
    }
    &:last-child {
      border-bottom: 0;
    }
    .recom-content {
      border: 1px solid #ddd;
      z-index: 6;
      background-color: #fff;
      position: absolute;
      left: 239px;
      // box-sizing: border-box;
      top: -1px;
      display: none;
      width: 300px;
      .content-list {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 12px;
        color: #999;
        span {
          font-size: 24px;
          color: orange;
        }
        i {
          font-size: 16px;
          color: orange;
          margin: 0 10px;
        }
      }
    }
    .active {
      display: block;
    }
  }
}
.recom-img {
  width: 240px;
  .recom-text {
    margin: 20px 0 10px 0;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999;
  }
  img {
    width: 240px;
  }
}
}

</style>