const questions = [
        {
          text: "畫畫接力",
          icon: "fas fa-video",
          count: 1
        },
        {
          text: "識字班表演",
          icon: "fas fa-birthday-cake",
          count: 1
        },
        {
          text: "表演",
          icon: "fas fa-baby",
          count: 1
        },
        {
          text: "12生肖動物",
          icon: "fas fa-plane",
          count: 1
        },
        {
          text: "猜猜誰是家長 ",
          icon: "fas fa-bicycle",
          count: 1
        },
        {
          text: "比手畫腳",
          icon: "fas fa-wifi",
          count: 1
        },
        {
          text: "恐佈箱",
          icon: "fab fa-buromobelexperte",
          count: 1
        },
        {
          text: "支援前線 ",
          icon: "fas fa-certificate",
          count: 1
        },
        {
          text: "機智問題",
          icon: "fas fa-user-graduate",
          count: 10
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
    },
    go() {
      return this.r > 0.5? 'go1' : 'go2'
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
      
      if(questions.some( q => q.count > 0)) {
        while(this.prizes[this.awardIdx].count == 0) {
          this.r = Math.random();
        }
      } else {
        console.log("All questions are shown")
      }

      this.$refs.roulette.style.transform = `rotate(${this.turn}turn)`;
      this.$refs.roulette.classList.add("turning");
      document.getElementById('fun-img').src = `./images/${fun_gif[Math.floor(Math.random() * fun_gif.length)]}`
      document.getElementById('overlay').classList.toggle(this.go)
    },
    turningEnd() {
      this.$refs.roulette.classList.remove("turning");
      this.isShowResult = true;
      this.prizes[this.awardIdx].count--;
      document.getElementById(`question-${this.awardIdx}`).innerHTML = questions[this.awardIdx].text;
      document.getElementById('overlay').classList.toggle(this.go)
      document.getElementById('fun-img').src = ""
    }
  }
})

const fun_gif = [
  "G9Vp.gif",
  "homer-simpson-the-simpsons.gif",
  "neil-de-grasse-tyson-wheel-of-science-episodes.gif",
  "spin-record.gif",
  "spin-spin-the-wheel.gif",
  "spin-the-wheel-dab.gif",
  "spin-the.gif",
  "the-goon-prize-wheel.gif",
  "wheel-of-fortune-spin.gif",
  "wheel-spinning.gif",
];

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
      return `<tr><td class="${team.icon} text" id="team-${i}">${team.text}</td><td>100</td></tr>`;
    })
    .join("");
}