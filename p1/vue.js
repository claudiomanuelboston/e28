window.app = new Vue({
  el: '#app',
  data: function () {
    return {
      randomNumber: this.getRandomNumber(1, 100),
      totalAttempts: 10,
      minNumber: 1,
      maxNumber: 100,
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
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    reloadValues() {
      this.randomNumber = this.getRandomNumber(1, 100);
      this.totalAttempts = 10;
      this.minNumber = 1;
      this.maxNumber = 100;
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
            this.message = "Congratulations! You guessed the correct number! Thanks for playing!.";
            this.makeToast("success", true);
            this.showAns = true;
            this.hideButton = true;
          }
          if (this.userInput < this.randomNumber) {
            this.lower++;
            this.attempts++;
            this.message = "This is lower than secret number. Please try again.";
            this.makeToast("warning", false);
            if (this.attempts == this.totalAttempts) {
              this.hideButton = true;
              this.showAns = true;
              this.$bvToast.hide();
              this.$bvToast.toast("Sorry, you didn't guess the right number in given attempts. Please try again.", {
                title: "",
                variant: "danger",
                autoHideDelay: 2000,
                appendToast: true,
                toaster: "b-toaster-top-center",
                solid: true,
                noAutoHide: true
              });
            }
          }
          if (this.userInput > this.randomNumber) {
            this.higher++;
            this.attempts++;
            this.message = "This is higher than secret number. Please try again.";
            this.makeToast("primary", false);
            if (this.attempts == this.totalAttempts) {
              this.hideButton = true;
              this.showAns = true;
              this.$bvToast.hide();
              this.$bvToast.toast("Sorry, you didn't guess the right number in given attempts. Please try again.", {
                title: "",
                variant: "danger",
                autoHideDelay: 2000,
                appendToast: true,
                toaster: "b-toaster-top-center",
                solid: true,
                noAutoHide: true
              });
            }
          }
        } else {
          this.disabledInput = true;
          this.showAns = true;
          this.hideButton = true;
        }
      } else {
        this.$bvToast.hide();
        this.$bvToast.toast('Please enter number greater then 0', {
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
})