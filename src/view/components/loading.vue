<template>
  <div id="init-loading" class="customLoading" v-if="loading">
    <div class="cube-folding">
      <span class="leaf1"></span>
      <span class="leaf2"></span>
      <span class="leaf3"></span>
      <span class="leaf4"></span>
    </div>
  </div>
</template>
<script>
import loading from '@/assets/loading'

export default {
  name: 'Loading',
  subscriptions: {
    loading: loading.loading$$
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
<style>
#init-loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.customLoading .cube-folding {
  width: 50px;
  height: 50px;
  display: inline-table;
  transform: rotate(45deg);
  font-size: 0;
}

.customLoading .cube-folding span {
  position: relative;
  width: 25px;
  height: 25px;
  transform: scale(1.1);
  display: inline-block;
}

.customLoading .cube-folding span::before {
  content: '';
  background-color: #4c9bff;
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 25px;
  height: 25px;
  -moz-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
  animation: folding 2.5s infinite linear both;
}

.customLoading .cube-folding .leaf2 {
  transform: rotateZ(90deg) scale(1.1);
}

.customLoading .cube-folding .leaf2::before {
  animation-delay: 0.3s;
  background-color: #338dff;
}

.customLoading .cube-folding .leaf3 {
  transform: rotateZ(270deg) scale(1.1);
}

.customLoading .cube-folding .leaf3::before {
  animation-delay: 0.9s;
  background-color: #338dff;
}

.customLoading .cube-folding .leaf4 {
  transform: rotateZ(180deg) scale(1.1);
}

.customLoading .cube-folding .leaf4::before {
  animation-delay: 0.6s;
  background-color: #197fff;
}

@keyframes folding {
  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>

