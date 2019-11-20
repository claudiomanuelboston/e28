<template>
  <div class="m-4">
    <Toast />
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>

    <!-- filter buttons -->
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col class="text-left">
        <Button class="mr-1 p-1" label="<<" @click="getFirstPost" v-b-tooltip.hover title="First" />
        <Button
          class="mr-1 p-1"
          label="<"
          @click="getPreviousPost"
          v-b-tooltip.hover
          title="Previous"
        />
      </b-col>
      <b-col class="text-right">
        <Button class="mr-1 p-1" label=">" @click="getNextPost" v-b-tooltip.hover title="Next" />
        <Button class="mr-1 p-1" label=">>" @click="getLastPost" v-b-tooltip.hover title="Last" />
      </b-col>
    </b-row>

    <b-row class="pt-3 justify-content-md-center bg-white">
      <b-col cols="12">
        <div class="col-12" v-if="postDetailsById">
          <!-- Post Details Start-->
          <div class="header-detail standalone-detail">
            <h1 class="header-title">
              {{postDetailsById.sName}}
              <i
                v-if="!isFavorite"
                v-b-tooltip.hover
                title="Add to favorites"
                class="fa fa-heart-o heartfillcolor ml-2"
                @click="addtoFavorite"
              />
              <i
                v-if="isFavorite"
                v-b-tooltip.hover
                title="Remove from favorites"
                class="fa fa-heart heartfillcolor ml-2"
                @click="addtoFavorite"
              />
            </h1>
            <div class="header-summary event-summary">
              <div class="header-date">
                <span>
                  <i class="fa fa-calendar" />
                  &nbsp;{{postDetailsById.dDate}}
                </span>
              </div>
              <!-- <div class="header-venue">
                  <span>
                    <i class="fa fa-map-marker" />
                    &nbsp; &nbsp;{{postDetailsById.sVenue}}
                  </span>
              </div>-->
              <div class="header-pricing-container">
                <span class="header-pricing">
                  <i class="fa fa-usd" />
                  &nbsp; &nbsp;{{postDetailsById.nTicketPrice}}
                </span>
              </div>
              <!-- <div class="header-pricing-container">
                  <span class="header-pricing">
                    <i class="fa fa-phone" />
                    &nbsp; {{postDetailsById.sPhoneNo}}
                  </span>
              </div>-->
            </div>
          </div>
          <!-- Post Details End -->

          <!-- Artist Details Start-->
          <b-col class="pb-1 pl-0 mt-2 pr-0">
            <h4 class="details-header">About</h4>
          </b-col>
          <p class="text-justify" v-html="postDetailsById.sDescription"></p>
          <div class="artist-box-headliner control-height" v-if="artistDetails">
            <b-col class="pb-2 pl-0 pr-0">
              <h4 class="details-header mb-3">About {{artistDetails.sArtistName}}</h4>
            </b-col>
            <b-row>
              <div class="col-md-6 col-lg-4 col-xl-3">
                <img
                  class="bio-image-right img-fluid w-100"
                  :src="artistDetails.sImageUrlPath[0]"
                  :alt="artistDetails.sArtistName"
                  :title="artistDetails.sArtistName"
                />
              </div>
              <div class="col-md-6 mt-4 mt-md-0 col-lg-8 col-xl-9">
                <p class="bio text-justify">{{artistDetails.sBioGraphy}}</p>
              </div>
            </b-row>
          </div>
          <!-- Artist Details End -->

          <!-- Artist Gallery Start -->
          <div class="artist-boxes medium-9 medium-push-3 columns" v-if="artistDetails">
            <h4 class="details-header mt-3">Gallery</h4>
            <div class="gallery d-flex">
              <p v-for="img in artistDetails.sImageUrlPath" :key="img" class="float-left p-1">
                <img
                  v-if="artistDetails.sImageUrlPath[0]!=img"
                  class="bio-image-right"
                  :src="img"
                  height="200"
                  :alt="artistDetails.sArtistName"
                  :title="artistDetails.sArtistName"
                />
              </p>
            </div>
          </div>
          <!-- Artist Gallery End -->

          <!-- Artist Video Start -->
          <div v-if="artistDetails" class="float-left ml-2 gallery d-flex">
            <p v-for="video in artistDetails.sVideoUrlPath" :key="video" class="float-left p-1">
              <video height="315" controls :src="video" width="560"></video>
            </p>
          </div>
          <!-- Artist Video End-->
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script src="https://unpkg.com/vue-router"></script>
<script>
import ShowService from "../../services/shows.service";
import router from "../../router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";
export default {
  name: "ShowDetails",
  data() {
    return {
      postDetailsById: null,
      showService: null,
      artistDetails: null,
      postDetails: null,
      id: 0,
      isLoading: false,
      fullPage: true,
      isFavorite: false
    };
  },
  created() {
    this.showService = new ShowService();
  },
  mounted() {
    let email = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");

    if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
      router.push({ name: "login" });
    } else {
      let _this = this;
      // let Id = null;
      _this.isFavorite = false;
      this.id = this.$route.params.id;
      this.getPostById();
      this.getPosts();
    }
  },
  methods: {
    getArtistById(Id) {
      let _this = this;
      this.showService.getArtistById(Id).then(response => {
        _this.artistDetails = response.data[0];
      });
    },
    getPosts() {
      let _this = this;
      this.showService.getPosts().then(response => {
        _this.postDetails = response.data;
      });
    },
    getPostById() {
      let _this = this;
      this.isLoading = true;
      this.showService.getPostById(_this.id).then(response => {
        _this.postDetailsById = response.data[0];
        if (_this.postDetailsById) {
          _this.postDetailsById.dDate = this.formatDate(
            _this.postDetailsById.dDate
          );
          this.checkFavorite();
          this.isLoading = false;
          this.getArtistById(_this.postDetailsById.nArtistId);
        }
      });
    },

    getFirstPost() {
      let _this = this;
      _this.id = Number(_this.postDetails[0].id);
      this.getPostById();
    },
    getLastPost() {
      let _this = this;
      _this.id = Number(_this.postDetails[_this.postDetails.length - 1].id);
      this.getPostById();
    },
    getPreviousPost() {
      let _this = this;
      if (_this.postDetails[0].id < Number(_this.id)) {
        _this.id = Number(_this.id) - 1;
        this.getPostById();
      } else {
        _this.id = Number(_this.postDetails[_this.postDetails.length - 1].id);
        this.getPostById();
      }
    },
    getNextPost() {
      let _this = this;
      if (
        _this.postDetails[_this.postDetails.length - 1].id > Number(_this.id)
      ) {
        _this.id = Number(_this.id) + 1;
        this.getPostById();
      } else {
        _this.id = Number(_this.postDetails[0].id);
        this.getPostById();
      }
    },
    addtoFavorite() {
      let favoriteList = JSON.parse(localStorage.getItem("favoriteList"));
      if (favoriteList == null) {
        favoriteList = [];
      }
      let _this = this;
      if (_this.isFavorite == true) {
        _this.isFavorite = false;
        if (favoriteList != undefined) {
          let obj = favoriteList.find(c => c.id == this.postDetailsById.id);
          favoriteList.splice(obj, 1);
          localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: CommonMessageConfig.PostRemoveFromFavorite,
            life: 1500
          });
        }
      } else {
        _this.isFavorite = true;
        favoriteList.push(this.postDetailsById);
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
        this.$toast.add({
          severity: "success",
          summary: "Success Message",
          detail: CommonMessageConfig.PostAddInFavorite,
          life: 1500
        });
      }
    },
    checkFavorite() {
      let _this = this;
      let favoriteList = JSON.parse(localStorage.getItem("favoriteList"));
      if (favoriteList) {
        let obj = favoriteList.find(c => c.id == this.postDetailsById.id);
        if (obj) {
          _this.isFavorite = true;
        } else {
          _this.isFavorite = false;
        }
      } else {
        _this.isFavorite = false;
      }
    },
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY | hh:mmA");
    }
  }
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
