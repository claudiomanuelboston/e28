<template>
  <div class="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/#/home">Music Hall</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/#/home" id="home">HOME</b-nav-item>
          <b-nav-item href="/#/show/create" id="createshow">CREATE SHOW</b-nav-item>
          <b-nav-item href="/#/shows" id="shows">SHOWS / CALENDAR</b-nav-item>
          <b-nav-item-dropdown text="INFO">
            <b-dropdown-item href="/#/faq" id="faq">FAQ</b-dropdown-item>
            <b-dropdown-item href="/#/foodMenu" id="foodmenu">FOOD MENU</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/#/merch" id="merch">MERCH</b-nav-item>
          <b-nav-item href="/#/interview" id="interview">INTERVIEW</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/#/cart" class="cart" id="cart">
            <i class="fa fa-shopping-cart mr-2"></i>
            <span class="cart-counter">{{$store.state.cartCount}}</span>CART
          </b-nav-item>
          <b-nav-item href="/#/favorites" id="favorites">
            <i class="fa fa-heart" aria-hidden="true">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </i>&nbsp;FAVOURITES&nbsp;
          </b-nav-item>
          <b-nav-item v-if="!IsLogin" href="/#/login" v-on:click="logout" id="logout">&nbsp;&nbsp;LOGOUT</b-nav-item>
          <b-nav-item v-if="IsLogin" href="/#/login" v-on:click="logout" id="login">&nbsp;&nbsp;LOGIN</b-nav-item>
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
    <div class="newsletter">
      <div class="container">
        <div class="content">
          <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
          <div class="alert alert-success" v-if="sMessage">{{sMessage}}</div>
          <form @submit.prevent="saveSubscription">
            <div class="input-group">
              <input
                type="email"
                class="form-control"
                v-model="subscriptionModel.sEmail"
                placeholder="example@email.com"
                required
                :maxlength="50"
                autocomplete="off"
                name="Email"
              />
              <span class="input-group-btn">
                <button class="btn">Subscribe Now</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <DefaultFooter />
  </div>
</template>

<script>
import DefaultFooter from "./DefaultFooter";
import {
  AuthConfig,
  CommonMessageConfig
} from "../assets/configuration/config";
import ShowService from "../services/shows.service";

export default {
  name: "DefaultContainer",
  components: {
    DefaultFooter
  },
  data() {
    return {
      IsLogin: true,
      subscriptionModel: {
        sEmail: undefined
      },
      showService: null,
      sMessage: undefined
    };
  },
  created() {
    this.showService = new ShowService();
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
      localStorage.setItem("favoriteList", null);
     this.$store.commit('clearCart');
    },
    saveSubscription(event) {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.showService
            .saveSubscription(this.subscriptionModel)
            .then(response => {
              if (response.status == 201) {
                event.target.reset();
                // this.$toast.add({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: CommonMessageConfig.SubscribeSuccessfully,
                //   life: 2000
                // });
                this.sMessage = CommonMessageConfig.SubscribeSuccessfully;
                this.subscriptionModel.sEmail = undefined;
                setTimeout(() => {
                  this.sMessage = "";
                }, 2000);
              } else {
                // this.$toast.add({
                //   severity: "error",
                //   summary: "Error Message",
                //   detail: CommonMessageConfig.ErrorMessage,
                //   life: 1500
                // });
              }
            });
        }
      });
    }
  }
};
</script>