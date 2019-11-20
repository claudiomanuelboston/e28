<template>
  <div class="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/#/home">Music Hall</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/#/home">HOME</b-nav-item>
          <b-nav-item href="/#/show/create">CREATE SHOW</b-nav-item>
          <b-nav-item href="/#/shows">SHOWS / CALENDAR</b-nav-item>
          <b-nav-item-dropdown text="INFO">
            <b-dropdown-item href="/#/faq">FAQ</b-dropdown-item>
            <b-dropdown-item href="/#/foodMenu">FOOD MENU</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- <b-nav-item href="/#/merch" disabled>MERCH (TBD)</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/#/favorites">
            <i class="fa fa-heart" aria-hidden="true">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </i>&nbsp;Favourites&nbsp;
          </b-nav-item>
          <b-nav-item v-if="!IsLogin" href="/#/login" v-on:click="logout">&nbsp;&nbsp;Logout</b-nav-item>
          <b-nav-item v-if="IsLogin" href="/#/login" v-on:click="logout">&nbsp;&nbsp;Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="app-body">
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <DefaultFooter />
  </div>
</template>

<script>
import DefaultFooter from "./DefaultFooter";
import {
  AuthConfig
} from "../assets/configuration/config";

export default {
  name: "DefaultContainer",
  components: {
    DefaultFooter
  },
  data() {
    return {
      IsLogin: true
    };
  },
  created() {
    let _this = this;
    this.lockTimer = setInterval(() => {
      let email = localStorage.getItem("Email");
      let password = localStorage.getItem("Password");

      if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
        _this.IsLogin = true;
      } else {
        _this.IsLogin = false;
      }
    }, 500);
  },
  
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  },
  methods: {
    logout() {
      localStorage.setItem("Email", "");
      localStorage.setItem("Password", "");
      this.IsLogin = true;
      localStorage.setItem("favoriteList", null)
    }
  }
};
</script>
