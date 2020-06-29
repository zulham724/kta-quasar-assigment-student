<template>
  <div>
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Hasil anda</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
export default {
  props: {
    assigment: null
  },
  data(){
    return {
      score: 0
    }
  },
  mounted(){
    console.log(this.assigment)
    this.assigment.question_lists.forEach(item=>{
      item.answer.value != null ? this.score += 1: null
    })
    console.log(this.score, this.assigment.question_lists.length)
  }
}
</script>

<style>

</style>
