<template>
<div class="posts-screen">
    <div v-if="ArticleList.length > 0" class="posts-screen__container">
      <div class="posts-screen__inner">
        <div class="posts-screen-wrapper">
          <div class="posts-header">
            <div class="header-left">
              <span>Наш блог</span>
              <h2 class="header-title">Последние статьи</h2>
            </div>
            <div class="header-right">
              <a href="#" class="posts-btn">
                <span>Все статьи</span>
                <svg
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
              </a>
            </div>
          </div>
          <div class="posts-wrapper">
            <div v-for="article in ArticleList" :key="article.title" class="post-wrapper">
              <div class="post-left">
                <img class="post-img" :src="article.image_url" alt="">
              </div>
              <div class="post-right">
                <div class="post-right__wrapper">
                  <div class="post-preheader">
                    <p class="post-data">{{article.date}}</p>
                    <p class="post-time">{{article.time_read}}</p>
                  </div>
                  <h3 class="post-title">{{article.title}}</h3>
                  <p class="post-description">
                    {{article.description}}
                  </p>
                  <a :href="article.btn_url" class="post-btn">
                    <span>Читать далее</span>
                    <svg
                        width="36" height="24"
                        viewBox="0 0 36 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M35.0607 13.0607C35.6464 12.4749 35.6464
                        11.5251 35.0607 10.9393L25.5147
                        1.3934C24.9289 0.807609 23.9792 0.807609 23.3934
                        1.3934C22.8076 1.97918 22.8076
                        2.92893 23.3934 3.51472L31.8787 12L23.3934
                        20.4853C22.8076 21.0711 22.8076
                        22.0208 23.3934 22.6066C23.9792 23.1924 24.9289
                        23.1924 25.5147 22.6066L35.0607
                        13.0607ZM9.64773e-08 13.5L34 13.5L34 10.5L-9.64773e-08
                        10.5L9.64773e-08 13.5Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'PostsApp',

  data() {
    return {
      ArticleList: [
        {
          image_url: require('@/assets/img/post-img.png'),
          date: 'Июнь, 2021',
          time_read: '10 мин',
          title: 'Супер название статьи',
          description: 'В нашем сервисе ты сможешь раскрашивать пиксельные арты, создавать свои собственные работы, оценивать картины других участников.',
          btn_url: '#',
        },
        {
          image_url: require('@/assets/img/post-img.png'),
          date: 'Август, 2021',
          time_read: '15 мин',
          title: 'Пупер название статьи',
          description: 'В нашем сервисе ты сможешь раскрашивать пиксельные арты, создавать свои собственные работы, оценивать картины других участников.',
          btn_url: '#',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  .posts-screen {

      &__container {
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        padding: 10px 10px;
        padding-bottom: 50px;

        @media (min-width: 765px) {
          padding: 60px 10px;
          margin-bottom: 0;
        }

        .posts-screen__inner {
          position: relative;

          .posts-header {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 50px;
            flex-direction: column;

            @media (min-width: 400px) {
              flex-direction: row;
              justify-content: space-between;
            }

            .header-left {
              display: flex;
              flex-direction: column;
              align-items: center;

              @media (min-width: 400px) {
                width: 50%;
                align-items: flex-start;
              }

              & span {
                font-family: Roboto, Arial, sans-serif;
                font-size: 16px;
                color: #646464;
                margin: 0;
                text-transform: uppercase;
                font-weight: 400;

                @media (min-width: 525px) {
                  font-size: 18px;
                }
              }

              .header-title {
                  font-family: Agency FB Cyrillic, Roboto, Arial, sans-serif;
                  font-size: 30px;
                  color: #020202;
                  margin: 0;
                  margin-top: 10px;
                  text-align: left;

                  @media (min-width: 525px) {
                    font-size: 40px;
                  }
              }
            }

            .header-right {
              display: flex;
              align-items: center;
              margin-top: 15px;

              @media (min-width: 400px) {
                width: 50%;
                justify-content: flex-end;
              }

              .posts-btn {
                padding: 10px 15px;
                border-radius: 7px;
                color: #fff;
                font-family: Roboto, Arial, sans-serif;
                text-transform: uppercase;
                background: linear-gradient(to left, #0900C8 0%, #BD00C6 100%) no-repeat;
                align-items: center;
                justify-content: center;
                display: flex;

                @media (min-width: 525px) {
                  padding: 17px 30px;
                }

                &:hover {
                background: linear-gradient(to right, #0900C8 0%, #BD00C6 100%) no-repeat;
                }

                &:active {
                background: #BD00C6;
                }

                & svg {
                  fill: #fff;
                  width: 21px;
                  margin-left: 8px;
                }
              }
            }
        }

        .posts-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;

          @media (min-width: 880px) {
            flex-direction: row;
            align-items: flex-start;
          }

          .post-wrapper:first-child {
            margin-bottom: 40px;

            @media (min-width: 880px) {
             margin-right: 40px;
            }
          }
          .post-wrapper {
            display: flex;
            justify-content: space-between;

            .post-left {

              .post-img {
                width: 200px;
                height: 364px;
                object-fit: cover;
                display: none;

                @media (min-width: 440px) {
                  display: block;
                }

                @media (min-width: 576px) {
                  width: 288px;
                }

                @media (min-width: 880px) {
                  width: 200px;
                }

                @media (min-width: 1200px) {
                  width: 288px;
                }
              }
            }

            .post-right {
              background-color: #FBF9F9;
              border-radius: 10px;
              max-height: 364px;
              max-width: 580px;
              padding: 20px;
              display: table;

              @media (min-width: 440px) {
                  padding: 0 35px 0 35px;
              }

              .post-right__wrapper {
                display: table-cell;
                vertical-align: middle;

                .post-preheader {
                  display: flex;

                  .post-data,
                  .post-time {
                    font-family: Roboto, Arial, sans-serif;
                    font-size: 14px;
                    font-weight: bold;
                    color: rgba(73, 73, 73, 0.6);
                    margin-bottom: 0;
                  }

                  .post-data:after {
                    content: "";
                    border-radius: 50%;
                    background-color: #F8EB3A;
                    height: 4px;
                    width: 4px;
                    display: inline-block;
                    margin-left: 5px;
                    margin-right: 5px;
                    margin-bottom: 2px;
                  }
                }

                .post-title {
                  font-size: 20px;
                  font-family: Roboto, Arial, sans-serif;
                  font-weight: 600;
                  margin: 0;
                  margin-bottom: 15px;
                  margin-top: 20px;
                  text-align: left;
                }

                .post-description {
                  font-family: Roboto, Arial, sans-serif;
                  font-weight: 500;
                  margin: 0;
                  margin-bottom: 30px;
                  color: black;
                  font-size: 14px;

                  @media (min-width: 450px) {
                    font-size: 16px;
                  }
                }

                .post-btn {
                  color: #BD00C6;
                  font-family: Roboto, Arial, sans-serif;
                  text-transform: uppercase;
                  font-size: 14px;
                  display: flex;
                  align-items: center;

                  & svg {
                  fill: #BD00C6;
                  width: 21px;
                  margin-left: 8px;
                  }

                  &:hover {
                    color: #6B00C7;

                    & svg {
                      fill: #6B00C7;
                    }
                  }
                }

              }
            }
          }
        }
      }
    }
  }
</style>
