<template>
<transition name="slide">
  <div class="modal" v-show="showModal">
    <div class="mask"></div>
    <div class="modal-dialog">
      <div class="modal-header">
        <span>{{title}}</span>
        <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
      </div>
      <div class="modal-body">
        <slog name="body"></slog>
      </div>
      <div class="modal-footer">
        <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
        <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
        <div class="btn-group" v-if="btnType==3">
          <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modalType: {
      type: String,
      default: 'form'
    },
    title: String,
    btnType: String,
    sureText: {
      type:String,
      default: '确定'
    },
    cancelText: {
      type:String,
      default:'取消'
    },
    showModal:Boolean
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/config";
@import "../assets/scss/mixin";
@import "../assets/scss/modal";
</style>
