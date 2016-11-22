<template>
    <div id="app">
        <div class="mdl-layout mdl-js-layout">
            <header class="mdl-layout__header">
                <div class="mdl-layout-icon"></div>
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout__title">Web-Radio</span>
                    <div class="mdl-layout-spacer"></div>
                    <nav class="mdl-navigation">
                        <router-link to="/streams" class="mdl-navigation__link">Streams</router-link>
                        <router-link to="/mystreams" class="mdl-navigation__link">My Streams</router-link>
                    </nav>
                </div>
            </header>
            <div class="mdl-layout__drawer">
                <span class="mdl-layout__title">Menü</span>
                <nav class="mdl-navigation">
                    <router-link to="/streams" class="mdl-navigation__link">Streams</router-link>
                    <router-link to="/mystreams" class="mdl-navigation__link">My Streams</router-link>
                </nav>
            </div>
            <main class="mdl-layout__content" style="flex: 1 0 auto;">
                <div class="mdl-grid">
                    <div class="mdl-layout-spacer"></div>
                    <div class="mdl-cell mdl-cell--8-col">
                        <router-view></router-view>
                    </div>
                    <div class="mdl-layout-spacer"></div>
                </div>
            </main>
        </div>
        <player></player>
    </div>
</template>
