import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from "./ImageGallery.module.css"
import { Modal } from "components/Modal/Modal"
import { useState } from "react"

export const ImageGallery =({data}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleModal = (idToFind) => {
    const modalData = data.find(img => img.id === idToFind)
    setIsModalOpen(true);
    setModalData(modalData.largeImageURL)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

    return (
    <ul className={css.ImageGallery}>
        {data?.map(dataElem => {
        return (
          <ImageGalleryItem key={dataElem.id} id={dataElem.id} webImg={dataElem.webformatURL} handleModal={handleModal}></ImageGalleryItem>
        )
        })}
      {isModalOpen && (<Modal modalData={modalData} closeModal={closeModal}></Modal>)}
    </ul>
  )
}