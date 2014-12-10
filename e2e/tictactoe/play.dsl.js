/**
 * Created by sindrisigurjonsson on 10/12/14.
 */

module.exports = function(page){
  var tictactoe;

  function MakeMoveCell1(type) {
    page.cell1.click();
    expect(page.cell1.getText()).toBe(type);
  }

  function MakeMoveCell2(type) {
    page.cell2.click();
    expect(page.cell2.getText()).toBe(type);
  }

  function MakeMoveCell3(type) {
    page.cell3.click();
    expect(page.cell3.getText()).toBe(type);
  }

  function MakeMoveCell4(type) {
    page.cell4.click();
    expect(page.cell4.getText()).toBe(type);
  }

  function MakeMoveCell5(type) {
    page.cell5.click();
    expect(page.cell5.getText()).toBe(type);
  }

  function MakeMoveCell6(type) {
    page.cell6.click();
    expect(page.cell6.getText()).toBe(type);
  }

  function MakeMoveCell7(type) {
    page.cell7.click();
    expect(page.cell7.getText()).toBe(type);
  }

  function MakeMoveCell8(type) {
    page.cell8.click();
    expect(page.cell8.getText()).toBe(type);
  }

  function MakeMoveCell9(type) {
    page.cell9.click();
    expect(page.cell9.getText()).toBe(type);
  }

  function CheckOutcome(message) {
    expect(page.winner.getText()).toBe(message);
  }

  return {
    MakeMoveCell1:MakeMoveCell1,
    MakeMoveCell2:MakeMoveCell2,
    MakeMoveCell3:MakeMoveCell3,
    MakeMoveCell4:MakeMoveCell4,
    MakeMoveCell5:MakeMoveCell5,
    MakeMoveCell6:MakeMoveCell6,
    MakeMoveCell7:MakeMoveCell7,
    MakeMoveCell8:MakeMoveCell8,
    MakeMoveCell9:MakeMoveCell9,
    CheckOutcome:CheckOutcome
  }
};
