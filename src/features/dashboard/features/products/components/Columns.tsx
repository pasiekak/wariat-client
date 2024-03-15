const Columns = () => {
  return (
    <div className="columns">
      <span title="Indywidualny identyfikator produktu." className="id">
        ID
      </span>
      <span title="Nazwa produktu.">Nazwa</span>
      <span
        title="Ilość produktów dostępna do kupienia dla klientów."
        className="max-quantity"
      >
        Ilość
      </span>
      <span title="Cena Brutto">Cena Brutto</span>
      <span title="Czy produkt wyświetla się klientom?" className="publication">
        Publikacja
      </span>
      <span title="Dostępne operacje na produkcie.">Akcje</span>
    </div>
  );
};

export default Columns;
