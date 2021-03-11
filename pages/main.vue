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
        <Unit :unit-info="unit" @showModal="showModal" />
      </div>
    </div>
    <Modal ref="modal" />
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
    this.getLocker()
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
    this.getUsername()
  },
  methods: {
    // Pass data to child modal component
    getUsername () {
      if (window.localStorage.getItem('username')) {
        this.username = window.localStorage.getItem('username')
      } else { this.exit() }
    },
    showModal (item) {
      this.$refs.modal.showModal(item)
    },
    exit () {
      window.localStorage.clear()
      this.$router.push('/')
    },
    async getLocker () {
      const data = await this.$axios.$get(`${this.$config.baseURL}/api/v1/units`)
      console.log(data.result)
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
.vc{
  display: flex;
  align-items: center;
}
</style>
