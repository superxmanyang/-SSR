<template>
  <div class="post">
    <div class="tab">
      <div class="tabl">
        <div class="tabs">
          <ul>
            <li
              v-for="(item, index) in ['热门城市', '推荐城市', '奔向海岛','主题推荐']"
              :key="index"
              
              :class="{ active: current === index }"
            >{{ item }}></li>
             <!-- @mouseenter="enter(index)" -->
              <!-- @mouseleave="leave()" -->
            <div class="yincang">
              <div v-show="current === 0">
                <ul>
                  <li @click="hreftwo">
                    <strong>1</strong> 北京 世界著名古都和现代化国际城市
                  </li>
                  <li>
                    <strong>2</strong> 广州 粤港澳大湾区、泛珠江三角洲经济区
                  </li>
                  <li>
                    <strong>3</strong> 上海 长江入海口，东隔东中国海
                  </li>
                  <li>
                    <strong>4</strong>成都 国家历史文化名城
                  </li>
                  <li>
                    <strong>5</strong> 西安 中国国际形象最佳城市之一
                  </li>
                </ul>
              </div>

              <div v-show="current === 1">
                <ul>
                  <li>1 青岛 滨海度假旅游城市</li>
                  <li>2 杭州 西湖十景</li>
                  <li>3 深圳 世界影响力的创新创意之都</li>
                  <li>4 广州 粤港澳大湾区、泛珠江三角洲经济区</li>
                  <li>5 成都 国家历史文化名城</li>
                </ul>
              </div>
              <div v-show="current === 2">
                <ul>
                  <li>1 秦皇岛 驰名中外的旅游休闲胜地</li>
                  <li>2 青岛 滨海度假旅游城市</li>
                  <li>3 珠海 浪漫之城，百岛之市</li>
                  <li>4 深圳 世界影响力的创新创意之都</li>
                  <li>5 海口 海滨自然旖旎风光</li>
                </ul>
              </div>

              <div v-show="current === 3">
                <ul>
                  <li>1 海口 海滨自然旖旎风光</li>
                  <li>2 广州 粤港澳大湾区、泛珠江三角洲经济区</li>
                  <li>3 上海 长江入海口，东隔东中国海</li>
                  <li>4 珠海 浪漫之城，百岛之市</li>
                  <li>5 西安 中国国际形象最佳城市之一</li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
        <div class="tu">
        <div class="tui">
          <span>推荐城市</span>
        </div>
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="">
        </div>
      </div>

      <div class="tabf">
        <!-- 推荐城市 -->
        <tuijian/>
        <!-- 列表 -->
        <indexlist/>
      </div>
    </div>
  </div>
</template>
<script>
import tuijian from "@/components/post/tuijian";
import indexlist from "@/components/post/indexlist";

export default {
  data() {
    return {
      // // 记录当前的状态
      // current: 0
    }
  },
   // 组件
  components: {
    indexlist,
    tuijian
  },

  mounted() {
   
  },
  methods: {
    // tab栏
    // enter(index) {
    //   // 修改current
    //    this.seen = true;
    //   this.current = index;
    // },
    // leave() {
    // this.seen = false;
    // this.current = null;
    // }
  }
}
</script>
<style scoped lang="less">
.tab {
  display: flex;

  .tabl {
    .tabs {
      flex: 1;
      ul {
        padding: 20px 25px 20px 140px;
        position: relative;
        li {
          width: 245px;
          height: 40px;
          font-size: 14px;
          cursor: pointer;
          border: 1px solid #ddd;
          border-top: 0px solid #ddd;
          line-height: 40px;
          padding-left: 15px;
        }
        li:nth-child(1) {
          border-top: 1px solid #ddd;
        }
        .yincang {
          div {
            position: absolute;
            top: 0px;
            left: 276px;
            width: 260px;
            height: 200px;
            li {
              strong {
                font-style: italic;
                font-size: 22px;
              }
            }
          }
        }
        .active {
          color: #ffa500;
        }
      }
    }
    .tu {
      width: 260px;
       padding: 0px 25px 20px 140px;  
      .tui {        
        border-bottom: 1px solid #ddd;  
        padding-bottom: 10px;      
      }
      img {
        width: 100%;
        padding-top: 10px;
      }
    }
  }
  .tabf {
    flex: 2;
    padding: 20px 150px 10px 10px;
  }
}
</style>