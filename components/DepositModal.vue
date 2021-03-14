<template>
  <b-modal
    id="modal_deposit"
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
        <!-- <b-form-group id="input-group-1" label="Duration time to deposit (Hours:minutes):" label-for="duration">
          <input
            id="duration"
            v-model="$v.form.duration.$model"
            name="duration"
            :state="validateState('duration')"
            class="form-control"
            type="time"
            aria-describedby="input-1-live-feedback"
            @input="timeToMinutes"
          >
        </b-form-group> -->
        <b-form-group id="input-group-1" label="Duration time to deposit:" label-for="minutes">
          <div class="d-flex vc">
            <div class="">
              <b-form-input
                id="hours"
                v-model="$v.form.hours.$model"
                placeholder="hours"
                style="width:140px;"
                @keydown="onKeyDown"
                @input="calculateCost"
              />
            </div>
            <div class="px-2">
              hours
            </div>
            <div class="">
              <!-- minutes -->
              <b-form-input
                id="minutes"
                v-model="$v.form.minutes.$model"
                :state="validateState('minutes')"
                placeholder="minutes"
                required
                @keydown="onKeyDown"
                @input="calculateCost"
              />
            </div>
            <div class="pl-2">
              minutes
            </div>
          </div>
        </b-form-group>
        <b-form-group id="input-group-2" label="Cost:" label-for="amount">
          <b-form-input
            id="amount"
            v-model="$v.form.amount.$model"
            name="amount"
            :state="validateState('amount')"
            placeholder="Enter amount of money"
            required
            @keydown="onKeyDown"
          />
          <div v-if="text_alert == true" class="invalid-text">
            Cost must be more than {{ numberWithCommas }} Bath
          </div>
          <!-- <b-form-invalid-feedback
            id="input-3-live-feedback"
          >
            This is a required.
          </b-form-invalid-feedback> -->
        </b-form-group>

        <!-- <b-form-group id="input-group-3" label="Coin:">
          <div class="d-flex" style="justify-content: space-evenly;">
            <b-button class="btn-money" variant="outline-primary" @click="addMoney(1)">
              1
            </b-button>
            <b-button class="btn-money" variant="outline-primary" @click="addMoney(2)">
              2
            </b-button>
            <b-button class="btn-money" variant="outline-primary" @click="addMoney(5)">
              5
            </b-button>
            <b-button class="btn-money" variant="outline-primary" @click="addMoney(10)">
              10
            </b-button>
          </div>
        </b-form-group>

        <b-form-group id="input-group-4" label="Bill:">
          <div class="d-flex justify-content-around">
            <b-button class="btn-money px-2" variant="outline-primary" @click="addMoney(20)">
              20
            </b-button>
            <b-button class="btn-money px-2" variant="outline-primary" @click="addMoney(50)">
              50
            </b-button>
            <b-button class="btn-money px-2" variant="outline-primary" @click="addMoney(100)">
              100
            </b-button>
            <b-button class="btn-money px-2" variant="outline-primary" @click="addMoney(500)">
              500
            </b-button>
            <b-button class="btn-money px-2" variant="outline-primary" @click="addMoney(1000)">
              1000
            </b-button>
          </div>
        </b-form-group> -->
        <!-- <b-button type="reset" variant="danger">
          Reset
        </b-button> -->
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'DepositModal',
  mixins: [validationMixin],
  props: ['modal', 'username'],
  data () {
    return {
      modal_title: '',
      text_alert: true,
      fix_cost: 0,
      summaryMinutes: null,
      form: {
        hours: null,
        minutes: null,
        amount: null
      },
      unit: {
        cost: '',
        deposit_date: '',
        is_empty: null,
        name: '',
        rate: null,
        rate_next_min: null,
        return_date: '',
        size: '',
        username: '',
        _id: null
      }
    }
  },
  validations: {
    form: {
      hours: {

      },
      minutes: {
        required
      },
      amount: {
        required
      }
    }
  },
  computed: {
    numberWithCommas () {
      if (this.fix_cost) {
        return this.fix_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return ''
    }
  },
  created () {

  },
  methods: {
    onKeyDown (e) {
      if (
        e.key !== 'Tab' &&
        e.key !== 'Backspace' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== '0' &&
        e.key !== '1' &&
        e.key !== '2' &&
        e.key !== '3' &&
        e.key !== '4' &&
        e.key !== '5' &&
        e.key !== '6' &&
        e.key !== '7' &&
        e.key !== '8' &&
        e.key !== '9'
      ) {
        e.preventDefault()
      }
    },
    isCostMoreThanFixCost () {
      if (Number(this.form.amount) < Number(this.fix_cost)) {
        this.text_alert = true
        return false
      } else {
        this.text_alert = false
        return true
      }
    },
    validateState (name) {
      if (name === 'amount') {
        if (!this.isCostMoreThanFixCost()) {
          return false
        }
      }
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    // get data from parent component and show modal
    modalDeposit (item) {
      this.unit = item
      this.modal_title = 'Deposit - ' + this.unit.name
      this.$root.$emit('bv::show::modal', 'modal_deposit')
    },
    addMoney (amount) {
      this.form.amount = this.form.amount ? this.form.amount : 0
      this.form.amount = Number(this.form.amount) + amount
    },
    timeToMinutes () {
      // this.calculateCost((Number(this.form.hours) * 60), Number(this.form.minutes))
      // if (Number(this.form.hours) === 0) {
      //   this.calculateCost(60, 0)
      // } else {
      //   this.calculateCost((Number(this.form.hours) * 60), Number(this.form.minutes))
      // }
    },
    calculateCost () {
      const hours = this.form.hours ? this.form.hours : 0
      const minutes = this.form.minutes ? this.form.minutes : 0
      const sumMin = (Number(hours) * 60) + Number(minutes)
      let cost = 0
      this.summaryMinutes = sumMin

      if (sumMin > 60) {
        const overCost = (sumMin - 60) * this.unit.rate_next_min
        cost = this.unit.rate + overCost
      } else if (sumMin === 0) {
        cost = 0
      } else {
        cost = this.unit.rate
      }
      this.fix_cost = cost
      this.form.amount = cost

      // const cost = ((minHours / 60) * this.unit.rate) + (min * this.unit.rate_next_min)
    },
    onSubmit (event) {
      this.form.hours = this.form.hours ? this.form.hours : 0
      this.form.minutes = this.form.minutes ? this.form.minutes : 0

      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        event.preventDefault()
        return
      }
      if (this.isCostMoreThanFixCost() === false) {
        event.preventDefault()
        return
      }
      if (Number(this.form.minutes) === 0 && Number(this.form.hours) === 0) {
        event.preventDefault()
        alert('Duration time to deposit must more than be 0 minutes.')
        return
      }
      this.postUnit(this.form)

      // this.$bvModal.hide('modal1')
      // this.$refs.modal1.hide()
      // this.$root.$emit('bv::hide::modal', 'modal1')
    },
    onReset (event) {
    //   event.preventDefault()
      this.form = {
        hours: null,
        minutes: null,
        amount: null
      }
      this.fix_cost = 0
      this.text_alert = false
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    async postUnit (form) {
      console.log('form.amount : ', form.amount)
      console.log('this.summaryMinutes : ', this.summaryMinutes)
      console.log('this.username : ', this.username)
      const data = await this.$axios.$put(`${this.$config.baseURL}/api/v1/units/deposit?id=${this.unit._id}`, {
        cost: form.amount,
        summary_minutes: this.summaryMinutes,
        username: this.username
      })
      alert(data.message)
      this.$emit('response')
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
