import React, { useState, useEffect } from 'react';

function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/gastos')
      .then(response => response.json())
      .then(data => setGastos(data));
  }, []);

  function adicionarGasto() {
    fetch('/gastos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ descricao, valor, tipo, data })
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        setDescricao('');
        setValor('');
        setTipo('');
        setData('');
        setGastos([...gastos, { descricao, valor, tipo, data }]);
      });
  }

  return (
    <div>
      <h1>Minha carteira de gastos</h1>
    </div>
        )};
