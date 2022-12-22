<template>
  <div class="max-w-[500px] m-auto">
    <el-card v-loading="loading">
      <template #header>
        <p class="font-semibold text-xl">Login</p>
      </template>

      <el-form ref="formRef" label-position="top" :rules="formRules" :model="formModel" @submit.prevent="submit">
        <el-form-item label="Email" prop="email">
          <el-input v-model="formModel.email" placeholder="your@email.com" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="formModel.password" type="password" placeholder="your password" />
        </el-form-item>

        <div class="flex justify-around">
          <el-button native-type="submit" type="success">
            Go to your account
          </el-button>

          <router-link to="/register">
            <el-button type="warning">
              Create a new account
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
const { login } = useAuthStore()

const formRef = useElFormRef()

const formModel = useElFormModel({
  email: '',
  password: ''
})
const loading = ref(false)

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      loading.value = true

      login(formModel)
        .then(() => {
          router.push({ name: $routeNames.contacts })
        })
        .finally(() => (loading.value = false))
    }
  })
}
</script>
