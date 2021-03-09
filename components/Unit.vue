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
  <div>
    <b-card
      :border-variant="unitInfo.color"
      :header="unitInfo.name"
      :header-bg-variant="unitInfo.color"
      header-text-variant="white"
      align="center"
    >
      <b-card-text>Status : {{ unitInfo.status }}</b-card-text>
      <!-- <b-button variant="outline-primary">Selected</b-button> -->
      <b-button variant="outline-primary" @click="modal()">
        Selected
      </b-button>
      <!-- <b-button disabled variant="outline-secondary">Used</b-button>
      <b-button variant="outline-success">Empty</b-button>-->
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Unit',
  props: ['unitInfo'],
  data () {
    return {
      unit_detail: ''
    }
  },
  methods: {
    // emit data to call function of parent component
    modal () {
      this.$emit('showModal', this.unitInfo)
    }
  }
}
</script>
