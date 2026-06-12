function FormAlienNaoControlado({ cadastrarAlien }) {
  function enviarFormulario(event) {
    event.preventDefault();

    const dadosFormulario = new FormData(event.target);

    const alien = {
      nome: dadosFormulario.get("nome"),
      especie: dadosFormulario.get("especie"),
      planeta: dadosFormulario.get("planeta"),
      periculosidade: Number(dadosFormulario.get("periculosidade")),
      descricao: dadosFormulario.get("descricao"),
    };

    cadastrarAlien(alien);
    event.target.reset();
  }

  return (
    <form className="alien-form" onSubmit={enviarFormulario}>
      <h2>Cadastrar alien não controlado</h2>

      <label>
        Nome
        {/* Diferente do controlado, aqui nao existe value={...}. */}
        <input name="nome" minLength="2" required type="text" />
      </label>

      <label>
        Espécie
        <input name="especie" minLength="2" required type="text" />
      </label>

      <label>
        Planeta
        <input name="planeta" minLength="2" required type="text" />
      </label>

      <label>
        Periculosidade
        {/* defaultValue define apenas o valor inicial do campo. */}
        <input
          defaultValue="1"
          max="10"
          min="1"
          name="periculosidade"
          required
          type="number"
        />
      </label>

      <label>
        Descrição
        <input name="descricao" minLength="3" required type="text" />
      </label>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormAlienNaoControlado;
