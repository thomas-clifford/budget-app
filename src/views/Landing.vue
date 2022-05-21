<template>
  <div id="home-container">
    <p
      class="pt-7 font-weight-medium text-h4 primary--text"
    >
      Budget App
    </p>
    <p v-if="invalidCredentials" class="secondary--text">Incorrect email or password</p>
    <v-text-field
      v-model="userEmail"
      label="email"
      :rules="emailRules"
      @input="invalidCredentials = false"
      outlined
      class="credential"
    ></v-text-field>
    <v-text-field
      v-model="userPassword"
      label="password"
      :rules="passwordRules"
      type="password"
      @input="invalidCredentials = false"
      outlined
      class="credential"
    ></v-text-field>
    <v-btn v-on:click="authenticate()" class="mb-5">
      login
    </v-btn>


    <v-dialog
          v-model="createAccountDialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs">
                  create account
                </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Create Account
            </v-card-title>

            <v-card-text>
                  <v-container>
                    <div v-if="unmatchedPasswords" class="secondary--text">
                      passwords do not match
                    </div>
                    <v-text-field
                      v-model="fullName"
                      label="full name"
                      text-center
                    ></v-text-field>
                    <v-text-field
                      v-model="createEmail"
                      :rules="emailRules"
                      label="email"
                    ></v-text-field>
                    <v-text-field
                      v-model="createPassword"
                      :rules="passwordRules"
                      label="password"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="passwordRules"
                      label="confirm password"
                      type="password"
                    ></v-text-field>
                  </v-container>
                </v-card-text>

            <v-divider></v-divider>
            
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                color="secondary"
                text
                @click="createAccountDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="createAccount()"
              >
                Create Account
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    
  </div>
</template>

<script>
import { AUTH, USERS } from '../firebase-config'
export default {
  name: "Landing",
  data: () => ({
    userEmail: '',
    userPassword: '',
    invalidCredentials: false,
    createAccountDialog: false,
    emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ],
    passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
    ],
    fullName: '',
    createEmail: '',
    createPassword: '',
    confirmPassword: '',
    unmatchedPasswords: false
  }),
  methods: {
    async authenticate() {
      this.invalidCredentials = false;
      try {
        await AUTH.signInWithEmailAndPassword(this.userEmail, this.userPassword);
        this.$router.replace({ name: 'Home' }).catch(() => {});
      } catch (err) {
        this.invalidCredentials = true;
      }
    },
    async createAccount() {
      if (this.createPassword === this.confirmPassword) {
        try {
          await AUTH.createUserWithEmailAndPassword(this.createEmail, this.createPassword);
          await USERS.doc(this.createEmail).set({
            name: this.fullName,
            years: [],
            template: []
          });
          this.$router.replace({ name: 'Home' }).catch(() => {});
        } catch (err) {
          console.log(err);
        }
      } else {
        this.unmatchedPasswords = true;
      }
      
      
    }
  },
};
</script>
<style scoped>
#home-container {
  padding-top: 25vh;
  display: grid;
  place-items: center;
}
.credential {
  width: 15%;
}
@media only screen and (max-width: 1910px) {
  .credential {
    width: 35%;
  }
}
@media only screen and (max-width: 615px) {
  .credential {
    width: 90%;
  }
}
</style>
