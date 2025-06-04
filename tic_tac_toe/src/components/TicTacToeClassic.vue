<template>
  <div class="tictactoe-container">
    <!-- Player Turn / Game Status -->
    <div class="status">
      <span v-if="!winner && !isDraw">
        {{ currentPlayerName }}'s Turn ({{ currentPlayerSymbol }})
      </span>
      <span v-else-if="winner">
        <span :style="{ color: accentColor }">{{ winner }}</span> Wins!
      </span>
      <span v-else-if="isDraw">
        <span style="color: #222222">It's a Draw!</span>
      </span>
    </div>
    <!-- Game Grid -->
    <div class="grid">
      <button
        v-for="(cell, idx) in cells"
        :key="idx"
        class="cell"
        :disabled="!!cell || winner || isDraw"
        @click="handleCellClick(idx)"
        :aria-label="getCellAria(idx)"
      >
        <span :class="{'player-x': cell === 'X', 'player-o': cell === 'O'}">{{ cell }}</span>
      </button>
    </div>
    <button class="reset-btn" @click="resetGame">
      Reset Game
    </button>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
import { ref, computed } from "vue";

const accentColor = "#0074D9";

const cells = ref(Array(9).fill(""));
const currentPlayer = ref("X");
const winner = ref(null);
const isDraw = ref(false);

// PUBLIC_INTERFACE
function handleCellClick(idx) {
  if (!cells.value[idx] && !winner.value && !isDraw.value) {
    cells.value[idx] = currentPlayer.value;
    if (checkWin(currentPlayer.value)) {
      winner.value = currentPlayer.value;
    } else if (cells.value.every(cell => cell)) {
      isDraw.value = true;
    } else {
      currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
    }
  }
}

// PUBLIC_INTERFACE
function checkWin(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6] // diags
  ];
  return wins.some((line) =>
    line.every(idx => cells.value[idx] === player)
  );
}

// PUBLIC_INTERFACE
function resetGame() {
  cells.value = Array(9).fill("");
  currentPlayer.value = "X";
  winner.value = null;
  isDraw.value = false;
}

// PUBLIC_INTERFACE
const currentPlayerName = computed(() => currentPlayer.value === "X" ? "Player 1" : "Player 2");
const currentPlayerSymbol = computed(() => currentPlayer.value);

// PUBLIC_INTERFACE
function getCellAria(idx) {
  return cells.value[idx]
    ? `Cell ${idx + 1}: ${cells.value[idx]}`
    : `Cell ${idx + 1}: empty, ${currentPlayerName.value}'s turn`;
}
</script>

<style scoped>
.tictactoe-container {
  max-width: 340px;
  margin: 64px auto 0 auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(34,34,34,0.06);
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.status {
  font-size: 1.2rem;
  margin-bottom: 24px;
  font-weight: 500;
  color: #222222;
  letter-spacing: 0.01em;
  min-height: 34px;
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 64px);
  grid-template-rows: repeat(3, 64px);
  gap: 8px;
  margin-bottom: 24px;
}
.cell {
  width: 64px;
  height: 64px;
  background: #fff;
  color: #222;
  font-size: 2.2rem;
  border: 2px solid #222222;
  border-radius: 12px;
  text-align: center;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border 0.15s, background 0.15s;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.cell:disabled {
  cursor: not-allowed;
  background: #f4f6fa;
  color: #b9bec7;
  border-color: #dedede;
}
.cell:not(:disabled):hover {
  border-color: #0074D9;
  background: #f0f8ff;
}

.player-x {
  color: #0074D9;
  font-weight: bold;
  transition: color 0.2s;
}
.player-o {
  color: #222222;
  font-weight: bold;
  transition: color 0.2s;
}
.reset-btn {
  margin-top: 12px;
  appearance: none;
  background: #0074D9;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  padding: 10px 24px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 16px rgba(0,116,217,0.11);
  transition: background 0.2s, box-shadow 0.2s;
}
.reset-btn:active {
  background: #0061b6;
}
.reset-btn:hover {
  background: #005fa3;
}
</style>
