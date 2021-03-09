<template>
  <b-modal
    id="modal1"
    centered
    size="md"
    :title="unit.name"
    @show="onReset"
    @hidden="onReset"
    @ok="onSubmit"
  >
    <div class="row justify-content-center">
      <b-form class="col-11" @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Duration time to deposit (Hours:minutes):" label-for="duration">
          <!-- <label for="duration">Duration of deposit:</label> -->
          <!-- <input v-model="form.duration" type="time"> -->
          <input id="duration" v-model="form.duration" class="form-control" type="time" @input="timeToMinutes">
          <!-- <input id="duration" v-model="form.duration" class="form-control" type="datetime-local"> -->
          <!-- <b-form-timepicker
            id="timepicker-buttons"
            v-model="form.duration"
            now-button
            reset-button
            locale="en"
          /> -->
          <!-- <div class="mt-2">
            Duration: '{{ form.duration }}'
          </div> -->
        </b-form-group>
        <b-form-group id="input-group-2" label="Cost:" label-for="amount">
          <b-form-input
            id="amount"
            v-model="form.amount"
            placeholder="Enter amount of money"
            required
          />
        </b-form-group>

        <b-form-group id="input-group-3" label="Coin:">
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
        </b-form-group>
        <!-- <b-button type="submit" variant="primary">
          Submit
        </b-button> -->
        <b-button type="reset" variant="danger">
          Reset
        </b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: ['modal'],
  data () {
    return {
      form: {
        duration: null,
        unit_name: '',
        amount: null
      },
      unit: {}
    }
  },
  created () {
    // this.form.duration = this.formatTime(Date.now())
    // this.form.duration = this.formatTime(Date.now())
  },
  methods: {
    // get data from parent component and show modal
    showModal (item) {
      console.log(item)
      this.unit = item
      this.$root.$emit('bv::show::modal', 'modal1')
    },
    onSubmit (event) {
    //   event.preventDefault()
      this.form.unit_name = this.unit.name
      alert(JSON.stringify(this.form))
    },
    onReset (event) {
    //   event.preventDefault()
      this.form.amount = null
      this.form.duration = null
    },
    onHidden () {
      this.form.amount = null
    },
    addMoney (amount) {
      if (this.form.amount == null) { this.form.amount = this.form.amount == null ? 0 : this.form.amount }
      this.form.amount += amount
    },
    timeToMinutes (event) {
      const splitTime = event.target.value.split(':')
      if (Number(splitTime[0]) === 0) {
        this.calculateCost(60, 0)
      } else {
        this.calculateCost((Number(splitTime[0]) * 60), Number(splitTime[1]))
      }
    },
    calculateCost (minHours, min) {
    //   console.log(minHours)
    //   console.log(min)
    //   console.log(this.unit.size)
      let cost
      if (this.unit.size === 'S') {
        cost = ((minHours / 60) * 50) + (min * 25)
      } else if (this.unit.size === 'M') {
        cost = ((minHours / 60) * 100) + (min * 50)
      } else if (this.unit.size === 'L') {
        cost = ((minHours / 60) * 200) + (min * 100)
      } else {
        console.log('error size')
      }
      this.form.amount = cost
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
</style>
