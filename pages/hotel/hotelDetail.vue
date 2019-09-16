<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotelData.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel'}">{{hotelData.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{hotelData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 酒店名称地址 -->
    <el-row class="hotel_name_info">
      <el-col :span="24">
        <el-row>
          <h4 class="hotel_name_cn">
            {{hotelData.name}}
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
          </h4>
        </el-row>
        <el-row>
          <span>{{hotelData.alias}}</span>
        </el-row>
        <el-row>
          <i class="iconfont iconlocation"></i>
          {{hotelData.address}}
        </el-row>
      </el-col>
    </el-row>

    <!-- 酒店内景图片 -->
    <el-row class="hotle_pic">
      <!-- 左边大图 -->
      <el-col :span="16" class="hotle_left_pic">
        <div class="main_pic">
          <img width="640" height="360" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" />
        </div>
      </el-col>
      <!-- 右边小图 -->
      <el-col :span="8" class="hotle_right_pic">
        <el-row :gutter="20">
          <el-col :span="12" class="pic_item">
            <div>
              <img width="160" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
            </div>
          </el-col>
          <el-col :span="12" class="pic_item">
            <div>
              <img width="160" src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt />
            </div>
          </el-col>
          <el-col :span="12" class="pic_item">
            <div>
              <img width="160" src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg" alt />
            </div>
          </el-col>
          <el-col :span="12" class="pic_item">
            <div>
              <img width="160" src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt />
            </div>
          </el-col>
          <el-col :span="12" class="pic_item">
            <div>
              <img width="160" src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt />
            </div>
          </el-col>
          <el-col :span="12" class="pic_item">
            <div>
              <img width="160" src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 酒店住房信息 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="价格来源"></el-table-column>
      <el-table-column prop="bestType" label="低价房型"></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚"></el-table-column>
    </el-table>

    <!-- 地图 -->
    <div class="map_box">
      <!-- 高德地图 -->
      <div id="mapContainer"></div>

      <!-- 高德地图旁边tabs栏 -->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs_list">
        <el-tab-pane label="风景" name="first">
          <ul>
            <li v-for="(item, index) in position" :key="index">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="交通" name="second">交通</el-tab-pane>
      </el-tabs>
    </div>

    <!-- 酒店详细信息 -->
    <el-row class="hotle_detail_info">
      <el-row class="info_row">
        <el-col :span="4" class="info_hd">基本信息</el-col>
        <el-col :span="20" class="info_bd">
          <el-tag type="info">入住时间: 14:00之后</el-tag>
          <el-tag type="info">离店时间: 12:00之前</el-tag>
          <el-tag type="info">{{hotelData.creation_time}}</el-tag>
          <el-tag type="info">{{hotelData.renovat_time}}</el-tag>
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_hd">主要设施</el-col>
        <el-col :span="20" class="info_bd">
          <!-- <el-row type="flex"> -->
          <el-tag type="info">外币兑换服务</el-tag>
          <el-tag type="info">电梯</el-tag>
          <el-tag type="info">洗衣服务</el-tag>
          <el-tag type="info">热水壶</el-tag>
          <el-tag
            type="warning"
            v-for="(item,index) in hotelData.hotelassets"
            :key="index"
          >{{item.name}}</el-tag>
          <!-- </el-row> -->
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_hd">停车服务</el-col>
        <el-col :span="20" class="info_bd"></el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_hd">品牌服务</el-col>
        <el-col :span="20" class="info_bd"></el-col>
      </el-row>
    </el-row>

    <!-- 用户评论 -->
    <el-row class="comment">
      <h4>0条真实用户评论</h4>
      <el-row class="score_row">
        <el-col :span="4">
          <P>总评数：{{hotelData.all_remarks}}</P>
          <P>好评数：{{hotelData.good_remarks + hotelData.very_good_remarks}}</P>
          <P>差评数：{{hotelData.bad_remarks + hotelData.very_bad_remarks}}</P>
        </el-col>
        <el-col :span="5" style="margin-top:20px">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="stamp">推荐</div>
        </el-col>
        <el-col :span="3">
          <!-- <el-progress type="circle" :percentage="80" color="#fa3">环境</el-progress> -->
          环境
        </el-col>
        <el-col :span="3">产品</el-col>
        <el-col :span="3">服务</el-col>
      </el-row>
    </el-row>
    <!-- end container -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 存储自己所需的参数 */
      myposition: [],
      /* 存储了查找风景名胜返回来的地图数据 */
      position: {},
      /* 酒店数据存储 */
      hotelData: {},
      /* 酒店评分数据 */
      value: 3.5,
      /* 地图旁tabs数据 */
      activeName: "first",
      /* 酒店房间价格列表 */
      tableData: [
        /* {
          date: "携程",
          name: "高级大床房A",
          address: "58起"
        },
        {
          date: "携程",
          name: "高级大床房A",
          address: "58起"
        },
        {
          date: "携程1",
          name: "高级大床房A",
          address: "58起"
        } */
      ]
    };
  },
  mounted() {
    // 循环绘制marker
    /* for (let i = 0; i < this.myposition.length; i++) {
      createMarker(
        myposition[i].longitude,
        myposition[i].latitude,
        myposition[i].name
      );
    } */

    //高德地图请求
    this.$axios({
      url: "https://restapi.amap.com/v3/place/text",
      method: "get",
      params: {
        // 需要使用web服务类型的key
        key: "554e73e6213d866abc85a17f81afaec7",
        // keywords和tyoes两者必选其一
        // keywords:,
        types: "风景名胜",
        city: "深圳",
        // 每页的记录数据
        offset: 10,
        // 当前页数
        page: 1,
        // 返回的数据类型，默认json
        output: JSON,
        // 官方文档并没有提到location，但是从老师的线上项目来看，是有location这个参数的
        location: "22.522882,114.054512"
      }
    }).then(res => {
      // 在network中看到的是res.data下的
      this.position = res.data.pois;
      console.log("++++++++++++++++");
      console.log(this.position);
      console.log("++++++++++++++++");

      // 把数据处理到一个对象数组position中
      // 处理经纬度

      for (let i = 0; i < this.position.length; i++) {
        let arr = this.position[i].location.split(",");
        let obj = {
          longitude: arr[0],
          latitude: arr[1],
          id: this.position[i].id,
          name: this.position[i].name
        };
        this.myposition.push(obj);
      }
      console.log(this.myposition);
    });
    // 初始化加载酒店详情页
    this.init();
    // this.$axios({
    //   url: "/hotels",
    //   method: "get",
    //   params: {
    //     // id:'',
    //     city: 199,
    //     enterTime: "2019-06-12",
    //     leftTime: "2019-07-15",
    //     _limit: 10,
    //     _start: 0
    //   }
    // }).then(res => {
    //   console.log(res.data);
    // });
    /* 高德地图加载js API */
    // 等待下面url加载完毕之后再执行
    window.onLoad = function() {
      // 创建地图， container是容器的id
      var map = new AMap.Map("mapContainer", {
        zoom: 11, //级别
        center: [114.085947, 22.547] //中心点坐标
      });
    };

    /* 下面这段代码作用未知 */
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=a1641a0d1149997507fec7f625f5a2b4&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    /* 创建marker */
    for (let i = 0; i < this.myposition.length; i++) {
      // 创建一个 Marker 实例：
      new AMap.Marker({
        position: new AMap.LngLat(
          this.myposition[i].longitude,
          this.myposition[i].latitude
        ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: this.myposition.name
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    }
  },
  methods: {
    /* 绘制marker */
    /* 传入三个参数，经纬和title */
    /* createMarker(longitude, latitude, title) {
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(longitude, latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: title
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    }, */
    /* 从服务器获取数据 */
    async init() {
      let finalArr = {
        // 酒店id
        id: this.$route.query.id
        // city: 199,
        // enterTime: "2019-06-12",
        // leftTime: "2019-07-15",
        // _limit: 10,
        // _start: 0
      };
      let result = await this.$axios({
        url: "/hotels",
        method: "get",
        params: finalArr
      });
      this.hotelData = result.data.data[0];
      console.log("--------------");
      console.log(this.hotelData);
      console.log("--------------");
      //为毛报错hotelData未定义？因为傻子没有加this.

      // 酒店价格列表
      this.tableData = this.hotelData.products;
    },
    /* 地图旁tabs点击处理函数 */
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
// 版心容器
.container {
  width: 1000px;
  margin: 0 auto;
}

// 面包屑
.breadcrumb {
  padding: 20px 0;
}

// 酒店名称地址
.hotel_name_info {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  .hotel_name_cn {
    color: #333;
    font-weight: 400;
    font-size: x-large;
    .iconhuangguan {
      color: #f90;
    }
  }
}

// 酒店内景图片
.hotle_pic {
  margin: 40px 0;
  .hotle_right_pic {
    .pic_item {
      margin-bottom: 10px;
    }
  }
}

// 地图
.map_box {
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
  height: 360px;
  #mapContainer {
    width: 65%;
    height: 100%;
  }
  .tabs_list {
    flex: 1;
    padding-left: 20px;
    overflow: hidden;
    li {
      margin: 0 20px 20px 10px;
      cursor: pointer;
    }
  }
}

// 酒店详细信息
.hotle_detail_info {
  margin: 40px 0;
  .info_row {
    border-bottom: 1px solid #eee;
  }
  .info_hd,
  .info_bd {
    font-size: 14px;
    padding: 20px 10px;
  }
  .info_bd {
  }
}

//评论
.comment {
  margin: 40px 0;
  .score_row {
    color: #666;
    padding: 20px 0;
  }
  .stamp {
    position: absolute;
    left: 190px;
    top: 20px;
    border: 2px solid #fa3;
    text-align: center;
    line-height: 70px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    opacity: 0.25;
    -webkit-transform: rotate(-30deg);
    transform: rotate(-30deg);
    color: #f90;
    font-size: x-large;
  }
}
</style>