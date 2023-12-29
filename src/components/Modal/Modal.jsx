import { useEffect } from 'react'
import css from './Modal.module.css'

export const Modal = (props) => {

  
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  }

  const handleModalOnEscClose = (e) => {
    if (e.code === 'Escape') {
      props.closeModal();
    }
  }

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', handleModalOnEscClose)
    return () => {
      document.documentElement.style.overflow = 'auto';
      window.removeEventListener('keydown', handleModalOnEscClose)
    }
  }, [])
  
  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>
        <img src={props.modalData} alt="" />
      </div>
    </div>
  )
}