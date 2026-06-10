function FormAlien({ cadastrarAlien, fecharModal, formAlien, setFormAlien }) {
  return (
    <form className="alien-form" onSubmit={cadastrarAlien}>
      <div className="modal-header">
        <h2>Cadastrar alien</h2>
        <button
          aria-label="Fechar modal"
          className="modal-close"
          onClick={fecharModal}
          type="button"
        >
          X
        </button>
      </div>

      <label>
        Nome
        <input
          name="nome"
          minLength="2"
          onChange={(event) =>
            setFormAlien({ ...formAlien, nome: event.target.value })
          }
          required
          type="text"
          value={formAlien.nome}
        />
      </label>

      <label>
        Espécie
        <input
          name="especie"
          minLength="2"
          onChange={(event) =>
            setFormAlien({ ...formAlien, especie: event.target.value })
          }
          required
          type="text"
          value={formAlien.especie}
        />
      </label>

      <label>
        Planeta
        <input
          name="planeta"
          minLength="2"
          onChange={(event) =>
            setFormAlien({ ...formAlien, planeta: event.target.value })
          }
          required
          type="text"
          value={formAlien.planeta}
        />
      </label>

      <label>
        Periculosidade
        <input
          max="10"
          min="1"
          name="periculosidade"
          onChange={(event) =>
            setFormAlien({
              ...formAlien,
              periculosidade: Number(event.target.value),
            })
          }
          required
          type="number"
          value={formAlien.periculosidade}
        />
      </label>

      <label>
        Descrição
        <input
          name="descricao"
          minLength="3"
          onChange={(event) =>
            setFormAlien({ ...formAlien, descricao: event.target.value })
          }
          required
          type="text"
          value={formAlien.descricao}
        />
      </label>

      <div className="form-actions">
        <button type="submit">Cadastrar</button>
        <button className="button-secondary" onClick={fecharModal} type="button">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormAlien;
