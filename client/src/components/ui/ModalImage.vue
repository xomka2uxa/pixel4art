<template>
  <div class="popup__wrapper">
    <div class="popup__up">
      <span class="popup__title">Загрузка эскиза</span>
      <button class="btn__close" @click="$emit('close')">X</button>
    </div>
    <div class="popup__inner">
      <div class="current-size">
        <div class="inner__title">
          <span>Выбор изображения для эскиза</span>
        </div>
        <div class="inner__content">
          <div class="attention __grey">
            Изображение будет помещено на слой под основным слоем для рисования с прозрачностью в 30%. Формат — JPG,
            WEBP, или PNG.
          </div>
          <icon-btn isRound isBlack title="Загрузить картинку" class="icon__wrapper">
            <mdicon name="file-image-plus" />
          </icon-btn>
        </div>
      </div>
      <div class="buttons">
        <div class="col-50">
          <button @click="$emit('close')" class="test-btn btn-modal">ЗАГРУЗИТЬ</button>
        </div>
        <div class="col-50">
          <button class="test-btn btn-modal" @click="$emit('close')">ОТМЕНА</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IconBtn from "@/components/ui/IconBtn.vue";

export default {
  emits: {
    close: null,
  },

  components: {
    IconBtn,
  },

  computed: {
    ...mapGetters(["getSizePaint", "currentSizesPaint", "defaultSizesPaint"]),
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup__wrapper {
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
  width: 500px;
  position: relative;

  @include md-down {
    width: 90vw;
    height: 90vh;
  }
}

.popup__up {
  background: linear-gradient(to right, $color1-gold-gradient, $color2-gold-gradient);
  display: flex;
  align-items: center;
  padding: 5px 13px;
  justify-content: space-between;

  .popup__title {
    width: 100%;
    text-align: center;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: white;
  }

  .btn__close {
    color: #4f4f4f;
    font-weight: 600;
  }
}

.popup__inner {
  padding: 20px 13px 13px 13px;

  .feature__title {
    margin-right: 5px;
    text-transform: uppercase;
    margin-bottom: 10px;

    @include md-down {
      width: 40%;
    }

    @include sm-down {
      width: 50%;
    }

    @include xss-down {
      width: 100%;
    }
  }

  .current-size {
    border: 1px solid $light-grey;
    position: relative;
    margin-bottom: 25px;

    .inner__title {
      position: absolute;
      top: -7px;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      text-transform: uppercase;
      color: $light-grey;
      font-weight: 500;

      & span {
        background: #fff;
        padding: 2px 6px;
      }
    }

    .inner__content {
      padding: 19px 12px 16px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      color: $black;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.current-size {
  .feature__title {
    margin-bottom: 0;
    width: auto;
  }
}

.attention {
  margin-top: 10px;
  color: #fc5454;
  font-weight: 300;
  font-size: 10px;

  @include md-down {
    display: flex;
    align-items: center;
  }

  &.__grey {
    color: $dark-grey;
    font-size: 12px;

    @include md-down {
      margin-left: 0;
    }
  }
}

.icon__wrapper {
  display: flex;
  justify-content: center;
}

.buttons {
  margin-bottom: 5px;
  display: flex;

  @include md-down {
    position: absolute;
    right: 13px;
    left: 13px;
    bottom: 18px;
    margin-bottom: 0;
  }

  @include sm-down {
    flex-direction: column;
  }

  .col-50 {
    @include sm-down {
      width: 100%;
    }
  }

  .col-50:first-child {
    margin-right: 10px;

    @include sm-down {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  .col-50:last-child {
    margin-left: 10px;

    @include sm-down {
      margin-left: 0;
    }
  }

  .btn-modal {
    background-color: $bg-header;
    width: 100%;
    border: none;
    margin-right: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    opacity: 1;
    transition: background-color 0.35s, opacity 0.35s;

    &:hover {
      border: none;
      background-color: $black;
    }

    &[disabled] {
      opacity: 0.5;

      &:hover {
        border: none;
        background-color: $bg-header;
        color: #fff;
      }
    }
  }
}
</style>
