<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/logo.png" />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="exit()">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div width="100%" class="btnchildren" @click="toggleCollapse">|||</div>
        <el-menu
          :default-active='$route.path'
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          router
         
        >
          <!--一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id" >
            <!--一级菜单模板区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>{{item.authName}}</span>
            </template>

            <!--二级菜单-->
            <el-menu-item :index="'/'+itemChildren.path" v-for="itemChildren in item.children" :key="itemChildren.id">
              <!--二级菜单模板区域-->
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{itemChildren.authName}}</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu></el-aside
      >
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import { commodityRequest } from "../api/list_axios";

export default {
  mounted() {
  
    this.getLst();
  },
  data() {
    return {
      menulist: [],
      isCollapse:false
    };
    
  },
  methods: {
    exit() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    async getLst() {
      var { data: listData } = await commodityRequest("menus");
      console.log(listData);
      console.log(this);
      if (listData.meta.status == 200) {
        this.menulist = listData.data;
       console.log(this.menulist)
      } else {
        this.$Message.error(listData.meta.msg);
      }
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    }
  },
};
</script>

<style  lang="less" scoped>
.btnchildren{
  text-align: center;
  color: #fff;
  background-color: darkslategray;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  img {
    width: 20%;
    height: 20%;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu{
    border-right:none
  }
}

.el-main {
  background-color: #eaedf1;
}
.home_container {
  height: 100%;
}
</style>