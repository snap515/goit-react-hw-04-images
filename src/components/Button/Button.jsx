import css from "./Button.module.css"
export const Button = ({onLoadMore}) => {
  return (
    <div className={css.Button_container}><button onClick={onLoadMore} className={css.Button} type='button'>Load More</button></div>
    
  )
}