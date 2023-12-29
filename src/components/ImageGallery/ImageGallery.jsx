import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from "./ImageGallery.module.css"
import { Modal } from "components/Modal/Modal"
import { Component } from "react"

export class ImageGallery extends Component {
  state = {
    isModalOpen: false,
    modalData: null,
  }

  handleModal = (idToFind) => {
    const data  = this.props.data;
    const modalData = data.find(img => img.id === idToFind)
    this.setState({ isModalOpen: true, modalData: modalData.largeImageURL})
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  render() {
    const data  = this.props.data;
    return (
    <ul className={css.ImageGallery}>
        {data?.map(dataElem => {
        return (
          <ImageGalleryItem key={dataElem.id} id={dataElem.id} webImg={dataElem.webformatURL} handleModal={this.handleModal}></ImageGalleryItem>
        )
        })}
      {this.state.isModalOpen && (<Modal modalData={this.state.modalData} closeModal={this.closeModal}></Modal>)}
    </ul>
  )
  }
  
}