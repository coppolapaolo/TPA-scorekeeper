//deploy as webapp, access to anyone

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var row = [
    data.date,
    data.player1,
    data.player2,
    data.player1Score,
    data.player2Score,
    data.player1RacksWon,
    data.player2RacksWon,
    data.player1BallsPotted,
    data.player2BallsPotted,
    data.player1MissErrors,
    data.player2MissErrors,
    data.player1BreakErrors,
    data.player2BreakErrors,
    data.player1KickErrors,
    data.player2KickErrors,
    data.player1SafetyErrors,
    data.player2SafetyErrors,
    data.player1PositionError,
    data.player2PositionError,
    data.gameType,
    data.htmlTable
  ];

  sheet.appendRow(row);
}
