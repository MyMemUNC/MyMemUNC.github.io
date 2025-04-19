const scoreTable = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
const requiredScoreInput = document.getElementById('requiredScore');
let songCount = 1;

function calculateTotalScore() {
    const rows = scoreTable.getElementsByTagName('tr');
    let totalScore = 0;
    let scores = [];

    for (let row of rows) {
        const scoreInput = row.cells[2].getElementsByTagName('input')[0];
        if (scoreInput && scoreInput.value) {
            const score = parseInt(scoreInput.value) || 0;
            totalScore += score;
            scores.push(score);
        }
    }

    const totalScoreElement = document.getElementById('totalScore');
    totalScoreElement.innerText = totalScore;

    // Set the required score for display
    document.getElementById('totalRequiredScore').innerText = requiredScoreInput.value || 0;

    // Highlight if total score meets or exceeds required score
    if ((totalScore >= (requiredScoreInput.value || 0)) && totalScore != 0) {
        totalScoreElement.classList.remove('darken');
        totalScoreElement.classList.add('highlight');
    } else {
        totalScoreElement.classList.remove('highlight');
        totalScoreElement.classList.add('darken');
    }

    // Calculate estimated songs to go
    const averageScoreInput = calculateAverageScore();
    const estimatedSongsElement = document.getElementById('estimatedSongs');
    const requiredScore = parseInt(requiredScoreInput.value) || 0;
    const estimatedSongs = averageScoreInput ? Math.ceil((requiredScore - totalScore) / averageScoreInput) : 0;
    estimatedSongsElement.innerText = estimatedSongs;

    // Log additional details for debugging
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;
    const scoresLeft = Math.max(0, requiredScore - totalScore);

    console.log(`Total Score: ${totalScore}`);
    console.log(`Highest Score: ${highestScore}`);
    console.log(`Lowest Score: ${lowestScore}`);
    console.log(`Average Score: ${averageScoreInput}`);
    console.log(`Scores Left to Reach Required: ${scoresLeft}`);
    console.log(`Estimated Songs Needed: ${estimatedSongs}`);
}

function calculateAverageScore() {
    const rows = scoreTable.getElementsByTagName('tr');
    let totalScore = 0;
    let totalSongs = 0;

    for (let row of rows) {
        const scoreInput = row.cells[2].getElementsByTagName('input')[0];
        if (scoreInput && scoreInput.value) {
            totalScore += parseInt(scoreInput.value) || 0;
            totalSongs++;
        }
    }

    const averageScore = totalSongs > 0 ? (totalScore / totalSongs) : 0;
    console.log(`Calculated Average Score: ${averageScore}`);
    return averageScore;
}

function addNewRow() {
    songCount++;
    const newRow = scoreTable.insertRow();
    newRow.innerHTML = `<td>${songCount}</td>
                        <td><input type="text" placeholder="Enter song name" onchange="checkNewValue()" /></td>
                        <td><input type="number" placeholder="Enter score" onchange="checkNewValue()" /></td>
                        <td>
                            <button class="duplicate-btn" onclick="duplicateRow(this)">+</button>
                            <button class="remove-btn" onclick="removeRow(this)">×</button>
                        </td>`;
    renumberRows();
    console.log(`Added new row. Total rows: ${songCount}`);
}

function checkNewValue() {
    const rows = scoreTable.getElementsByTagName('tr');
    const lastRow = rows[rows.length - 1];
    const scoreInput = lastRow.cells[2].getElementsByTagName('input')[0];

    if (scoreInput.value) {
        addNewRow();
    }
    
    calculateTotalScore();
}

function removeRow(button) {
    const row = button.parentElement.parentElement;
    scoreTable.deleteRow(row.rowIndex - 1);
    songCount--;
    renumberRows();
    calculateTotalScore();
    console.log(`Removed a row. Total rows: ${songCount}`);
}

function renumberRows() {
    const rows = scoreTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const songNumberCell = rows[i].cells[0];
        songNumberCell.innerText = i + 1; // Update song number
    }
    console.log('Renumbered rows.');
}

function duplicateRow(button) {
    const row = button.parentElement.parentElement;
    const songName = row.cells[1].getElementsByTagName('input')[0].value;

    const newRow = scoreTable.insertRow(scoreTable.rows.length - 1); // Insert at the second last row
    songCount++;
    newRow.innerHTML = `<td>${songCount}</td>
                        <td><input type="text" placeholder="Enter song name" value="${songName}" onchange="checkNewValue()" /></td>
                        <td><input type="number" placeholder="Enter score" onchange="checkNewValue()" /></td>
                        <td>
                            <button class="duplicate-btn" onclick="duplicateRow(this)">+</button>
                            <button class="remove-btn" onclick="removeRow(this)">×</button>
                        </td>`;
    calculateTotalScore();
    renumberRows(); // Renumber rows after duplication
    console.log(`Duplicated a row. Total rows: ${songCount}`);
}