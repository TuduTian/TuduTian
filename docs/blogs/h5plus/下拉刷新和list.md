---
title: vant中list和下拉刷新的爱恨情仇（巨坑！！）  
date: 2023-7-23
categories:  
    - html5Plus
tags: 
  - html5Plus 
  - vant组件
sticky: 1
---
```vue
<template>
  <figcaption class="warp">
    <MyHead :title="$route.query.title || '发布动态'"> </MyHead>
    <main class="main">
      <van-sticky offset-top="0.5rem" style="height: 100%">
        <van-tabs v-model="activeIsType" swipeable @change="onChangeTab">
          <van-tab
            :name="item.name"
            v-for="item in tabList"
            :key="item.text"
            :title="item.text"
          >
            <div class="tab-content">
              <div style="text-align: center" v-if="isLoading">
                <van-loading type="spinner" size="24">加载中...</van-loading>
              </div>
              <van-pull-refresh
                v-else
                v-model="refreshing"
                @refresh="onRefresh"
              >
                <van-list
                  :immediate-check="false"
                  v-model="listLoading"
                  :finished="finished"
                  finished-text="到底啦~"
                  @load="onLoad"
                >
                  <template v-if="activeIsType == 2 || activeIsType == 1">
                    <gph-order
                      :isGph="activeIsType == 2"
                      v-for="(item, index) in publishList"
                      :key="item.id"
                      :info="item"
                      :index="index"
                    />
                  </template>

                  <!-- 贸易商机 和 现货资源  -->
                  <template v-else-if="activeIsType == 3 || activeIsType == 4">
                    <TradeBlock
                      :isTrade="activeIsType == 3"
                      v-for="(item, index) in publishList"
                      :key="item.id"
                      :info="item"
                      :index="index"
                    />
                  </template>

                  <template v-else-if="activeIsType == 5">
                    <circleBlockVue
                      v-for="(item, index) in publishList"
                      :key="item.id"
                      :info="item"
                      :index="index"
                    />
                  </template>
                </van-list>
              </van-pull-refresh>
            </div>
          </van-tab>
        </van-tabs>
      </van-sticky>
    </main>
    <!-- button submit  -->
    
  </figcaption>
</template>
<script>
import { $apiGetSyncList } from "@/api/modules/api-buzz";
import GphOrder from "./components/gphOrder.vue"; // 钢制品订单
import TradeBlock from "./components/TradeBlock.vue"; // 贸易商机
import circleBlockVue from "./components/circleBlock.vue";
export default {
  name: "ReleaseDynamic",
  components: { GphOrder, TradeBlock, circleBlockVue },
  data() {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    return {
      page: 1,
      refreshing: false,
      limit: 10, //单页10条数据 ,初始化就做判断
      listLoading: false,
      activeIsType: 1,
      tabList: [
        { text: "钢材", name: 1 },
        { text: "制品", name: 2 },
        { text: "贸易商机", name: 3 },
        { text: "现货资源", name: 4 },
        { text: "钢市圈", name: 5 },
      ],
      token: localStorage.getItem("token"),
      publishList: [], //订单或者是其他的列表
      total: 0, //总数
      isLoading: false,
    };
  },
  computed: {
    finished() {
      if (this.isLoading) {
        return false;
      }
      return this.total <= this.publishList.length;
    },
  },
  mounted() {
    this.isLoading = true;
    this.page = 1;
    this._getData({ is_type: this.activeIsType, page: 1 });
  },
  methods: {
    //下拉刷新
    onRefresh() {
      this.page = 1;
      this._getData({ is_type: this.activeIsType, page: 1 });
    },
    //tabs 改变时触发
    onChangeTab(name, text) {
      this.page = 1;
      this.isLoading = true;
      this._getData({ is_type: name, page: 1 });
    },
    //获取数据
    async _getData(params) {
      let { concat } = params;
      const { status, msg, data } = await $apiGetSyncList({
        token: this.token,
        ...params,
      });
      if (status) {
        if (concat) {
          this.publishList = this.publishList.concat(data.list);
        } else {
          this.publishList = data.list;
        }
        this.total = data.total;
      } else {
        this.$toast({ message: msg });
      }
      this.isLoading = false;
      this.listLoading = false;

      //关闭正在下拉刷新
      setTimeout(() => {
        this.refreshing = false;
      }, 300);
    },

    //加载更多
    onLoad() {
      if (this.isLoading) {
        return;
      }
      this._getData({
        is_type: this.activeIsType,
        page: this.page + 1,
        concat: true,
      });
      this.page = this.page + 1;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.warp {
  display: flex;
}

.main {
  background: #f8f8f8;
  flex: 1;
  height: calc(100vh - 0.5rem);
}

/* 下面的主题 */
.tab-content {
  overflow: auto;
  height: calc(100% - 0.5rem);
}

::v-deep {
  .public-head {
    box-shadow: unset;
  }
  .van-tabs {
    height: 100%;
    .van-tab {
      line-height: 0.44rem;
    }
    .van-tabs__content,
    .van-tab__pane {
      height: calc(100vh - 0.5rem);
    }
    .van-tabs__wrap {
      height: 0.44rem;
    }
    .van-tab__text {
      font-size: 0.14rem;
    }
    .van-tabs__line {
      width: 0.4rem;
    }

    .van-tabs__wrap {
      margin-bottom: 0.04rem;
      box-shadow: 0px 0.03rem 0.03rem 0px rgba(0, 0, 0, 0.03);
    }
  }
  .van-sticky--fixed {
    bottom: 0;
  }

  .van-list {
    min-height: 100vh !important;
  }
  // loading 部分穿透
  .van-list__loading {
    margin-top: 0.1rem;

    .van-loading__text {
      font-size: 0.14rem;
    }
  }
  .van-list__finished-text {
    font-size: 0.14rem;
  }
}

//@处理下拉刷新的标题和其他的
::v-deep {
  .van-pull-refresh__head {
    height: 0.25rem;
    font-size: 0.12rem;
  }
  .van-loading__text {
    font-size: 0.12rem;
  }
}
</style>
```

如果您想要复现该bug，可以复制打开，
1. main组件的高度固定为100vh - 0.5rem ，因为上方有一个tabs 要做吸顶，我并没有使用 绝对定位，所以才产生了这个bug，
2. tab-content  这个元素一定要和main同样的高度，不然就会产生这个问题，如果是 100% 也会出问题，是100vh 也会出问题