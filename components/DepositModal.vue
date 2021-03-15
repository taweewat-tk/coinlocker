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
        <b-form-group id="input-group-1" label="Duration time to deposit:" label-for="minutes">
          <div class="d-flex vc">
            <div>
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
            <div>
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
        </b-form-group>
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
      const data = await this.$axios.$put(`${this.$config.baseURL}/api/v1/units/deposit?id=${this.unit._id}`, {
        cost: form.amount,
        summary_minutes: this.summaryMinutes,
        username: this.username
      })
      alert(data.message)
      this.$emit('response')
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
