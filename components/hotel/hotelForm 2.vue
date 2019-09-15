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
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          default-value="2010-10-01"
        ></el-date-picker>
      </el-form-item>

      <!-- 自定义选择器  -->
      <el-form-item>
        <el-select placeholder="请选择">
          <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
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
    <el-row>
      <el-col :span="12">asdasd</el-col>

      <el-col :span="12">
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
      v-for="(item,index) in data"
      :key="index"
    >
          <!-- 图片 -->
      <el-col :span="8">
        <el-aside style="width:320px">
          <span>
            <img style="width:320px;height:210px;" :src="item.photos" />
          </span>
        </el-aside>
      </el-col>
          <!-- 文体 -->
      <el-col :span="11" style="margin-right:20px">
        <el-main class="el-main-h2">
          <h2>{{item.name}}</h2>
          <div class="el-main-color">
            <span>{{item.alias}}</span>
            <i class="iconfont iconhuangguan" style="color:rgb(247,186,42);"></i>
            <i class="iconfont iconhuangguan" style="color:rgb(247,186,42);"></i>
            <i class="iconfont iconhuangguan" style="color:rgb(247,186,42);"></i>
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
            <span style="width:100%"> {{item.address}} </span>
          </el-col>
        </el-row>
      </el-col>

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
            >
              <span>{{item.products.name}}</span>
              <div>
                <span style="color:#ff9900">￥222</span>起
                <i class="el-icon-arrow-right"></i>
              </div>
            </el-row>
            <el-divider></el-divider>

            <el-row type="flex" justify="space-between" class="font-color">
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
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination prev-text="上一页" next-text="下一页" layout="prev, pager, next" :total="1000">
        <div></div>
      </el-pagination>
    </div>
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
      options3: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海"
            },
            {
              value: "Beijing",
              label: "北京"
            }
          ]
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都"
            },
            {
              value: "Shenzhen",
              label: "深圳"
            },
            {
              value: "Guangzhou",
              label: "广州"
            },
            {
              value: "Dalian",
              label: "大连"
            }
          ]
        }
      ],

      //Slider 滑块
      value2: 50,

      // 评分
      value10: 3.5,
      value11: 30
    };
  },
  mounted() {
    setTimeout(() => {
      console.log(this.data, 564123);
    }, 200);
  },
  // 组件
  components: {
    Map
  }
};
</script>

<style  scoped lang="less">
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

.el-col8 {
  width: 33.3333%;
}
.el-col8-left {
  padding-right: 120px;
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
</style>
