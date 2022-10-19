<template>
  <div class="header-menu">
    <ul class="header-menu__items">
      <li v-for="(item, i) in routeList" :key="i" :class="item.subLinks ? 'has-submenu' : ''">
        <router-link :to="item.link">{{ item.title }}</router-link>
        <div v-if="item.subLinks" class="submenu">
          <ul class="submenu__items">
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
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.header-menu {
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

.header-menu__items > li {
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

.has-submenu > a:after {
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

.has-submenu {
  padding-right: 15px;
  display: inline-block;
}

.header-menu__items a {
  transition: 0.4s;

  &:hover {
    color: #ffd600;
  }

  &:active {
    color: #ffa200;
  }
}

.has-submenu > a:hover {
  &:after {
    border-bottom: 3px solid #ffd600;
    border-right: 3px solid #ffd600;
  }
}

.submenu {
  padding-top: 20px;
}

.header-menu .submenu__items {
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
}

.submenu__items li {
  display: block;
  margin-right: 0;
  @media (min-width: 992px) {
    padding-bottom: 8px;
  }
}

.submenu__items li a {
  color: rgba(255, 255, 255, 0.7);

  @media (min-width: 992px) {
    color: white;
  }
}

.has-submenu:hover .submenu__items {
  display: flex;
  flex-direction: column;
}
</style>
