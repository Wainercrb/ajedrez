<template>
  <b-container>
    <b-row>
      <span>Player Turn {{ game.currentPlayer }}</span>
    </b-row>
    <b-row>
      <span>Player top {{ game.topPlayerMovements }}</span>
    </b-row>
    <b-row>
      <span>Player bottom {{ game.bottomPlayerMovements }}</span>
    </b-row>
    <b-row>
      <b-col>
        <table id="tablero" ref="table">
          <tr v-for="(x, xIndex) in game.boxes" v-bind:key="xIndex">
            <td
              v-for="(y, yIndex) in x.row"
              v-bind:key="yIndex"
              v-on:click="selectBox(y)"
              :class="`${y.x},${y.y}`"
            >
              x{{ y.x }}, y{{ y.y }}
              {{ y.name }}
              <img
                v-if="y.name"
                :src="require(`../static/icons/${y.name}.png`)"
                alt
              />
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="~/assets/scripts/pages/ajedrez.ts"></script>
<style src="~/assets/styles/pages/ajedrez.css" lang="css"></style>
