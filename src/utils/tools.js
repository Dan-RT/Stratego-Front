

export default function displayBoard (board) {
    for (let i = 0; i < 10; i++) {
        let row = "";
        for (let j = 0; j < 10; j++) {
            row = row.concat(" | " + j + " ");
            row = row.concat(board[i][j].type.substring(0, 3));
        }
        console.log(i + " " + row);
    }
}
