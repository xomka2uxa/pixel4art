<template #content>
  <div class="popup__wrapper">
    <div class="popup__up">
      <button class="btn__close" @click="$emit('close')">X</button>
    </div>
    <div class="popup__inner">
      <div class="question">
        <div class="inner__content">
          <div class="feature__title">
            <p>Вы уверены, что хотите очистить холст?</p>
          </div>
        </div>
      </div>
      <div class="buttons flex">
        <div class="col-50">
          <button @click="makeCanvasClean" class="test-btn btn-modal">OK</button>
        </div>
        <div class="col-50">
          <button class="test-btn btn-modal" @click="$emit('close')">ОТМЕНА</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: {
    close: null,
  },

  data() {
    return {
      sizePaint: "",
    };
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },

    makeCanvasClean() {
      this.$store.dispatch("setCanvasClean", true);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup__wrapper {
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
  width: 500px;
  position: relative;

  @include md-down {
    width: 90vw;
  }
}

.popup__up {
  border-radius: 15px 15px 0 0;
  background: $light-grey;
  display: flex;
  align-items: center;
  padding: 5px 13px;
  min-height: 20px;
  justify-content: flex-end;

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
    text-align: center;
  }

  .question {
    position: relative;
    margin-bottom: 25px;

    .inner__content {
      padding: 19px 12px 16px;
      display: flex;
      justify-content: center;
      color: $black;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 600;
      font-size: 14px;

      .feature__value {
        margin-left: 5px;
      }
    }
  }
}

.question {
  .feature__title {
    margin-bottom: 0;
    width: auto;
  }
}

.buttons {
  margin-bottom: 5px;

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
