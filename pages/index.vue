<template>
  <div class="container kanit">
    <div>
      <Logo />
      <h1 class="title">
        Welcome to coin locker
      </h1>
      <div class="links">
        <div class="row justify-content-center">
          <div class="col-3">
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
      this.$store.dispatch('loading', true)
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

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
