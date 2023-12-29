import css from './Searchbar.module.css'

export const Searchbar = ({ onSubmit, onInput }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchForm_button} >
          <span className={css.SearchForm_buttonLabel}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name='searchText'
        />
      </form>
    </header>)
}