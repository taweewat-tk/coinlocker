<template>
  <div class="container kanit">
    <div>
      <img src="~/assets/coin.png" width="200" height="186">
      <div class="text-index">
        Welcome to Coinlocker
      </div>
      <div class="d-flex justify-content-center">
        <div class="col-9">
          <b-form @submit.stop.prevent="onSubmit">
            <b-form-group id="name">
              <b-form-input
                id="name"
                v-model="$v.form.name.$model"
                placeholder="Input your name"
                name="name"
                :state="validateState('name')"
                aria-describedby="input-1-live-feedback"
              />
              <b-form-invalid-feedback
                id="input-1-live-feedback"
              >
                This is a required field and must be at least 1 characters.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button variant="outline-success mt-3" type="submit">
              Go to Locker
            </b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  data () {
    return {
      form: {
        name: null
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      }
    }
  },
  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onSubmit () {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      window.localStorage.setItem('username', this.form.name)
      this.$store.commit('setLoading', true)
      this.$router.push('/main')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.text-index{
  font-size: 50px;
  font-weight: bold;
}
</style>
