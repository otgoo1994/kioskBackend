<template>
    <div>
        <a v-if="topBtn" @click="goTop" class="to-top color-bg" style="display: inline;"><i class="fas fa-caret-up"></i></a>
        {{button}}
    </div>
</template>
<script>
export default {
    name: 'ScrollTop',
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy: function () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    data() {
        return {
            topBtn: false
        }
    },
    methods: {
        handleScroll() {
            document.documentElement.scrollTop > 50 ? this.topBtn = true : this.topBtn = false;
        },
        goTop() {
            this.intervalId = setInterval(() => {
                if (window.pageYOffset === 0) {
                    clearInterval(this.intervalId)
                }
                window.scroll(0, window.pageYOffset - 100)
            }, 20)
        }
    }

}
</script>