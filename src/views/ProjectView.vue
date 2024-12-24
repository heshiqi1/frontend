<template>
  <div >
      <a-table class="project-table" :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>action</a>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import {get,post,put,del} from '@/utils/request';
const columns: TableColumnsType = [
  { title: 'project Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'customer Name', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'PM', dataIndex: 'address', key: '1', width: 150 },
  { title: 'serviceType', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Create Time', dataIndex: 'address', key: '3', width: 150 },
];

interface DataItem {
  projectname: string;
  customername: string;
  PM: string;
  serviceType: string;
  CreateTime: DataItem;
  DueTime: DataItem;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const refresh = () => {
  get('/project').then((res) => {
    data.splice(0, data.length);
    res.data.forEach((item) => {
      data.push(item);
    });
  });
};
</script>

<style>
div.ant-table-container{
  height: calc(100vh - 120px);
  width: 100%;
  
}
.ant-table-body {
  max-height: unset !important;
  height: 100%;
  /* bottom: 30px !important;  */
} 
ul.ant-pagination{
  position: fixed ;
  bottom: 0px;
  height: 40px;
  text-align: center;
  width: 100%;
  padding-right: 100px;
}
</style>
