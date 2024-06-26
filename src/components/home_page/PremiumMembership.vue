<template>
  <div class="prem_membership">
    <v-container class="px-md-16 px-5" fluid style="margin-top: 50px">
      <v-card>
        <v-row class="align-center">
          <v-col cols="12" sm="6">
            <div class="title">Get Premium Membership</div>
            <div class="desc">
              Lorem ipsum dolor sit amet consectetur. Lobortis facilisi purus et
              libero ac accumsan.
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="text-start text-sm-end mt-7 mt-sm-0">
            <ActionButton
              text="Get Membership"
              bgColor="#111111"
              textColor="white"
              @clicked="$router.push({ name: 'choosePlan' })"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import ActionButton from "../global/ActionButton.vue";
</script>
