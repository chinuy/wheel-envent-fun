let wheel_index = 0;
const questions = [
        { text: "支援前線 ", icon: "fas fa-certificate", },
        { text: "比手畫腳", icon: "fas fa-wifi", },
        { text: "猜動物", icon: "fas fa-plane", },
        { text: "機智問題", icon: "fas fa-bicycle", q: "聖誕節是在那一天？"},
        { text: "機智問題", icon: "fas fa-dove", q: "平安夜是在那一晚？"},
        { text: "機智問題", icon: "fas fa-fish", q: "聖誕老人在聖誕節時第一個放到襪子裡的是什麼東西？"},
        { text: "機智問題", icon: "fas fa-tv", q: "有什麼人在一年只工作一天而且大家都很喜歡他/她？"},
        { text: "機智問題", icon: "fas fa-umbrella", q: "在聖誕節不可缺少的食物是什麼？"},
        { text: "機智問題", icon: "fas fa-train", q: "耶穌的媽媽是誰？"},
        { text: "機智問題", icon: "fas fa-tram", q: "耶穌的爸爸是誰？"},
        { text: "機智問題", icon: "fas fa-birthday-cake", q: "聖誕節是慶祝誰出生？"},
        { text: "機智問題", icon: "fas fa-users", q: "請問耶穌出生的時候有誰來看耶穌?（牧羊人、東方博士）？"},
        { text: "恐佈箱", icon: "fab fa-buromobelexperte", },
        { text: "誰是家長", icon: "fas fa-play", },
      ]
const q_index = shuffleArray(questions)

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
    text: "Team A",
    icon: "fas fa-dog",
    team: "識字班＆一年級＆三年級＆五年級"
  },
  {
    text: "Team B",
    icon: "fas fa-cat",
    team: "注音班＆二年級＆四年級＆七年級"
  },
]

window.onload = function() {
  document.getElementById("team-a").innerHTML = 
    `<tr><td class="${teams[0].icon}">&nbsp&nbsp${teams[0].text}</td><td class="text" id="score-a">100</td></tr>
    <tr><td colspan="2" class="team">${teams[0].team}</td></tr>
    `;
  document.getElementById("team-b").innerHTML = 
    `<tr><td class="${teams[1].icon}">&nbsp&nbsp${teams[1].text}</td><td class="text" id="score-b">100</td></tr>
    <tr><td colspan="2" class="team">${teams[1].team}</td></tr>
    `;
}

function shuffleArray(array) {
  const index = [...Array(array.length).keys()]
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      [index[i], index[j]] = [index[j], index[i]];
  }
  return index
}
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
      const target_index = wheel_index

      while(q_index[this.awardIdx] != target_index ) {
        this.r = Math.random();
      }
      
      this.$refs.roulette.style.transform = `rotate(${this.turn}turn)`;
      this.$refs.roulette.classList.add("turning");
      document.getElementById('fun-img').src = `./images/${fun_gif[Math.floor(Math.random() * fun_gif.length)]}`
      document.getElementById('overlay').classList.toggle(this.go)
    },
    turningEnd() {
      this.$refs.roulette.classList.remove("turning");
      this.isShowResult = true;
      document.getElementById('overlay').classList.toggle(this.go)
      document.getElementById('fun-img').src = ""
      wheel_index++
    }
  }
})