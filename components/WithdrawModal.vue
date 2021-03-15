<template>
  <b-modal
    id="modal_withdraw"
    centered
    size="md"
    :title="modal_title"
    title-class="text-center bold kanit"
    @ok="onSubmit"
    @hide="onCancel"
  >
    <div class="row justify-content-center kanit">
      <b-form class="col-11" @submit="onSubmit">
        <b-form-group id="input-group-2">
          <div class="d-flex vc" style="width:100%;">
            <div class="pr-2">
              Refund: {{ costWithCommas }} Bath
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
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modal_title: '',
      summaryCost: ''
    }
  },
  computed: {
    costWithCommas () {
      if (this.unit.cost) {
        return this.unit.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return 0
    },
    table_data () {
      let cost = this.unit.cost
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
    }
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
    onSubmit () {
      this.putWithdraw()
    },
    onCancel () {
      this.$emit('response', true)
    },
    putWithdraw () {
      this.$store.commit('setLoading', true)
      this.$axios.$put(`${this.$config.baseURL}/api/v1/units/withdraw?id=${this.unit._id}`, {
        username: this.username
      }).then((response) => {
        this.$store.commit('setLoading', false)
        alert(response.message)
        this.$emit('response', true)
      }).catch((error) => {
        this.$store.commit('setLoading', false)
        alert(error.response.data.message)
      })
    }
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
