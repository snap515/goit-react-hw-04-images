import css from "./ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ id, webImg, handleModal}) => {
  return (
    <li id={id} className={ css.ImageGalleryItem} key={id} onClick={()=>handleModal(id)}>
      <img className={css.ImageGalleryItem_image } src={webImg} alt="" />
    </li>
  )
}