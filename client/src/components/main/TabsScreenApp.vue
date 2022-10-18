<template>
  <div class="tabs-screen">
    <div class="tabs-screen__container">
      <div class="tabs-screen__inner">
          <div class="tabs-card">
            <div class="img_left">
              <svg class="tabs-svg" width="533" height="533" viewBox="0 0 533 533"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="266.5" cy="266.5" r="265" stroke="#F7F7F7"
                stroke-opacity="0.9" stroke-width="3"/>
              </svg>
              <img class="tabs-img" src="@/assets/img/raketa1.png" alt="">
            </div>
            <div class="tabs__wrapper">
              <div class="tabs_buttons">
                <div class="progress-bar">
                  <div :style="'width:' + sliderProgressWidth +';' " class="empty-bar"></div>
                  <div class="full-bar"></div>
                </div>
                <div class="tab-arrows">
                  <svg
                    @click="HandleSliderBtn(-1)"
                    :class="['arrow-previus', sliderIdx <= 0 ? 'enabled' : '']"
                    width="36" height="24"
                    viewBox="0 0 36 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M35.0607 13.0607C35.6464 12.4749 35.6464
                    11.5251 35.0607 10.9393L25.5147
                    1.3934C24.9289 0.807609 23.9792 0.807609 23.3934 1.3934C22.8076 1.97918 22.8076
                    2.92893 23.3934 3.51472L31.8787 12L23.3934 20.4853C22.8076 21.0711 22.8076
                    22.0208 23.3934 22.6066C23.9792 23.1924 24.9289 23.1924 25.5147 22.6066L35.0607
                    13.0607ZM9.64773e-08 13.5L34 13.5L34 10.5L-9.64773e-08 10.5L9.64773e-08 13.5Z"/>
                  </svg>
                  <svg
                    @click="HandleSliderBtn(1)"
                    :class="['arrow-next', sliderIdx >= 3 ? 'enabled' : '']"
                    width="36" height="24"
                    viewBox="0 0 36 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M35.0607 13.0607C35.6464 12.4749 35.6464
                    11.5251 35.0607 10.9393L25.5147
                    1.3934C24.9289 0.807609 23.9792 0.807609 23.3934 1.3934C22.8076 1.97918 22.8076
                    2.92893 23.3934 3.51472L31.8787 12L23.3934 20.4853C22.8076 21.0711 22.8076
                    22.0208 23.3934 22.6066C23.9792 23.1924 24.9289 23.1924 25.5147 22.6066L35.0607
                    13.0607ZM9.64773e-08 13.5L34 13.5L34 10.5L-9.64773e-08 10.5L9.64773e-08 13.5Z"/>
                  </svg>
                </div>
              </div>
              <div :class="['tab__wrapper slide-0', sliderIdx === 0 ? 'current' : '']">
                <div class="tab-content">
                  <div class="tab-header">
                    <span class="tab-number">01</span>
                    <h3 class="tab-name">О нашем проекте</h3>
                  </div>
                  <p class="tab-description first">
                    В нашем сервисе ты сможешь раскрашивать пиксельные арты,
                    создавать свои собственные работы,
                    оценивать картины других участников, отправляться в увлекательные приключения
                    и обрести новых друзей.
                  </p>
                  <p class="tab-description">
                    В нашем сервисе ты сможешь раскрашивать пиксельные арты,
                    создавать свои собственные работы, оценивать картины.
                  </p>
                  <p class="tab-description">
                    В нашем сервисе ты сможешь раскрашивать пиксельные арты,
                    создавать свои собственные работы,
                    оценивать картины других участников, отправляться в увлекательные приключения
                    и обрести новых друзей.
                  </p>
                </div>
                <span class="tab-bigNumber">01</span>
              </div>
              <div :class="['tab__wrapper slide-1', sliderIdx === 1 ? 'current' : '']">
                <div class="tab-content">
                  <div class="tab-header">
                    <span class="tab-number">02</span>
                    <h3 class="tab-name">Возможности Pix4Art</h3>
                  </div>
                  <div class="opportunety_wrapper">
                    <div class="opportunety_header">
                      <div class="icon-wrapper">
                        <img class=" tab-icon paint-icon" alt="рисование"
                        src="@/assets/img/pencil.png">
                      </div>
                      <h4>Свободное рисование</h4>
                    </div>
                    <p class="tab-description">
                      Имеется спорная точка зрения, гласящая примерно следующее:
                      базовые сценарии поведения пользователей.
                    </p>
                  </div>
                  <div class="opportunety_wrapper">
                    <div class="opportunety_header">
                      <div class="icon-wrapper">
                        <img class=" tab-icon paint-icon" alt="раскраски"
                        src="@/assets/img/palette.png">
                    </div>
                    <h4>Раскраски в ограниченной палитре</h4>
                  </div>
                  <p class="tab-description">
                    Приятно, граждане, наблюдать, как представители современных
                    социальных резервов, инициированные исключительно синтетически,
                    функционально разнесены на независимые элементы.
                  </p>
                  </div>
                </div>
                <span class="tab-bigNumber">02</span>
              </div>
              <div :class="['tab__wrapper slide-2', sliderIdx === 2 ? 'current' : '']">
                <div class="tab-content">
                  <div class="tab-header">
                    <span class="tab-number">03</span>
                    <h3 class="tab-name">Возможности Pix4Art</h3>
                  </div>
                  <div class="opportunety_wrapper">
                    <div class="opportunety_header">
                      <div class="icon-wrapper">
                        <img class="tab-icon paint-icon"
                        alt="раскраски" src="@/assets/img/brush.png">
                      </div>
                      <h4>Раскраски в своей палитре</h4>
                    </div>
                    <p class="tab-description">
                      Высокий уровень вовлечения представителей целевой аудитории
                      является четким доказательством простого факта.
                    </p>
                  </div>
                  <div class="opportunety_wrapper">
                    <div class="opportunety_header">
                      <div class="icon-wrapper">
                        <img class="tab-icon paint-icon"
                        alt="раскраски" src="@/assets/img/cloud.png">
                      </div>
                      <h4>Скачай и властвуй</h4>
                    </div>
                    <p class="tab-description">
                      Высокий уровень вовлечения представителей целевой аудитории
                      является четким доказательством простого факта.
                    </p>
                  </div>
                </div>
                <span class="tab-bigNumber">03</span>
              </div>
              <div :class="['tab__wrapper slide-3', sliderIdx === 3 ? 'current' : '']">
                <div class="tab-content">
                  <div class="tab-header">
                    <span class="tab-number">04</span>
                    <h3 class="tab-name">Будующие возможности:</h3>
                  </div>
                  <div class="ul-future_wrapper">
                    <ul class="ul-future">
                    <li>
                      <h4>Приключения</h4>
                      <p class="tab-description">
                        Кампании-игры, которые будут выходить
                      </p>
                    </li>
                    <li>
                      <h4>Бои между участниками</h4>
                      <p class="tab-description">
                        Вызывайте друзей и незнакомцев, чтобы выяснить кто покруче.
                      </p>
                    </li>
                    <li>
                      <h4>Конкурсы</h4>
                      <p class="tab-description">
                        Конкурсы, где можно выиграть крутые призы. Вызов каждый день!
                      </p>
                    </li>
                    </ul>
                    <ul class="ul-future">
                      <li>
                        <h4>Магазин</h4>
                        <p class="tab-description">
                          Закажите мерч с вашим сбрственным пиксель-артом или офф-лайн
                          раскраски
                        </p>
                      </li>
                      <li>
                        <h4>Курс по пиксель-арту</h4>
                        <p class="tab-description">
                          Наш всеобъемлюдий обучающий курс. Обрети новую профессию
                          или прокачайся в своем хобби.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <span class="tab-bigNumber">04</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabsScreenApp',

  data() {
    return {
      sliderIdx: 0,
      sliderProgressWidth: '75%',
    };
  },

  methods: {
    HandleSliderBtn(dir) {
      const direction = dir > 0;
      if (direction && this.sliderIdx < 3) {
        this.sliderIdx += 1;
      }

      if (!direction && this.sliderIdx > 0) {
        this.sliderIdx -= 1;
      }

      this.sliderProgressWidth = (75 - 0.25 * this.sliderIdx * 100) + '%';
      console.log(this.sliderProgressWidth);
    },

  },
};
</script>

<style lang="scss" scoped>
  .tabs-screen {
      margin-bottom: 50px;

    &__container {
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      padding: 60px 10px;

      .tabs-screen__inner {
        position: relative;
        min-height: 600px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        @media (min-width: 992px) {
          justify-content: flex-end;
        }

        .tabs-card {
          display: flex;
          position: relative;
          justify-content: flex-end;
          border-radius: 10px;
          box-shadow: 0 0 20px 10px rgba(73, 67, 67, 0.3);
          padding: 40px 40px 30px 0;
          width: 100%;

          .img_left {
            display: none;

            @media (min-width: 768px) {
              left: -220px;
              display: block;
              position: absolute;
              top: -5px;
              height: 600px;
              z-index: 1;
            }

            @media (min-width: 875px) {
              top: -30px;
            }

            @media (min-width: 992px) {
              position: absolute;
              left: -220px;
              top: -15px;
            }

            .tabs-svg {
              position: absolute;
              display: none;
              top: 5px;
              left: -45px;
              z-index: -1;

              @media (min-width: 1090px) {
              display: block;;
              }
            }
          }

          @media (min-width: 768px) {
            margin-left: 0;
          }

          @media (min-width: 992px) {
            margin-left: 210px;
          }

          .tabs__wrapper {
            width: 100%;
            overflow: hidden;
            display: flex;
            position: relative;
            padding-left: 30px;

            @media (min-width: 768px) {
              width: 65%;
            }

            .tabs_buttons {
              position: absolute;
              top: 80px;
              left: 30px;
              width: 100%;
              z-index: 1;

              @media (min-width: 600px) {
                top: 55px;
              }

              .full-bar {
                height: 8px;
                background: linear-gradient(to left, #0900C8 0%, #BD00C6 100%) no-repeat;
                width: 100%;
                position: absolute;
              }

              .empty-bar {
                height: 8px;
                position: absolute;
                top: 0;
                right: 0;
                background-color: #EFEFEF;
                z-index: 2;
                transition: width .25s;
              }

              .tab-arrows {
                margin-top: 30px;
                display: flex;
                justify-content: space-between;
                padding-right: 30px;

                @media (min-width: 450px) {
                  display: block;
                  padding-right: 0;
                }

                .arrow-previus {
                  fill: #BD00C6;
                  transform: rotate(180deg);
                  margin-right: 35px;
                  cursor: pointer;

                  &:hover {
                      fill: #a300ab;
                    }

                  &.enabled {
                    fill: #EFEFEF;
                  }
                }

                .arrow-next {
                  fill: #4C00C8;
                  cursor: pointer;

                  &:hover {
                    fill: #3e00a2;
                  }

                  &.enabled {
                    fill: #EFEFEF;
                  }
                }
              }
            }

            .tab__wrapper {
              position: relative;
              min-width: 100%;
              background: white;
              transition: transform .25s;

              .tab-content {
                margin-bottom: 70px;

                @media (min-width: 992px) {
                  margin-bottom: 20px;
                }

                @media (min-width: 1100px) {
                  margin-bottom: 80px;
                }

                .tab-header {
                  display: flex;
                  align-items: center;
                  margin-bottom: 100px;

                  .tab-number {
                    font-family: Agency FB Cyrillic, Roboto, Arial, sans-serif;
                    color: #020202;
                    font-size: 35px;
                    font-weight: 800;
                    letter-spacing: 5px;
                  }

                  .tab-name {
                    font-family: Agency FB Cyrillic, Roboto, Arial, sans-serif;
                    padding-left: 10px;
                    font-size: 20px;
                    color: #020202;
                    margin: 0;
                    text-transform: uppercase;

                    @media (min-width: 400px) {
                      font-size: 25px;
                    }
                  }
                }

                .opportunety_wrapper {
                  margin-bottom: 40px;

                  .opportunety_header {
                    display: block;
                    align-items: center;
                    margin-bottom: 10px;

                    @media (min-width: 450px) {
                      display: flex;
                    }

                    .icon-wrapper {
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                      background:
                        linear-gradient(#fff 0 0) padding-box,
                        linear-gradient(to left, #0900C8, #BD00C6) border-box;
                      border: 3px solid transparent;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin: auto;

                      @media (min-width: 450px) {
                        margin: 0;
                        margin-right: 10px;
                      }

                      .tab-icon {
                        width: 18px;
                        height: 18px;
                        margin: 0 auto;
                      }
                    }
                  }

                  h4 {
                    font-size: 20px;
                    font-family: Roboto, Arial, sans-serif;
                    font-weight: 500;
                    margin: 0;
                    margin-top: 10px;
                    text-align: center;

                    @media (min-width: 450px) {
                      margin-top: 0;
                      text-align: left;
                    }
                  }

                  & + .tab-description {
                    width: 80%;
                  }
                }

                .tab-description {
                  font-family: Roboto, Arial, sans-serif;
                  font-weight: 500;
                  color: black;
                  font-size: 14px;

                  @media (min-width: 450px) {
                    font-size: 16px;
                  }
                }

                .tab-description.first {
                  margin-top: 120px;

                  @media (min-width: 600px) {
                    margin-top: 0;
                  }
                }

                .ul-future_wrapper {

                  @media (min-width: 500px) {
                    display: flex;
                  }

                  .ul-future {
                    width: 100%;

                    @media (min-width: 500px) {
                      width: 50%;
                    }

                    &:first-child {
                      @media (min-width: 500px) {
                        margin-right: 20px;
                      }
                    }
                    li {
                      position: relative;
                      margin-bottom: 30px;

                      @media (min-width: 500px) {
                        margin-bottom: 20px;
                      }

                      h4 {
                        padding-left: 35px;
                        margin: 0;
                        margin-bottom: 5px;
                        font-size: 20px;
                        font-family: Roboto, Arial, sans-serif;
                        font-weight: 500;

                        &:before {
                          content: "";
                          position: absolute;
                          width: 25px;
                          height: 3px;
                          background-color: #F8EB3A;
                          top: 0.5em;
                          left: 0;
                        }
                      }
                    }
                  }
                }
              }

              .tab-bigNumber {
                font-family: Agency FB Cyrillic, Roboto, Arial, sans-serif;
                color: #EFEFEF;
                font-size: 70px;
                font-weight: 800;
                letter-spacing: 5px;
                line-height: 1em;
                position: absolute;
                bottom: 0;
                right: 0;

                @media (min-width: 450px) {
                  font-size: 80px;
                }
              }

              &.slide-0 {

                &.current {
                  transform: translateX(0%);
                }
              }
              &.slide-1 {

                &.current {
                  transform: translateX(-100%);
                }
              }

              &.slide-2 {

                &.current {
                  transform: translateX(-200%);
                }
              }

              &.slide-3 {

                &.current {
                  transform: translateX(-300%);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
