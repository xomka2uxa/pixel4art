<template>
  <div class="header-nav">
    <ul class="nav_ul">
      <li
        v-for="(item, i) in routeList"
        :key="i"
        :class="item.subLinks ? 'nested_link' : ''"
      >
        <router-link :to="item.link">{{ item.title }}</router-link>
        <div v-if="item.subLinks" class="nested_nav__wrapper">
          <ul class="nested_nav">
            <li v-for="(subItem, i) in item.subLinks" :key="i">
              <router-link :to="subItem.link">{{ subItem.title }}</router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeList: [
        {
          title: "Главная",
          link: "/",
          subLinks: null,
        },
        {
          title: "Свободное рисование",
          link: "/free-paint",
          // subLinks: [
          //   {
          //     title: "Возможности",
          //     link: "#",
          //   },
          //   {
          //     title: "Обучение",
          //     link: "#",
          //   },
          //   {
          //     title: "Тарифы",
          //     link: "#",
          //   },
          //   {
          //     title: "Контакты",
          //     link: "#",
          //   },
          // ],
        },
        // {
        //   title: "Рисование",
        //   link: "#",
        //   subLinks: null,
        // },
        // {
        //   title: "Раскраски",
        //   link: "#",
        //   subLinks: [
        //     {
        //       title: "Фиксированная палитра",
        //       link: "#",
        //     },
        //     {
        //       title: "Свободная палитра",
        //       link: "/free-paint",
        //     },
        //     {
        //       title: "Каталог раскрасок",
        //       link: "#",
        //     },
        //   ],
        // },
        {
          title: "Блог",
          link: "#",
          subLinks: null,
        },
        // {
        //   title: "Активности",
        //   link: "#",
        //   subLinks: [
        //     {
        //       title: "Приключения",
        //       link: "#",
        //     },
        //     {
        //       title: "Конкурсы",
        //       link: "#",
        //     },
        //     {
        //       title: "Мини-игры",
        //       link: "#",
        //     },
        //     {
        //       title: "Сражения",
        //       link: "#",
        //     },
        //   ],
        // },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.header-nav {
  color: white;

  @media (min-width: 992px) {
    flex-grow: 1;
  }

  @media (max-width: 980px) {
    margin-top: 50px;
  }

  & a {
    color: white;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    text-transform: uppercase;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 992px) {
      flex-direction: row;
      align-items: stretch;
    }
  }

  & > ul {
    line-height: 60px;
  }
  li {
    margin-right: 20px;
    display: inline-block;
    position: relative;
    padding-top: 5px;

    @media (min-width: 992px) {
      flex-direction: row;
      padding-top: 0;
      padding-bottom: 0;
      border: none;
    }
    &:last-child {
      margin-right: 0;
    }

    a {
      padding: 5px;
    }
  }
}

.nav_ul > li {
  padding-bottom: 5px;
  border-bottom: solid 1px rgba(255, 255, 255, 0.22);
  display: block;
  width: 100%;

  @media (min-width: 992px) {
    border: none;
    padding-bottom: 0;
    display: inline-block;
    width: auto;
  }
}

.nested_link > a:after {
  content: "";
  border-bottom: 3px solid white;
  border-right: 3px solid white;
  transform: rotate(45deg);
  width: 6px;
  height: 6px;
  display: none;
  border-radius: 2px;
  position: absolute;
  top: 12px;
  right: 0;

  @media (min-width: 992px) {
    top: 8px;
    display: inline-block;
  }
}

.nested_link {
  padding-right: 15px;
  display: inline-block;
}
.nav_ul a {
  transition: 0.4s;
  &:hover {
    color: #ffd600;
  }

  &:active {
    color: #ffa200;
  }
}

.nested_link > a:hover {
  &:after {
    border-bottom: 3px solid #ffd600;
    border-right: 3px solid #ffd600;
  }
}

.header-nav .nested_nav {
  display: block;
  white-space: nowrap;
  padding: 8px;
  padding-top: 0;
  padding-left: 15px;

  @media (min-width: 992px) {
    position: absolute;
    padding: 8px;
    left: 1px;
    top: 20px;
    display: none;
    background-color: black;
  }

  &__wrapper {
    padding-top: 20px;
  }
}

.nested_nav li {
  display: block;
  margin-right: 0;
  @media (min-width: 992px) {
    padding-bottom: 8px;
  }
}

.nested_nav li a {
  color: rgba(255, 255, 255, 0.7);

  @media (min-width: 992px) {
    color: white;
  }
}

.nested_link:hover .nested_nav {
  display: flex;
  flex-direction: column;
}
</style>
