class Field {
    constructor(height, width, percentage = 0.1) {
      this.height = height;
      this.width = width;
      this.percentage = percentage;
      this.field = this.generateField();
      this.location = this.getStartingLocation();
      this.playing = false;
    }
  
    generateField() {
      const field = [];
      for (let i = 0; i < this.height; i++) {
        const row = [];
        for (let j = 0; j < this.width; j++) {
          const cell = Math.random() < this.percentage ? 'O' : '░';
          row.push(cell);
        }
        field.push(row);
      }
      field[0][0] = '░';
      field[this.height - 1][this.width - 1] = '^';
      return field;
    }
  
    getStartingLocation() {
      return [0, 0];
    }
  
    print() {
      const gameTable = document.getElementById('gameTable');
      gameTable.innerHTML = '';
      for (let i = 0; i < this.height; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < this.width; j++) {
          const cell = document.createElement('td');
          if (i === this.location[0] && j === this.location[1]) {
            cell.textContent = '*';
            cell.classList.add('current');
          } else {
            cell.textContent = this.field[i][j];
            if (this.field[i][j] === '░') {
              cell.classList.add('start');
            } else if (this.field[i][j] === 'O') {
              cell.classList.add('hole');
            } else if (this.field[i][j] === '^') {
              cell.classList.add('hat');
            }
          }
          row.appendChild(cell);
        }
        gameTable.appendChild(row);
      }
    }
  
    move(direction) {
      switch (direction) {
        case 'up':
          if (this.location[0] > 0) {
            this.location[0]--;
          }
          break;
        case 'down':
          if (this.location[0] < this.height - 1) {
            this.location[0]++;
          }
          break;
        case 'left':
          if (this.location[1] > 0) {
            this.location[1]--;
          }
          break;
        case 'right':
          if (this.location[1] < this.width - 1) {
            this.location[1]++;
          }
          break;
      }
      const cellValue = this.field[this.location[0]][this.location[1]];
      if (cellValue === 'O') {
        this.playing = false;
        document.getElementById('message').textContent = 'Game over! You fell in a hole.';
      } else if (cellValue === '^') {
        this.playing = false;
        document.getElementById('message').textContent = 'Congratulations, you found your hat!';
      }
    }
  
    playGame() {
      this.playing = true;
      this.print();
      document.addEventListener('keydown', (event) => {
        const direction = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          ArrowLeft: 'left',
          ArrowRight: 'right'
        }[event.key];
        if (direction) {
          this.move(direction);
          if (this.playing) {
            this.print();
          }
        }
      });
    }
  }
  
  const myField = new Field(10, 10, 0.2);
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', () => {
    myField.playGame();
    });
    
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
    myField.field = myField.generateField();
    myField.location = myField.getStartingLocation();
    myField.playing = false;
    document.getElementById('message').textContent = '';
    myField.print();
    });