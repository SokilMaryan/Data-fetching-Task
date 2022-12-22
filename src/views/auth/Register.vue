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

        <el-form-item label="Password" prop="password">
          <el-input v-model="formModel.password" type="password" placeholder="some password" />
        </el-form-item>

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

      register(formModel)
        .then(() => router.push({ name: $routeNames.login }))
        .finally(() => (loading.value = false))
    }
  })
}
</script>
