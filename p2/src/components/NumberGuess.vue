<template>
  <div class="guess-number">
    <div v-bind:class="classBefore"></div>
    <div v-bind:class="classAfter"></div>
    <b-container class="bv-example-row container-small blue-bg" style="border:1px solid gray;">
      <b-row class="card-header p-2 text-white">
        <b-col>
          <h2 class="mb-0 text-left">Hi-Low Number</h2>
        </b-col>
      </b-row>

      <b-row class="light-blue p-3 mb-4">
        <b-col class="col-md-12 text-right text-white">
          <b>Attempts:</b>
          {{attempts}} / {{totalAttempts}}
        </b-col>
      </b-row>

      <b-row>
        <b-col class="col-md-12 text-left mb-4">
          <h5 v-if="!hideButton">Can you guess the secret number?</h5>
          <h5 v-if="hideButton">Secret number was:</h5>
        </b-col>

        <b-col class="col-md-12 text-left">
          <img class="float-left" v-if="!showAns" src="../assets/guess.png" />
          <p class="r-number" v-if="showAns">{{randomNumber}}</p>
        </b-col>
        <b-col class="col-md-12 text-left mb-4" v-if="!hideButton">
          <small>
            <em>(This number will be reveal once all attempts are completed)</em>
          </small>
        </b-col>
      </b-row>

      <b-row class="mb-4" v-if="!hideButton">
        <b-col class="col-md-12 text-left">
          <label class="col-md-12 pl-0">
            <h5>Enter your guess({{minNumber}} - {{maxNumber}})</h5>
          </label>
          <input
            class="form-control col-md-2 r-number"
            type="number"
            min="0"
            max="100"
            v-model="userInput"
            :disabled="disabledInput"
            @keyup="isNumber($event)"
          />
        </b-col>
        <b-col class="text-danger text-left pt-1" v-if="userInput > 0">
          <small>
            <em>{{validationMessage}}</em>
          </small>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="col-md-12 col-lg-7">
          <b-button
            v-if="!showAns"
            variant="primary"
            @click="checkNumber"
            class="mb-4 float-left mr-3"
            :disabled="hideButton || disableButton"
          >Guess Number</b-button>
          <b-button
            class="float-left mb-4"
            variant="primary"
            v-if="hideButton"
            @click="playAgain"
          >Play Again</b-button>
        </b-col>
      </b-row>

      <b-row class="mb-4 mt-3">
        <b-col class="text-left counting-block col-md-12 col-lg-4">
          <label class="counting-label">
            Lower:
            <span class="bg-primary rounded text-white">{{lower}}</span>
          </label>
        </b-col>
        <b-col class="text-center counting-block col-md-12 col-lg-4">
          <label class="counting-label">
            Higher:
            <span class="bg-primary rounded text-white">{{higher}}</span>
          </label>
        </b-col>
        <b-col class="text-right counting-block col-md-12 col-lg-4">
          <label class="counting-label">
            Success:
            <span class="bg-success rounded text-white">{{success}}</span>
          </label>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
export default {
  props: {
    randomNumber: Number,
    totalAttempts: Number,
    minNumber: Number,
    maxNumber: Number,
    reloadValues: Function
  },
  name: "GuessNumber",
  data: function() {
    return {
      userInput: 0,
      lower: 0,
      higher: 0,
      success: 0,
      message: String,
      attempts: 0,
      hideButton: false,
      showAns: false,
      disabledInput: false,
      validationMessage: String,
      classBefore: String,
      classAfter: String,
      disableButton: false
    };
  },
  methods: {
    getRandomNumber: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    checkNumber() {
      if (this.userInput != 0) {
        if (this.attempts < this.totalAttempts) {
          if (this.userInput == this.randomNumber) {
            this.attempts++;
            this.success++;
            this.classBefore = "before";
            this.classAfter = "after";
            this.disabledInput = true;
            this.message =
              "Congratulations! You guessed the correct number! Thanks for playing!.";
            this.makeToast("success", true);
            this.showAns = true;
            this.hideButton = true;
          }
          if (this.userInput < this.randomNumber) {
            this.lower++;
            this.attempts++;
            this.message =
              "This is lower than secret number. Please try again.";
            this.makeToast("warning", false);
            if (this.attempts == this.totalAttempts) {
              this.hideButton = true;
              this.showAns = true;
              this.$bvToast.hide();
              this.$bvToast.toast(
                "Sorry, you didn't guess the right number in given attempts. Please try again",
                {
                  title: "",
                  variant: "danger",
                  autoHideDelay: 2000,
                  appendToast: true,
                  toaster: "b-toaster-top-center",
                  solid: true,
                  noAutoHide: true
                }
              );
            }
          }
          if (this.userInput > this.randomNumber) {
            this.higher++;
            this.attempts++;
            this.message =
              "This is higher than secret number. Please try again.";
            this.makeToast("primary", false);
            if (this.attempts == this.totalAttempts) {
              this.hideButton = true;
              this.showAns = true;
              this.$bvToast.hide();
              this.$bvToast.toast(
                "Sorry, you didn't guess the right number in given attempts. Please try again",
                {
                  title: "",
                  variant: "danger",
                  autoHideDelay: 2000,
                  appendToast: true,
                  toaster: "b-toaster-top-center",
                  solid: true,
                  noAutoHide: true
                }
              );
            }
          }
        } else {
          this.disabledInput = true;
          this.showAns = true;
          this.hideButton = true;
        }
      } else {
        this.$bvToast.hide();
        this.$bvToast.toast("Please enter number greater then 0", {
          title: "",
          variant: "danger",
          autoHideDelay: 1000,
          appendToast: true,
          toaster: "b-toaster-top-center",
          solid: true
        });
      }
    },
    playAgain() {
      this.userInput = 0;
      this.lower = 0;
      this.higher = 0;
      this.success = 0;
      this.message = String;
      this.attempts = 0;
      this.showAns = false;
      this.classAfter = "";
      this.classBefore = "";
      this.hideButton = false;
      this.disabledInput = false;
      this.$bvToast.hide();

      this.reloadValues();
    },
    makeToast(variant, autohide) {
      this.$bvToast.hide();
      this.$bvToast.toast(this.message, {
        title: "",
        variant: variant,
        autoHideDelay: 2000,
        appendToast: true,
        toaster: "b-toaster-top-center",
        solid: true,
        noAutoHide: autohide
      });
    },
    isNumber(event) {
      const newValue = parseInt(event.target.value);
      var num = this.userInput.match(/^\d+$/);
      if (num === null) {
        this.userInput = "";
      } else {
        if (newValue > this.maxNumber) {
          this.validationMessage =
            "Number should be less then" + this.maxNumber;
          event.preventDefault();
          event.stopPropagation();
          this.disableButton = true;
        } else {
          this.validationMessage = "";
          this.disableButton = false;
        }
      }
    }
  }
};
</script>

