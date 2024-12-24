<template>
    <div class="login-container">
        <div id="back">
        <div class="login">
            <a-row class="row">
                <a-col :flex="1" class="col01">
                    <div id="left">
                        <img class="logo" src="@/assets/logo.png" alt="logo" />
                        <h3>Xtalpi CSP Demo</h3>
                        <p>Version V1.2.26</p>
                    </div>
                </a-col>
                <a-col :flex="2" class="col02">
                    <a-form class="right" ref="test" :model="formState" name="basic"  :label-col="{ span: 8 }" :wrapper-col="{ span: 13 }" autocomplete="on" @finish="onFinish" @finishFailed="onFinishFailed">
                        <h2>Sigh in</h2>
                        <a-form-item name="username"  :wrapper-col="{ offset: 8, span: 16 } ">
                            <a-input v-model:value="formState.username" :bordered="false" placeholder="email" class="input-name" :allowClear="false"/>
                        </a-form-item>
    
                        <a-form-item name="password"  :wrapper-col="{ offset: 8, span: 16 }" :rules="[{ required: false, message: 'Please input your password!' }]">
                            <a-input-password placeholder="password" v-model:value="formState.password" :bordered="false" class="input-name"/>
                        </a-form-item>
    
                        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                        </a-form-item>
                        <a-form-item :wrapper-col="{ offset: 8, span: 20 }" >
                            <!-- <a-button type="primary" html-type="submit" class="button" @click="getbaidu()">Submit</a-button> -->
                            <a-button type="primary" html-type="submit" class="button" @click="login()">login</a-button>
                        </a-form-item>
                    </a-form>
                </a-col>
            </a-row>
        </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {get, post}  from "@/utils/request"
import { useRouter } from 'vue-router'

const router = useRouter();

const getbaidu = async () => {
  try{
    const res = await get("/light/baseMolecular?demo=false")
    console.log("请求成功",res)
  }catch(error){
    console.log('请求失败',error)
  }
}

const login = async () => {
  try{
    const res = await post("/auth0/token",{
      username: formState.username,
      password: formState.password
    })
    console.log("请求成功",res)
    router.push('/projects');
  }catch(error){
    console.log('请求失败',error)
  }
}

interface FormState {
    username: string
    password: string
    remember: boolean
}
const test = ref()
const resets = ()=>{
  console.log(test)
  console.log(test.value)
  test.value.resetFields()
}

const formState = reactive < FormState > ({
    username: '',
    password: '',
    remember: true
})
const onFinish = (values: any) => {
    console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}
</script>

<style scoped>
.login-container {
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, rgb(130, 121, 121),rgb(41, 11, 11));
}
.login {
    position: fixed;
    height: 400px;
    width: 640px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgb(195, 184, 184);
    border-radius: 10px;
}

.row {
    height: 100%;
}

.col01 {
    background-color: aliceblue;
    /* display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%; */
}

#left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60%;
}

#left .logo {
    height: 80px;
}

h3,
p {
    text-align: center;
}

.col02 {
    background-color: white;
    /* display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%; */
}

.right {
    padding-top: 15%;
    margin-right: 80px;
}

h2 {
    /* text-align: left; */
    font-size: 24px;
    padding-left: 100px;
    padding-bottom: 20px;
}

.input-name {
  border-radius: unset;
  border-width: 1px;
  border-bottom-style: solid;
}
.button {
    width: 234px
}
</style>
