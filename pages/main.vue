<template>
  <div>
    <h1 class="test text-center">
      Coin Locker
    </h1>
    <div class="row justify-content-around">
      <div v-for="(unit, index) in units" :key="index" class="col-4 pt-4">
        <h3 v-if="index == 0" class="text-center">
          {{ unit.size }}
        </h3>
        <h3 v-if="index == 1" class="text-center">
          {{ unit.size }}
        </h3>
        <h3 v-if="index == 2" class="text-center">
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
      units: [],
      unit_detail: {},
      modal: false
    }
  },
  created () {
    for (let i = 0; i < 12; i++) {
      let obj
      if (i === 0 || i === 3 || i === 6 || i === 9) {
        obj = {
          name: 'Unit #' + (i + 1),
          size: 'S',
          color: 'success', // empty
          status: 'Available'
        }
      } else if (i === 1 || i === 4 || i === 7 || i === 10) {
        obj = {
          name: 'Unit #' + (i + 1),
          size: 'M',
          color: 'secondary', // used
          status: 'Unavailable'
        }
      } else {
        obj = {
          name: 'Unit #' + (i + 1),
          size: 'L',
          color: 'warning', // selected
          status: 'Unavailable'
        }
      }
      this.units.push(obj)
    }
  },
  methods: {
    // Pass data to child modal component
    showModal (item) {
      this.$refs.modal.showModal(item)
    }
  }
}
</script>

<style>
.test {
  color: red;
}
</style>
