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
  created () {
    // for (let i = 0; i < 12; i++) {
    //   let obj
    //   if (i === 0 || i === 3 || i === 6 || i === 9) {
    //     obj = {
    //       name: 'Unit #' + (i + 1),
    //       size: 'S',
    //       color: 'success', // empty
    //       status: 'Available'
    //     }
    //   } else if (i === 1 || i === 4 || i === 7 || i === 10) {
    //     obj = {
    //       name: 'Unit #' + (i + 1),
    //       size: 'M',
    //       color: 'secondary', // used
    //       status: 'Unavailable'
    //     }
    //   } else {
    //     obj = {
    //       name: 'Unit #' + (i + 1),
    //       size: 'L',
    //       color: 'warning', // selected
    //       status: 'Unavailable'
    //     }
    //   }
    //   this.units.push(obj)
    // }
  },
  mounted () {
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
      this.$refs.modal_d.modalDeposit(item)
    },
    modalWithdraw (item) {
      this.getUnit(item)
    },
    exit () {
      window.localStorage.clear()
      this.$router.push('/')
    },
    getAllUnits () {
      this.$axios.$get(`${this.$config.baseURL}/api/v1/units`).then((response) => {
        this.units = response.result
      })
        .catch((error) => {
          alert(error.response.data.message)
        })
    },
    getUnit (item) {
      // const data = await this.$axios.$get(`${this.$config.baseURL}/api/v1/unit?id=` + item._id + '&username=' + this.username)
      this.$axios.$get(`${this.$config.baseURL}/api/v1/unit?id=` + item._id + '&username=' + this.username).then((response) => {
        this.$store.commit('setUnit', response.result)
        this.$refs.modal_w.modalWithdraw()
      })
        .catch((error) => {
          alert(error.response.data.message)
        })
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
