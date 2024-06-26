<template>
  <div class="product_desc mt-7">
    <div class="title mb-6">Description</div>
    <div class="desc" v-if="adDetails.description">
      {{ adDetails.description }}
    </div>
    <div class="desc" v-else>
      Lorem ipsum dolor sit amet consectetur. Curabitur facilisis in vulputate
      cras id urna. Et eu sed mauris amet tortor sit erat et amet. Sapien urna
      augue ipsum elementum malesuada egestas egestas. Sed aliquam scelerisque
      elementum accumsan suspendisse ipsum sit. Convallis lacus ullamcorper dis
      viverra. Sapien et eu sed gravida risus fermentum velit dignissim et. Nunc
      egestas ultrices varius id fames elementum faucibus cursus.
      <br /><br />
      Viverra mi viverra aliquet quis urna dignissim lectus adipiscing massa.
      Sed id senectus nulla id montes est quam vel. At vitae mattis sapien
      fermentum volutpat. Adipiscing porta nunc elementum laoreet eu odio quis
      eget. Non urna auctor sed felis euismod quam. Sapien velit natoque nec
      tortor. Sed dui eros euismod vulputate sed. Volutpat pretium elit nisl
      amet nunc mauris consectetur sed eget. Gravida sed commodo laoreet
      scelerisque molestie porttitor quis integer. Blandit lorem faucibus
      pellentesque ultricies fusce. .
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["adDetails"]);
</script>
