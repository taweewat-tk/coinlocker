<template>
  <div class="kanit">
    <div class="vertical-middle-center pt-2">
      <div class="header bold">
        Coin Locker
      </div>
      <img class="pl-2 img" src="~/assets/coin.png" height="55">
    </div>
    <div class="d-flex vc justify-content-end welcome">
      <div class="pr-4">
        Welcome <span class="bold">{{ username }}</span>
      </div>
      <b-button class="btn-exit bold" variant="outline-danger" @click="exit()">
        Exit
      </b-button>
    </div>
    <div class="row justify-content-around">
      <div v-for="(unit, index) in units" :key="index" class="col-md-4 pt-4">
        <h3 v-if="index == 0" class="text-center bold">
          {{ unit.size }}
        </h3>
        <h3 v-if="index == 1" class="text-center bold">
          {{ unit.size }}
        </h3>
        <h3 v-if="index == 2" class="text-center bold">
          {{ unit.size }}
        </h3>
        <Unit :unit-info="unit" :username="username" @modalDeposit="modalDeposit" @modalWithdraw="modalWithdraw" />
      </div>
    </div>
    <DepositModal ref="modal_d" :username="username" @response="getAllUnits" />
    <WithdrawModal ref="modal_w" :username="username" @response="getAllUnits" />
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      interval: null,
      username: '',
      units: [],
      unit_detail: {},
      modal: false
    }
  },
  beforeMount () {
    this.getAllUnits()
    this.getUsername()
  },
  methods: {
    getUsername () {
      if (window.localStorage.getItem('username')) {
        this.username = window.localStorage.getItem('username')
      } else { this.exit() }
    },
    modalDeposit (item) {
      clearInterval(this.interval)
      this.$store.commit('setLoading', true)
      this.$axios.$put(`${this.$config.baseURL}/api/v1/units/reserve?id=${item._id}`, {
        username: this.username
      }).then((response) => {
        this.$store.commit('setLoading', false)
        this.$refs.modal_d.modalDeposit(item)
      }).catch((error) => {
        this.$store.commit('setLoading', false)
        alert(error.response.data.message)
      })
    },
    modalWithdraw (item) {
      clearInterval(this.interval)
      this.getUnit(item)
    },
    exit () {
      clearInterval(this.interval)
      window.localStorage.clear()
      this.$router.push('/')
    },
    getAllUnits () {
      this.$store.commit('setLoading', true)
      this.$axios.$get(`${this.$config.baseURL}/api/v1/units`).then((response) => {
        this.units = response.result
        this.interval = setInterval(() => { this.startShortPolling() }, 4000)
        this.$store.commit('setLoading', false)
      }).catch((error) => {
        this.$store.commit('setLoading', false)
        alert(error.response.data.message)
      })
    },
    getUnit (item) {
      this.$store.commit('setLoading', true)
      this.$axios.$get(`${this.$config.baseURL}/api/v1/unit?id=` + item._id + '&username=' + this.username
      ).then((response) => {
        this.$store.commit('setUnit', response.result)
        this.$store.commit('setLoading', false)
        this.$refs.modal_w.modalWithdraw()
      }).catch((error) => {
        this.$store.commit('setLoading', false)
        alert(error.response.data.message)
      })
    },
    async startShortPolling () {
      const data = await this.$axios.$get(`${this.$config.baseURL}/api/v1/units`) // short time polling
      this.units = data.result
    }
  }
}
</script>

<style>
.vertical-middle-center{
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-exit{
  width: 90px;
}
.header {
  text-align: center;
  font-size: 45px;
}
.welcome {
  margin-top:-50px;
}
.img{
  display: block;
}
@media only screen and (max-width: 768px) {
  .header {
    text-align: left;
    font-size: 34px;
  }
  .vertical-middle-center{
    display: flex;
    align-items: center;
    justify-content: left;
  }
  .welcome {
    margin-top: -42px;
  }
  .img{
    display: none;
  }
}
@media only screen and (max-width: 468px) {
  .header {
    text-align: left;
    font-size: 27px;
    margin-top: 10px;
    display: none;
  }
  .welcome {
    margin-top: -45px;
  }
  .vertical-middle-center{
    display: flex;
    align-items: center;
    justify-content: left;
  }
  .img{
    display: block;
  }
}
</style>
