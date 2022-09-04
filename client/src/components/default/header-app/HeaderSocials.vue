<template>
  <div class="header__btn">
    <a
      href="#"
      class="login_wrapper"
      v-if="isHeaderCanClose"
      @click="hiddenHeaderToggle"
    >
      <mdicon name="arrow-up-thick" class="preheader-soc" />
    </a>
    <div class="border" v-if="isHeaderCanClose"></div>
    <a
      href="#"
      class="vk__wrapper preheader-soc"
      :class="isHeaderTransparent ? 'white' : ''"
    >
      <svg
        width="20"
        height="12"
        viewBox="0 0 20 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.8021 8.41176C17.8021 8.41176 19.4191 10.0878 19.8191
          10.8634C19.8301 10.8802 19.8351 10.8928 19.8371 10.9001C20.0001 11.1866 20.0401
          11.4112 19.9601 11.5771C19.8251 11.851 19.3681 11.9885 19.2131
          12C19.2131 12 16.4351 12 16.3551 12C16.1561 12
          15.7421 11.9454 15.2381 11.5802C14.8531 11.2979 14.4701 10.833 14.0991
          10.3785C13.5451 9.70369 13.0661 9.11807 12.5811
          9.11807C12.5191 9.11807 12.4591 9.12856 12.4011 9.14956C12.0341 9.2713 11.5681
          9.82019 11.5681 11.2821C11.5681 11.7397
          11.2241 12 10.9831 12C10.9831 12 9.7351 12 9.6741 12C9.2281 12 6.9061 11.8363 4.8471
          9.55781C2.32409 6.76824 0.0580901
          1.17229 0.0360901 1.12297C-0.10491 0.760889 0.19109 0.563583 0.511091
          0.563583H3.39709C3.78409 0.563583 3.91009 0.809166
          3.99809 1.02956C4.10009 1.28249 4.4781 2.29421 5.0981 3.43082C6.1021
          5.28004 6.7191 6.03254 7.2121 6.03254C7.3051 6.03254
          7.3931 6.0084 7.4761 5.95907C8.1201 5.58755 8.0001 3.17369 7.9701 2.67623C7.9701
          2.57967 7.9691 1.59839 7.6391
          1.12402C7.4031 0.783978 7.0011 0.65174 6.7581 0.603463C6.8231 0.50481 6.9611
          0.353682 7.1381 0.264474C7.5791 0.0335839
          8.3761 0 9.1671 0H9.6061C10.4641 0.012594 10.6861 0.0703165 10.9981 0.153227C11.6261
          0.310652 11.6381 0.7378 11.5831
          2.19241C11.5671 2.60801 11.5501 3.07609 11.5501 3.62708C11.5501 3.74462 11.5451
          3.87581 11.5451 4.0091C11.5261 4.75529
          11.5011 5.59594 12.0031 5.94123C12.0671 5.98321 12.1421 6.0063 12.2201
          6.0063C12.3941 6.0063 12.9151 6.0063 14.3281
          3.46126C14.9481 2.33724 15.4281 1.01172 15.4611 0.912017C15.4891 0.856393 15.5731
          0.700017 15.6751 0.637047C15.7531
          0.586671 15.8571 0.578275 15.9111 0.578275H19.3061C19.6761 0.578275 19.9271 0.637048
          19.9761 0.783978C20.0581 1.02221
          19.9601 1.74952 18.4101 3.94927C18.1491 4.31555 17.9201 4.6325 17.7191
          4.90957C16.3141 6.84485 16.3141 6.94245 17.8021
          8.41176Z"
        />
      </svg>
    </a>
    <a
      href="#"
      class="tg_wrapper preheader-soc"
      :class="isHeaderTransparent ? 'white' : ''"
    >
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5592 14.798L19.3482 1.64955C19.5949 0.492186 18.9308
          0.0368287 18.1719 0.321427L1.77902 6.63951C0.659604 7.07589
          0.678578 7.70201 1.58929 7.98661L5.78237 9.29576L15.5156
          3.16741C15.971 2.86384 16.3884 3.0346 16.0469 3.33817L8.173
          10.4531L7.86943 14.779C8.30581 14.779 8.49554 14.5893 8.72322
          14.3616L10.7723 12.3884L15.0223 15.519C15.8002 15.9554 16.3505
          15.7277 16.5592 14.798Z"
        />
      </svg>
    </a>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isHeaderTransparent", "isHeaderCanClose"]),
  },

  methods: {
    hiddenHeaderToggle() {
      this.$emit("SetHeaderToggle");
    },
  },
};
</script>
<style lang="scss" scoped>
.header__btn {
  align-items: center;
  display: flex;
  padding-top: 10px;
  margin-bottom: 100px;

  @media (min-width: 992px) {
    border: none;
    padding-top: 0;
    margin-bottom: 0;
  }

  a {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 980px) {
      background-color: rgba(255, 255, 255, 0.1);

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}

.header__btn .login_wrapper {
  margin-right: 10px;

  @media (min-width: 992px) {
    margin-right: 0;
  }
}

.header__btn .border {
  margin-left: 10px;
  margin-right: 10px;
  height: 70%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  content: "";
}

.vk__wrapper {
  margin-right: 10px;
}
</style>
