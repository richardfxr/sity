<svg
    id="homeIcon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 38 38">
    <defs>
        <style>
            .home-gradient-1{fill:url(#home-gradient-1);}
            .home-gradient-2{fill:url(#home-gradient-2);}
            .home-gradient-3{fill:url(#home-gradient-3);}
        </style>
        <linearGradient id="home-gradient-1" x1="19" y1="7.16" x2="19" y2="36" gradientUnits="userSpaceOnUse">
            <stop id="home-gradient-1-1" offset=".42"/>
            <stop id="home-gradient-1-2" offset="1"/>
        </linearGradient>
        <linearGradient id="home-gradient-2" x1="2" y1="16.14" x2="36" y2="16.14" gradientUnits="userSpaceOnUse">
            <stop id="home-gradient-2-1" offset="0"/>
            <stop id="home-gradient-2-2" offset="1"/>
        </linearGradient>
        <linearGradient id="home-gradient-3" x1="6.63" y1="17.78" x2="31.37" y2="17.78" gradientUnits="userSpaceOnUse">
            <stop id="home-gradient-3-1" offset="0"/>
            <stop id="home-gradient-3-2" offset="1"/>
        </linearGradient>
    </defs>
    <path class="icon--border" d="M8.63,36h3.4c.76,0,1.49-.25,2.1-.7l3.66-2.75c.71-.53,1.69-.53,2.4,0l3.66,2.75c.61,.45,1.34,.7,2.1,.7h3.4c1.1,0,2-.9,2-2V16.93c0-.63-.3-1.22-.8-1.6l-10.37-7.77c-.71-.53-1.69-.53-2.4,0L7.43,15.33c-.5,.38-.8,.97-.8,1.6v17.07c0,1.1,.9,2,2,2Z"/>
    <path class="home-gradient-1" d="M8.63,36h3.4c.76,0,1.49-.25,2.1-.7l3.66-2.75c.71-.53,1.69-.53,2.4,0l3.66,2.75c.61,.45,1.34,.7,2.1,.7h3.4c1.1,0,2-.9,2-2V16.93c0-.63-.3-1.22-.8-1.6l-10.37-7.77c-.71-.53-1.69-.53-2.4,0L7.43,15.33c-.5,.38-.8,.97-.8,1.6v17.07c0,1.1,.9,2,2,2Z"/>
    <path class="icon--border" d="M33.44,29.95l-13.26-9.94c-.7-.52-1.65-.52-2.35,0L4.56,29.95c-1.05,.79-2.56,.04-2.56-1.28V15.24c0-.63,.3-1.22,.8-1.6L17.8,2.4c.71-.53,1.69-.53,2.4,0l15,11.24c.5,.38,.8,.97,.8,1.6v13.43c0,1.32-1.5,2.07-2.56,1.28Z"/>
    <path class="home-gradient-2" d="M33.44,29.95l-13.26-9.94c-.7-.52-1.65-.52-2.35,0L4.56,29.95c-1.05,.79-2.56,.04-2.56-1.28V15.24c0-.63,.3-1.22,.8-1.6L17.8,2.4c.71-.53,1.69-.53,2.4,0l15,11.24c.5,.38,.8,.97,.8,1.6v13.43c0,1.32-1.5,2.07-2.56,1.28Z"/>
    <path class="home-gradient-3" d="M30.57,15.33l-10.37-7.77c-.71-.53-1.69-.53-2.4,0L7.43,15.33c-.5,.38-.8,.97-.8,1.6v11.47l11.19-8.38c.7-.52,1.65-.52,2.35,0l11.19,8.38v-11.47c0-.63-.3-1.22-.8-1.6Z"/>
</svg>

<style lang="scss">
    .icon--border {
        stroke: var(--clr-nav-home-border);
    }

    $icon-gradients: 1, 2, 3;

    #home-gradient {
        @each $gradient in $icon-gradients {
            &-#{$gradient} {
                &-1 {
                    stop-color: var(--clr-nav-home-#{$gradient}-1);
                }

                &-2 {
                    stop-color: var(--clr-nav-home-#{$gradient}-2);
                }
            }
        }
    }



    /* === A11Y =============================== */
    @media (forced-colors: active) {
        .icon--border {
            stroke: LinkText;
        }

        #home-gradient {
            @each $gradient in $icon-gradients {
                &-#{$gradient} {
                    &-1, &-2 {
                        stop-color: Canvas;
                    }
                }
            }
        }
    }
</style>