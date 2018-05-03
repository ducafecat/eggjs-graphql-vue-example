<template>
  <div>
    <el-card v-loading="loading">
      <div slot="header" class="header">
        <span>调试面板</span>
      </div>
      <el-button type="primary" @click="handleLogin">用户登录</el-button>
      <el-button type="primary">查询产品</el-button>
      <el-button type="primary">添加产品</el-button>

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
import gql from 'graphql-tag'
export default {
  name: 'graphql-vue',
  data() {
    return {
      loading: false,
      req: '',
      res: '',
      err: '',
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$apollo
        .query({
          // Query
          query: gql`
            query queryFun($username: String!, $password: String!) {
              user(username: $username, password: $password) {
                id
                name
                token
              }
            }
          `,
          variables: {
            username: 'ducafecat',
            password: '12321321321321432'
          },
          loadingKey: 'loading'
        })
        .then(response => {
          this.loading = false
          this.res = response.data
          console.log('data => ', response)
        })
        .catch(error => {
          this.loading = false
          this.err = error
          console.error('error => ', error)
        })
    },
    handleLogin2() {
      this.$apollo.queries.login
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
</style>
