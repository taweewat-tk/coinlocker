<template>
  <!-- <b-modal
    id="modal_withdraw"
    centered
    size="md"
    :title="modal_title"
    title-class="text-center bold kanit"
    @show="onReset"
    @hidden="onReset"
    @ok="onSubmit"
  >
    <div class="row justify-content-center kanit">
      <b-form class="col-11" @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" :label="status" label-for="minutes">
          <div class="d-flex vc">
            <div class="">
              <b-form-input
                id="hours"
                v-model="unit.hours"
                style="width:140px;"
                disabled
              />
            </div>
            <div class="px-2">
              hours
            </div>
            <div class="">
              <b-form-input
                id="minutes"
                v-model="unit.minutes"
                disabled
              />
            </div>
            <div class="pl-2">
              minutes
            </div>
          </div>
        </b-form-group>
        <b-form-group id="input-group-2" :label="cost_status" label-for="amount">
          <b-form-input
            id="amount"
            v-model="unit.cost"
            name="amount"
            disabled
          />
        </b-form-group>
      </b-form>
    </div>
  </b-modal> -->
  <b-modal
    id="modal_withdraw"
    centered
    size="md"
    :title="modal_title"
    title-class="text-center bold kanit"
    @show="onReset"
    @hidden="onReset"
    @ok="onSubmit"
  >
    <div class="row justify-content-center kanit">
      <b-form class="col-11" @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-2">
          <div class="d-flex vc" style="width:100%;">
            <div class="pr-2">
              Refund: {{ unit.cost }} Bath
            </div>
          </div>
        </b-form-group>
        <div>
          <b-table :items="table_data" class="mt-3 text-center table-bordered" outlined />
        </div>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'WithdrawModal',
  props: ['modal', 'username'],
  data () {
    return {
      modal_title: ''
    }
  },
  computed: {
    numberWithCommas () {
      if (this.fix_cost) {
        return this.fix_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return ''
    },
    table_data () {
      let cost = this.unit.cost
      console.log(cost)
      const tableArr = []
      if (cost >= 1000) {
        const obj = this.calulate_cost(cost, 1000)
        cost = cost - (obj.amount * 1000)
        tableArr.push(obj)
      }
      if (cost >= 500) {
        const obj = this.calulate_cost(cost, 500)
        cost = cost - (obj.amount * 500)
        tableArr.push(obj)
      }
      if (cost >= 100) {
        const obj = this.calulate_cost(cost, 100)
        cost = cost - (obj.amount * 100)
        tableArr.push(obj)
      }
      if (cost >= 50) {
        const obj = this.calulate_cost(cost, 50)
        cost = cost - (obj.amount * 50)
        tableArr.push(obj)
      }
      if (cost >= 20) {
        const obj = this.calulate_cost(cost, 20)
        cost = cost - (obj.amount * 20)
        tableArr.push(obj)
      }
      if (cost >= 10) {
        const obj = this.calulate_cost(cost, 10)
        cost = cost - (obj.amount * 10)
        tableArr.push(obj)
      }
      if (cost >= 5) {
        const obj = this.calulate_cost(cost, 5)
        cost = cost - (obj.amount * 5)
        tableArr.push(obj)
      }
      if (cost >= 1) {
        const obj = this.calulate_cost(cost, 1)
        cost = cost - (obj.amount * 1)
        tableArr.push(obj)
      }
      return tableArr
    },
    unit () {
      return this.$store.getters.getUnit
    },
    status () {
      if (this.unit.is_over === true) {
        return 'Overtime:'
      } else {
        return 'Time left:'
      }
    },
    cost_status () {
      if (this.unit.is_over === true) {
        return 'Fines:'
      } else {
        return 'Refund:'
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    calulate_cost (cost, rate) {
      const calulate = parseInt(cost / rate)
      const obj = {
        money: rate,
        amount: calulate
      }
      return obj
    },
    // get data from parent component and show modal
    modalWithdraw () {
      this.modal_title = 'Withdraw - ' + this.unit.name
      this.$root.$emit('bv::show::modal', 'modal_withdraw')
    },
    onSubmit (event) {
      this.putWithdraw()

      // this.$bvModal.hide('modal1')
      // this.$refs.modal1.hide()
      // this.$root.$emit('bv::hide::modal', 'modal1')
    },
    onReset (event) {
    //   event.preventDefault()
    },
    putWithdraw () {
      this.$axios.$put(`${this.$config.baseURL}/api/v1/units/withdraw?id=${this.unit._id}`, {
        username: this.username
      }).then((response) => {
        alert(response.message)
        this.$emit('response')
      })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
    // formatTime (_time) {
    //   const time = new Date(_time)
    //   const timeStr =
    //   ('00' + time.getHours()).slice(-2) + ':' +
    //   ('00' + time.getMinutes()).slice(-2) + ':00'
    //   return timeStr
    // }
  }
}
</script>

<style>
  .btn-money{
      width: 80px;
  }
  .invalid-text {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
