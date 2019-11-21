<template>
  <div class="m-4">
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>FAQs</h1>
      </b-col>
    </b-row>
    <b-row
      class="pt-3 justify-content-md-center bg-white"
      v-for="(faq, index) in faqs"
      :key="`fruit-${index}`"
    >
      <b-col>
        <h4>{{index+1}}) {{faq.sQuestion}} :</h4>
        <p v-html="faq.sAnswer"></p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import ShowService from "../../services/shows.service";
import {
  AuthConfig
} from "../../assets/configuration/config";
import router from "../../router";

export default {
  name: "FAQ",
  data() {
    return {
      faqs: []
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
      this.showService.getFaqs().then(response => {
        this.faqs = response.data;
      });
    }
  }
};
</script>
