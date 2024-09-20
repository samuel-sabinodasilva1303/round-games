const apiUrl = 'https://sevn-pleno-esportes.deno.dev/';
let currentRound = 1;
let totalRounds = 0;

async function fetchRounds() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    totalRounds = data.length;
    updateRoundDisplay(data[currentRound - 1]);
  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
  }
}

function updateRoundDisplay(roundData) {
    const roundElement = document.getElementById('currentRound');
    roundElement.textContent = `Rodada ${roundData.round}`;
  
    const gamesElement = document.getElementById('games');
    gamesElement.innerHTML = '';
  
    roundData.games.forEach((game) => {
      const gameItem = document.createElement('div');
      gameItem.classList.add('game-item');
  
      const teamHome = createTeamElement(game.team_home_name, game.team_home_id, game.team_home_score, 'home');
      
      const teamAway = createTeamElement(game.team_away_name, game.team_away_id, game.team_away_score, 'away');
  
      const versusElement = document.createElement('span');
      versusElement.classList.add('versus');
      versusElement.textContent = 'X';
  
      gameItem.appendChild(teamHome);
      gameItem.appendChild(versusElement);
      gameItem.appendChild(teamAway);
  
      gamesElement.appendChild(gameItem);
    });
  
    updateButtons();
  }
  
  function createTeamElement(teamName, teamId, score, side) {
    const teamElement = document.createElement('div');
    teamElement.classList.add('team');
  
    if (side === 'home') {
      const teamLogo = document.createElement('img');
      teamLogo.src = `./img/${teamId}.svg`;
      teamLogo.alt = `${teamName} logo`;
  
      const teamNameElement = document.createElement('span');
      teamNameElement.classList.add('team-name');
      teamNameElement.textContent = teamName;
  
      const scoreElement = document.createElement('span');
      scoreElement.classList.add('score');
      scoreElement.textContent = score;
  
      teamElement.appendChild(teamLogo);
      teamElement.appendChild(teamNameElement);
      teamElement.appendChild(scoreElement);
    } else {
      const scoreElement = document.createElement('span');
      scoreElement.classList.add('score');
      scoreElement.textContent = score;
  
      const teamNameElement = document.createElement('span');
      teamNameElement.classList.add('team-name');
      teamNameElement.textContent = teamName;
  
      const teamLogo = document.createElement('img');
      teamLogo.src = `./img/${teamId}.svg`;
      teamLogo.alt = `${teamName} logo`;
  
      teamElement.appendChild(scoreElement);
      teamElement.appendChild(teamNameElement);
      teamElement.appendChild(teamLogo);
    }
  
    return teamElement;
  }
  

function updateButtons() {
  document.getElementById('prevRound').disabled = currentRound === 1;
  document.getElementById('nextRound').disabled = currentRound === totalRounds;
}

document.getElementById('nextRound').addEventListener('click', () => {
  if (currentRound < totalRounds) {
    currentRound++;
    fetchRounds();
  }
});

document.getElementById('prevRound').addEventListener('click', () => {
  if (currentRound > 1) {
    currentRound--;
    fetchRounds();
  }
});

fetchRounds();
