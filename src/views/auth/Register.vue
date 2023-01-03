<template>
  <div class="max-w-[500px] m-auto">
    <el-card v-loading="loading">
      <template #header>
        <p class="font-semibold text-xl">Create new account</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="formModel"
        @submit.prevent="submit"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="formModel.email" type="email" placeholder="someone@email.com" />
        </el-form-item>

        <el-form
          ref="formRef"
          :model="formModel"
          status-icon
          :rules="formRules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="formModel.password"
              type="password" autocomplete="off"
              placeholder="Сreate a password"
            />
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input
              v-model="formModel.checkPass"
              type="password"
              autocomplete="off"
              placeholder="Repeat the password"
            />
          </el-form-item>
        </el-form>

        <div class="flex justify-around">
          <el-button native-type="submit" type="primary">
            Sign Up
          </el-button>

          <router-link to="/login">
            <el-button type="warning">
              Use an Existing Account
            </el-button>
          </router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const { $routeNames } = useGlobalProperties()
const { register } = useAuthStore()

const formRef = useElFormRef()

const formModel = useElFormModel({
  email: '',
  password: '',
  checkPass: ''
})
const loading = ref(false)

const validatePass = (formRules: any, value: any, callback: any) => {
  console.log(value.length)
  if (value.length < 6) {
    callback(new Error('Password must be longer'))
  } else {
    if (formModel.password !== '') {
      if (!formRef.value) return
      formRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

const validateCheckPass = (formRules: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== formModel.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: { validator: validatePass, trigger: 'change' },
  checkPass: [{ validator: validateCheckPass, trigger: 'change' }]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      loading.value = true

      register(formModel)
        .then(() => router.push({ name: $routeNames.login }))
        .finally(() => (loading.value = false))
    }
  })
}
</script>
