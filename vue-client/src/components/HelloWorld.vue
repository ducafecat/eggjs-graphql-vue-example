<template>
  <div>
    <el-card v-loading="loading">
      <div slot="header" class="header">
        <span>调试面板</span>
      </div>
      <el-button type="primary" @click="handleLogin">用户登录</el-button>
      <el-button type="primary" @click="handleUserAll">用户列表</el-button>
      <el-button type="primary" @click="handleRemoveUser">用户删除</el-button>
      <el-button type="danger" @click="handleClear">清除Token</el-button>

      <el-alert v-if="token !== null" :title="{token}" type="success" :closable="false" class="alert"></el-alert>

      <div class="debug info" v-if="req !== ''">
        {{req}}
      </div>
      <div class="debug info" v-if="res !== ''">
        {{res}}
      </div>
      <div class="debug err" v-if="err !== ''">
        {{err}}
      </div>

    </el-card>
  </div>
</template>

<script>
import QUERY_USER from '@/graphql/user.graphql'
import QUERY_USERS from '@/graphql/users.graphql'
import MUTATION_REMOVE_USER from '@/graphql/removeUser.graphql'
import Config from '@/utils/config.json'

export default {
  name: 'graphql-vue',
  data() {
    return {
      loading: false,
      req: '',
      res: '',
      err: '',
      token: null
    }
  },
  created() {
    this.token = localStorage.getItem(Config.tokenName) || null
  },
  methods: {
    clearData() {
      this.loading = true
      this.req = ''
      this.res = ''
      this.err = ''
    },
    handleLogin() {
      this.clearData()
      this.$apollo
        .query({
          // Query
          query: QUERY_USER,
          variables: {
            username: 'ducafecat',
            password: '12321321321321432'
          },
        })
        .then(response => {
          this.loading = false
          this.res = response.data
          localStorage.setItem(Config.tokenName, this.res.user.token)
          this.token = this.res.user.token
        })
        .catch(error => {
          this.loading = false
          this.err = error
        })
    },
    handleUserAll() {
      this.clearData()
      this.$apollo
        .query({
          // Query
          query: QUERY_USERS,
        })
        .then(response => {
          this.loading = false
          this.res = response.data
        })
        .catch(error => {
          this.loading = false
          this.err = error
        })
    },
    handleRemoveUser() {
      this.clearData()
      this.$apollo
        .mutate({
          // Query
          mutation: MUTATION_REMOVE_USER,
          variables: {
            id: 123
          }
        })
        .then(response => {
          this.loading = false
          this.res = response.data
        })
        .catch(error => {
          this.loading = false
          this.err = error
        })
    },
    handleClear() {
      localStorage.removeItem(Config.tokenName)
      this.token = null
    }
  },
  apollo: {
    /*
    login: {
      query: gql`
        query queryFun($username: String!, $password: String!) {
          user(username: $username, password: $password) {
            id
            name
            token
          }
        }
      `,
      variables() {
        return {
          username: 'ducafecat',
          password: '345457yftgyhdsfghre'
        }
      },
      manual: true,
      result({data, loading}) {
        console.log(data, loading)
        if (!loading) {
          this.res = data
        }
      }
    }
    */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.debug {
  border: 1px solid rgb(51, 51, 51);
  padding: 2px;
  margin: 5px;
  word-wrap: break-word;
}
.info {
  background-color: blanchedalmond;
}
.err {
  background-color: rgb(248, 51, 2);
  color: #fff;
}
.alert {
  margin: 5px;
  word-wrap: break-word;
}
</style>
