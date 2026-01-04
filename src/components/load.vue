<template>
    <div class="loading-g">
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
.loading-g{
    width: 100px;
    height: 2px;
    position: relative;
    overflow: hidden;
    div{
        height: 2px;
        width: 100px;
        background-color: #000;
        animation: loading 1s infinite linear;
        position: absolute;
        top: 0;
    }
}

@keyframes loading {
    0% {
        margin-left: -100px;
    }
    
    100% {
        margin-left: 200px;
    }
}
</style>