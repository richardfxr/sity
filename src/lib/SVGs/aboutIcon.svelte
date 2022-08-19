<svg 
    id="aboutIcon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 38 38">
    <defs>
        <style>
            .about-gradient-1{fill:url(#about-gradient-1);}
            .about-gradient-2{fill:url(#about-gradient-2);}
            .about-gradient-3{fill:url(#about-gradient-3);}
            .about-gradient-4{fill:url(#about-gradient-4);}
        </style>
        <linearGradient id="about-gradient-1" x1="16" y1="27.47" x2="36" y2="27.47" gradientUnits="userSpaceOnUse">
            <stop id="about-gradient-1-1" offset="0"/>
            <stop id="about-gradient-1-2" offset="1"/>
        </linearGradient>
        <linearGradient id="about-gradient-2" x1="6.43" y1="7.58" x2="17.58" y2="7.58" gradientUnits="userSpaceOnUse">
            <stop id="about-gradient-2-1" offset="0"/>
            <stop id="about-gradient-2-2" offset="1"/>
        </linearGradient>
        <linearGradient id="about-gradient-3" x1="2" y1="26" x2="22" y2="26" gradientUnits="userSpaceOnUse">
            <stop id="about-gradient-3-1" offset="0"/>
            <stop id="about-gradient-3-2" offset=".65"/>
        </linearGradient>
        <linearGradient id="about-gradient-4" x1="19" y1="19.18" x2="19" y2="36" gradientUnits="userSpaceOnUse">
            <stop id="about-gradient-4-1" offset="0"/>
            <stop id="about-gradient-4-2" offset="1"/>
        </linearGradient>
    </defs>
    <path class="icon--border" d="M22.71,18.95h6.58c3.7,0,6.71,3.01,6.71,6.71v8.34c0,1.1-.9,2-2,2H18c-1.1,0-2-.9-2-2v-8.34c0-3.7,3.01-6.71,6.71-6.71Z"/>
    <path class="about-gradient-1" d="M22.71,18.95h6.58c3.7,0,6.71,3.01,6.71,6.71v8.34c0,1.1-.9,2-2,2H18c-1.1,0-2-.9-2-2v-8.34c0-3.7,3.01-6.71,6.71-6.71Z"/>
    <circle class="icon--border" cx="12" cy="7.58" r="5.58"/>
    <circle class="icon--border" cx="26" cy="10.53" r="5.58"/>
    <circle class="about-gradient-2" cx="12" cy="7.58" r="5.58"/>
    <circle class="about-gradient-1" cx="26" cy="10.53" r="5.58"/>
    <path class="icon--border" d="M8.71,16h6.58c3.7,0,6.71,3.01,6.71,6.71v11.29c0,1.1-.9,2-2,2H4c-1.1,0-2-.9-2-2v-11.29c0-3.7,3.01-6.71,6.71-6.71Z"/>
    <path class="about-gradient-3" d="M8.71,16h6.58c3.7,0,6.71,3.01,6.71,6.71v11.29c0,1.1-.9,2-2,2H4c-1.1,0-2-.9-2-2v-11.29c0-3.7,3.01-6.71,6.71-6.71Z"/>
    <path class="about-gradient-4" d="M22,34v-11.29c0-1.3-.37-2.5-1.01-3.53-2.88,.76-5,3.37-5,6.48v8.34c0,1.1,.9,2,2,2h2.01c1.1,0,2-.9,2-2Z"/>
</svg>

<style lang="scss">
    .icon--border {
        stroke: var(--clr-nav-about-border);
    }

    $icon-gradients: 1, 2, 3, 4;

    #about-gradient {
        @each $gradient in $icon-gradients {
            &-#{$gradient} {
                &-1 {
                    stop-color: var(--clr-nav-about-#{$gradient}-1);
                }

                &-2 {
                    stop-color: var(--clr-nav-about-#{$gradient}-2);
                }
            }
        }
    }



    /* === A11Y =============================== */
    @media (forced-colors: active) {
        .icon--border {
            stroke: LinkText;
        }

        #about-gradient {
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