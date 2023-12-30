import { useEffect } from 'react'
import css from './Modal.module.css'

export const Modal = ({closeModal, modalData}) => {

  
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  useEffect(() => {

    const handleModalOnEscClose = (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  }
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', handleModalOnEscClose)
    return () => {
      document.documentElement.style.overflow = 'auto';
      window.removeEventListener('keydown', handleModalOnEscClose)
    }
  }, [closeModal])
  
  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>
        <img src={modalData} alt="" />
      </div>
    </div>
  )
}