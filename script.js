const questions = [
        {
          text: "畫畫接力",
          icon: "fas fa-video"
        },
        {
          text: "一年級表演",
          icon: "fas fa-birthday-cake"
        },
        {
          text: "二年級表演",
          icon: "fas fa-star"
        },
        {
          text: "三年級表演",
          icon: "fas fa-baby"
        },
        {
          text: "猜12生肖裡的動物",
          icon: "fas fa-plane"
        },
        {
          text: "猜是誰是家長 ",
          icon: "fas fa-bicycle"
        },
        {
          text: "比手畫腳",
          icon: "fas fa-wifi"
        },
        {
          text: "恐佈箱",
          icon: "fab fa-buromobelexperte"
        },
        {
          text: "上台支援前線 ",
          icon: "fas fa-certificate"
        },
        {
          text: "機智問題",
          icon: "fas fa-user-graduate"
        },
      ]

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
      prizes: questions,
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
      document.getElementById(`question-${this.awardIdx}`).innerHTML = questions[this.awardIdx].text;
    }
  }
})

const teams = [
  {
    text: "識字班",
    icon: "fas fa-fish"
  },
  {
    text: "注音班",
    icon: "fas fa-cat"
  },
  {
    text: "一年級",
    icon: "fas fa-dove"
  },
]

window.onload = function() {
  document.getElementById("questions").innerHTML = questions
    .map((q, i) => {
      return `<tr><td class="${q.icon}"></td><td class="text" id="question-${i}"></td></tr>`;
    })
    .join("");

  document.getElementById("teams").innerHTML = teams
    .map((team, i) => {
      return `<tr><td class="${team.icon} text" id="team-${i}">${team.text}</td><td>1000</td></tr>`;
    })
    .join("");
}