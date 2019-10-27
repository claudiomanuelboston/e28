<template>
  <div id="app">
    <GuessNumber
      :randomNumber="randomNumber"
      :totalAttempts="totalAttempts"
      :minNumber="minNumber"
      :maxNumber="maxNumber"
      :reloadValues="reloadValues"
    ></GuessNumber>
  </div>
</template>

<script>
import GuessNumber from "../src/components/NumberGuess";

export default {
  name: "app",
  components: {
    GuessNumber
  },
  data: function() {
    return {
      randomNumber: this.getRandomNumber(1, 100),
      totalAttempts: 10,
      minNumber: 1,
      maxNumber: 100
    };
  },
  methods: {
    getRandomNumber: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    reloadValues() {
      this.randomNumber = this.getRandomNumber(1, 100);
      this.totalAttempts = 10;
      this.minNumber = 1;
      this.maxNumber = 100;
    }
  }
};
</script>

