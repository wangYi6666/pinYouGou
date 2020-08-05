<template>
  <div class="login">
    <el-form status-icon ref="form" :rules="rules" :model="form" label-width="80px">
      <img class="avatar" src="../assets/avatar.jpg" alt="" srcset="">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username"  placeholder='请输入用户名'></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="form.password" placeholder='请输入密码'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('form')" class="loginbtn" type="primary">登录</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8888/api/private/v1/login',
        //   data: this.form
        // }).then(res => {
        //   const { meta } = res.data
        //   if (meta.status === 200) {
        //     console.log(meta.msg)
        //   } else {
        //     console.log(meta.msg)
        //   }
        // }
        // })
        axios.post('http://localhost:8888/api/private/v1/login', this.form).then(res => {
          const { meta } = res.data
          if (meta.status === 200) {
            // 登录成功, 跳转首页
            this.$message({
              showClose: true,
              message: meta.msg,
              type: 'success',
              duration: 1000
            })
            this.$router.push({ name: 'index' })
          } else {
            // 给用户提示, 登录失败
            this.$message({
              showClose: true,
              message: meta.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 440px;
    background-color: #fff;
    padding: 20px;
    padding-top: 130px;
    border-radius: 20px;
    margin: 200px auto;
    position: relative;
    .avatar {
      border-radius: 50%;
      left: 50%;
      transform: translateX(-50%);
      top: -90px;
      position: absolute;
      border: 5px solid #fff;
    }
  }
  .loginbtn {
    margin-right: 100px;
  }
}
</style>
