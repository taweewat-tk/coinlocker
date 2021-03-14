<template>
  <!-- <b-card
    :header="unitInfo.size"
    header-tag="header"
    footer="Card Footer"
    footer-tag="footer"
    :title="unitInfo.name"
  >
    {{lockerInfo}}
    <b-card-text>Header and footers using props.</b-card-text>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>-->
  <!-- <b-card :bg-variant="unitInfo.status" text-variant="white" header="Success" class="text-center">
    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>-->
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
      <!-- <b-button disabled variant="outline-secondary">Used</b-button>
      <b-button variant="outline-success">Empty</b-button>-->
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Unit',
  props: ['unitInfo', 'username'],
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
