<template>
  <div>
    <a-table class="project-table" :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.dataIndex === 'projectname'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>
        <a-button type="primary" @click="refresh"> Reload </a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import type { TableColumnsType, TableDataType } from 'ant-design-vue'
import { customRequest } from '@/utils/request'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'

const router = useRouter()
const columns: TableColumnsType = [
  { title: 'project Name', width: 100, dataIndex: 'projectname', key: '0', fixed: 'left' },
  { title: 'customer Name', width: 100, dataIndex: 'customername', key: '0', fixed: 'left' },
  { title: 'PM', dataIndex: 'PM', key: '2', width: 150 },
  { title: 'serviceType', dataIndex: 'serviceType', key: '3', width: 150 },
  { title: 'Create Time', dataIndex: 'CreateTime', key: '4', width: 150 },
  { title: 'Due Time', dataIndex: 'DueTime', key: '5', width: 150 }
]

interface DataItem {
  projectname: string
  customername: string
  PM: string
  serviceType: string
  CreateTime: DataItem
  DueTime: DataItem
}

// const data: DataItem[] = []
const data = ref<DataItem[]>([])
const refresh = async () => {
  try {
    const res: any = await customRequest('/api/projects/?limit=50&conventional=true', 'get')
    console.log('请求成功', res)
    for (const item of res.results) {
      data.value.push({ projectname: item.name, customername: item.customer, PM: item.pm, serviceType: item.service_type, CreateTime: item.created_time, DueTime: item.due_date })
    }
    console.log('请求成功1', data.value)
    data.value = Array.from(new Map(data.value.map(item => [item.projectname, item])).values())
    console.log('请求成功2', data.value)
  } catch (error) {
    console.log('请求失败', error)
  }
}

onMounted(() => {
  refresh()
})
</script>

<style>
div.ant-table-container {
  height: calc(100vh - 120px);
  width: 100%;
}
.ant-table-body {
  max-height: unset !important;
  height: 100%;
  /* bottom: 30px !important;  */
}
ul.ant-pagination {
  position: fixed;
  bottom: 0px;
  height: 40px;
  text-align: center;
  width: 100%;
  padding-right: 100px;
}
</style>
