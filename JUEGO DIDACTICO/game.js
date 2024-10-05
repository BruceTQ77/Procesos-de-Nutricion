// game.js
window.onload = function () {
    const startButton = document.getElementById('start-game');
    const gameBoard = document.getElementById('game-board');
    const instructions = document.getElementById('instructions');
    const foodItem = document.getElementById('food-item');
    const stages = document.querySelectorAll('.stage');
    const resultSection = document.getElementById('result');
    const playAgainButton = document.getElementById('play-again');

    let currentStageIndex = 0;

    // Iniciar el juego
    startButton.addEventListener('click', function () {
        instructions.style.display = 'none';
        gameBoard.style.display = 'block';
    });

    // Hacer el alimento arrastrable
    foodItem.addEventListener('dragstart', dragStart);
    stages.forEach(stage => stage.addEventListener('dragover', dragOver));
    stages.forEach(stage => stage.addEventListener('drop', dropFood));

    function dragStart(e) {
        e.dataTransfer.setData('text', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dropFood(e) {
        e.preventDefault();
        const draggedFoodId = e.dataTransfer.getData('text');
        const draggedFood = document.getElementById(draggedFoodId);

        // Verifica si el alimento está en la etapa correcta
        if (e.target === stages[currentStageIndex]) {
            e.target.appendChild(draggedFood);
            currentStageIndex++;

            if (currentStageIndex === stages.length) {
                setTimeout(showResult, 500); // Mostrar el resultado después de completar todas las etapas
            }
        } else {
            alert("¡Debes seguir el orden del sistema digestivo!");
        }
    }

    // Mostrar la pantalla de resultado
    function showResult() {
        gameBoard.style.display = 'none';
        resultSection.style.display = 'block';
    }

    // Reiniciar el juego
    playAgainButton.addEventListener('click', function () {
        resultSection.style.display = 'none';
        instructions.style.display = 'block';
        currentStageIndex = 0;
        stages.forEach(stage => stage.innerHTML = stage.id); // Limpiar las etapas
        document.getElementById('food-container').appendChild(foodItem); // Devolver el alimento al contenedor inicial
    });
};
