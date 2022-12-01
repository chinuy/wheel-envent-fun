let vm = new Vue({
  el: '#app',
  computed: {
    length() {
      return this.prizes.length;
    },
    result() {
      if (this.awardIdx === -1) {
        return null;
      } else {
        return this.prizes[this.awardIdx].text;
      }
    },
    turn() {
      return this.r * 50 + 5;
    },
    awardIdx() {
      return (
        Math.round((this.turn - Math.floor(this.turn)) * this.length) %
        this.length
      );
    }
  },
  data() {
    return {
      prizes: [
        {
          text: "Movie",
          icon: "fas fa-video"
        },
        {
          text: "Wish",
          icon: "fas fa-birthday-cake"
        },
        {
          text: "Star",
          icon: "fas fa-star"
        },
        {
          text: "Child",
          icon: "fas fa-baby"
        },
        {
          text: "Flight",
          icon: "fas fa-plane"
        },
        {
          text: "Bike",
          icon: "fas fa-bicycle"
        },
        {
          text: "Wifi",
          icon: "fas fa-wifi"
        },
        {
          text: "Toy",
          icon: "fab fa-buromobelexperte"
        },
        {
          text: "Award",
          icon: "fas fa-certificate"
        },
        {
          text: "Dog",
          icon: "fas fa-paw"
        },
        {
          text: "Award",
          icon: "fas fa-certificate"
        },
        {
          text: "Dog",
          icon: "fas fa-paw"
        }
      ],
      r: 0,
      isShowResult: false
    };
  },
  methods: {
    turning() {
      this.isShowResult = false;
      this.r = Math.random();
      this.$refs.roulette.style.transform = `rotate(${this.turn}turn)`;
      this.$refs.roulette.classList.add("turning");
    },
    turningEnd() {
      this.$refs.roulette.classList.remove("turning");
      this.isShowResult = true;
    }
  }
})