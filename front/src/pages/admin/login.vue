<!-- eslint-disable vue/multi-word-component-names -->
<style lang="scss">
  .login-container {
    width: 100%;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .cont {
      width: 20%;
      // background: grey;
      .el-input {
        margin-top: 10px;
      }

      button {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
</style>
<template>
  <div class="login-container">
    <div class="cont">
      <el-input placeholder="Хэрэглэгчийн нэр" v-model="login.username" clearable size="large"></el-input>
      <el-input placeholder="Нууц үг" v-model="login.password" clearable size="large" show-password></el-input>
      <a href="javascript:;" style="float: right; margin: 10px 0px;" @click="forgotPassword">Нууц үгээ мартсан уу?</a>
      <el-button size="large" @click="Login">Нэвтрэх</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    forgotPassword() {
      this.$prompt('Please input your e-mail', 'Нууц үг сэргээх', {
        confirmButtonText: 'Send',
        cancelButtonText: 'Cancel',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'Invalid Email'
      }).then(({ value }) => {
        this.$axios({
          method: 'post',
          url: `/admin/forgot-password`,
          data: {
            email: value
          }
        }).then(data => {
          if (data.data.status === 200) {
            this.$notify({
                title: 'Амжилттай',
                message: 'Имэйл хаягаа шалгана уу',
                type: 'success',
            });
          } else {
            this.$notify({
                title: 'Амжилтгүй',
                message: 'Имэйл хаяг буруу байна',
                type: 'error',
            })
          }
        });
      });
    },
    Login(e) {
      e.preventDefault();

      this.$axios({
				method: 'post',
				url: `/admin/login`,
				data: {
					username: this.login.username,
					password: this.login.password
				}
			}).then(data => {
          if(data.data.status == 200) {
              localStorage.edit_to = data.data.token;
              localStorage.admin = JSON.stringify(data.data.user);
              // this.user = data.data.user;
              // this.modals.signIn.show = false;
              this.$notify({
                  title: 'Амжилттай',
                  message: 'Системд нэвтэрлээ',
                  type: 'success',
              });

              this.$router.push('/admin/dashboard');
          } else {
              this.$notify({
                  title: 'Амжилтгүй',
                  message: 'Нэр эсвэл нууц үг буруу',
                  type: 'error',
              })
          }
      });
    }
  }
}
</script>