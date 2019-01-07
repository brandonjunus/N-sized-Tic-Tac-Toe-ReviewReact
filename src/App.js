/* eslint-disable no-alert */
import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

const Row = styled.div`
  height: 100px;
`;

const Col = styled.span`
  border: solid;
  height: 100px;
  width: 100px;
  display: inline-block;
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: 4,
      currentTurn: 'x',
      xMoves: new Set(),
      oMoves: new Set(),
    };
  }

  componentDidMount() {
    const userSize = Number(prompt('How big do you want to play?'));
    this.setState({
      boardSize: userSize,
    });
  }

  placeMove(r, c) {
    const { xMoves, oMoves, currentTurn } = this.state;
    if (xMoves.has(`${r}, ${c}`) || oMoves.has(`${r}, ${c}`)) {
      alert('theres already a piece here play somewhere else lol');
      return;
    }
    // puts move into state
    if (currentTurn === 'x') {
      this.setState(({ xMoves }) => ({
        xMoves: new Set(xMoves.add(`${r}, ${c}`)),
        currentTurn: 'o',
      }), this.checkGameWon(r, c, 'x'));
    } else {
      this.setState(({ oMoves }) => ({
        oMoves: new Set(oMoves.add(`${r}, ${c}`)),
        currentTurn: 'x',
      }), this.checkGameWon(r, c, 'o'));
    }
  }

  checkGameWon(r, c, turn) {
    const { xMoves, oMoves } = this.state;
    const leftOne = c - 1;
    const leftTwo = c - 2;
    const rightOne = c + 1;
    const rightTwo = c + 2;
    const downOne = r + 1;
    const downTwo = r + 2;
    const upOne = r - 1;
    const upTwo = r - 2;
    if (turn === 'x') {
      if (
        // left win condition
        (xMoves.has(`${r}, ${leftOne}`) && xMoves.has(`${r}, ${leftTwo}`))
        // right win condition
        || (xMoves.has(`${r}, ${rightOne}`) && xMoves.has(`${r}, ${rightTwo}`))
        // down win condition
        || (xMoves.has(`${downOne}, ${c}`) && xMoves.has(`${downTwo}, ${c}`))
        // up win condition
        || (xMoves.has(`${upOne}, ${c}`) && xMoves.has(`${upTwo}, ${c}`))
        // down major diag win condition
        || (xMoves.has(`${downOne}, ${rightOne}`) && xMoves.has(`${downTwo}, ${rightTwo}`))
        // up major diag win condition
        || (xMoves.has(`${upOne}, ${rightOne}`) && xMoves.has(`${upTwo}, ${rightTwo}`))
        // down minor diag win condition
        || (xMoves.has(`${downOne}, ${leftOne}`) && xMoves.has(`${downTwo}, ${leftTwo}`))
        // up minor diag win condition
        || (xMoves.has(`${upOne}, ${leftOne}`) && xMoves.has(`${upTwo}, ${leftTwo}`))
        // middle horizontal win condition
        || (xMoves.has(`${r}, ${leftOne}`) && xMoves.has(`${r}, ${rightOne}`))
        // middle vertical win condition
        || (xMoves.has(`${upOne}, ${c}`) && xMoves.has(`${downOne}, ${c}`))
        // middle major diag win condition
        || (xMoves.has(`${upOne}, ${rightOne}`) && xMoves.has(`${downOne}, ${leftOne}`))
        // middle minor diag win condition
        || (xMoves.has(`${upOne}, ${leftOne}`) && xMoves.has(`${downOne}, ${downOne}`))
      ) {
        alert('x has won!');
      }
    } else if (turn === 'o') {
      if (
        // left win condition
        (oMoves.has(`${r}, ${leftOne}`) && oMoves.has(`${r}, ${leftTwo}`))
        // right win condition
        || (oMoves.has(`${r}, ${rightOne}`) && oMoves.has(`${r}, ${rightTwo}`))
        // down win condition
        || (oMoves.has(`${downOne}, ${c}`) && oMoves.has(`${downTwo}, ${c}`))
        // up win condition
        || (oMoves.has(`${upOne}, ${c}`) && oMoves.has(`${upTwo}, ${c}`))
        // down major diag win condition
        || (oMoves.has(`${downOne}, ${rightOne}`) && oMoves.has(`${downTwo}, ${rightTwo}`))
        // up major diag win condition
        || (oMoves.has(`${upOne}, ${rightOne}`) && oMoves.has(`${upTwo}, ${rightTwo}`))
        // down minor diag win condition
        || (oMoves.has(`${downOne}, ${leftOne}`) && oMoves.has(`${downTwo}, ${leftTwo}`))
        // up minor diag win condition
        || (oMoves.has(`${upOne}, ${leftOne}`) && oMoves.has(`${upTwo}, ${leftTwo}`))
        // middle horizontal win condition
        || (oMoves.has(`${r}, ${leftOne}`) && oMoves.has(`${r}, ${rightOne}`))
        // middle vertical win condition
        || (oMoves.has(`${upOne}, ${c}`) && oMoves.has(`${downOne}, ${c}`))
        // middle major diag win condition
        || (oMoves.has(`${upOne}, ${rightOne}`) && oMoves.has(`${downOne}, ${leftOne}`))
        // middle minor diag win condition
        || (oMoves.has(`${upOne}, ${leftOne}`) && oMoves.has(`${downOne}, ${downOne}`))
      ) {
        alert('o has won!');
      }
    }
  }

  renderGame() {
    const { boardSize, xMoves, oMoves } = this.state;
    const initArray = Array.from({ length: boardSize }, (v, i) => i);
    return initArray.map(r =>
      <Row key={r}>
        {initArray.map(c => 
          <Col key={c} onClick={() => this.placeMove(r, c)}>
            <div>{`${r}, ${c}`}</div>
            <div>{xMoves.has(`${r}, ${c}`) ? 'x' : 
                    oMoves.has(`${r}, ${c}`) ? 'o' : 
                      'no moves yet'}</div>
          </Col>
        )}
      </Row>);
  }

  render() {
    const game = this.renderGame();
    return (
      <div className="App">
        {game}
      </div>
    );
  }
}

export default App;
