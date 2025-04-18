    const scoreTable = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
    const requiredScoreInput = document.getElementById('requiredScore');
    let songCount = 1;

    function calculateTotalScore() {
        const rows = scoreTable.getElementsByTagName('tr');
        let totalScore = 0;

        for (let row of rows) {
            const scoreInput = row.cells[2].getElementsByTagName('input')[0];
            if (scoreInput && scoreInput.value) {
                totalScore += parseInt(scoreInput.value) || 0;
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

        return totalSongs > 0 ? (totalScore / totalSongs) : 0;
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
    }

    function renumberRows() {
        const rows = scoreTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const songNumberCell = rows[i].cells[0];
            songNumberCell.innerText = i + 1; // Update song number
        }
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
    }

    function saveData() {
        const rows = scoreTable.getElementsByTagName('tr');
        const data = [];
        
        for (let row of rows) {
            const songName = row.cells[1].getElementsByTagName('input')[0].value;
            const score = row.cells[2].getElementsByTagName('input')[0].value;
            data.push({ songName, score });
        }

        localStorage.setItem('songData', JSON.stringify(data));
        localStorage.setItem('requiredScore', requiredScoreInput.value);
        alert('Data saved!');
    }

    function loadData() {
        const data = JSON.parse(localStorage.getItem('songData'));
        const requiredScore = localStorage.getItem('requiredScore');

        // Clear existing rows (except header)
        while (scoreTable.rows.length > 1) {
            scoreTable.deleteRow(1);
        }
        songCount = 0; // Reset song count for renumbering

        if (data && data.length) {
            data.forEach(item => {
                songCount++;
                const newRow = scoreTable.insertRow();
                newRow.innerHTML = `<td>${songCount}</td>
                                    <td><input type="text" value="${item.songName || ''}" placeholder="Enter song name" onchange="checkNewValue()" /></td>
                                    <td><input type="number" value="${item.score || ''}" placeholder="Enter score" onchange="checkNewValue()" /></td>
                                    <td>
                                        <button class="duplicate-btn" onclick="duplicateRow(this)">+</button>
                                        <button class="remove-btn" onclick="removeRow(this)">×</button>
                                    </td>`;
            });
        } else {
            // If no data, add a row with placeholders
            const newRow = scoreTable.insertRow();
            newRow.innerHTML = `<td>${++songCount}</td>
                                <td><input type="text" placeholder="Enter song name" onchange="checkNewValue()" /></td>
                                <td><input type="number" placeholder="Enter score" onchange="checkNewValue()" /></td>
                                <td>
                                    <button class="duplicate-btn" onclick="duplicateRow(this)">+</button>
                                    <button class="remove-btn" onclick="removeRow(this)">×</button>
                                </td>`;
        }

        // Remove the first row after loading
        if (scoreTable.rows.length > 1) {
            scoreTable.deleteRow(0);
        }

        requiredScoreInput.value = requiredScore ? requiredScore : '0'; // Set to '0' if null
        calculateTotalScore();
        renumberRows(); // Renumber rows after loading
    }

    function resetAll() {
        // Clear the score table
        while (scoreTable.rows.length > 1) {
            scoreTable.deleteRow(0);
        }
        songCount = 0; // Reset song count for renumbering

        // Reset required score input
        requiredScoreInput.value = '';

        calculateTotalScore();
        renumberRows(); // Renumber rows after loading
    }

    document.getElementById('saveButton').addEventListener('click', saveData);
    document.getElementById('loadButton').addEventListener('click', loadData);
    document.getElementById('resetButton').addEventListener('click', resetAll);
    requiredScoreInput.addEventListener('input', calculateTotalScore);