<template>
  <div class="l-rpd-creation">
    <v-layout row wrap>
      <span class="md-rpd-state-hint uppercased white--text">status</span>
      <v-flex xs12 md2>
        <v-select
          label="Status"
          :items="states"
          v-model="rpd.state"
        >
        </v-select>
      </v-flex>

      <v-flex xs12 md9 offset-md1>
        <v-select
          label="Client"
          :items="clients"
          v-model="rpd.client_id"
          item-text="name"
          item-value="_id"
        >
        </v-select>
      </v-flex>

      <v-flex xs12 md12>
        <v-text-field label="Title"
                      v-model="rpd.title"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Description"
                      v-model="rpd.description"
                      textarea
                      required
                      color="light-blue lighten-1">
        </v-text-field>
      </v-flex>

      <v-flex xs12 md2 offset-md10>
        <v-btn block color="md-add-item-btn green lighten-1" @click.native="fixClientNameAndUpdate(rpd)">Update</v-btn>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
  export default {
    props: ['clients', 'fixClientNameAndUpdate', 'selectedRpd'],
    data () {
      return {
        rpd: {
          title: null,
          description: null,
          state: 'pending',
          client: null,
          get total_price () {
            let value = 0
            this.items.forEach(({ subtotal }) => {
              value += parseInt(subtotal)
            })
            return value
          },
          items: [
            {
              title: null,
              quantity: 0,
              price: null,
              get subtotal () {
                return this.quantity * this.price
              }
            }
          ]
        },
        states: [
          'writing', 'editing', 'pending', 'approved', 'denied', 'waiting'
        ]
      }
    },
    mounted () {
      this.parseRpd()
    },
    methods: {
      addItem () {
        const items = this.rpd.items
        const item = {
          title: '',
          quantity: 0,
          price: 0,
          get subtotal () {
            return this.quantity * this.price
          }
        }

        items.push(item)
      },

      removeItem (selected) {
        const items = this.rpd.items
        items.forEach((item, index) => {
          if (item === selected) {
            items.splice(index, 1)
          }
        })
      },

      parseRpd () {
        for (let key in this.selectedRpd) {
          if (key !== 'total' && key !== 'items') {
            this.rpd[key] = this.selectedRpd[key]
          }

          if (key === 'items') {
            const items = this.selectedRpd.items
            const buildItems = item => ({
              title: item.title,
              quantity: item.quantity,
              price: item.price,
              get subtotal () {
                return this.quantity * this.price
              }
            })
            const parseItems = items => items.map(buildItems)
            this.rpd.items = parseItems(items)
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./../../assets/styles";

  .uppercased {
    text-transform: uppercase;
  }

  .l-rpd-creation {
    label, input, .icon, .input-group__selections__comma, textarea {
      color: #29b6f6!important;
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }

    .input-group__input {
      border-color: $border-color-input !important;

      .input-group--text-field__prefix {
        margin-bottom: 3px !important;
      }
    }

    .input-group--focused {
      .input-group__input {
        border-color: #29b6f6!important;
      }
    }
  }

  .md-rpd-state-hint {
    margin: 10px 0;
    display: block;
    width: 100%;
  }

  .md-rpd-state {
    background-color: rgba(41, 182, 246, .6);
    display: flex;
    height: 35px;
    width: 100%;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    margin: 10px 0 15px;
  }

  .l-rpd-item {
    align-items: center;
  }

  .md-rpd-item-subtotal {
    font-size: 16px;
    text-align: center;
    display: block;
  }

  .md-rpd-item-total {
    font-size: 22px;
    text-align: center;
    display: block;
    width: 100%;
    margin: 30px 0 10px;
  }

  .md-add-item-btn {
    margin-top: 30px !important;
    display: block;
  }

  .list__tile__title, .input-group__selections {
    text-transform: uppercase !important;
  }
</style>
