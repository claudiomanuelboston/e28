<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="justify-content-center">
        <div class="col-md-8 mx-auto">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body">
                <div class="alert alert-danger" v-if="sError">{{sError}}</div>
                <form @submit.prevent="checkLogin">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="loginModel.sEmail"
                      v-validate="'required|email'"
                      placeholder="Email"
                      id="sEmail"
                      name="Email"
                      class="form-control"
                      :class="{ 'is-invalid': errors.has('Email') }"
                      :maxlength="50"
                      autocomplete="off"
                    />
                    <div v-if="errors.has('Email')" class="text-danger">{{ errors.first('Email') }}</div>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="loginModel.sPassword"
                      v-validate="'required'"
                      class="form-control"
                      placeholder="Password"
                      id="sPassword"
                      name="Password"
                      :class="{ 'is-invalid': errors.has('Password') }"
                      :maxlength="50"
                      autocomplete="off"
                    />
                    <div
                      v-if="errors.has('Password')"
                      class="text-danger"
                    >{{ errors.first('Password') }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary" v-bind:disabled="errors.any()">Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import {
  AuthConfig,
  CommonMessageConfig
} from "../../assets/configuration/config";

export default {
  name: "Login",
  mounted() {
    localStorage.removeItem("Email");
    localStorage.removeItem("Password");
  },
  data() {
    return {
      loginModel: {
        sEmail: undefined,
        sPassword: undefined
      },
      sError: undefined,
      config: AuthConfig
    };
  },
  methods: {
    checkLogin(e) {
      this.$validator.validate().then(valid => {
        if (valid) {
          if (
            this.loginModel.sEmail == this.config.sEmail &&
            this.loginModel.sPassword == this.config.sPassword
          ) {
            localStorage.setItem("Email", this.loginModel.sEmail);
            localStorage.setItem("Password", this.loginModel.sPassword);
            router.push({ name: "createshow" });
          } else {
            this.sError = CommonMessageConfig.InvalidCredential;

            setTimeout(() => {
              this.sError = "";
            }, 3000);
          }

          e.target.reset();
        }
      });
    }
  }
};
</script>