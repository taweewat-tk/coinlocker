<template>
  <div class="kanit">
    <b-card
      border-variant="primary"
      :header="unitInfo.name"
      header-bg-variant="primary"
      header-text-variant="white"
      header-class="text-center bold"
      align="left"
    >
      <b-card-text>
        <div v-if="unitInfo.is_empty === true">
          Status : <span class="bold text-green">Available</span>
        </div>
        <div v-if="unitInfo.is_empty === false">
          Status : <span class="bold text-red">Unavailable</span>
        </div>
        <div>
          Size : {{ unitInfo.size }}
        </div>
        <div>
          First 60 minutes : {{ unitInfo.rate }} Bath
        </div>
        <div>
          Next minutes : {{ unitInfo.rate_next_min }} Bath
        </div>
      </b-card-text>

      <div class="text-center">
        <b-button v-if="unitInfo.is_empty === true" variant="outline-primary" @click="modal('Deposit')">
          Selected
        </b-button>
        <b-button v-if="unitInfo.is_empty === false" variant="outline-secondary" disabled>
          Selected
        </b-button>
        <b-button v-if="unitInfo.username === username" variant="outline-success" @click="modal('Withdraw')">
          Withdraw
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Unit',
  props: {
    unitInfo: {
      type: Object,
      default: null
    },
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      unit_detail: ''
    }
  },
  created () {
  },
  methods: {
    // emit data to call function of parent component
    modal (type) {
      if (type === 'Deposit') { this.$emit('modalDeposit', this.unitInfo) } else {
        this.$emit('modalWithdraw', this.unitInfo)
      }
    }
  }
}
</script>

<style>
  .text-red{
    color: #dc3545;
  }
  .text-green{
    color: #28a745;
  }
</style>
