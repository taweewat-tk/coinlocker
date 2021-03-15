<template>
  <div class="kanit">
    <h1 class="test text-center pt-2 bold">
      Coin Locker
    </h1>
    <div class="d-flex vc justify-content-end" style="margin-top:-48px;">
      <div class="pr-4">
        Welcome <span class="bold">{{ username }}</span>
      </div>
      <b-button class="btn-exit bold" variant="outline-danger" @click="exit()">
        Exit
      </b-button>
    </div>
    <div class="row justify-content-around">
      <div v-for="(unit, index) in units" :key="index" class="col-4 pt-4">
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
    // Pass data to child modal component
    getUsername () {
      if (window.localStorage.getItem('username')) {
        this.username = window.localStorage.getItem('username')
      } else { this.exit() }
    },
    modalDeposit (item) {
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
      this.getUnit(item)
    },
    exit () {
      window.localStorage.clear()
      this.$router.push('/')
    },
    getAllUnits () {
      this.$store.commit('setLoading', true)
      this.$axios.$get(`${this.$config.baseURL}/api/v1/units`).then((response) => {
        this.units = response.result
        setInterval(() => { this.startShortPolling() }, 4000)
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
      const data = await this.$axios.$get(`${this.$config.baseURL}/api/v1/units`) // รอให้ดึงข้อมูลเสร็จก่อน ค่อยรออีก 3 วินาที
      this.units = data.result
    }
  }
}
</script>

<style>
.test {
  color: red;
}
.btn-exit{
  width: 90px;
}
</style>
