<svg
    id="cityIcon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 38 38">
    <defs>
        <style>
            .city-gradient-1{fill:url(#city-gradient-1);}
            .city-gradient-2{fill:url(#city-gradient-2);}
            .city-gradient-3{fill:url(#city-gradient-3);}
        </style>
        <linearGradient id="city-gradient-1" x1="2" y1="22.87" x2="22.83" y2="22.87" gradientUnits="userSpaceOnUse">
            <stop id="city-gradient-1-1" offset="0"/>
            <stop id="city-gradient-1-2" offset=".65"/>
        </linearGradient>
        <linearGradient id="city-gradient-2" x1="15.17" y1="19.49" x2="36" y2="19.49" gradientUnits="userSpaceOnUse">
            <stop id="city-gradient-2-1" offset="0"/>
            <stop id="city-gradient-2-2" offset="1"/>
        </linearGradient>
        <linearGradient id="city-gradient-3" x1="19" y1="14.14" x2="19" y2="36" gradientUnits="userSpaceOnUse">
            <stop id="city-gradient-3-1" offset="0"/>
            <stop id="city-gradient-3-2" offset="1"/>
        </linearGradient>
    </defs>
    <path class="icon--border" d="M20.83,36H4c-1.1,0-2-.9-2-2V11.74c0-1.42,1.44-2.39,2.76-1.85l16.83,6.87c.75,.31,1.24,1.04,1.24,1.85v15.39c0,1.1-.9,2-2,2Z"/>
    <path class="city-gradient-1" d="M20.83,36H4c-1.1,0-2-.9-2-2V11.74c0-1.42,1.44-2.39,2.76-1.85l16.83,6.87c.75,.31,1.24,1.04,1.24,1.85v15.39c0,1.1-.9,2-2,2Z"/>
    <path class="icon--border" d="M34,36H17.17c-1.1,0-2-.9-2-2V4.98c0-1.42,1.44-2.39,2.76-1.85l16.83,6.87c.75,.31,1.24,1.04,1.24,1.85v22.15c0,1.1-.9,2-2,2Z"/>
    <path class="city-gradient-2" d="M34,36H17.17c-1.1,0-2-.9-2-2V4.98c0-1.42,1.44-2.39,2.76-1.85l16.83,6.87c.75,.31,1.24,1.04,1.24,1.85v22.15c0,1.1-.9,2-2,2Z"/>
    <path class="city-gradient-3" d="M22.83,34v-15.39c0-.81-.49-1.54-1.24-1.85l-6.42-2.62v19.86c0,1.1,.9,2,2,2h3.67c1.1,0,2-.9,2-2Z"/>
</svg>

<style lang="scss">
    .icon--border {
        stroke: var(--clr-nav-city-border);
    }

    $icon-gradients: 1, 2, 3;

    #city-gradient {
        @each $gradient in $icon-gradients {
            &-#{$gradient} {
                &-1 {
                    stop-color: var(--clr-nav-city-#{$gradient}-1);
                }

                &-2 {
                    stop-color: var(--clr-nav-city-#{$gradient}-2);
                }
            }
        }
    }


    
    /* === A11Y =============================== */
    @media (forced-colors: active) {
        .icon--border {
            stroke: LinkText;
        }

        #city-gradient {
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