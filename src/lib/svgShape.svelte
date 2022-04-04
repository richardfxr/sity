<script>
    export let shape;
    export let bgClr;
    export let ariaHidden = "false";
    export let dataDepth;

    /**CSS varaible props
     * --bgColor: the fill color of the SVG
     */
</script>


{#if shape === "Carton"}
    <svg aria-hidden={ariaHidden} data-depth={dataDepth} class="svgShape carton" style="--bgClr: {bgClr}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 654.92 690.77"><rect x="82.74" y="61.16" width="489.43" height="568.46" rx="52.55" ry="52.55" transform="translate(186.82 -109.3) rotate(26.29)"/></svg>
{:else if shape === "Cardboard"}
    <svg aria-hidden={ariaHidden} data-depth={dataDepth} class="svgShape cardboard" style="--bgClr: {bgClr}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 562.62 609.7"><rect x="33.8" y="29.13" width="495.02" height="551.44" rx="39.75" ry="39.75" transform="translate(50.19 -39.61) rotate(8.84)"/></svg>
{:else if shape === "Paper"}
    <svg aria-hidden={ariaHidden} data-depth={dataDepth} class="svgShape paper" style="--bgClr: {bgClr}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 611.12 710.09"><path d="M206.77,708.28l386.03-145.14c19.26-7.24,24.6-32.03,9.94-46.48-20.59-20.29-45.79-54.01-66.3-108.57-42.53-113.12,2.49-154.76-36.9-259.51-27.63-73.49-65.05-119.17-84.92-139.89-7.82-8.15-19.74-10.86-30.31-6.88L18.33,139.41c-19.5,7.33-24.67,32.58-9.52,46.88,24.29,22.93,54.87,58.86,72.8,106.54,33.11,88.07-32.58,173.62,15.87,302.46,26.8,71.29,65.9,100.52,85.85,111.35,7.22,3.92,15.77,4.53,23.45,1.64Z"/></svg>
{:else if shape === "Metal"}
    <svg aria-hidden={ariaHidden} data-depth={dataDepth} class="svgShape metal" style="--bgClr: {bgClr}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544.83 626.9"><path d="M544.31,163.48C553.16,92.36,448.9,20.83,311.42,3.71,173.94-13.41,55.31,30.36,46.45,101.48c-.03,.21-.04,.43-.06,.64h-.02L1.38,463.42h0l-1.38,11.11,.93,.12c2.68,67.28,103.1,132.33,233.34,148.55,137.48,17.12,256.11-26.66,264.96-97.77,.56-4.5,.66-9,.34-13.49l41.75-335.29c1.42-4.27,2.42-8.66,2.98-13.16Z"/></svg>
{:else if shape === "Glass"}
    <svg aria-hidden={ariaHidden} data-depth={dataDepth} class="svgShape glass" style="--bgClr: {bgClr}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 564.9 677.29"><path d="M564.29,552.37l-25.52-480.41c.37-4.07,.18-8.08-.64-12.02C526.53,3.98,396.84-16.44,248.47,14.33,100.09,45.11-10.77,115.43,.83,171.39c.82,3.94,2.24,7.7,4.2,11.28l167.67,450.93c8.46,40.79,102.98,55.67,211.12,33.24,108.14-22.43,188.94-73.68,180.48-114.47Z"/></svg>
{:else if shape === "Plastic"}
    <svg aria-hidden={ariaHidden} data-depth={dataDepth} class="svgShape plastic" style="--bgClr: {bgClr}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 668.31 708.38"><path d="M615.28,381.31c5.57-15.18,4.95-31.9-1.01-49.27-6.23-18.16,1.06-38.02,17.55-47.84,15.78-9.4,27.07-21.74,32.64-36.93,24.48-66.7-70.53-162.92-212.21-214.91C310.57-19.63,175.87-7.7,151.4,59c-5.57,15.18-4.95,31.9,1.01,49.27,6.23,18.16-1.06,38.02-17.56,47.84-15.78,9.4-27.07,21.74-32.64,36.93-5.57,15.18-4.95,31.9,1.01,49.27,6.23,18.16-1.06,38.02-17.56,47.84s-27.07,21.74-32.64,36.93c-5.57,15.18-4.95,31.9,1.01,49.27,6.23,18.16-1.06,38.02-17.55,47.84-15.78,9.4-27.07,21.74-32.64,36.93-24.48,66.7,70.53,162.92,212.21,214.91,141.68,51.99,276.37,40.06,300.85-26.64,5.57-15.18,4.95-31.9-1.01-49.27-6.23-18.16,1.06-38.02,17.55-47.84,15.78-9.4,27.07-21.74,32.64-36.93,5.57-15.18,4.95-31.9-1.01-49.27-6.23-18.16,1.06-38.02,17.55-47.84,15.78-9.4,27.07-21.74,32.64-36.93Z"/></svg>
{/if}

<style lang="scss">
    .svgShape {
        transition: fill var(--transition-200) ease-in-out;
        fill: var(--bgClr, var(--clr-100));
    }
</style>