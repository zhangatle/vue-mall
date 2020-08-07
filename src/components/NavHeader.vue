<template>
<div class="header">
  <div class="nav-topbar">
    <div class="container">
      <div class="topbar-menu">
        <a href="javascript:;">小米商城</a>
        <a href="javascript:;">MIUI</a>
        <a href="javascript:;">云服务</a>
        <a href="javascript:;">协议规则</a>
      </div>
      <div class="topbar-user">
        <a href="javascript:;" v-if="username">{{username}}</a>
        <a href="javascript:;" v-if="!username" @click="login">登录</a>
        <a href="javascript:;" v-if="username" @click="logout">退出</a>
        <a href="/#/order/list" v-if="username">我的订单</a>
        <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
      </div>
    </div>
  </div>
  <div class="nav-header">
    <div class="container">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="header-menu">
        <span>小米手机</span>
        <div class="children">
          <ul>
            <li class="product" v-for="(item, index) in phoneList" :key="index">
              <a v-bind:href="'/#/product/' + item.id" target="_blank">
                <div class="pro-img">
                  <img v-lazy="item.mainImage" :alt="item.subtitle">
                </div>
                <div class="pro-name">{{item.name}}</div>
                <div class="pro-price">{{item.price | currency}}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="item-menu">
        <span>RedMi红米</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "NavHeader",
  data() {
    return {
      phoneList: []
    }
  },
  computed: {
    ...mapState(["username", "cartCount"])
  },
  filters: {
    currency(val) {
      if(!val)return "0.00"
      return "￥" + val.toFixed(2) + "元"
    }
  },
  mounted() {
    this.getProductList();
    let params = this.$route.params;
    if(params && params.from === "login") {
      this.getCartCount()
    }
  },
  methods: {
    login() {
      this.$router.push("/login")
    },
    getProductList() {
      this.axios.get('/products', {
        params: {
          categoryId: "100012",
          pageSize: 6
        }
      }).then((res) => {
        this.phoneList = res.list
      })
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res=0) => {
        this.$store.dispatch("saveCartCount", res)
      })
    },
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$message.success("退出成功")
        this.$cookie.set("userId", "", {expires: "-1"})
        this.$store.dispatch("saveUserName", "")
        this.$store.dispatch("saveCartCount", "0")
      })
    },
    goToCart() {
      this.$router.push("/cart")
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/base.scss";
  @import "../assets/scss/mixin.scss";
  @import "./../assets/scss/config.scss";
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #B0B0B0;
      .container{
        @include flex();
        a{
          display: inline-block;
          color: #B0B0B0;
          margin-right: 17px;
        }
        .my-cart{
          width: 110px;
          background-color: #FF6600;
          text-align: center;
          color:#FFFFFF;
          margin-right: 0;
          .icon-cart{
            @include bgImg(16px, 12px, "/images/icon-cart-checked.png");
            margin-right: 4px;
          }
        }
      }
    }
  }
</style>
