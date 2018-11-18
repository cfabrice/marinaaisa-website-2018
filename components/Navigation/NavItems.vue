<template>
  <ul class="nav-list">
    <li class="nav-item"><nuxt-link :to="localePath('index')" class="ani"><span>{{ $t('home') }}</span></nuxt-link></li>
    <li class="nav-item"><nuxt-link :to="localePath('blog')" class="ani"><span>{{ $t('posts') }}</span></nuxt-link></li>
  </ul>
</template>