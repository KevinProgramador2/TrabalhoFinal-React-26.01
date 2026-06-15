function FormPlaneta({
  cadastrarPlaneta,
  fecharModal,
  formPlaneta,
  setFormPlaneta,
}) {
  return (
    <form className="alien-form" onSubmit={cadastrarPlaneta}>
      <div className="modal-header">
        <h2>Cadastrar planeta</h2>
        <button
          aria-label="Fechar modal"
          className="modal-close"
          onClick={fecharModal}
          type="button"
        ></button>
      </div>

      <label>
        Nome
        <input
          minLength="2"
          name="nome"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, nome: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.nome}
        />
      </label>

      <label>
        Galáxia
        <input
          minLength="2"
          name="galaxia"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, galaxia: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.galaxia}
        />
      </label>

      <label>
        Clima
        <input
          minLength="2"
          name="clima"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, clima: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.clima}
        />
      </label>

      <label className="checkbox-field">
        <input
          checked={formPlaneta.habitavel}
          name="habitavel"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, habitavel: event.target.checked })
          }
          type="checkbox"
        />
        Habitável
      </label>

      <label>
        Descrição
        <input
          minLength="3"
          name="descricao"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, descricao: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.descricao}
        />
      </label>

      <label>
        URL da imagem
        <input
          type="text"
          value={formPlaneta.imagem}
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, imagem: event.target.value })
          }
        />
      </label>

      <div className="form-actions">
        <button type="submit">Cadastrar</button>
        <button
          className="button-secondary"
          onClick={fecharModal}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormPlaneta;
