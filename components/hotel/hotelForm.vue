<template>
  <div>
    <el-form ref="form" label-width="80px" size="medium" :inline="true">
      <el-form-item label-width="80px">
        <!-- 输入框 -->

        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- 时间选择器 -->

      <el-form-item>
        <el-date-picker
          v-model="value9"
          type="daterange"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          default-value="2019-10-01"
        ></el-date-picker>
      </el-form-item>

      <!-- 自定义选择器  -->
      <el-form-item>
        <el-select v-model="value" placeholder="人数未定">
          <el-option-group v-for="group in options" :key="group.label" :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary">主要按钮</el-button>
      </el-form-item>
    </el-form>

    <!-- 地图蓝 -->
    <!-- 地址区域 -->
    <el-row type="flex" :gutter="20" class="addressarea">
      <!-- 地图栏 -->
      <el-col class="left" :span="14">
        <el-row type="flex">
          <el-col :span="3">区域 :</el-col>
          <el-col :span="21" class="adress">
            <i>全部</i>
            <span v-for="(item,index) in text" :key="index">{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">攻略 :</el-col>
          <el-col :span="21" class="adress">
            <span>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">均价 :</el-col>
          <el-col :span="21" class="adress">
            <el-row type="flex">
              <div class="huangguan">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>¥332</span>
              </div>
              <div class="huangguan">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>¥521</span>
              </div>
              <div class="huangguan">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>¥768</span>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </el-col>

      <!-- 地图 -->
      <el-col class="right" :span="10">
        <Map />
      </el-col>
    </el-row>

    <!-- 选取信息栏 -->
    <el-row class="choose" type="flex">
      <el-col class="el-col8" :span="8">
        <span class="el-col8-left">价格</span>
        <span>0-3090</span>

        <el-slider class v-model="value2"></el-slider>
      </el-col>

      <!-- 住宿等级 -->
      <el-col class="el-col6" :span="6">
        <el-row>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <span class="demonstration">住宿等级</span>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>

        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;1星</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;2星</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;3星</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;4星</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;5星</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

      <!-- 住宿类型 -->
      <el-col class="el-col6" :span="6">
        <el-row>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <span class="demonstration">住宿类型</span>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>

        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;经济型</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;舒适型</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;高档型</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;豪华型</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;度假村</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;公寓式酒店</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col class="el-col6" :span="6">
        <!-- 酒店设施 -->
        <el-row>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <span class="demonstration">酒店设施</span>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>

        <!-- 不限 1 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;wifi</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;热水壶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;吹风机</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;外币兑换服务</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;电梯</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col class="el-col6" :span="6">
        <el-row>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <span class="demonstration">酒店品牌</span>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>

        <el-dropdown>
          <div>
            <span class="left">不限</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;七天连锁</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;汉庭</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;如家</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;格林豪泰</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;海友</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off">&nbsp;&nbsp;99旅馆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <!-- 酒店介绍 -->
    <el-row
      type="flex"
      justify="space-between"
      class="underline"
      v-for="(item, index) in data"
      :key="index"
    >
      <!-- 图片 -->
      <nuxt-link :to="`/hotel/hotelDetail?id=${item.id}`">
        <el-col :span="8">
          <el-aside style="width:320px">
            <span>
              <img style="width:320px;height:210px;" :src="item.photos" />
            </span>
          </el-aside>
        </el-col>
      </nuxt-link>
      <!-- 文体 -->
     
      <el-col :span="11" style="margin-right:20px">
        <el-main class="el-main-h2">
           <nuxt-link :to="`/hotel/hotelDetail?id=${item.id}`">
          <h2>{{item.name}}</h2>
           </nuxt-link>
          <div class="el-main-color">
            <span>{{item.alias}}</span>
            <span v-if="item.hotellevel">
              <span v-for="(item3, index3) in item.hotellevel" :key="index3">
                <i class="iconfont iconhuangguan" style="color:rgb(247,186,42);"></i>
              </span>
            </span>
            <span>经济型</span>
          </div>
        </el-main>
        <el-row style="margin: 0 20px;">
          <el-col :span="+10">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} 分"
            ></el-rate>
          </el-col>
          <el-col :span="+7">
            <div class="grid-content bg-purple-light">
              <span style="color:#ff9900">30</span> 条评价
            </div>
          </el-col>
          <el-col :span="+7">
            <div class="grid-content bg-purple"></div>
            <span style="color:#ff9900">75</span> 篇游记
          </el-col>
        </el-row>
        <el-row style="margin: 10px 20px; color:#666;">
          <el-col>
            <i class="iconfont iconlocation"></i>位于：
            <span style="width:100%">{{item.address}}</span>
          </el-col>
        </el-row>
      </el-col>

      <!-- 右边广告栏 -->
      <el-col :span="+5">
        <el-row>
          <el-col :span="24" style="padding-top:20px" class="tb">
            <!-- <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name"></el-table-column>

              <el-table-column style="color:#ff9900" prop="price">
                起
                <i class="el-icon-arrow-right"></i>
              </el-table-column>
            </el-table>-->
            <el-row
              type="flex"
              justify="space-between"
              style="padding:20px 0 0 0;"
              class="font-color"
              v-for="(item1, index) in item.products"
              :key="index"
            >
              <span>{{item1.name}}</span>
              <div>
                <span style="color:#ff9900">￥{{item1.price}}</span>起
                <i class="el-icon-arrow-right"></i>
              </div>
            </el-row>
            <el-divider></el-divider>

            <!-- <el-row type="flex" justify="space-between" class="font-color">
              <span>7777</span>
              <div>
                <span style="color:#ff9900">￥222</span>起
                <i class="el-icon-arrow-right"></i>
              </div>
            </el-row>
            <el-divider></el-divider>

            <el-row type="flex" justify="space-between" class="font-color">
              <span>777</span>
              <div>
                <span style="color:#ff9900">￥222</span>起
                <i class="el-icon-arrow-right"></i>
              </div>
            </el-row>
            <el-divider></el-divider>-->
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="10"><div class="block">
      <el-pagination prev-text="< 上一页" next-text="下一页 >" layout="prev, pager, next" :total="1000">
      </el-pagination>  
      </div></el-col>

      <el-col :span="24" style="margin: 20px 0" class="fbox">
        <span class="zbox">
          <el-button class="el-icon-arrow-left">上一页</el-button>
          <el-pagination style="display:inline-block;" layout="prev, pager, next" :total="1000"></el-pagination>
          <el-button>
            下一页 <i class="el-icon-arrow-right"></i>
          </el-button>
        </span>
      </el-col> 
    </el-row>-->
  </div>
</template>

<script>
import Map from "@/pages/hotel/map";
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [
        {
          name: "携程",
          price: "120"
        }
      ],
      value: 3.5,
      // 选择框
      input: "",

      // 时间选择器
      value8: "",
      value9: "",

      // 自定义选择器
      options: [
        {
          label: "成人",
          options: [
            {
              value: "0",
              label: "0"
            },
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            }
          ]
        },
        {
          label: "儿童",
          options: [
            {
              value: "0",
              label: "0"
            },
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            }
          ]
        }
      ],
      value: "",

      // 景点，展示在酒店的搜索的区域位置
      text: [],

      //Slider 滑块
      value2: 50,

      // 评分
      value10: 3.5,
      value11: 30
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.$axios({
        url: "/hotels",
        params: {
          _limit: this.pageSize,
          _start: this.pageNum
        }
      }).then(res => {
        console.log(res);
        this.data = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      console.log(`每页 ${val} 条`);
      this.$axios({
        url: "/hotels",
        params: {
          _limit: this.pageSize,
          _start: this.pageNum
        }
      }).then(res => {
        console.log(res);
        this.data = res.data.data;
        this.total = res.data.total;
      });
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.data, 564123);
      console.log(123456789, this.data);
      this.total = 121;
    }, 200);

    this.total = this.data.total;
    this.$axios({
      url: "cities",
      // 路由的url参数
      params: {
        name: "南京"
      }
    }).then(res => {
      this.text = res.data.data[0].scenics;

      console.log(this.text);
    });
  },
  // 组件
  components: {
    Map
  }
};
</script>

<style  scoped lang="less">
.addressarea {
  color: gray;
  margin-bottom: 50px;
}
.tb .el-divider {
  margin: 15px 0 15px 0;
}
.map {
  width: 420px;
  height: 260px;
}

.choose > el-col {
  padding-left: 20px;
  padding-right: 20px;
}
.fenye {
  margin-top: 20px;
}

.el-col8 {
  width: 33.3333%;
}
.el-col8-left {
  padding-right: 120px;
}

.adress {
  width: 100%;
}

.left {
  span {
    padding: 0 10px;
  }
}

.huangguan > i {
  color: rgb(247, 186, 42);
}

.el-slider {
  width: 80%;
  margin: 0 auto;
  padding: 0 20px;
}

.el-col6 {
  width: 25%;
}
.choose {
  border: 1px #ddd solid;
  height: 98px;
  padding: 5px 0;
  box-sizing: border-box;
  > div {
    text-align: center;
    line-height: 38px;
    border-right: 1px #ddd solid;
    float: left;
    &:last-child {
      border-right: none;
    }
    * {
      vertical-align: middle;
    }
  }
}
.demonstration {
  display: block;
  flex-direction: column;
  padding: 0 20px;
}

.el-aside {
  padding-top: 20px;
}

.el-icon--right {
  padding-left: 80px;
}
.el-main-h2 > h2 {
  font-weight: 500;
}
.el-main-color {
  color: #666;
}
.font-color {
  color: #606266;
}
.underline {
  padding-bottom: 20px;
  border-bottom: 1px solid #dcdfe6;
}
.row-bg {
  margin: 20px 0;
}
/deep/.btn-prev {
  width: 85px;
  height: 28px;
  border: 1px solid #ddd;
  border-radius: 2px;
  > span {
    line-height: 28px;
  }
}
/deep/.btn-next {
  width: 85px;
  height: 28px;
  border: 1px solid #ddd;
  > span {
    line-height: 28px;
  }
}
// .fbox {
//   overflow: hidden;
//   .zbox {
//     float: right;
//   }
// }
</style>
