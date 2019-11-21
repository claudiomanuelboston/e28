<template>
  <div class="m-4">
    <b-row class="mb-3 mt-3 p-4 justify-content-md-center bg-white">
      <b-col>
        <h1>Music Hall - America's Legendary Music Hall</h1>
      </b-col>
    </b-row>
    <b-row class="pt-3 justify-content-md-center bg-white">
      <b-col>
        <h4>The Music Hall</h4>
        <div>In music circles, the reputation of the Music Hall is legendary. Many careers have been launched from this internationally recognized music hall. On any given night, a star may be born. Mary Chapin Carpenter, Lyle Lovett, Shawn Colvin, Jerry Jeff Walker, Dave Matthews, Vince Gill, John Prine, Emmylou Harris, Linda Ronstadt, and k.d. Lang are just a few of the artists counted as good friends of the Music Hall. The Music Hall is committed to the presentation of the highest quality music in a comfortable and intimate atmosphere.</div>
        <div align="center" class="mt-3 mb-3">
          <img
            src="../../assets/images/Picture1.png"
            alt
            height="350"
            width="350"
            class="home-image"
          />
        </div>
        <div class="mb-1">General Email: admin@musichall.com</div>
        <div>The Music Hall 703-111-222 | 1000 Main Street Reston VA 22030</div>
        <div
          class="mb-2"
        >Tickets also available at The Music Hall Box Office, any night we have a show, from 5-9pm.</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import router from "../../router";
import {
  AuthConfig
} from "../../assets/configuration/config";
export default {
  name: "HomePage",
  mounted() {
    let email = localStorage.getItem("Email");
    let password = localStorage.getItem("Password");

    if (email != AuthConfig.sEmail && password != AuthConfig.sPassword) {
      router.push({ name: "login" });
    }
  }
};
</script>