<template>
    <div class="logo">
        <div class="imglogo">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 456 128">
                <circle cx="64" cy="64" r="40" stroke-width="3" fill="transparent" />
                <line x1="74" y1="74" x2="104" y2="104" style="stroke-width:3;" />
                <path d="M148 24L148 68Q148 104 180 104Q212 104 212 68L212 24" style="fill:transparent;stroke-width:3;">
                </path>
                <path d="M276 24L306 24M291 24L291 104M276 104L306 104" style="fill:transparent;stroke-width:3;"></path>
                <path d="M384 24L384 104M424 26L384 68M424 102L384 68" style="fill:transparent;stroke-width:3;"></path>
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    height: 100px;
    color: #000;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding-top: calc(30vh - 140px);

    >* {
        max-width: 100%;
        max-height: 100%;
    }

    svg {
        stroke: currentColor;
        height: 100%;
        width: 100%;
    }
}
</style>